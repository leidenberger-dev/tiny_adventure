import { MoveableObject } from "./MoveableObject.js";
import { handleInput } from "../core/inputHandler.js";
export class Player extends MoveableObject {
  input = handleInput;
  constructor(sprite) {
    super(sprite);
    this.input();
  }
}
