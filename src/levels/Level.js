import { Player } from "../objects/Player.js";
import { arrowSprite, boySprite } from "../objects/sprites.js";
import { ctx } from "../config/canvas.js";
import { MapData } from "./MapData.js";
import { Arrow } from "../objects/Arrow.js";

export let mapWidth = 0;

export class Level {
  pause = false;
  devMode = false;
  cloudX = 1500;
  isJavascriptCollected = true;
  constructor(levelSettings) {
    this.startPointX = levelSettings.startPointX;
    this.startPointY = levelSettings.startPointY;
    this.player = new Player(boySprite);
    this.levelNumber = levelSettings.level;
    this.map = new Image();
    this.map.src = levelSettings.map;
    mapWidth = this.map.width;
    this.foreground = new Image();
    this.foreground.src = levelSettings.foreground;
    this.background = new Image();
    this.background.src = levelSettings.background;
    this.clouds = new Image();
    this.clouds.src = levelSettings.clouds;
    this.player.position.x = levelSettings.startPointX;
    this.player.position.y = levelSettings.startPointY;
    this.mapJson = levelSettings.mapJson;
    this.mapData = new MapData(levelSettings);
    this.arrow = new Arrow(arrowSprite, this.player);
    this.maxPoints = levelSettings.maxPoints;
  }

  update() {
    this.gravity.applyGravity();
  }

  drawBackground() {
    const parallaxFactor = 0.15;
    const backgroundColor = "#6ED0CF";
    const backgroundYOffset = -250;
    const backgroundX = this.player.position.x * parallaxFactor;

    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, backgroundYOffset, this.map.width, this.map.height);

    for (let offsetMultiplier = -1; offsetMultiplier <= 1; offsetMultiplier++) {
      ctx.drawImage(
        this.background,
        -backgroundX + offsetMultiplier * this.map.width,
        0,
        this.map.width,
        this.map.height + this.player.jumpHeight
      );
    }
  }

  updateCloudPosition() {
    const cloudSpeed = 0.4;
    const resetPosition = 0;
    if (this.isJavascriptCollected) {
      this.cloudX -= cloudSpeed;
    }
    if (this.cloudX + this.clouds.width < resetPosition) {
      this.cloudX = this.map.width;
    }
  }

  drawClouds() {
    const cloudY = 55;
    this.updateCloudPosition();
    ctx.drawImage(this.clouds, this.cloudX, cloudY);
  }

  drawOnceAndPause() {
    this.drawOnce = true;
    this.pause = true;
  }

  ladderCollision() {
    if (this.collisionDetector.ladderCollision) {
      this.player.canUseLadder = true;
    }
  }

  drawForeground() {
    ctx.drawImage(this.foreground, 0, this.player.jumpHeight + 15);
  }
}
