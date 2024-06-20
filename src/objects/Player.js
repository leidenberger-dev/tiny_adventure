import { MoveableObject } from "./MoveableObject.js";
import { pressedKeys } from "../config/keys.js";
import { mapWidth } from "../levels/Level.js";

export class Player extends MoveableObject {
  constructor(sprite) {
    super(sprite);
    this.jumpHeight = 300;
    this.speed = 8;
    this.jumpSpeed = null;
    this.canJump = true;
    this.fallSpeed = 0.4;
    this.jumpAcceleration = 0.6;
    this.fallAcceleration = 0.5;
    this.totalJump = 300;
    this.isOnGround = true;
    this.isFalling = false;
    this.isAttacking = false;
  }

  jump() {
    if (this.isOnGround) {
      this.totalJump = 0;
      this.jumpSpeed = 20;
      this.fallSpeed = 0.4;
      this.animation(this.sprite.jumping);
    }
  }

  handleMovement() {
    if (pressedKeys.up && this.canJump) {
      this.jump();
      this.canJump = false;
      this.isJumping = true;
    }
    if (!pressedKeys.up) {
      this.canJump = true;
    }
    if (!this.isOnGround && pressedKeys.down) {
      this.position.y += this.speed;
    }
    if (pressedKeys.left) {
      if (this.position.x > 0) {
        this.moveLeft();
      }
    }
    if (pressedKeys.right) {
      if (this.position.x < mapWidth - this.frameWidth / 2) {
        this.moveRight();
      }
    }
    if (pressedKeys.attack && !this.isAttacking) {
      this.isAttacking = true;
    }
  }

  handleAttackAnimation() {
    if (this.isAttacking && this.column < this.spriteState.maxColumns - 1) {
      this.animation(this.sprite.attack);
      console.log(this.column);
    } else {
      this.isAttacking = false;
    }
  }

  handleJumpAndFall() {
    if (this.totalJump < this.jumpHeight) {
      this.position.y -= this.jumpSpeed;
      this.jumpSpeed -= this.jumpAcceleration;
      this.totalJump += this.jumpSpeed;
      this.animation(this.sprite.jumping);
    } else {
      if (!this.isOnGround) {
        this.isJumping = false;
        this.isFalling = true;
        this.animation(this.sprite.falling);
        this.position.y += this.fallSpeed;
        this.fallSpeed += this.fallAcceleration;
      } else {
        this.isFalling = false;
        this.isJumping = false;
        this.handleIdleAndWalkingAnimations();
      }
    }
  }

  handleIdleAndWalkingAnimations() {
    if (this.isAttacking) {
      return;
    }
    if (pressedKeys.right || pressedKeys.left) {
      this.animation(this.sprite.walking);
    } else {
      this.animation(this.sprite.idle);
    }
  }

  update() {
    this.handleMovement();
    this.handleAttackAnimation();
    this.handleJumpAndFall();
  }
}
