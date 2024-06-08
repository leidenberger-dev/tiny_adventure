import { Level } from "./Level.js";

const levelSettings = {
  map: "./assets/img/map-background.png",
};

export class Level1 extends Level {
  constructor() {
    super(levelSettings);
  }
}
