import { Level1 } from "../levels/level1/Level1.js";
import { Level2 } from "../levels/level2/Level2.js";
import { Level3 } from "../levels/level3/Level3.js";
import { Renderer } from "./Renderer.js";
import { pressedKeys } from "../config/keys.js";
import { handleInput } from "./inputHandler.js";
import { playSound } from "../utils/playSound.js";
import { preloadAssets } from "../utils/preloadAssets.js";

export let devMode = false;

export class Game {
  static isMuted = false;
  constructor() {
    this.isLoadingLevel = true;
    this.lastFrameTime = 0;
    this.targetFrameTime = 1000 / 60;
    this.checkDevMode();
    this.input = handleInput;
    this.input();
    this.level = new Level1();
    this.playSound = playSound;
    this.soundsPlaying = {};
    this.loadLevel().then(() => {
      this.renderer = new Renderer(this.level);
      this.isLoadingLevel = false;
      this.start();
    });
  }

  start() {
    this.gameLoop();
  }

  gameLoop(timestamp) {
    const deltaTime = timestamp - this.lastFrameTime;

    if (deltaTime >= this.targetFrameTime) {
      this.lastFrameTime = timestamp - (deltaTime % this.targetFrameTime);

      if (!this.isLoadingLevel) {
        this.handleLevelReset();
        this.handleMusic();
        this.handlePause();
        this.updateVolume();
        this.renderer.draw();
        this.handleNextLevel();
      }
    }

    requestAnimationFrame(this.gameLoop.bind(this));
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

  async loadLevel() {
    await this.level.mapData.loadJson();
  }

  async handleNextLevel() {
    if (this.isLoadingLevel) return;
    if (!this.level.door) return;
    const guiSettings = this.renderer.gui;
    const levels = [Level1, Level2, Level3];
    if (this.level.door.doorOpen) {
      this.isLoadingLevel = true;
      await preloadAssets();
      this.level = new levels[this.level.levelNumber]();
      this.renderer.gui.pointsbar.column = 0;
      await this.loadLevel().then(() => {
        this.renderer = new Renderer(this.level, guiSettings);
        this.isLoadingLevel = false;
        this.start();
      });
    }
  }

  async handleLevelReset() {
    if (!this.renderer.gui.getTryAgainStatus()) return;
    this.level.player.position.x = this.level.startPointX;
    this.level.player.position.y = this.level.startPointY;
    this.level.player.isLookingRight = true;
    this.level.player.animation(this.level.player.sprite.idle);
    this.level.player.data.health = 100;
    this.level.player.data.arrows = this.level.arrows;
    this.level.player.data.points = 0;
    this.renderer.gui.pointsbar.column = 0;
    this.level.player.isDead = false;
    this.level.mapData.loadJson();
    this.level.enemies.forEach((enemy) => {
      enemy.health = enemy.maxHealth;
      enemy.isDead = false;
      enemy.deleteDraw = false;
    });
  }

  handleMusic() {
    if (this.isMusicPlaying) return;
    if (this.level.isJavascriptCollected) {
      this.isMusicPlaying = true;
      this.musicSound = this.playSound("./assets/sounds/music.mp3", 0.7, 1);
      this.musicSound.loop = true;
    }
  }

  updateVolume() {
    if (Game.isMuted) {
      if (this.musicSound) this.musicSound.muted = true;
    } else {
      if (this.musicSound) this.musicSound.muted = false;
    }
  }
}
