export class Gravity {
  constructor(player, mapData, collisionDetector) {
    this.player = player;
    this.mapData = mapData;
    this.collisionDetector = collisionDetector;
    this.gravityStrength = 4;
  }

  applyGravity(level) {
    `
    this.collisionDetector.detectCollisionLevel${level}();
    if (!this.player.isOnGround && this.player.isFalling) {
      this.player.position.y += this.gravityStrength;
      this.player.isFalling = false;
    }
  `;
  }
}
