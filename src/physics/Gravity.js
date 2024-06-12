import { CollisionDetector } from "../physics/CollisionDetector.js";

export class Gravity {
  constructor(player, mapData) {
    this.player = player;
    this.mapData = mapData;
    this.gravityStrength = 4;
    this.collisionDetector();
  }

  applyGravity() {
    this.collisionDetector.detectCollision();
    if (!this.player.isOnGround && this.player.isFalling) {
      this.player.position.y += this.gravityStrength;
      this.player.isFalling = false;
    }
  }

  async collisionDetector() {
    await this.mapData.loadJson();
    this.collisionDetector = new CollisionDetector(this.mapData, this.player);
  }
}
