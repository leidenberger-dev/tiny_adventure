import { GameObject } from "../objects/GameObject.js";
import {
  barsSprite,
  buttonsSprite,
  mobileButtonsSprite,
} from "../objects/sprites.js";

export class Gui {
  constructor() {
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
  }

  draw() {
    this.healthbar.draw();
    this.pointsbar.draw();
    this.soundButton.draw();
    this.pauseButton.draw();
    this.menuButton.draw();
    this.mobileLeft.draw();
    this.mobileRight.draw();
    this.mobileBButton.draw();
    this.mobileYButton.draw();
    this.mobileAButton.draw();
  }

  mobileButtons() {}
}
