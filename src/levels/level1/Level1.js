import { Level } from "../Level.js";
import { CollisionDetector } from "../../physics/CollisionDetector.js";
import { Door } from "../../objects/Door.js";
import { pepeSprite, doorSprite } from "../../objects/sprites.js";
import { Pepe } from "../../objects/Pepe.js";
import { Gravity } from "../../physics/Gravity.js";
import { ctx } from "../../config/canvas.js";
import { convertToBlackAndWhite } from "../../utils/imageUtils.js";

const levelSettings = {
  mapJson: "./src/levels/level1/level1.json",
  map: "./assets/img/level1/mapLevel1.png",
  background: "./assets/img/bg.png",
  clouds: "./assets/img/clouds.png",
  startPoint: {
    x: 2500,
    y: 1231,
  },
};

export class Level1 extends Level {
  isHtmlCollected = false;
  isCssCollected = false;
  isJavascriptCollected = false;
  showStep1 = true;
  showStep2 = false;
  showStep3 = false;
  showStep4 = false;
  showStep2Counter = 0;
  showStep3Counter = 0;
  showStep4Counter = 0;
  constructor() {
    super(levelSettings);
    this.pepe = new Pepe(pepeSprite, this);
    this.door = new Door(doorSprite);
    this.signStep1 = new Image();
    this.signStep1.src = "./assets/img/level1/step1.png";
    this.signStep2 = new Image();
    this.signStep2.src = "./assets/img/level1/step2.png";
    this.signStep3 = new Image();
    this.signStep3.src = "./assets/img/level1/step3.png";
    this.signStep4 = new Image();
    this.signStep4.src = "./assets/img/level1/step4.png";

    this.collisionDetector = new CollisionDetector(
      this.mapData,
      this.player,
      this.pepe,
      this.door
    );
    this.mapData.collisionDetector = this.collisionDetector;
    this.gravity = new Gravity(
      this.player,
      this.mapData,
      this.collisionDetector
    );
  }

  update() {
    this.gravity.applyGravity();
    this.collisionDetector.detectCollision();
    this.collectItem("html");
    this.collectItem("css");
    this.collectItem("javascript");

    this.pepe.update();
    this.door.update();
  }

  draw() {
    this.update();

    if (this.isCssCollected) {
      this.drawBackground();
    }

    this.drawClouds();

    if (this.isHtmlCollected) {
      ctx.drawImage(this.map, 0, this.player.jumpHeight);
      this.door.draw();
      this.pepe.drawMirrored();
    }

    if (!this.isCssCollected) {
      convertToBlackAndWhite();
    }

    this.mapData.drawItemsLayer(this.player.jumpHeight);

    this.signSteps();

    this.switchDevMode();
  }

  signSteps() {
    for (let step = 1; step <= 4; step++) {
      if (this[`showStep${step}`]) {
        ctx.drawImage(
          this[`signStep${step}`],
          this.player.position.x - this.player.frameWidth / 2,
          this.player.position.y - this.player.frameHeight
        );
      }
    }
  }

  collectItem(itemType) {
    const collectionMap = {
      html: {
        collected: "isHtmlCollected",
        showStep: "showStep2",
        counter: "showStep2Counter",
      },
      css: {
        collected: "isCssCollected",
        showStep: "showStep3",
        counter: "showStep3Counter",
      },
      javascript: {
        collected: "isJavascriptCollected",
        showStep: "showStep4",
        counter: "showStep4Counter",
      },
    };

    const item = collectionMap[itemType];
    if (this.collisionDetector[`${itemType}Collected`] && !this[item.counter]) {
      this[item.collected] = true;
      this[item.showStep] = true;
      this[item.counter]++;
      this.pause = true;
    }
  }

  switchDevMode() {
    if (this.devMode) {
      this.mapData.drawCollisionLayer(this.player.jumpHeight);
      this.player.imageRectangle();
      this.player.imageCollisionRectangle();
      this.pepe.imageRectangle();
      this.pepe.imageCollisionRectangle();
      this.door.imageRectangle();
      this.door.imageCollisionRectangle();
    }
  }
}
