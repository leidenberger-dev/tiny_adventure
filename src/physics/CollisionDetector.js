export class CollisionDetector {
  detection = false;
  constructor(mapData, player) {
    this.mapData = mapData;
    this.player = player;
  }

  detectCollision() {
    this.player.isOnGround = false;
    const {
      position,
      frameWidth,
      frameHeight,
      offsetX,
      offsetY,
      offsetWidth,
      offsetHeight,
    } = this.player;
    const playerBounds = {
      top: position.y + offsetY,
      bottom: position.y + frameHeight - offsetHeight,
      left: position.x + offsetX,
      right: position.x + frameWidth - offsetWidth,
    };

    const { collisionData, itemsData, mapWidth, tileWidth, tileHeight } =
      this.mapData;
    const jumpHeight = this.player.jumpHeight;

    for (let i = 0; i < collisionData.length; i++) {
      if (collisionData[i] !== 0) {
        const collisionOffset = 30;
        const tileX = (i % mapWidth) * tileWidth;
        const tileY =
          Math.floor(i / mapWidth) * tileHeight + jumpHeight - collisionOffset;

        const tileBounds = {
          top: tileY,
          bottom: tileY + tileHeight,
          left: tileX,
          right: tileX + tileWidth,
        };

        if (this.isCollisionFromAbove(playerBounds, tileBounds)) {
          console.log("Collision detected from above");
          this.player.isOnGround = true;
        }
      }
    }

    for (let i = 0; i < itemsData.length; i++) {
      if (itemsData[i] !== 0) {
        const tileX = (i % mapWidth) * tileWidth;
        const tileY = Math.floor(i / mapWidth) * tileHeight + jumpHeight;

        const tileBounds = {
          top: tileY,
          bottom: tileY + tileHeight,
          left: tileX,
          right: tileX + tileWidth,
        };

        if (this.isCollisionFromAbove(playerBounds, tileBounds)) {
          this.mapData.itemsData.splice(i, 1);
          break;
        }
      }
    }
  }

  isCollisionFromAbove(playerBounds, tileBounds) {
    return (
      playerBounds.bottom > tileBounds.top &&
      playerBounds.top < tileBounds.top &&
      playerBounds.right > tileBounds.left &&
      playerBounds.left < tileBounds.right
    );
  }
}
