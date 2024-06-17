import { MoveableObject } from "./MoveableObject.js";
import { pepeOpenDoor } from "./Pepe.js";
export class Door extends MoveableObject {
  collision = false;
  doorOpen = false;

  constructor(sprite) {
    super(sprite);
  }

  update() {
    if (this.doorOpen) return;

    if (pepeOpenDoor) {
      this.animateDoorOpening();
    }

    this.checkAnimationEnd();
  }

  animateDoorOpening() {
    this.animation(this.sprite.open);
  }

  checkAnimationEnd() {
    if (this.column >= this.sprite.maxColumns - 1) {
      this.doorOpen = true;
    }
  }
}
