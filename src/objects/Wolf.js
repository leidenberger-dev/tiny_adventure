import { MoveableObject } from "./MoveableObject.js";

export class Wolf extends MoveableObject {
  constructor(sprite, player, position) {
    super(sprite, player);
    this.position = position;
    this.damageBox = { x: sprite.offsetX, y: sprite.offsetY };
    this.damageBoxAttacking = { x: sprite.offsetX - 50, y: sprite.offsetY };
    this.animation(this.sprite.idle);
  }
  update() {
    this.detectCollision();
  }

  waitAndAttack() {
    if (this.player.position.x >= this.position.x - 270) {
      this.drawMirrored();
      this.animation(this.sprite.attack);
      this.offsetX = this.damageBoxAttacking.x;
    } else {
      if (this.isLookingRight) {
        this.draw();
      } else {
        this.drawMirrored();
      }
      this.animation(this.sprite.idle);
      this.offsetX = this.damageBox.x;
    }
  }

  detectCollision() {
    if (
      this.collisionDetector.isCollision(
        this.player.getBounds(),
        this.getBounds()
      )
    ) {
      this.collision = true;
    }
  }
}
