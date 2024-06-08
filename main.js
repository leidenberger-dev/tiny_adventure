import { setupCanvas } from "./src/config/canvas.js";
import { Game } from "./src/core/Game.js";

const game = new Game();

document.addEventListener("DOMContentLoaded", () => {
  setupCanvas();
  game.start();
});
