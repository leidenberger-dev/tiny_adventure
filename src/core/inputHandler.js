import { pressedKey } from "../config/keys.js";

export const handleInput = function () {
  window.addEventListener("keydown", (e) => {
    switch (e.key) {
      case pressedKey.up:
        this.position.y -= this.speed;
        break;
      case pressedKey.down:
        this.position.y += this.speed;
        break;
      case pressedKey.left:
        this.position.x -= this.speed;
        break;
      case pressedKey.right:
        this.position.x += this.speed;
        break;
      default:
        return;
    }
    this.isMoving = true;
  });

  window.addEventListener("keyup", (e) => {
    if (
      [
        pressedKey.up,
        pressedKey.down,
        pressedKey.left,
        pressedKey.right,
      ].includes(e.key)
    ) {
      this.isMoving = false;
    }
  });
};
