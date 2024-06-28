import { GameObject } from "../objects/GameObject.js";
import { Player } from "../objects/Player.js";
import {
  arrowsAmountSprite,
  barsSprite,
  boySprite,
  buttonsSprite,
  mainButtonsSprite,
  mobileButtonsSprite,
} from "../objects/sprites.js";
import { canvas, ctx } from "../config/canvas.js";

export class Gui {
  constructor() {
    this.initEvents();
    this.startScreen = false;
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

    this.startButton = new GameObject(mainButtonsSprite);
    this.startButton.position = {
      x: 550,
      y: 580,
    };
  }

  update(maxPoints) {
    this.maxPoints = maxPoints.maxPoints;
    this.levelNumber = maxPoints.levelNumber;
    this.handleCollectPoint(this.maxPoints);
    this.handlePlayerHealth();
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
    if (this.startScreen) {
      this.startButton.draw();
      return;
    }
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

  initEvents() {
    window.addEventListener("click", (e) => this.handleMouseClick(e));
    window.addEventListener("mousemove", (e) => this.handleMouseMove(e));
  }

  handleMouseClick(e) {
    const { x, y } = this.getMousePos(e);
    if (this.isMouseOverButton(x, y, this.startButton)) {
      this.onStartButtonClick();
    }
  }

  handleMouseMove(e) {
    const { x, y } = this.getMousePos(e);
    const isOverStartButton = this.isMouseOverButton(x, y, this.startButton);

    if (isOverStartButton && this.hoveredButton !== this.startButton) {
      this.hoveredButton = this.startButton;
      canvas.style.cursor = "pointer";
    } else if (!isOverStartButton && this.hoveredButton === this.startButton) {
      this.hoveredButton = null;
      canvas.style.cursor = "default";
    }
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
    console.log("click!");
    this.startScreen = false;
  }
}
