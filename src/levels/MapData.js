import { ctx } from "../config/canvas.js";

export class MapData {
  constructor(levelSettings) {
    this.collissionBlock = new Image();
    this.collissionBlock.src = "./assets/img/collisionblock.png";
    this.mapJson = levelSettings.mapJson;
    this.loadJson();
  }
  async loadJson() {
    try {
      const response = await fetch(this.mapJson);
      const mapData = await response.json();
      this.initializeCollisionLayer(mapData);
      this.drawCollisionLayer();
    } catch (error) {
      console.error("Error loading mapData", error);
    }
  }

  initializeCollisionLayer(mapData) {
    const collisionLayer = mapData.layers.find(
      (layer) => layer.name === "collidingBlocks"
    );
    this.collisionData = collisionLayer.data;

    // Map dimensions
    this.mapWidth = mapData.width;
    this.mapHeight = mapData.height;
    this.tileWidth = mapData.tilewidth;
    this.tileHeight = mapData.tileheight;
  }

  drawCollisionLayer(jumpHeight) {
    for (let i = 0; i < this.collisionData.length; i++) {
      if (this.collisionData[i] !== 0) {
        const x = (i % this.mapWidth) * this.tileWidth;
        const y = Math.floor(i / this.mapWidth) * this.tileHeight + jumpHeight;
        ctx.drawImage(
          this.collissionBlock,
          x,
          y,
          this.tileWidth,
          this.tileHeight
        );
      }
    }
  }
}
