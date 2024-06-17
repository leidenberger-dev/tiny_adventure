import { canvas, ctx } from "../config/canvas.js";
import { Camera } from "./Camera.js";

export class Renderer {
  constructor(level) {
    this.level = level;
    this.camera = new Camera(this.level.player, this.level);
  }

  update() {
    this.camera.update();
    this.level.player.update();
  }

  draw() {
    if (this.level.pause) {
      this.handlePauseState();
      return;
    }

    this.update();
    this.drawScene();
  }

  drawScene() {
    ctx.save();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.translate(-this.camera.x, -this.camera.y);
    this.level.draw();
    this.drawPlayerBasedOnDirection();
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
}
