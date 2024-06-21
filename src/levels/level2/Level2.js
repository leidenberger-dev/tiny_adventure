import { Level } from "../Level.js";
import { CollisionDetector } from "../../physics/CollisionDetector.js";
import { Gravity } from "../../physics/Gravity.js";
import { ctx } from "../../config/canvas.js";

const levelSettings = {
  level: 2,
  mapJson: "./src/levels/level2/level2.json",
  map: "./assets/img/level2/mapLevel2.png",
  foreground: "./assets/img/level2/mapLevel2Foreground.png",
  background: "./assets/img/bg.png",
  clouds: "./assets/img/clouds.png",
  startPoint: {
    x: 3950,
    y: 800,
  },
};

export class Level2 extends Level {
  constructor() {
    super(levelSettings);

    this.collisionDetector = new CollisionDetector(this.mapData, this.player);
    this.mapData.collisionDetector = this.collisionDetector;
    this.gravity = new Gravity(
      this.player,
      this.mapData,
      this.collisionDetector
    );
  }

  update() {
    this.gravity.applyGravity();
    this.collisionDetector.detectCollisionLevel2();
    this.ladderCollision();
  }

  draw() {
    this.update();

    this.drawBackground();

    this.drawClouds();

    ctx.drawImage(this.map, 0, this.player.jumpHeight);

    this.switchDevMode();
  }

  switchDevMode() {
    if (this.devMode) {
      this.mapData.drawCollisionLayer(this.player.jumpHeight);
      this.player.imageRectangle();
      this.player.imageCollisionRectangle();
    }
  }
}
