import { Level } from "../Level.js";
import { CollisionDetector } from "../../physics/CollisionDetector.js";
import { Gravity } from "../../physics/Gravity.js";
import { ctx } from "../../config/canvas.js";
import { Door } from "../../objects/Door.js";
import { doorSprite, pepeSprite, wolfSprite } from "../../objects/sprites.js";
import { Pepe } from "../../objects/Pepe.js";
import { Wolf } from "../../objects/Wolf.js";

const levelSettings = {
  level: 2,
  mapJson: "./src/levels/level2/level2.json",
  map: "./assets/img/level2/mapLevel2.png",
  foreground: "./assets/img/level2/mapLevel2Foreground.png",
  background: "./assets/img/bg.png",
  clouds: "./assets/img/clouds.png",
  startPoint: {
    x: 550,
    y: 1200,
  },
};

export class Level2 extends Level {
  doorPosition = { x: 560, y: 815 };
  pepePosition = { x: 400, y: 625 };
  wolf1Position = { x: 1380, y: 1245 };
  wolf2Position = { x: 1500, y: 1245 };
  constructor() {
    super(levelSettings);

    this.collisionDetector = new CollisionDetector(this.mapData, this.player);
    this.mapData.collisionDetector = this.collisionDetector;
    this.gravity = new Gravity(
      this.player,
      this.mapData,
      this.collisionDetector
    );
    this.pepe = new Pepe(pepeSprite, this.player, this, this.pepePosition);
    this.pepe.targetX = this.pepe.position.x + 5;
    this.door = new Door(doorSprite, this.player, this.doorPosition, this.pepe);
    this.wolf = new Wolf(
      wolfSprite,
      this.player,
      this.wolf1Position,
      this.player
    );
    this.wolf2 = new Wolf(
      wolfSprite,
      this.player,
      this.wolf2Position,
      this.player
    );
  }

  update() {
    this.gravity.applyGravity();
    this.collisionDetector.detectCollisionLevel2();
    this.ladderCollision();
    this.pepe.update();
    this.door.update();
    this.wolf.update();
    this.wolf2.update();
  }

  draw() {
    this.update();

    this.drawBackground();
    this.drawClouds();
    ctx.drawImage(this.map, 0, this.player.jumpHeight);

    this.door.draw();
    this.pepe.draw();
    this.wolf.waitAndAttack();

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
