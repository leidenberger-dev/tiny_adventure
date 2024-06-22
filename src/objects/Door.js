import { MoveableObject } from "./MoveableObject.js";
export class Door extends MoveableObject {
  collision = false;
  doorOpen = false;

  constructor(sprite, player, position, pepe) {
    super(sprite, player);
    this.position = position;
    this.pepe = pepe;
  }

  update() {
    this.detectCollision();
    if (this.doorOpen) return;

    if (this.pepe.pepeOpenDoor) {
      this.animateDoorOpening();
    }

    this.checkAnimationEnd();
  }

  animateDoorOpening() {
    this.animation(this.sprite.open);
  }

  checkAnimationEnd() {
    if (this.column >= this.sprite.maxColumns) {
      this.doorOpen = true;
    }
  }

  detectCollision() {
    if (
      this.collisionDetector.isCollisionInside(
        this.player.getBounds(),
        this.getBounds()
      ) &&
      this.pepe.pepeOpenDoor
    ) {
      this.collision = true;
    }
  }
}
