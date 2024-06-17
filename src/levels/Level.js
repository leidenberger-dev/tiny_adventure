import { Player } from "../objects/Player.js";
import { boySprite } from "../objects/sprites.js";
import { ctx } from "../config/canvas.js";
import { MapData } from "./MapData.js";

export let mapWidth = 0;

export class Level {
  pause = false;
  devMode = false;
  cloudX = 1500;
  constructor(levelSettings) {
    this.player = new Player(boySprite);
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
  }

  update() {
    this.gravity.applyGravity();
  }

  setDevMode() {
    this.devMode = !this.devMode;
  }

  drawBackground() {
    const parallaxFactor = 0.15;
    const backgroundColor = "#6ED0CF";
    const backgroundYOffset = -500;
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
    const cloudSpeed = 0.8;
    const resetPosition = 0;
    if (this.isJavascriptCollected) {
      this.cloudX -= cloudSpeed;
    }
    if (this.cloudX + this.clouds.width < resetPosition) {
      this.cloudX = this.map.width;
    }
  }

  drawClouds() {
    const cloudY = 110;
    this.updateCloudPosition();
    // Zeichnet die Wolkenbild an der aktuellen Position
    ctx.drawImage(this.clouds, this.cloudX, cloudY);
  }
}
