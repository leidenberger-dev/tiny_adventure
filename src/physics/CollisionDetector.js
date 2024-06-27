export class CollisionDetector {
  htmlCollected = false;
  cssCollected = false;
  javascriptCollected = false;
  constructor(mapData, player) {
    this.mapData = mapData;
    this.player = player;
  }

  detectCollisionLevel1() {
    this.player.isOnGround = false;
    const playerBounds = this.getPlayerBounds();
    const { collisionData, itemsData } = this.mapData;

    this.detectGroundCollisions(playerBounds, collisionData);
    this.detectItemCollisions(playerBounds, itemsData);
  }

  detectCollisionLevel2() {
    this.player.isOnGround = false;
    const playerBounds = this.getPlayerBounds();
    const { collisionData, itemsData, ladderData } = this.mapData;

    this.detectGroundCollisions(playerBounds, collisionData);
    this.detectItemCollisions(playerBounds, itemsData);
    this.detectLadderCollision(playerBounds, ladderData);
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
        if (this.isCollisionCenter(playerBounds, tileBounds)) {
          if (item === 147) {
            this.javascriptCollected = true;
          }
          if (item === 148) {
            this.htmlCollected = true;
          }
          if (item === 149) {
            this.cssCollected = true;
          }
          if (item === 185) {
            this.player.data.points++;
          }
          if (item === 209) {
            this.player.data.arrows += 3;
          }
          if (item === 184) {
            this.player.data.health = 100;
          }

          this.mapData.itemsData[i] = 0;
        }
      }
    });
  }

  detectLadderCollision(playerBounds, ladderData) {
    const { mapWidth, tileWidth, tileHeight } = this.mapData;
    const jumpHeight = this.player.jumpHeight;
    this.ladderCollision = false;

    ladderData.forEach((ladder, i) => {
      if (ladder !== 0) {
        const tileBounds = this.getTileBounds(
          i,
          mapWidth,
          tileWidth,
          tileHeight,
          jumpHeight
        );
        if (this.isCollision(playerBounds, tileBounds)) {
          if (ladder === 91) {
            this.ladderCollision = true;
          }
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

  isCollisionOutside(playerBounds, tileBounds) {
    return (
      playerBounds.bottom < tileBounds.top &&
      playerBounds.top > tileBounds.bottom &&
      playerBounds.right > tileBounds.right &&
      playerBounds.left < tileBounds.left
    );
  }

  isCollisionCenter(playerBounds, tileBounds) {
    const playerCenterX = (playerBounds.left + playerBounds.right) / 2;
    const playerCenterY = (playerBounds.top + playerBounds.bottom) / 2;

    return (
      playerCenterX > tileBounds.left &&
      playerCenterX < tileBounds.right &&
      playerCenterY > tileBounds.top &&
      playerCenterY < tileBounds.bottom
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

  isCollisionWithPlayerHead(enemyBounds, playerBounds, enemyFacingRight) {
    const playerWidth = 200;

    if (enemyFacingRight) {
      return (
        enemyBounds.right > playerBounds.left &&
        enemyBounds.right < playerBounds.left + playerWidth &&
        enemyBounds.top < playerBounds.bottom &&
        enemyBounds.bottom > playerBounds.top
      );
    } else {
      return (
        enemyBounds.left < playerBounds.right &&
        enemyBounds.left > playerBounds.right - playerWidth &&
        enemyBounds.top < playerBounds.bottom &&
        enemyBounds.bottom > playerBounds.top
      );
    }
  }
}
