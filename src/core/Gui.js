import { canvas, ctx } from "../config/canvas.js";
import { Game } from "./Game.js";
import { pressedKeys } from "../config/keys.js";
import { guiElements } from "./guiElements.js";

export class Gui {
  constructor() {
    this.startButtonActive = false;
    this.startScreen = false;
    this.touchScreen = false;
    guiElements.call(this);
    this.checkTouchScreen();
    this.initEvents();
  }

  update(maxPoints) {
    this.maxPoints = maxPoints.maxPoints;
    this.levelNumber = maxPoints.levelNumber;
    this.handleCollectPoint(this.maxPoints);
    this.handlePlayerHealth();
  }

  draw(isPause, levelNumber) {
    this.checkLandscape();
    this.isPause = isPause;
    if (!this.isPauseBtnHover) {
      this.pauseButton.column = this.isPause ? 2 : 0;
    }
    if (!this.touchScreen) {
      this.keysOverview.draw();
    }
    if (this.levelNumber > 1) {
      this.healthbar.draw();
      this.pointsbar.draw();
      this.drawPointsNumber();
      this.arrowsAmount.draw();
      this.drawArrowsNumber();
    }

    if (this.landscape) {
      this.menuButton.draw();
    }

    this.soundButton.draw();
    if (this.startScreen) {
      this.startButton.draw();
      return;
    }
    this.pauseButton.draw();
    this.drawGameOver();
    this.drawYouWin(levelNumber);
    if (this.touchScreen) {
      this.mobileLeft.draw();
      this.mobileRight.draw();
      this.mobileBButton.draw();
      this.mobileYButton.draw();
      this.mobileAButton.draw();
    }
  }

  handleCollectPoint(maxPoints) {
    const percentage = (this.player.data.points / maxPoints) * 100;
    if (percentage >= 20) this.pointsbar.column = 1;
    if (percentage >= 40) this.pointsbar.column = 2;
    if (percentage >= 60) this.pointsbar.column = 3;
    if (percentage >= 80) this.pointsbar.column = 4;
    if (percentage === 100) this.pointsbar.column = 5;
  }

  handlePlayerHealth() {
    const health = this.player.data.health;
    if (health === 100) this.healthbar.column = 5;
    if (health <= 80) this.healthbar.column = 4;
    if (health <= 60) this.healthbar.column = 3;
    if (health <= 40) this.healthbar.column = 2;
    if (health <= 20) this.healthbar.column = 1;
    if (health <= 0) this.healthbar.column = 0;
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

  drawGameOver() {
    if (this.player.data.health < 1) {
      ctx.drawImage(this.gameOverImage, 0, 0, canvas.width, canvas.height);
      this.tryAgainButton.draw();
    }
  }

  async drawYouWin(levelNumber) {
    if (levelNumber === 3 && this.player.data.points === this.maxPoints) {
      ctx.drawImage(this.youWinImage, 0, 0, canvas.width, canvas.height);
      setTimeout(() => {
        location.reload();
      }, 1000);
    }
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
      this.player.data.health < 1
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
    if (isOverTryAgainButton && this.player.data.health < 1) {
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
    this.tryAgainClicked = true;
  }

  getTryAgainStatus() {
    const wasClicked = this.tryAgainClicked;
    this.tryAgainClicked = false;
    return wasClicked;
  }
  onMobileLeftButtonTouchStart() {
    pressedKeys.left = true;
  }

  onMobileLeftButtonTouchEnd() {
    pressedKeys.left = false;
  }

  onMenuButtonClick() {
    const canvas = document.getElementById("game");
    const toggleFullScreenClass = () => {
      if (document.fullscreenElement) {
        canvas.classList.add("fullscreen-canvas");
      } else {
        canvas.classList.remove("fullscreen-canvas");
      }
    };

    // Überprüfen, ob wir bereits im Vollbildmodus sind
    if (!document.fullscreenElement) {
      if (canvas.requestFullscreen) {
        canvas.requestFullscreen().then(toggleFullScreenClass);
      } else if (canvas.mozRequestFullScreen) {
        /* Firefox */
        canvas.mozRequestFullScreen().then(toggleFullScreenClass);
      } else if (canvas.webkitRequestFullscreen) {
        /* Chrome, Safari & Opera */
        canvas.webkitRequestFullscreen().then(toggleFullScreenClass);
      } else if (canvas.msRequestFullscreen) {
        /* IE/Edge */
        canvas.msRequestFullscreen().then(toggleFullScreenClass);
      }
    } else {
      // Vollbildmodus verlassen, wenn aktiv
      if (document.exitFullscreen) {
        document.exitFullscreen().then(toggleFullScreenClass);
      } else if (document.mozCancelFullScreen) {
        /* Firefox */
        document.mozCancelFullScreen().then(toggleFullScreenClass);
      } else if (document.webkitExitFullscreen) {
        /* Chrome, Safari & Opera */
        document.webkitExitFullscreen().then(toggleFullScreenClass);
      } else if (document.msExitFullscreen) {
        /* IE/Edge */
        document.msExitFullscreen().then(toggleFullScreenClass);
      }
    }

    document.addEventListener("fullscreenchange", toggleFullScreenClass);
  }

  checkTouchScreen() {
    if (window.matchMedia("(hover: none) and (pointer: coarse)").matches) {
      this.touchScreen = true;
    }
    if (
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      navigator.msMaxTouchPoints > 0
    ) {
      this.touchScreen = true;
    }
  }

  checkLandscape() {
    if (window.matchMedia("(orientation: landscape)").matches) {
      this.landscape = true;
    } else {
      this.landscape = false;
    }
  }
}
