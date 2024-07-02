import { Level } from "../Level.js";
import { CollisionDetector } from "../../physics/CollisionDetector.js";
import { Gravity } from "../../physics/Gravity.js";
import { ctx } from "../../config/canvas.js";
import { pepeSprite, bossSprite } from "../../objects/sprites.js";
import { Boss } from "../../objects/Boss.js";
import { Pepe } from "../../objects/Pepe.js";

const levelSettings = {
  level: 3,
  mapJson: "./src/levels/level3/level3.json",
  map: "./assets/img/level3/mapLevel3.png",
  foreground: "./assets/img/level3/mapLevel3Foreground.png",
  background: "./assets/img/bg.png",
  clouds: "./assets/img/clouds.png",
  startPointX: 1050,
  startPointY: 1200,
  maxPoints: 10,
  minArrows: 50,
};

export class Level3 extends Level {
  pepePosition = { x: 1990, y: 1012 };
  bossData = { x: 2820, y: 1050, walkRoute: 400 };
  doorOpen = false;

  constructor() {
    super(levelSettings);

    this.pepe = new Pepe(pepeSprite, this.player, this, this.pepePosition);
    this.pepe.targetX = this.pepe.position.x + 5;
    this.boss = new Boss(bossSprite, this.player, this.bossData);
    this.enemies = [this.boss];
    this.collisionDetector = new CollisionDetector(this.mapData, this.player);
    this.mapData.collisionDetector = this.collisionDetector;
    this.gravity = new Gravity(
      this.player,
      this.mapData,
      this.collisionDetector
    );
    this.arrows = levelSettings.minArrows;
    this.player.data.arrows = this.arrows;
  }

  update() {
    this.gravity.applyGravity();
    this.collisionDetector.detectCollisionLevel3(this.boss.isDead);
    this.ladderCollision();
    this.pepe.update();
    this.enemies.forEach((enemy) => enemy.update());
    this.arrow.update(this.enemies);
  }

  draw() {
    this.update();

    this.drawBackground();
    this.drawClouds();
    ctx.drawImage(this.map, 0, this.player.jumpHeight);
    if (this.boss.isDead) {
      this.mapData.drawItemsLayer(this.player.jumpHeight);
    }
    this.pepe.draw();
    this.enemies.forEach((enemy) => enemy.drawWithWalkRoute());
    this.arrow.drawArrow();

    this.switchDevMode();
  }

  collectItem() {
    this.collisionDetector();
  }

  switchDevMode() {
    if (this.devMode) {
      this.mapData.drawCollisionLayer(this.player.jumpHeight);
      this.player.imageRectangle();
      this.player.imageCollisionRectangle();
    }
  }
}
