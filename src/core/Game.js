import { Level1 } from "../levels/level1/Level1.js";
import { Level2 } from "../levels/level2/Level2.js";
import { Renderer } from "./Renderer.js";
import { pressedKeys } from "../config/keys.js";
import { handleInput } from "./inputHandler.js";

export let devMode = false;

export class Game {
  constructor() {
    this.checkDevMode();
    this.input = handleInput;
    this.input();
    this.level = new Level2();
    this.renderer = new Renderer(this.level);
    this.isLoaded = false;
    this.loadLevel().then(() => {
      this.isLoaded = true;
      this.start();
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

  devMode() {
    let item = localStorage.getItem("devMode");
    let isDevMode = item === "true";
    localStorage.setItem("devMode", !isDevMode);
    devMode = !isDevMode;
  }

  checkDevMode() {
    let item = localStorage.getItem("devMode");
    devMode = item === "true";
  }

  handlePause() {
    if (pressedKeys.pause) {
      this.level.pause = !this.level.pause;
      pressedKeys.pause = false;
    }
  }
}
