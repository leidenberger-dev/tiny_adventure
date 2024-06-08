import { Level1 } from "../levels/Level1.js";
import { Player, boy } from "../objects/Player.js";

export class Game {
  boy = boy;
  constructor() {
    this.player = new Player(boy);
  }

  start() {
    this.player.img.onload = () => {
      this.gameLoop();
    };
  }

  gameLoop = () => {
    const level1 = new Level1();
    level1.render();
    requestAnimationFrame(this.gameLoop);
  };
}
