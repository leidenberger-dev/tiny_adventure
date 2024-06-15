import { Player } from "../objects/Player.js";
import { boy, pepe } from "../objects/sprites.js";
import { canvas, ctx } from "../config/canvas.js";
import { MapData } from "./MapData.js";
import { Gravity } from "../physics/Gravity.js";
import { CollisionDetector } from "../physics/CollisionDetector.js";
import { Pepe } from "../objects/Pepe.js";

export let mapWidth = 0;

export class Level {
  devMode = false;
  isHtmlCollected = false;
  isCssCollected = false;
  isJavascriptCollected = false;
  cloudX = 2650;
  constructor(levelSettings) {
    this.player = new Player(boy);
    this.pepe = new Pepe(pepe, this);
    this.map = new Image();
    this.map.src = levelSettings.map;
    mapWidth = this.map.width;
    this.background = new Image();
    this.background.src = levelSettings.background;
    this.clouds = new Image();
    this.clouds.src = levelSettings.clouds;
    this.player.position = levelSettings.startPoint;
    this.mapJson = levelSettings.mapJson;
    this.mapData = new MapData(levelSettings);
    this.collisionDetector = new CollisionDetector(
      this.mapData,
      this.player,
      this.pepe
    );
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
    if (this.collisionDetector.javascriptCollected) {
      this.isJavascriptCollected = true;
    }

    this.pepe.update();
  }

  draw() {
    this.update();

    if (this.isCssCollected) {
      this.drawBackground();
    }

    if (this.isJavascriptCollected) {
      this.drawClouds();
    }

    if (this.isHtmlCollected) {
      ctx.drawImage(this.map, 0, this.player.jumpHeight);
      this.pepe.drawMirrored();
    }

    if (!this.isCssCollected) {
      this.convertToBlackAndWhite();
    }
    this.mapData.drawItemsLayer(this.player.jumpHeight);

    if (this.devMode) {
      this.mapData.drawCollisionLayer(this.player.jumpHeight);
      this.player.imageRectangle();
      this.player.imageCollisionRectangle();
      this.pepe.imageRectangle();
      this.pepe.imageCollisionRectangle();
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

    ctx.fillStyle = "#6ED0CF";
    ctx.fillRect(0, -500, this.map.width, this.map.height);

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

  drawClouds() {
    this.cloudX -= 0.8;
    ctx.drawImage(this.clouds, this.cloudX, 110);
    if (this.cloudX + this.clouds.width < 0) {
      this.cloudX = this.map.width;
    }
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
