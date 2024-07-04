import { GameObject } from "../objects/GameObject.js";
import { Player } from "../objects/Player.js";
import {
  arrowsAmountSprite,
  barsSprite,
  boySprite,
  buttonsSprite,
  keysSprite,
  mainButtonsSprite,
  mobileButtonsSprite,
} from "../objects/sprites.js";

export function guiElements() {
  this.player = new Player(boySprite);
  this.tryAgainClicked = false;
  this.gameOverImage = new Image();
  this.gameOverImage.src = "./assets/img/youlost.png";
  this.youWinImage = new Image();
  this.youWinImage.src = "./assets/img/win_2.png";
  this.gameOverImage = new Image();
  this.gameOverImage.src = "./assets/img/youlost.png";
  this.youWinImage = new Image();
  this.youWinImage.src = "./assets/img/win_2.png";
  this.healthbar = new GameObject(barsSprite);
  this.healthbar.column = 5;
  this.pointsbar = new GameObject(barsSprite);
  this.pointsbar.row = 1;
  this.pointsbar.position.x += this.pointsbar.frameWidth;
  this.soundButton = new GameObject(buttonsSprite);
  this.soundButton.position = {
    x: 700,
    y: 6,
  };
  this.keysOverview = new GameObject(keysSprite);
  this.keysOverview.position = {
    x: 760,
    y: 210,
  };
  this.pauseButton = new GameObject(buttonsSprite);
  this.pauseButton.row = 1;
  this.pauseButton.position = {
    x: 760,
    y: 6,
  };
  this.menuButton = new GameObject(buttonsSprite);
  this.menuButton.row = 2;
  this.menuButton.position = {
    x: 820,
    y: 6,
  };
  this.mobileLeft = new GameObject(mobileButtonsSprite);
  this.mobileLeft.row = 0;
  this.mobileLeft.column = 3;
  this.mobileLeft.position = {
    x: 50,
    y: 312.5,
  };
  this.mobileRight = new GameObject(mobileButtonsSprite);
  this.mobileRight.row = 0;
  this.mobileRight.column = 1;
  this.mobileRight.position = {
    x: 125,
    y: 312.5,
  };
  this.mobileBButton = new GameObject(mobileButtonsSprite);
  this.mobileBButton.row = 2;
  this.mobileBButton.column = 2;
  this.mobileBButton.position = {
    x: 737.5,
    y: 325,
  };
  this.mobileYButton = new GameObject(mobileButtonsSprite);
  this.mobileYButton.row = 2;
  this.mobileYButton.column = 0;
  this.mobileYButton.position = {
    x: 675,
    y: 275,
  };
  this.mobileAButton = new GameObject(mobileButtonsSprite);
  this.mobileAButton.row = 2;
  this.mobileAButton.column = 3;
  this.mobileAButton.position = {
    x: 800,
    y: 275,
  };

  this.arrowsAmount = new GameObject(arrowsAmountSprite);
  this.arrowsAmount.position = {
    x: 300,
    y: 0,
  };

  this.startButton = new GameObject(mainButtonsSprite);
  this.startButton.position = {
    x: 400,
    y: 325,
  };

  this.tryAgainButton = new GameObject(mainButtonsSprite);
  this.tryAgainButton.row = 1;
  this.tryAgainButton.position = {
    x: 400,
    y: 325,
  };

  this.healthbar = new GameObject(barsSprite);
  this.healthbar.column = 5;
  this.pointsbar = new GameObject(barsSprite);
  this.pointsbar.row = 1;
  this.pointsbar.position.x += this.pointsbar.frameWidth;
}
