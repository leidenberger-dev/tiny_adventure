import { MoveableObject } from "./MoveableObject.js";
import { Game } from "../core/Game.js";

export class Pepe extends MoveableObject {
  doorUnlocked = false;
  pepeOpenDoor = false;
  constructor(sprite, player, level, position) {
    super(sprite, player);
    this.position = position;
    this.targetX = this.position.x + 64;
    this.level = level;
    this.activeAnimation = () => {
      this.animation(this.sprite.sleep);
    };
  }
  update() {
    this.detectCollision();
    this.checkJavascriptCollection();
    this.movementOpenDoor();
    this.handleSounds();
  }

  checkJavascriptCollection() {
    if (this.level.isJavascriptCollected) {
      this.awake();
      this.unlockDoor();
    }
    this.activeAnimation();
  }

  awake() {
    this.stopSound();
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

    if (this.row === 2 && this.level.isHtmlCollected) {
      playSoundIfNotAlreadyPlaying("sleep", this.sprite.sleep);
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
