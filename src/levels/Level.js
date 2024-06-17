import { Player } from "../objects/Player.js";
import { boySprite, pepeSprite, doorSprite } from "../objects/sprites.js";
import { canvas, ctx } from "../config/canvas.js";
import { MapData } from "./MapData.js";
import { Gravity } from "../physics/Gravity.js";
import { CollisionDetector } from "../physics/CollisionDetector.js";
import { Pepe } from "../objects/Pepe.js";
import { Door } from "../objects/Door.js";

export let mapWidth = 0;

export class Level {
  pause = false;
  devMode = false;
  isHtmlCollected = false;
  isCssCollected = false;
  isJavascriptCollected = false;
  cloudX = 1500;
  showStep1 = true;
  showStep2 = false;
  showStep3 = false;
  showStep4 = false;
  showStep2Counter = 0;
  showStep3Counter = 0;
  showStep4Counter = 0;
  constructor(levelSettings) {
    this.player = new Player(boySprite);
    this.pepe = new Pepe(pepeSprite, this);
    this.door = new Door(doorSprite);
    this.map = new Image();
    this.map.src = levelSettings.map;
    mapWidth = this.map.width;
    this.background = new Image();
    this.background.src = levelSettings.background;
    this.clouds = new Image();
    this.clouds.src = levelSettings.clouds;
    this.signStep1 = new Image();
    this.signStep1.src = "./assets/img/step1.png";
    this.signStep2 = new Image();
    this.signStep2.src = "./assets/img/step2.png";
    this.signStep3 = new Image();
    this.signStep3.src = "./assets/img/step3.png";
    this.signStep4 = new Image();
    this.signStep4.src = "./assets/img/step4.png";
    this.player.position = levelSettings.startPoint;
    this.mapJson = levelSettings.mapJson;
    this.mapData = new MapData(levelSettings);
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
      this.convertToBlackAndWhite();
    }

    this.mapData.drawItemsLayer(this.player.jumpHeight);

    this.signSteps();

    this.switchDevMode();
  }

  setDevMode() {
    this.devMode = !this.devMode;
  }

  drawBackground() {
    const parallaxFactor = 0.15;
    const backgroundColor = "#6ED0CF";
    const backgroundYOffset = -500;
    const backgroundX = this.player.position.x * parallaxFactor;

    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, backgroundYOffset, this.map.width, this.map.height);

    for (let offsetMultiplier = -1; offsetMultiplier <= 1; offsetMultiplier++) {
      ctx.drawImage(
        this.background,
        -backgroundX + offsetMultiplier * this.map.width,
        0,
        this.map.width,
        this.map.height + this.player.jumpHeight
      );
    }
  }

  updateCloudPosition() {
    const cloudSpeed = 0.8;
    const resetPosition = 0;
    if (this.isJavascriptCollected) {
      this.cloudX -= cloudSpeed;
    }
    if (this.cloudX + this.clouds.width < resetPosition) {
      this.cloudX = this.map.width;
    }
  }

  drawClouds() {
    const cloudY = 110;
    this.updateCloudPosition();
    // Zeichnet die Wolkenbild an der aktuellen Position
    ctx.drawImage(this.clouds, this.cloudX, cloudY);
  }

  convertToBlackAndWhite = () => {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    const length = data.length;

    for (let i = 0; i < length; i += 4) {
      const red = data[i];
      const green = data[i + 1];
      const blue = data[i + 2];

      const gray = 0.299 * red + 0.587 * green + 0.114 * blue;

      data[i] = data[i + 1] = data[i + 2] = gray;
    }

    ctx.putImageData(imageData, 0, 0);
  };

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
