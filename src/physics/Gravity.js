import { CollisionDetector } from "../physics/CollisionDetector.js";

export class Gravity {
  constructor(player, mapData) {
    this.player = player;
    this.mapData = mapData;
    this.gravityStrength = 1;
    this.collisionDetector();
  }

  applyGravity() {
    this.collisionDetector.detectCollision();
    if (!this.collisionDetector.detection) {
      this.player.position.y += this.gravityStrength;
    }
  }

  async collisionDetector() {
    await this.mapData.loadJson();
    this.collisionDetector = new CollisionDetector(this.mapData, this.player);
  }
}
