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
import { canvas, ctx } from "../config/canvas.js";
import { Game } from "./Game.js";
import { pressedKeys } from "../config/keys.js";

export class GuiManager {
  constructor() {
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
    this.initEvents();
  }

  initEvents() {
    window.addEventListener("click", (e) => this.handleMouseClick(e));
    window.addEventListener("mousemove", (e) => this.handleMouseMove(e));
    window.addEventListener("touchstart", (e) => this.handleTouchStart(e));
    window.addEventListener("touchend", (e) => this.handleTouchEnd(e));
    window.addEventListener("touchmove", (e) => this.handleTouchMove(e));
  }

  handleTouchStart(e) {
    const { x, y } = this.getTouchPos(e);
    if (this.isTouchOverButton(x, y, this.mobileLeft)) {
      this.onMobileLeftButtonTouchStart();
    }
    //right button, jump, shoot, attack
    if (this.isTouchOverButton(x, y, this.mobileRight)) {
      pressedKeys.right = true;
    }
    if (this.isTouchOverButton(x, y, this.mobileBButton)) {
      pressedKeys.up = true;
    }
    if (this.isTouchOverButton(x, y, this.mobileYButton)) {
      pressedKeys.attack = true;
    }
    if (this.isTouchOverButton(x, y, this.mobileAButton)) {
      pressedKeys.shoot = true;
    }
  }

  handleTouchMove(e) {
    const { x, y } = this.getTouchPos(e);
    if (!this.isTouchOverButton(x, y, this.mobileLeft)) {
      pressedKeys.left = false;
    }
    if (!this.isTouchOverButton(x, y, this.mobileRight)) {
      pressedKeys.right = false;
    }
  }

  handleTouchEnd(e) {
    const { x, y } = this.getTouchPos(e);
    if (this.isTouchOverButton(x, y, this.mobileLeft)) {
      this.onMobileLeftButtonTouchEnd();
    }
    if (this.isTouchOverButton(x, y, this.mobileRight)) {
      pressedKeys.right = false;
    }
    if (this.isTouchOverButton(x, y, this.mobileBButton)) {
      pressedKeys.up = false;
    }
    if (this.isTouchOverButton(x, y, this.mobileYButton)) {
      pressedKeys.attack = false;
    }
    if (this.isTouchOverButton(x, y, this.mobileAButton)) {
      pressedKeys.shoot = false;
    }
  }

  getTouchPos(e) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
      x: (e.changedTouches[0].clientX - rect.left) * scaleX,
      y: (e.changedTouches[0].clientY - rect.top) * scaleY,
    };
  }

  isTouchOverButton(touchX, touchY, button) {
    return (
      touchX >= button.position.x &&
      touchX <= button.position.x + button.frameWidth &&
      touchY >= button.position.y &&
      touchY <= button.position.y + button.frameHeight
    );
  }

  handleMouseClick(e) {
    const { x, y } = this.getMousePos(e);
    if (this.isMouseOverButton(x, y, this.startButton)) {
      if (this.startButtonActive) {
        this.onStartButtonClick();
      }
    }
    if (this.isMouseOverButton(x, y, this.soundButton)) {
      this.onSoundButtonClick();
    }
    if (this.isMouseOverButton(x, y, this.pauseButton)) {
      this.onPauseButtonClick();
    }
    if (
      this.isMouseOverButton(x, y, this.tryAgainButton) &&
      (this.player.data.health < 1 || this.isWin)
    ) {
      this.onTryAgainButtonClick();
    }
    if (this.isMouseOverButton(x, y, this.menuButton)) {
      this.onMenuButtonClick();
    }
  }

  handleMouseMove(e) {
    const { x, y } = this.getMousePos(e);
    const isOverStartButton = this.isMouseOverButton(x, y, this.startButton);
    const isOverSoundButton = this.isMouseOverButton(x, y, this.soundButton);
    const isOverPauseButton = this.isMouseOverButton(x, y, this.pauseButton);
    const isOverTryAgainButton = this.isMouseOverButton(
      x,
      y,
      this.tryAgainButton
    );

    // Logic for the Start Button
    if (
      this.startButtonActive &&
      isOverStartButton &&
      this.hoveredButton !== this.startButton
    ) {
      this.activeStartColor = this.soundButton.column;
      this.hoveredButton = this.startButton;
      canvas.style.cursor = "pointer";
      this.startButton.column = 1;
    } else if (!isOverStartButton && this.hoveredButton === this.startButton) {
      this.resetHoveredButton();
      this.startButton.column = this.activeStartColor;
    }

    // Logic for the Sound Button
    if (isOverSoundButton && this.hoveredButton !== this.soundButton) {
      this.activeSoundColor = this.soundButton.column;
      this.hoveredButton = this.soundButton;
      canvas.style.cursor = "pointer";
      this.soundButton.column = 1;
    } else if (!isOverSoundButton && this.hoveredButton === this.soundButton) {
      this.resetHoveredButton();
      this.soundButton.column = this.activeSoundColor;
    }
    if (this.startScreen) return;

    // Pause Button Logic
    if (isOverPauseButton && this.hoveredButton !== this.pauseButton) {
      this.hoveredButton = this.pauseButton;
      canvas.style.cursor = "pointer";
      this.isPauseBtnHover = true;
      this.pauseButton.column = 1;
    } else if (!isOverPauseButton && this.hoveredButton === this.pauseButton) {
      this.pauseBtnHover = false;
      this.resetHoveredButton();
      this.pauseButton.column = this.isPause ? 2 : 0;
    }

    // Menu Button Logic

    // Mobile Buttons Logic

    // Try Again Button Logic
    if (isOverTryAgainButton && (this.player.data.health < 1 || this.isWin)) {
      this.hoveredButton = this.tryAgainButton;
      canvas.style.cursor = "pointer";
      this.isTryAgainBtnHover = true;
      this.tryAgainButton.column = 1;
    } else if (
      !isOverTryAgainButton &&
      this.hoveredButton === this.tryAgainButton
    ) {
      this.resetHoveredButton();
      this.tryAgainButton.column = 0;
    }
  }

  resetHoveredButton() {
    this.hoveredButton = null;
    canvas.style.cursor = "default";
  }

  getMousePos(e) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  }

  isMouseOverButton(mouseX, mouseY, button) {
    return (
      mouseX >= button.position.x &&
      mouseX <= button.position.x + button.frameWidth &&
      mouseY >= button.position.y &&
      mouseY <= button.position.y + button.frameHeight
    );
  }

  onStartButtonClick() {
    this.startScreen = false;
    this.startButtonActive = false;
    this.hoveredButton = null;
    canvas.style.cursor = "default";
  }

  onSoundButtonClick() {
    this.soundButton.column = this.activeSoundColor === 2 ? 0 : 2;
    this.activeSoundColor = this.soundButton.column;
    Game.isMuted = !Game.isMuted;
  }

  onPauseButtonClick() {
    this.pauseButton.column = this.isPause ? 2 : 0;
    this.isPauseBtnHover = false;
    this.isPause = !this.isPause;
  }

  onTryAgainButtonClick() {
    if (this.isWin) {
      window.location.reload();
      return;
    }
    this.tryAgainClicked = true;
  }
}
