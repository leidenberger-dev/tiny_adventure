import { Level1 } from "../levels/level1/Level1.js";
import { Level2 } from "../levels/level2/Level2.js";
import { Level3 } from "../levels/level3/Level3.js";
import { Renderer } from "./Renderer.js";
import { pressedKeys } from "../config/keys.js";
import { handleInput } from "./inputHandler.js";
import { playSound } from "../utils/playSound.js";

export let devMode = false;

export class Game {
  static isMuted = false;
  constructor() {
    this.musicSound = null;
    this.worldSound = null;
    this.checkDevMode();
    this.input = handleInput;
    this.input();
    this.level = new Level1();
    this.renderer = new Renderer(this.level);
    this.isLoaded = false;
    this.gameState = "loading";
    this.gameLoopId = null;
    this.loadLevel().then(() => {
      this.isLoaded = true;
      this.gameState = "running";
      this.start();
    });
    this.playSound = playSound;
    this.soundsPlaying = {};
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
    this.handleLevelReset();
    this.handleMusic();
    this.handlePause();
    this.updateVolume();
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
    if (!this.level.door) return;
    const guiSettings = this.renderer.gui;
    const levels = [Level1, Level2, Level3];
    if (this.level.door.doorOpen) {
      this.level = new levels[this.level.levelNumber]();
      this.renderer = new Renderer(this.level, guiSettings);
      this.renderer.gui.pointsbar.column = 0;
      this.isLoaded = false;
      await this.loadLevel().then(() => {
        this.isLoaded = true;
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
      console.log(this.musicSound);
      this.worldSound = this.playSound("./assets/sounds/world.wav", 0.5, 1);
      this.worldSound.loop = true;
    }
  }

  updateVolume() {
    if (Game.isMuted) {
      if (this.musicSound) this.musicSound.muted = true;
      if (this.worldSound) this.worldSound.muted = true;
    } else {
      if (this.musicSound) this.musicSound.muted = false;
      if (this.worldSound) this.worldSound.muted = false;
    }
  }
}
