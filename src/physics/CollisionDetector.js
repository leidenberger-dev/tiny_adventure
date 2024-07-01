import { playSound } from "../utils/playSound.js";
import { Game } from "../core/Game.js";

export class CollisionDetector {
  htmlCollected = false;
  cssCollected = false;
  javascriptCollected = false;
  constructor(mapData, player) {
    this.mapData = mapData;
    this.player = player;
    this.playSound = playSound;
    this.originalMapData = mapData;
  }

  detectCollisionLevel1() {
    this.player.isOnGround = false;
    const playerBounds = this.getPlayerBounds();
    const { collisionData, itemsData } = this.mapData;

    this.detectGroundCollisions(playerBounds, collisionData);
    this.detectItemCollisions(playerBounds, itemsData);
    this.updateVolume();
  }

  detectCollisionLevel2() {
    this.player.isOnGround = false;
    const playerBounds = this.getPlayerBounds();
    const { collisionData, itemsData, ladderData } = this.mapData;

    this.detectGroundCollisions(playerBounds, collisionData);
    this.detectItemCollisions(playerBounds, itemsData);
    this.detectLadderCollision(playerBounds, ladderData);
    this.updateVolume();
  }

  detectCollisionLevel3() {
    this.player.isOnGround = false;
    const playerBounds = this.getPlayerBounds();
    const { collisionData, itemsData } = this.mapData;

    this.detectGroundCollisions(playerBounds, collisionData);
    this.detectItemCollisions(playerBounds, itemsData);
    this.updateVolume();
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
          this.itemSound = this.playSound("./assets/sounds/item.mp3", 0.1, 1);
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
          if (item === 102) {
            this.player.data.points++;
          }
          if (item === 209) {
            this.player.data.arrows += 3;
          }
          if (item === 184) {
            if (this.player.data.health < 100) {
              this.healthSound = this.playSound(
                "./assets/sounds/health.mp3",
                0.1,
                1
              );
            }
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
        if (this.isCollisionLadder(playerBounds, tileBounds)) {
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

  isCollisionLadder(playerBounds, tileBounds) {
    const expand = 40;
    return (
      playerBounds.bottom > tileBounds.top &&
      playerBounds.top < tileBounds.bottom + expand &&
      playerBounds.right < tileBounds.right + expand &&
      playerBounds.left > tileBounds.left - expand
    );
  }

  isCollisionPepe(playerBounds, tileBounds) {
    const height = 60;
    return (
      playerBounds.bottom > tileBounds.top &&
      playerBounds.top < tileBounds.bottom - height &&
      playerBounds.right > tileBounds.left &&
      playerBounds.left < tileBounds.right
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

  updateVolume() {
    if (Game.isMuted) {
      if (this.itemSound) this.itemSound.muted = true;
      if (this.healthSound) this.healthSound.muted = true;
    } else {
      if (this.itemSound) this.itemSound.muted = false;
      if (this.healthSound) this.healthSound.muted = false;
    }
  }
}
