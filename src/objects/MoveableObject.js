import { GameObject } from "./GameObject.js";

export class MoveableObject extends GameObject {
  constructor(sprite) {
    super(sprite);
    this.speed = 5;
  }
  moveUp() {
    this.position.y -= this.speed;
  }

  moveDown() {
    this.position.y += this.speed;
  }

  moveLeft() {
    this.position.x -= this.speed;
  }

  moveRight() {
    this.position.x += this.speed;
  }

  stop() {}
}
