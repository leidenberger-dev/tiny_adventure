import { ctx } from "../config/canvas.js";

export class GameObject {
  constructor(sprite) {
    this.img = new Image();
    this.img.src = sprite.img;
    this.position = sprite.position;
    this.frameWidth = sprite.frameWidth;
    this.frameHeight = sprite.frameHeight;
    this.offsetX = sprite.offsetX;
    this.offsetY = sprite.offsetY;
    this.offsetWidth = sprite.offsetWidth;
    this.offsetHeight = sprite.offsetHeight;
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

  imageRectangle() {
    ctx.strokeRect(
      this.position.x,
      this.position.y,
      this.frameWidth,
      this.frameHeight
    );
  }

  imageCollisionRectangle() {
    ctx.strokeStyle = "red";
    ctx.strokeRect(
      this.position.x + this.offsetX,
      this.position.y + this.offsetY,
      this.frameWidth - this.offsetWidth,
      this.frameHeight - this.offsetHeight
    );
  }
}
