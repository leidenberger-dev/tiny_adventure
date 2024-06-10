import { Player } from "../objects/Player.js";
import { boy } from "../objects/sprites.js";
import { ctx } from "../config/canvas.js";

export class Level {
  constructor(levelSettings) {
    this.player = new Player(boy);
    this.map = new Image();
    this.map.src = levelSettings.map;
    this.background = new Image();
    this.background.src = levelSettings.background;
    this.startPoint = levelSettings.startPoint;
    this.player.position = this.startPoint;
  }

  draw() {
    const parallax = 0.15; // Ändern Sie diesen Wert, um den Parallaxeneffekt zu steuern
    const bgX = this.player.position.x * parallax;

    // Zeichnen Sie das Hintergrundbild dreimal: einmal links, einmal in der Mitte und einmal rechts
    ctx.drawImage(
      this.background,
      -bgX - this.map.width,
      0,
      this.map.width,
      this.map.height + this.player.jumpHeight
    );
    ctx.drawImage(
      this.background,
      -bgX,
      0,
      this.map.width,
      this.map.height + this.player.jumpHeight
    );
    ctx.drawImage(
      this.background,
      -bgX + this.map.width,
      0,
      this.map.width,
      this.map.height + this.player.jumpHeight
    );

    // Zeichnen Sie die Karte normal
    ctx.drawImage(this.map, 0, this.player.jumpHeight);
  }
}
