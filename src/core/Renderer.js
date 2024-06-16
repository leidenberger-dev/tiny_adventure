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
    if (!this.level.pause) {
      this.update();
    }

    if (!this.level.pause) {
      ctx.save();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.translate(-this.camera.x, -this.camera.y);
      this.level.draw();
      if (this.level.player.isLookingRight) {
        this.level.player.draw();
      } else {
        this.level.player.drawMirrored();
      }
      ctx.restore();
    }
    if (this.level.pause) {
      this.level.showStep1 = false;
    }
    if (this.level.showStep2 && this.level.pause) {
      this.level.showStep2 = false;
    }
    if (this.level.showStep3 && this.level.pause) {
      this.level.showStep3 = false;
    }
    if (this.level.showStep4 && this.level.pause) {
      this.level.showStep4 = false;
    }
  }
}
