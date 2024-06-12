import { Player } from "../objects/Player.js";
import { boy } from "../objects/sprites.js";
import { canvas, ctx } from "../config/canvas.js";
import { MapData } from "./MapData.js";
import { Gravity } from "../physics/Gravity.js";
import { CollisionDetector } from "../physics/CollisionDetector.js";

export class Level {
  devMode = false;
  isHtmlCollected = false;
  isCssCollected = false;
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
    this.collisionDetector = new CollisionDetector(this.mapData, this.player);
    this.mapData.collisionDetector = this.collisionDetector;
    this.gravity = new Gravity(
      this.player,
      this.mapData,
      this.collisionDetector
    );
  }

  update() {
    this.gravity.applyGravity();
    this.collisionDetector.detectCollision();
    if (this.collisionDetector.htmlCollected) {
      this.isHtmlCollected = true;
    }
    if (this.collisionDetector.cssCollected) {
      this.isCssCollected = true;
    }
  }

  draw() {
    this.update();

    if (this.isCssCollected) {
      this.drawBackground();
    }

    if (this.isHtmlCollected) {
      ctx.drawImage(this.map, 0, this.player.jumpHeight);
    }

    if (!this.isCssCollected) {
      this.convertToBlackAndWhite();
    }
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
  convertToBlackAndWhite = () => {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    const length = data.length;

    for (let i = 0; i < length; i += 4) {
      const red = data[i];
      const green = data[i + 1];
      const blue = data[i + 2];

      const gray = (red + green + blue) / 3;

      data[i] = data[i + 1] = data[i + 2] = gray;
    }

    ctx.putImageData(imageData, 0, 0);
  };
}
