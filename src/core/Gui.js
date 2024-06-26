import { GameObject } from "../objects/GameObject.js";
import { Player } from "../objects/Player.js";
import {
  arrowsAmountSprite,
  barsSprite,
  boySprite,
  buttonsSprite,
  mobileButtonsSprite,
} from "../objects/sprites.js";
import { ctx } from "../config/canvas.js";

export class Gui {
  constructor() {
    this.player = new Player(boySprite);
    this.healthbar = new GameObject(barsSprite);
    this.healthbar.column = 5;
    this.pointsbar = new GameObject(barsSprite);
    this.pointsbar.row = 1;
    this.pointsbar.position.x += this.pointsbar.frameWidth;
    this.soundButton = new GameObject(buttonsSprite);
    this.soundButton.position = {
      x: 900,
      y: 12,
    };
    this.pauseButton = new GameObject(buttonsSprite);
    this.pauseButton.row = 1;
    this.pauseButton.position = {
      x: 1020,
      y: 12,
    };
    this.menuButton = new GameObject(buttonsSprite);
    this.menuButton.row = 2;
    this.menuButton.position = {
      x: 1140,
      y: 12,
    };
    this.mobileLeft = new GameObject(mobileButtonsSprite);
    this.mobileLeft.row = 0;
    this.mobileLeft.column = 3;
    this.mobileLeft.position = {
      x: 100,
      y: 525,
    };
    this.mobileRight = new GameObject(mobileButtonsSprite);
    this.mobileRight.row = 0;
    this.mobileRight.column = 1;
    this.mobileRight.position = {
      x: 250,
      y: 525,
    };
    this.mobileBButton = new GameObject(mobileButtonsSprite);
    this.mobileBButton.row = 2;
    this.mobileBButton.column = 2;
    this.mobileBButton.position = {
      x: 975,
      y: 550,
    };
    this.mobileYButton = new GameObject(mobileButtonsSprite);
    this.mobileYButton.row = 2;
    this.mobileYButton.column = 0;
    this.mobileYButton.position = {
      x: 850,
      y: 450,
    };
    this.mobileAButton = new GameObject(mobileButtonsSprite);
    this.mobileAButton.row = 2;
    this.mobileAButton.column = 3;
    this.mobileAButton.position = {
      x: 1100,
      y: 450,
    };

    this.arrowsAmount = new GameObject(arrowsAmountSprite);
    this.arrowsAmount.position = {
      x: 600,
      y: 0,
    };
  }

  update(maxPoints) {
    this.maxPoints = maxPoints.maxPoints;
    this.levelNumber = maxPoints.levelNumber;
    this.handleCollectPoint(this.maxPoints);
  }

  draw() {
    if (this.levelNumber > 1) {
      this.healthbar.draw();
      this.pointsbar.draw();
      this.drawPointsNumber();
      this.arrowsAmount.draw();
      this.drawArrowsNumber();
    }

    this.soundButton.draw();
    this.pauseButton.draw();
    this.menuButton.draw();
    this.mobileLeft.draw();
    this.mobileRight.draw();
    this.mobileBButton.draw();
    this.mobileYButton.draw();
    this.mobileAButton.draw();
  }

  handleCollectPoint(maxPoints) {
    const percentage = (this.player.data.points / maxPoints) * 100;
    if (percentage >= 20) this.pointsbar.column = 1;
    if (percentage >= 40) this.pointsbar.column = 2;
    if (percentage >= 60) this.pointsbar.column = 3;
    if (percentage >= 80) this.pointsbar.column = 4;
    if (percentage === 100) this.pointsbar.column = 5;
  }

  drawArrowsNumber() {
    ctx.font = `bold 50px "Comic Sans MS"`;
    ctx.fillStyle = "white";
    ctx.fillText(this.player.data.arrows, 685, 67);
    ctx.strokeStyle = "black";
    ctx.lineWidth = 3;
    ctx.strokeText(this.player.data.arrows, 685, 67);
  }

  drawPointsNumber() {
    ctx.font = `bold 50px "Comic Sans MS"`;
    ctx.fillStyle = "white";
    ctx.fillText(this.player.data.points, 460, 67);
    ctx.strokeStyle = "black";
    ctx.lineWidth = 3;
    ctx.strokeText(this.player.data.points, 460, 67);
  }
}
