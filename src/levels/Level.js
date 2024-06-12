import { Player } from "../objects/Player.js";
import { boy } from "../objects/sprites.js";
import { ctx } from "../config/canvas.js";
import { MapData } from "./MapData.js";
import { Gravity } from "../physics/Gravity.js";
import { CollisionDetector } from "../physics/CollisionDetector.js";

export class Level {
  devMode = true;
  constructor(levelSettings) {
    this.player = new Player(boy);
    this.map = new Image();
    this.map.src = levelSettings.map;
    this.background = new Image();
    this.background.src = levelSettings.background;
    this.startPoint = levelSettings.startPoint;
    this.player.position = this.startPoint;
    this.mapJson = levelSettings.mapJson;
    this.collisionDetector = new CollisionDetector(this.mapData, this.player);
    this.mapData = new MapData(levelSettings, this.collisionDetector);
    this.gravity = new Gravity(this.player, this.mapData);
  }

  update() {
    this.gravity.applyGravity();
  }

  draw() {
    this.update();

    this.drawBackground();

    ctx.drawImage(this.map, 0, this.player.jumpHeight);

    this.mapData.drawItemsLayer(this.player.jumpHeight);

    if (this.devMode) {
      this.mapData.drawCollisionLayer(this.player.jumpHeight);
      this.player.imageRectangle();
      this.player.imageCollisionRectangle();
    }
  }

  setDevModeTrue() {
    if (!this.devMode) {
      this.devMode = true;
    } else {
      this.devMode = false;
    }
  }

  drawBackground() {
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
  }
}
