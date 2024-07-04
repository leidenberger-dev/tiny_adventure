import { ctx } from "../config/canvas.js";

export class MapData {
  constructor(levelSettings, collisionDetector) {
    this.collisionDetector = collisionDetector;
    this.collisionBlock = new Image();
    this.collisionBlock.src = "./assets/img/collisionblock.png";
    this.css = new Image();
    this.css.src = "./assets/img/level1/css.png";
    this.html = new Image();
    this.html.src = "./assets/img/level1/html.png";
    this.javascript = new Image();
    this.javascript.src = "./assets/img/level1/javascript.png";
    this.health = new Image();
    this.health.src = "./assets/img/level2/health.png";
    this.point = new Image();
    this.point.src = "./assets/img/level2/point.png";
    this.arrows = new Image();
    this.arrows.src = "./assets/img/level2/arrows.png";
    this.mapJson = levelSettings.mapJson;
    this.level = levelSettings.level;
    this.loadJson();
  }
  async loadJson() {
    try {
      const response = await fetch(this.mapJson);
      const mapData = await response.json();
      this.initializeLayers(mapData);
      this.drawCollisionLayer();
      this.drawItemsLayer();
      if (this.level === 2) {
        this.initializeLevel2Layers(mapData);
      }
    } catch (error) {
      console.error("Error loading mapData", error);
    }
  }

  initializeLayers(mapData) {
    const collisionLayer = mapData.layers.find(
      (layer) => layer.name === "collidingBlocks"
    );
    const itemsLayer = mapData.layers.find((layer) => layer.name === "items");
    this.collisionData = collisionLayer.data;
    this.itemsData = itemsLayer.data;
    // Map dimensions
    this.mapWidth = mapData.width;
    this.mapHeight = mapData.height;
    this.tileWidth = mapData.tilewidth;
    this.tileHeight = mapData.tileheight;
  }

  initializeLevel2Layers(mapData) {
    const ladderLayer = mapData.layers.find((layer) => layer.name === "ladder");
    this.ladderData = ladderLayer.data;
  }

  drawCollisionLayer(jumpHeight) {
    for (let i = 0; i < this.collisionData.length; i++) {
      if (this.collisionData[i] !== 0) {
        const x = (i % this.mapWidth) * this.tileWidth;
        const y = Math.floor(i / this.mapWidth) * this.tileHeight + jumpHeight;
        ctx.drawImage(
          this.collisionBlock,
          x,
          y,
          this.tileWidth,
          this.tileHeight
        );
      }
    }
  }

  drawItemsLayer(jumpHeight, html, css) {
    for (let i = 0; i < this.itemsData.length; i++) {
      const x = (i % this.mapWidth) * this.tileWidth;
      const y = Math.floor(i / this.mapWidth) * this.tileHeight + jumpHeight;
      let image;
      switch (this.itemsData[i]) {
        case 184:
          image = this.health;
          break;
        case 185:
          image = this.point;
          break;
        case 102:
          image = this.point;
          break;
        case 209:
          image = this.arrows;
          break;
        case 147:
          if (css) {
            image = this.javascript;
          }
          break;
        case 148:
          image = this.html;
          break;
        case 149:
          if (html) {
            image = this.css;
          }
          break;
        default:
          continue;
      }
      if (image) {
        ctx.drawImage(image, x, y, this.tileWidth, this.tileHeight);
      }
    }
  }
}
