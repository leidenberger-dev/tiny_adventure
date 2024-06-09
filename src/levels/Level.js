import { Player } from "../objects/Player.js";
import { boy } from "../objects/sprites.js";

export class Level {
  constructor(levelSettings) {
    this.player = new Player(boy);
    this.map = new Image();
    this.map.src = levelSettings.map;
    this.background = levelSettings.background;
  }
}
