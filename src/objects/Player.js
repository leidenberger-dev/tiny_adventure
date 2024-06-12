import { MoveableObject } from "./MoveableObject.js";
import { handleInput } from "../core/inputHandler.js";
import { pressedKeys } from "../config/keys.js";
export class Player extends MoveableObject {
  input = handleInput;
  jumpHeight = 300;
  speed = 8;
  jumpSpeed = null;
  canJump = true;
  fallSpeed = 0.4;
  jumpAcceleration = 0.6;
  fallAcceleration = 0.5;
  totalJump = 300;
  isOnGround = true;
  isFalling = false;
  constructor(sprite) {
    super(sprite);
    this.input();
  }

  jump() {
    if (this.isOnGround) {
      this.totalJump = 0;
      this.jumpSpeed = 20;
      this.fallSpeed = 0.4;
    }
  }

  update() {
    if (pressedKeys.up && this.canJump) {
      this.jump();
      this.canJump = false;
    }
    if (!pressedKeys.up) {
      this.canJump = true;
    }
    if (!this.isOnGround && pressedKeys.down) {
      this.position.y += this.speed;
    }
    if (pressedKeys.left) {
      this.position.x -= this.speed;
    }
    if (pressedKeys.right) {
      this.position.x += this.speed;
    }

    if (this.totalJump < this.jumpHeight) {
      this.position.y -= this.jumpSpeed; // Bewegen Sie den Spieler nach oben basierend auf der Sprunggeschwindigkeit
      this.jumpSpeed -= this.jumpAcceleration;
      this.totalJump += this.jumpSpeed;
    } else {
      if (!this.isOnGround) {
        this.isFalling = true;
        this.position.y += this.fallSpeed;
        this.fallSpeed += this.fallAcceleration;
      }
    }
  }
}
