import { ctx } from "../config/canvas.js";
import { devMode } from "../core/Game.js";
import { CollisionDetector } from "../physics/CollisionDetector.js";

export class GameObject {
  isLookingRight = true;
  row = 0;
  column = 0;
  constructor(sprite, player) {
    this.ctx = ctx;
    this.player = player;
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
    this.mirrorPoint = sprite.mirrorPoint;
    this.row = 0;
    this.column = 0;
    this.collisionDetector = new CollisionDetector();
  }

  draw() {
    this.isLookingRight = true;
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
    if (devMode) {
      this.imageRectangle();
      this.imageCollisionRectangle();
    }
  }

  drawMirrored() {
    this.isLookingRight = false;
    ctx.save(); // Speichern Sie den aktuellen Zustand des Kontexts
    ctx.scale(-1, 1); // Skalieren Sie den Kontext horizontal um -1
    ctx.drawImage(
      this.img,
      this.column * this.frameWidth,
      this.row * this.frameHeight,
      this.frameWidth,
      this.frameHeight,
      -(this.position.x + this.frameWidth / this.mirrorPoint), // Addieren Sie frameWidth zur x-Position vor dem Negieren
      this.position.y,
      this.frameWidth,
      this.frameHeight
    );
    ctx.restore();
    if (devMode) {
      this.imageRectangle();
      this.imageCollisionRectangle();
    }
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

  getBounds() {
    return {
      top: this.position.y + this.offsetY,
      bottom: this.position.y + this.frameHeight - this.offsetHeight,
      left: this.position.x + this.offsetX,
      right: this.position.x + this.frameWidth - this.offsetWidth,
    };
  }
}
