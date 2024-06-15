import { Level1 } from "../levels/level1/Level1.js";
import { Renderer } from "./Renderer.js";

export class Game {
  constructor() {
    this.level = new Level1();
    this.renderer = new Renderer(this.level);
    this.isLoaded = false;
    this.loadLevel().then(() => {
      this.isLoaded = true;
      this.start();
    });
  }

  start() {
    this.gameLoop();
  }

  gameLoop = () => {
    if (!this.isLoaded) return;
    this.renderer.draw();
    requestAnimationFrame(this.gameLoop);
  };

  async loadLevel() {
    // Erstelle eine Instanz des Levels, z.B. Level1
    const level = this.level;

    // Lade die JSON-Daten für die Karte
    await level.mapData.loadJson();

    // Initialisiere zusätzliche Level-spezifische Einstellungen oder Objekte
    // Dies könnte beispielsweise das Setzen des Spielers an den Startpunkt umfassen
    // oder das Initialisieren von Gegnern, falls erforderlich

    // Setze das aktuelle Level im Spiel
    // Dies könnte bedeuten, dass das Level-Objekt an die Game-Klasse übergeben wird
    // oder dass es global oder in einem Zustandsmanager gespeichert wird

    return level; // Rückgabe des geladenen Levels
  }

  devMode() {
    this.level.setDevModeTrue();
  }
}
