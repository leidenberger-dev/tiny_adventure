import { MoveableObject } from "./MoveableObject.js";
import { handleInput } from "../core/inputHandler.js";
export class Player extends MoveableObject {
  input = handleInput;
  jumpHeight = 300;
  constructor(sprite) {
    super(sprite);
    this.input();

    this.log = () => {
      console.log(this.position.y);
    };
  }
}
