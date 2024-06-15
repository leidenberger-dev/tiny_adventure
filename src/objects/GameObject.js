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
    this.maxColumns = sprite.maxColumns;
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

  drawMirrored() {
    ctx.save(); // Speichern Sie den aktuellen Zustand des Kontexts
    ctx.scale(-1, 1); // Skalieren Sie den Kontext horizontal um -1
    ctx.drawImage(
      this.img,
      this.column * this.frameWidth,
      this.row * this.frameHeight,
      this.frameWidth,
      this.frameHeight,
      -(this.position.x + this.frameWidth / 1.4), // Addieren Sie frameWidth zur x-Position vor dem Negieren
      this.position.y,
      this.frameWidth,
      this.frameHeight
    );
    ctx.restore(); // Stellen Sie den ursprünglichen Zustand des Kontexts wieder her
  }

  imageRectangle() {
    ctx.strokeStyle = "black";
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
