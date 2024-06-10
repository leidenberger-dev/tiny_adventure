import { canvas, ctx } from "../config/canvas.js";
import { Camera } from "./Camera.js";

export class Renderer {
  constructor(level) {
    this.level = level;
    this.camera = new Camera(this.level.player);
  }

  draw() {
    this.camera.update();

    ctx.save();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.translate(-this.camera.x, -this.camera.y);
    this.level.draw();
    this.level.player.draw();
    ctx.restore();
  }
}
