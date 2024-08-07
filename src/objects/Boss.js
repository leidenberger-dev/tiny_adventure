import { Enemy } from "./Enemy.js";
import { Game } from "../core/Game.js";

export class Boss extends Enemy {
  constructor(sprite, player, position) {
    super(sprite, player, position);
    this.damageBox = { x: sprite.offsetX, y: sprite.offsetY };
    this.damageBoxAttacking = { x: sprite.offsetX - 50, y: sprite.offsetY };
    this.speed = 0.5;
    this.damageAmount = 5;
    this.healthBarPosition = {
      x: this.position.x,
      y: this.position.y,
      width: 150,
      height: 30,
      barOffsetY: 14,
      barHeight: 12.5,
    };
  }

  update() {
    super.update();
    this.handleChickenSound();
  }

  handleChickenSound() {
    if (this.isPlayingChickenSound) return;
    this.isPlayingChickenSound = true;
    if (!this.isDead) {
      this.chickSound = this.playSound(
        "./assets/sounds/enemy/chicken.mp3",
        0.7,
        1
      );
    }
  }

  updateVolume() {
    if (Game.isMuted) {
      if (this.chickSound) this.chickSound.muted = true;
    } else {
      if (this.chickSound) this.chickSound.muted = false;
    }
  }
}
