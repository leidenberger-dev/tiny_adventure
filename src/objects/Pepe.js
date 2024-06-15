import { MoveableObject } from "./MoveableObject.js";

export let pepeOpenDoor = false;

export class Pepe extends MoveableObject {
  doorUnlocked = false;
  targetX = this.position.x + 128;
  constructor(sprite, level) {
    super(sprite);
    this.level = level;
    this.activeAnimation = () => {
      this.animation(this.sprite.sleep);
    };
  }
  update() {
    if (this.level.isJavascriptCollected) {
      this.awake();
      this.unlockDoor();
    }
    this.activeAnimation();

    if (this.doorUnlocked && this.position.x < this.targetX) {
      this.activeAnimation = () => {
        this.animation(this.sprite.walking);
      };
      this.moveRight();
    } else if (this.position.x >= this.targetX) {
      this.activeAnimation = () => {
        this.animation(this.sprite.idle);
        pepeOpenDoor = true;
      };
    }
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
}
