export class CollisionDetector {
  constructor(mapData, player, pepe, door) {
    this.mapData = mapData;
    this.player = player;
    this.pepe = pepe;
    this.door = door;
    this.htmlCollected = false;
    this.cssCollected = false;
    this.javascriptCollected = false;
  }

  detectCollision() {
    this.player.isOnGround = false;
    const playerBounds = this.getPlayerBounds();
    const { collisionData, itemsData } = this.mapData;

    this.detectGroundCollisions(playerBounds, collisionData);
    this.detectItemCollisions(playerBounds, itemsData);
    this.detectPepeCollision(playerBounds, this.getPepeBounds());
    this.detectDoorCollision(playerBounds, this.getDoorBounds());
  }

  getPlayerBounds() {
    const {
      position,
      frameWidth,
      frameHeight,
      offsetX,
      offsetY,
      offsetWidth,
      offsetHeight,
    } = this.player;
    return {
      top: position.y + offsetY,
      bottom: position.y + frameHeight - offsetHeight,
      left: position.x + offsetX,
      right: position.x + frameWidth - offsetWidth,
    };
  }

  getPepeBounds() {
    const {
      position,
      frameWidth,
      frameHeight,
      offsetX,
      offsetY,
      offsetWidth,
      offsetHeight,
    } = this.pepe;
    return {
      top: position.y + offsetY,
      bottom: position.y + frameHeight - offsetHeight,
      left: position.x + offsetX,
      right: position.x + frameWidth - offsetWidth,
    };
  }

  getDoorBounds() {
    const {
      position,
      frameWidth,
      frameHeight,
      offsetX,
      offsetY,
      offsetWidth,
      offsetHeight,
    } = this.door;
    return {
      top: position.y + offsetY,
      bottom: position.y + frameHeight - offsetHeight,
      left: position.x + offsetX,
      right: position.x + frameWidth - offsetWidth,
    };
  }

  getTileBounds(
    index,
    mapWidth,
    tileWidth,
    tileHeight,
    jumpHeight,
    collisionOffset = 0
  ) {
    const tileX = (index % mapWidth) * tileWidth;
    const tileY =
      Math.floor(index / mapWidth) * tileHeight + jumpHeight - collisionOffset;
    return {
      top: tileY,
      bottom: tileY + tileHeight,
      left: tileX,
      right: tileX + tileWidth,
    };
  }

  detectGroundCollisions(playerBounds, collisionData) {
    const { mapWidth, tileWidth, tileHeight } = this.mapData;
    const jumpHeight = this.player.jumpHeight;
    const collisionOffset = 30;

    collisionData.forEach((tile, i) => {
      if (tile !== 0) {
        const tileBounds = this.getTileBounds(
          i,
          mapWidth,
          tileWidth,
          tileHeight,
          jumpHeight,
          collisionOffset
        );
        if (this.isCollisionFromAbove(playerBounds, tileBounds)) {
          this.player.isOnGround = true;
        }
      }
    });
  }

  detectItemCollisions(playerBounds, itemsData) {
    const { mapWidth, tileWidth, tileHeight } = this.mapData;
    const jumpHeight = this.player.jumpHeight;

    itemsData.forEach((item, i) => {
      if (item !== 0) {
        const tileBounds = this.getTileBounds(
          i,
          mapWidth,
          tileWidth,
          tileHeight,
          jumpHeight
        );
        if (this.isCollision(playerBounds, tileBounds)) {
          if (item === 147) {
            this.javascriptCollected = true;
          }
          if (item === 148) {
            this.htmlCollected = true;
          }
          if (item === 149) {
            this.cssCollected = true;
          }

          this.mapData.itemsData[i] = 0;
        }
      }
    });
  }

  isCollision(playerBounds, tileBounds) {
    return (
      playerBounds.bottom > tileBounds.top &&
      playerBounds.top < tileBounds.bottom &&
      playerBounds.right > tileBounds.left &&
      playerBounds.left < tileBounds.right
    );
  }

  isCollisionInside(playerBounds, tileBounds) {
    return (
      playerBounds.bottom > tileBounds.top &&
      playerBounds.top < tileBounds.bottom &&
      playerBounds.right < tileBounds.right &&
      playerBounds.left > tileBounds.left
    );
  }

  isCollisionFromAbove(playerBounds, tileBounds) {
    const playerHeight = this.player.frameHeight;
    return (
      playerBounds.bottom > tileBounds.top &&
      playerBounds.top < tileBounds.bottom - playerHeight &&
      playerBounds.right > tileBounds.left &&
      playerBounds.left < tileBounds.right
    );
  }

  detectPepeCollision(playerBounds, pepeBounds) {
    if (
      this.isCollision(playerBounds, pepeBounds) &&
      this.pepe.row === this.pepe.sprite.idle.row
    ) {
      this.pepe.collision = true;
    }
  }

  detectDoorCollision(playerBounds, doorBounds) {
    if (
      this.isCollisionInside(playerBounds, doorBounds) &&
      this.pepe.openDoor
    ) {
      this.door.collision = true;
    }
  }
}
