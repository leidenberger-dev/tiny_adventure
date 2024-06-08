import { canvas, ctx } from "../config/canvas.js";
import { Level1 } from "../levels/Level1.js";

export class Renderer {
  level1 = new Level1();
  draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.level1.player.draw();
  }
}
