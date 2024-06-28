import { MoveableObject } from "./MoveableObject.js";

export class Pepe extends MoveableObject {
  doorUnlocked = false;
  pepeOpenDoor = false;
  constructor(sprite, player, level, position) {
    super(sprite, player);
    this.position = position;
    this.targetX = this.position.x + 128;
    this.level = level;
    this.activeAnimation = () => {
      this.animation(this.sprite.sleep);
    };
  }
  update() {
    this.detectCollision();
    this.checkJavascriptCollection();
    this.movementOpenDoor();
  }

  checkJavascriptCollection() {
    if (this.level.isJavascriptCollected) {
      this.awake();
      this.unlockDoor();
    }
    this.activeAnimation();
  }

  awake() {
    if (!this.doorUnlocked) {
      this.activeAnimation = () => {
        this.animation(this.sprite.idle);
      };
    }
  }

  unlockDoor() {
    if (
      !this.doorUnlocked &&
      this.row === this.sprite.idle.row &&
      this.collision
    ) {
      this.doorUnlocked = true;
    }
  }

  movementOpenDoor() {
    if (this.doorUnlocked && this.position.x < this.targetX) {
      this.activeAnimation = () => {
        this.animation(this.sprite.walking);
      };
      this.moveRight();
    } else if (this.position.x >= this.targetX) {
      this.activeAnimation = () => {
        this.animation(this.sprite.idle);
        this.pepeOpenDoor = true;
      };
    }
  }

  detectCollision() {
    if (
      this.collisionDetector.isCollisionPepe(
        this.player.getBounds(),
        this.getBounds()
      )
    ) {
      this.collision = true;
    } else {
      this.collision = false;
    }
  }
}
