import { canvas, ctx } from "../config/canvas.js";
import { Camera } from "./Camera.js";
import { Gui } from "./Gui.js";

let startScreen = true;
export class Renderer {
  constructor(level, gui = null) {
    this.startSceenImage = new Image();
    this.startSceenImage.src = "./assets/img/startscreen.png";
    this.level = level;
    this.camera = new Camera(this.level.player, this.level);
    this.gui = gui ? gui : new Gui();
    this.checkStartScreen();
  }

  update() {
    if (this.gui.startScreen) return;
    this.camera.update();
    this.level.player.update();
    this.gui.update(this.level);
  }

  draw() {
    if (this.level.pause) {
      this.handlePauseState();
      this.gui.draw(this.level.pause);
      return;
    }

    this.update();
    this.drawScene();
    this.gui.draw(this.level.pause, this.level.levelNumber);
  }

  drawScene() {
    if (this.gui.startScreen) {
      this.drawStartScreen();
    } else {
      this.drawLevel();
    }
  }

  drawStartScreen() {
    ctx.drawImage(this.startSceenImage, 0, 0, canvas.width, canvas.height);
  }

  drawLevel() {
    ctx.save();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.translate(-this.camera.x, -this.camera.y);
    this.level.draw();
    this.drawPlayerBasedOnDirection();
    this.level.drawForeground();
    ctx.restore();
  }

  drawPlayerBasedOnDirection() {
    if (this.level.player.isLookingRight) {
      this.level.player.draw();
    } else {
      this.level.player.drawMirrored();
    }
  }

  handlePauseState() {
    this.level.showStep1 = false;
    this.level.showStep2 = false;
    this.level.showStep3 = false;
    this.level.showStep4 = false;
  }

  checkStartScreen() {
    if (this.level.levelNumber === 1) {
      this.gui.startScreen = true;
      this.gui.startButtonActive = true;
    } else {
      this.gui.startScreen = false;
    }
  }
}
