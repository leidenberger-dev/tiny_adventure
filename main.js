import { setupCanvas } from "./src/config/canvas.js";
import { Game } from "./src/core/Game.js";

document.addEventListener("DOMContentLoaded", () => {
  setupCanvas();
  const game = new Game();
  window.devMode = game.devMode.bind(game);
});
