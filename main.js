import { setupCanvas } from "./src/config/canvas.js";
import { preloadAssets } from "./src/utils/preloadAssets.js";
import { Game } from "./src/core/Game.js";

document.addEventListener("DOMContentLoaded", () => {
  setupCanvas();
  preloadAssets()
    .then(() => {
      const game = new Game();
      window.devMode = game.devMode.bind(game);
    })
    .catch((error) => {
      console.error("Fehler beim Vorladen der Assets", error);
    });
});
