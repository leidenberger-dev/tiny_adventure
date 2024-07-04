import { MoveableObject } from "./MoveableObject.js";

export class Arrow extends MoveableObject {
  position = { x: 100, y: 1150 };
  constructor(sprite, player) {
    super(sprite, player);
    this.player = player;
    this.isFlying = false;
    this.flyingTime = 0;
    this.flyingRoute = 40;
    this.speed = 5;
    this.hasDamaged = false;
  }

  update(enemies) {
    this.handleFlying();

    if (!this.isFlying) {
      this.resetArrowPosition();
      this.hasDamaged = false;
    }

    this.detectCollision(enemies);
  }

  resetArrowPosition() {
    const OFFSET_X = 22.5;
    const OFFSET_Y = 65;
    this.position.x = this.player.position.x + OFFSET_X;
    this.position.y = this.player.position.y + OFFSET_Y;
  }

  drawArrow() {
    if (!this.isFlying) {
      this.flyingTime = 0;
      return;
    }

    const shouldMove = this.flyingTime < this.flyingRoute && !this.hasDamaged;
    if (shouldMove) {
      this.player.isLookingRight ? this.draw() : this.drawMirrored();
      this.player.isLookingRight ? this.moveRight() : this.moveLeft();
    }

    this.flyingTime += 1;
    this.isFlying = false;
  }

  handleFlying() {
    if (this.player.isShooting && this.player.column >= 3) {
      this.isFlying = true;
    }
  }

  detectCollision(enemies) {
    const arrowBounds = this.getBounds();
    for (const enemy of enemies) {
      const enemyBounds = enemy.getBounds();
      if (this.collisionDetector.isCollision(arrowBounds, enemyBounds)) {
        if (!this.hasDamaged) {
          if (this.isFlying) {
            const shoot = true;
            this.hasDamaged = true;
            enemy.takeDamage(shoot);
          }
          break;
        }
      }
    }
  }
}
