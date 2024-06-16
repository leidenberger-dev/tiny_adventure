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
    if (this.collisionDetector.htmlCollected && !this.showStep2Counter) {
      this.isHtmlCollected = true;
      this.showStep2 = true;
      this.showStep2Counter++;
      this.pause = true;
    }
    if (this.collisionDetector.cssCollected && !this.showStep3Counter) {
      this.isCssCollected = true;
      this.showStep3 = true;
      this.showStep3Counter++;
      this.pause = true;
    }
    if (this.collisionDetector.javascriptCollected && !this.showStep4Counter) {
      this.isJavascriptCollected = true;
      this.showStep4 = true;
      this.showStep4Counter++;
      this.pause = true;
    }

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

  setDevModeTrue() {
    if (!this.devMode) {
      this.devMode = true;
    } else {
      this.devMode = false;
    }
  }

  drawBackground() {
    const parallax = 0.15;
    const bgX = this.player.position.x * parallax;

    ctx.fillStyle = "#6ED0CF";
    ctx.fillRect(0, -500, this.map.width, this.map.height);

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
  }

  drawClouds() {
    if (this.isJavascriptCollected) {
      this.cloudX -= 0.8;
    }
    ctx.drawImage(this.clouds, this.cloudX, 110);
    if (this.cloudX + this.clouds.width < 0) {
      this.cloudX = this.map.width;
    }
  }

  convertToBlackAndWhite = () => {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    const length = data.length;

    for (let i = 0; i < length; i += 4) {
      const red = data[i];
      const green = data[i + 1];
      const blue = data[i + 2];

      const gray = (red + green + blue) / 3;

      data[i] = data[i + 1] = data[i + 2] = gray;
    }

    ctx.putImageData(imageData, 0, 0);
  };

  signSteps() {
    if (this.showStep1) {
      ctx.drawImage(
        this.signStep1,
        this.player.position.x - this.player.frameWidth / 2,
        this.player.position.y - this.player.frameHeight
      );
    }
    if (this.showStep2) {
      ctx.drawImage(
        this.signStep2,
        this.player.position.x - this.player.frameWidth / 2,
        this.player.position.y - this.player.frameHeight
      );
    }
    if (this.showStep3) {
      ctx.drawImage(
        this.signStep3,
        this.player.position.x - this.player.frameWidth / 2,
        this.player.position.y - this.player.frameHeight
      );
    }
    if (this.showStep4) {
      ctx.drawImage(
        this.signStep4,
        this.player.position.x - this.player.frameWidth / 2,
        this.player.position.y - this.player.frameHeight
      );
    }
  }
}
