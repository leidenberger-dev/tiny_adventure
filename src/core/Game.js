import { Level1 } from "../levels/Level1.js";
import { Player, boy } from "../objects/Player.js";
import { Renderer } from "./Renderer.js";

export class Game {
  boy = boy;
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
}
