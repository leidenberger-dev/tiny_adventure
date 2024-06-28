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
    this.level = new Level1();
    this.renderer = new Renderer(this.level);
    this.isLoaded = false;
    this.gameState = "loading";
    this.gameLoopId = null; // Spielschleifen-ID initialisieren
    this.loadLevel().then(() => {
      this.isLoaded = true;
      this.gameState = "running";
      this.start();
    });
  }

  start() {
    if (this.isLoaded) {
      if (!this.gameLoopId) {
        this.gameLoopId = requestAnimationFrame(this.gameLoop);
      }
    }
  }

  gameLoop = () => {
    if (this.gameState !== "running") {
      cancelAnimationFrame(this.gameLoopId);
      this.gameLoopId = null;
      return;
    }
    this.handlePause();
    this.renderer.draw();
    this.handleNextLevel();
    this.gameLoopId = requestAnimationFrame(this.gameLoop);
  };

  async loadLevel() {
    this.gameState = "loading";
    const level = this.level;
    await level.mapData.loadJson();
    this.gameState = "running";
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
    if (this.renderer.gui.startScreen) return;
    this.level.pause = this.renderer.gui.isPause;
    if (pressedKeys.pause) {
      this.level.pause = !this.level.pause;
      this.renderer.gui.isPause = this.level.pause;
      pressedKeys.pause = false;
    }
  }

  async handleNextLevel() {
    const guiSettings = this.renderer.gui;
    if (this.level.door.doorOpen) {
      this.level = new Level2();
      this.renderer = new Renderer(this.level);
      this.renderer.gui = guiSettings;
      this.isLoaded = false;
      await this.loadLevel().then(() => {
        this.isLoaded = true;
        this.start();
      });
    }
  }
}
