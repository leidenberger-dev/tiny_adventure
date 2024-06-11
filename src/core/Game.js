import { Level1 } from "../levels/level1/Level1.js";
import { Renderer } from "./Renderer.js";

export class Game {
  constructor() {
    this.level = new Level1();
    this.renderer = new Renderer(this.level);
  }

  start() {
    setTimeout(() => {
      this.gameLoop();
    }, 1000);
  }

  gameLoop = () => {
    this.renderer.draw();
    requestAnimationFrame(this.gameLoop);
  };

  devMode() {
    this.level.setDevModeTrue();
  }
}
