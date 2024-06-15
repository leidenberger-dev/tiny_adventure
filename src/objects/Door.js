import { MoveableObject } from "./MoveableObject.js";
import { pepeOpenDoor } from "./Pepe.js";
export class Door extends MoveableObject {
  collision = false;
  doorOpen = false;

  constructor(sprite) {
    super(sprite);
  }

  update() {
    if (pepeOpenDoor && !this.doorOpen) {
      this.animation(this.sprite.open);
    }

    if (this.column >= this.sprite.maxColumns - 1) {
      this.doorOpen = true;
    }
  }
}
