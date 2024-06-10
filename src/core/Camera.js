import { canvas } from "../config/canvas.js";

export class Camera {
  x = 0;
  y = 0;
  tileHeight = 128;
  constructor(player) {
    this.player = player;
  }

  update() {
    // zentriert die Kamera auf den Player
    this.x =
      this.player.position.x - canvas.width / 2 + this.player.frameWidth / 2;
    this.y =
      this.player.position.y -
      canvas.height / 2 +
      this.player.frameHeight / 2 -
      this.tileHeight / 2;
  }
}
