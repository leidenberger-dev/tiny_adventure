import { GameObject } from "./GameObject.js";

export class MoveableObject extends GameObject {
  counter = 0;
  speed = 1;
  isLookingRight = true;
  isJumping = false;
  constructor(sprite) {
    super(sprite);
    this.animationSpeed = sprite.animationSpeed;
    this.sprite = sprite;
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
    this.row = spriteState.row;
    this.counter++;
    if (this.counter >= this.animationSpeed) {
      this.column = (this.column + 1) % spriteState.maxColumns;
      this.counter = 0;
    }
  }
}
