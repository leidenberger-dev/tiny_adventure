import { boy, Player } from "../objects/Player.js";
import { Renderer } from "../core/Renderer.js";

export class Level {
  constructor(levelSettings) {
    this.player = new Player(boy);
    this.map = new Image();
    this.map.src = levelSettings.map;
    this.background = levelSettings.background;
  }

  render() {
    const render = new Renderer();
    render.draw();
  }
}
