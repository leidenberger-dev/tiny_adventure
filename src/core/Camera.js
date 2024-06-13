import { canvas } from "../config/canvas.js";

export class Camera {
  x = 1;
  y = 0;
  tileHeight = 128;

  constructor(player, level) {
    this.level = level;
    this.player = player;
    this.cameraMapStart = 0;
    this.cameraMapEnd = this.level.map.width - canvas.width;
  }

  update() {
    this.camera();
  }

  camera() {
    this.x =
      this.player.position.x - canvas.width / 2 + this.player.frameWidth / 2;
    this.y =
      this.player.position.y -
      canvas.height / 2 +
      this.player.frameHeight / 2 -
      this.tileHeight / 2;

    if (this.x < this.cameraMapStart) {
      this.x = this.cameraMapStart;
    }
    if (this.x > this.cameraMapEnd) {
      this.x = this.cameraMapEnd;
    }
  }
}
