import { canvas, ctx } from "../config/canvas.js";
import { Game } from "./Game.js";
import { pressedKeys } from "../config/keys.js";
import { GuiManager } from "./GuiManager.js";

export class Gui extends GuiManager {
  constructor() {
    super();
    this.startButtonActive = false;
    this.startScreen = false;
    this.touchScreen = false;
    this.checkTouchScreen();
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

    if (this.landscape && this.touchScreen) {
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

    if (this.isPause) {
      this.drawPaused();
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
    ctx.font = `bold 25px "Comic Sans MS"`;
    ctx.fillStyle = "white";
    ctx.fillText(this.player.data.arrows, 342.5, 33.5);
    ctx.strokeStyle = "black";
    ctx.lineWidth = 1.5;
    ctx.strokeText(this.player.data.arrows, 342.5, 33.5);
  }

  drawPointsNumber() {
    ctx.font = `bold 25px "Comic Sans MS"`;
    ctx.fillStyle = "white";
    ctx.fillText(this.player.data.points, 230, 33.5);
    ctx.strokeStyle = "black";
    ctx.lineWidth = 1.5;
    ctx.strokeText(this.player.data.points, 230, 33.5);
  }

  drawPaused() {
    ctx.font = `bold 25px "Comic Sans MS"`;
    ctx.fillStyle = "white";
    ctx.fillText("Paused", 380, 200);
    ctx.strokeStyle = "black";
    ctx.lineWidth = 1.5;
    ctx.strokeText("Paused", 380, 200);
  }

  drawGameOver() {
    if (this.player.data.health < 1) {
      ctx.drawImage(this.gameOverImage, 0, 0, canvas.width, canvas.height);
      this.tryAgainButton.draw();
    }
  }

  drawYouWin(levelNumber) {
    if (levelNumber === 3 && this.player.data.points === this.maxPoints) {
      ctx.drawImage(this.youWinImage, 0, 0, canvas.width, canvas.height);
      this.tryAgainButton.draw();
      this.isWin = true;
    }
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

  drawTurnDevice() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = `bold 25px "Comic Sans MS"`;
    ctx.fillStyle = "white";
    ctx.fillText("Please turn your device", 320, 200);
    ctx.strokeStyle = "black";
    ctx.lineWidth = 1.5;
    ctx.strokeText("Please turn your device ", 320, 200);
  }
}
