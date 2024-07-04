import { Level } from "../Level.js";
import { CollisionDetector } from "../../physics/CollisionDetector.js";
import { Gravity } from "../../physics/Gravity.js";
import { ctx } from "../../config/canvas.js";
import { Door } from "../../objects/Door.js";
import {
  bearSprite,
  bisonSprite,
  doorSprite,
  pepeSprite,
  wolfSprite,
} from "../../objects/sprites.js";
import { Pepe } from "../../objects/Pepe.js";
import { Wolf } from "../../objects/Wolf.js";
import { Bison } from "../../objects/Bison.js";
import { Bear } from "../../objects/Bear.js";

const levelSettings = {
  level: 2,
  mapJson: "./src/levels/level2/level2.json",
  map: "./assets/img/level2/mapLevel2.png",
  foreground: "./assets/img/level2/mapLevel2Foreground.png",
  background: "./assets/img/bg.png",
  clouds: "./assets/img/clouds.png",
  startPointX: 225,
  startPointY: 550,
  maxPoints: 10,
  minArrows: 5,
};

export class Level2 extends Level {
  doorPosition = { x: 280, y: 407.5 };
  pepePosition = { x: 200, y: 312.5 };
  wolf1Data = { x: 560, y: 622.5, walkRoute: 25 };
  wolf2Data = { x: 1320, y: 365, walkRoute: 60 };
  bisonData = { x: 1200, y: 595, walkRoute: 75 };
  bison2Data = { x: 1000, y: 85, walkRoute: 40 };
  bearData = { x: 600, y: 140, walkRoute: 65 };

  constructor() {
    super(levelSettings);

    this.pepe = new Pepe(pepeSprite, this.player, this, this.pepePosition);
    this.pepe.targetX = this.pepe.position.x + 2.5;
    this.door = new Door(doorSprite, this.player, this.doorPosition, this.pepe);
    this.wolf = new Wolf(wolfSprite, this.player, this.wolf1Data);
    this.wolf2 = new Wolf(wolfSprite, this.player, this.wolf2Data);
    this.bison = new Bison(bisonSprite, this.player, this.bisonData);
    this.bison2 = new Bison(bisonSprite, this.player, this.bison2Data);
    this.bear = new Bear(bearSprite, this.player, this.bearData);
    this.enemies = [this.wolf, this.wolf2, this.bison, this.bison2, this.bear];
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
    this.collisionDetector.detectCollisionLevel2();
    this.ladderCollision();
    this.pepe.update();
    this.door.update();
    this.enemies.forEach((enemy) => enemy.update());
    this.arrow.update(this.enemies);
  }

  draw() {
    this.update();

    this.drawBackground();
    this.drawClouds();
    ctx.drawImage(this.map, 0, this.player.jumpHeight);

    this.door.draw();
    this.mapData.drawItemsLayer(this.player.jumpHeight);
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
