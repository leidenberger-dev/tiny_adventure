import { ctx } from "../config/canvas.js";

export class GameObject {
  constructor(sprite) {
    this.img = new Image();
    this.img.src = sprite.img;
    this.position = sprite.position;
    this.frameWidth = sprite.frameWidth;
    this.frameHeight = sprite.frameHeight;
    this.row = 0;
    this.column = 0;
  }

  draw() {
    ctx.drawImage(
      this.img,
      this.column * this.frameWidth,
      this.row * this.frameHeight,
      this.frameWidth,
      this.frameHeight,
      this.position.x,
      this.position.y,
      this.frameWidth,
      this.frameHeight
    );
  }
}
