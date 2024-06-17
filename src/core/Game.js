import { Level1 } from "../levels/level1/Level1.js";
import { Renderer } from "./Renderer.js";
import { pressedKeys } from "../config/keys.js";
import { handleInput } from "./inputHandler.js";

export class Game {
  constructor() {
    this.input = handleInput;
    this.input();
    this.level = new Level1();
    this.renderer = new Renderer(this.level);
    this.isLoaded = false;
    this.loadLevel().then(() => {
      this.isLoaded = true;
      this.start();
      this.drawOnceAndPause();
    });
  }

  start() {
    if (this.isLoaded) {
      this.gameLoop();
    }
  }

  gameLoop = () => {
    this.handlePause();
    this.renderer.draw();
    requestAnimationFrame(this.gameLoop);
  };

  async loadLevel() {
    const level = this.level;
    await level.mapData.loadJson();
    return level;
  }

  drawOnceAndPause() {
    this.renderer.draw();
    this.level.pause = true;
  }

  devMode() {
    this.level.setDevMode();
  }

  handlePause() {
    if (pressedKeys.pause) {
      this.level.pause = !this.level.pause;
      pressedKeys.pause = false;
    }
  }
}
