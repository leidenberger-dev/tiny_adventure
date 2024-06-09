import { canvas, ctx } from "../config/canvas.js";

export class Renderer {
  constructor(level) {
    this.level = level;
  }
  draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.level.player.draw();
  }
}
