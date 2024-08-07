import { MoveableObject } from "./MoveableObject.js";
import { pressedKeys } from "../config/keys.js";
import { mapWidth } from "../levels/Level.js";
import { Game } from "../core/Game.js";

const dataSymbol = Symbol("data");
export class Player extends MoveableObject {
  constructor(sprite) {
    super(sprite);
    if (!Player[dataSymbol]) {
      Player[dataSymbol] = { health: 100, points: 0, arrows: 5 };
    }
    this.data = Player[dataSymbol];
    this.jumpHeight = 150;
    this.speed = 4;
    this.jumpSpeed = null;
    this.canJump = true;
    this.fallSpeed = 0.2;
    this.jumpAcceleration = 0.3;
    this.fallAcceleration = 0.25;
    this.totalJump = 150;
    this.isOnGround = true;
    this.isFalling = false;
    this.isAttacking = false;
    this.isShooting = false;
    this.climbSpeed = 5;
    this.isClimbing = false;
    this.canUseLadder = false;
    this.isTakeDamage = false;
    this.isDead = false;
    this.data.health = 100;
    this.data.points = 0;
  }

  update() {
    this.handleDead();
    if (this.isDead) {
      return;
    }
    this.handleMovement();
    this.handleAttacks();
    this.handleAttackAnimation();
    this.handleShootAnimation();
    this.handleJumpAndFall();
    this.handleClimbing();
    this.handleClimbingAnimation();
    this.takeDamage();
    this.handleSounds();
  }

  jump() {
    if (this.isOnGround) {
      this.totalJump = 0;
      this.jumpSpeed = 10;
      this.fallSpeed = 0.2;
      this.animation(this.sprite.jumping);
    }
  }

  handleMovement() {
    if (this.isAttacking || this.isShooting || this.isTakeDamage) {
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
    if (this.isTakeDamage) return;
    if (pressedKeys.attack && !this.isAttacking && !this.isShooting) {
      this.isAttacking = true;
    }
    if (pressedKeys.shoot && !this.isShooting && !this.isAttacking) {
      if (this.data.arrows < 1) {
        return;
      }
      this.isShooting = true;
    }
  }

  handleAttackAnimation() {
    if (this.isTakeDamage || this.isJumping) {
      return;
    }
    if (this.isAttacking && this.column < this.spriteState.maxColumns - 1) {
      this.animation(this.sprite.attack);
    } else {
      this.isAttacking = false;
    }
  }

  handleShootAnimation() {
    if (this.isTakeDamage) {
      return;
    }
    if (this.isShooting && this.column < this.spriteState.maxColumns - 1) {
      this.animation(this.sprite.shooting);
      if (this.column === this.spriteState.maxColumns - 1) {
        this.data.arrows--;
      }
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
    if (this.isAttacking || this.isShooting || this.isTakeDamage) {
      return;
    }
    if (pressedKeys.right || pressedKeys.left) {
      this.animation(this.sprite.walking);
      this.isMoving = true;
    } else {
      this.isMoving = false;
      this.animation(this.sprite.idle);
    }
  }

  handleClimbing() {
    if (this.canUseLadder && pressedKeys.up) {
      this.isClimbing = true;
    } else if (!pressedKeys.up && this.isClimbing) {
      this.isClimbing = false;
      this.fallSpeed = 0.5;
    }
    if (!this.isOnGround) {
      this.isFalling = true;
    }

    if (this.isClimbing && this.canUseLadder) {
      this.fallSpeed = 0;
      this.totalJump = 250;
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

  takeDamage() {
    if (!this.isTakeDamage) {
      return;
    }
    if (this.column < this.spriteState.maxColumns - 2) {
      this.animation(this.sprite.hurt);
    } else {
      this.data.health -= 20;
      this.isTakeDamage = false;
    }
  }

  setTakeDamage() {
    if (this.isDead || this.isFalling) return;
    this.isTakeDamage = true;
    this.column = 0;
  }

  handleDead() {
    if (this.position.y > 775 && !this.restart) {
      this.isOnGround = true;
      this.data.health = 0;
    }
    if (this.isFalling) return;
    if (!this.data.health < 1) {
      return;
    } else {
      this.isDead = true;
    }
    if (this.column < this.spriteState.maxColumns - 1) {
      this.animation(this.sprite.dead);
    } else {
      this.column = this.spriteState.maxColumns - 1;
    }
  }

  handleSounds() {
    if (!this.soundPlayers) {
      this.soundPlayers = {};
    }

    const playSoundIfNotAlreadyPlaying = (soundName, soundDetails) => {
      if (!this.soundsPlaying[soundName]) {
        const sound = this.playSound(
          soundDetails.sound,
          soundDetails.volume,
          soundDetails.speed
        );
        this.soundsPlaying[soundName] = true;
        this.soundPlayers[soundName] = sound;
        sound.onended = () => {
          this.soundsPlaying[soundName] = false;
        };
      }
      if (Game.isMuted) {
        this.soundPlayers[soundName].muted = true;
      }
    };

    if (this.isMoving && this.isOnGround && !this.isShooting) {
      playSoundIfNotAlreadyPlaying("walking", this.sprite.walking);
    }
    if (this.isJumping && !this.canJump) {
      playSoundIfNotAlreadyPlaying("jumping", this.sprite.jumping);
    }
    if (this.isTakeDamage) {
      playSoundIfNotAlreadyPlaying("hurt", this.sprite.hurt);
    }
    if (this.isShooting && this.isOnGround) {
      playSoundIfNotAlreadyPlaying("shooting", this.sprite.shooting);
    }
    if (this.data.health < 1) {
      playSoundIfNotAlreadyPlaying("dead", this.sprite.dead);
    }
    if (this.isAttacking && this.isOnGround && !this.isTakeDamage) {
      playSoundIfNotAlreadyPlaying("attack", this.sprite.attack);
    }

    if (Game.isMuted) {
      Object.values(this.soundPlayers).forEach((sound) => {
        sound.muted = true;
      });
    } else {
      Object.values(this.soundPlayers).forEach((sound) => {
        sound.muted = false;
      });
    }
  }
}
