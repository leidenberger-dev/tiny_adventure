import { MoveableObject } from "./MoveableObject.js";
import { pressedKeys } from "../config/keys.js";
import { mapWidth } from "../levels/Level.js";

export class Player extends MoveableObject {
  constructor(sprite) {
    super(sprite);
    this.health = 100;
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
    this.isShooting = false;
    this.climbSpeed = 10;
    this.isClimbing = false;
    this.canUseLadder = false;
  }

  update() {
    this.handleMovement();
    this.handleAttacks();
    this.handleAttackAnimation();
    this.handleShootAnimation();
    this.handleJumpAndFall();
    this.handleClimbing();
    this.handleClimbingAnimation();
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
    if (this.isAttacking || this.isShooting) {
      return;
    }
    if (pressedKeys.up && this.canJump) {
      this.jump();
      this.canJump = false;
      this.isJumping = true;
    }
    if (!pressedKeys.up) {
      this.canJump = true;
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
  }

  handleAttacks() {
    if (pressedKeys.attack && !this.isAttacking && !this.isShooting) {
      this.isAttacking = true;
    }
    if (pressedKeys.shoot && !this.isShooting && !this.isAttacking) {
      this.isShooting = true;
    }
  }

  handleAttackAnimation() {
    if (this.isAttacking && this.column < this.spriteState.maxColumns - 1) {
      this.animation(this.sprite.attack);
    } else {
      this.isAttacking = false;
    }
  }

  handleShootAnimation() {
    if (this.isShooting && this.column < this.spriteState.maxColumns - 1) {
      this.animation(this.sprite.shooting);
    } else {
      this.isShooting = false;
    }
  }

  handleJumpAndFall() {
    if (this.isClimbing) {
      return;
    }

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
    if (this.isAttacking || this.isShooting) {
      return;
    }
    if (pressedKeys.right || pressedKeys.left) {
      this.animation(this.sprite.walking);
    } else {
      this.animation(this.sprite.idle);
    }
  }

  handleClimbing() {
    if (this.canUseLadder && pressedKeys.up) {
      this.isClimbing = true;
    } else if (!pressedKeys.up && this.isClimbing) {
      this.isClimbing = false;
      this.fallSpeed = 1;
    }
    this.isFalling = true;

    if (this.isClimbing && this.canUseLadder) {
      this.fallSpeed = 0;
      this.totalJump = 500;
      this.isFalling = false;
      this.position.y -= this.climbSpeed;
      this.canUseLadder = false;
    } else {
      this.isClimbing = false;
      this.canUseLadder = false;
      this.currentAnimation = "";
    }
  }

  handleClimbingAnimation() {
    if (this.isClimbing) {
      this.animation(this.sprite.climbing);
    } else {
      this.currentAnimation = "";
    }
  }
}
