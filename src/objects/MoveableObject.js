import { GameObject } from "./GameObject.js";

export class MoveableObject extends GameObject {
  counter = 0;
  speed = 1;
  isJumping = false;
  devModeVisual = true;
  constructor(sprite, player) {
    super(sprite, player);
    this.sprite = sprite;
    this.animationSpeed = this.sprite.animationSpeed;
  }
  moveUp() {
    this.position.y -= this.speed;
  }

  moveDown() {
    this.position.y += this.speed;
  }

  moveLeft() {
    this.position.x -= this.speed;
    this.isLookingRight = false;
  }

  moveRight() {
    this.position.x += this.speed;
    this.isLookingRight = true;
  }

  animation(spriteState) {
    this.spriteState = spriteState;
    if (this.row !== spriteState.row) {
      this.column = 0;
    }
    this.row = spriteState.row;
    this.counter++;

    if (spriteState === this.sprite.jumping) {
      const accelerationFactor = 1.7;
      const lastColumn = spriteState.maxColumns - 1;

      if (this.column < lastColumn) {
        if (this.counter >= this.animationSpeed / accelerationFactor) {
          this.column++;
          this.counter = 0;
        }
      }
    } else if (this.counter >= this.animationSpeed) {
      this.column = (this.column + 1) % spriteState.maxColumns;
      this.counter = 0;
    }
  }
}
