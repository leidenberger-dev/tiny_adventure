import { Player } from "../objects/Player.js";
import { boy } from "../objects/sprites.js";
import { ctx } from "../config/canvas.js";
import { MapData } from "./MapData.js";

export class Level {
  devMode = false;
  constructor(levelSettings) {
    this.player = new Player(boy);
    this.map = new Image();
    this.map.src = levelSettings.map;
    this.background = new Image();
    this.background.src = levelSettings.background;
    this.startPoint = levelSettings.startPoint;
    this.player.position = this.startPoint;
    this.mapJson = levelSettings.mapJson;
    this.mapData = new MapData(levelSettings);
  }

  draw() {
    const parallax = 0.15;
    const bgX = this.player.position.x * parallax;

    ctx.drawImage(
      this.background,
      -bgX - this.map.width,
      0,
      this.map.width,
      this.map.height + this.player.jumpHeight
    );
    ctx.drawImage(
      this.background,
      -bgX,
      0,
      this.map.width,
      this.map.height + this.player.jumpHeight
    );
    ctx.drawImage(
      this.background,
      -bgX + this.map.width,
      0,
      this.map.width,
      this.map.height + this.player.jumpHeight
    );

    ctx.drawImage(this.map, 0, this.player.jumpHeight);

    if (this.devMode) {
      this.mapData.drawCollisionLayer(this.player.jumpHeight);
    }
  }

  setDevModeTrue() {
    if (!this.devMode) {
      this.devMode = true;
    } else {
      this.devMode = false;
    }
  }
}
