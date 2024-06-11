import { Level } from "../Level.js";

const levelSettings = {
  mapJson: "./src/levels/level1/level1.json",
  map: "./assets/img/map.png",
  background: "./assets/img/bg.png",
  startPoint: {
    x: 2500,
    y: 1220,
  },
};

export class Level1 extends Level {
  constructor() {
    super(levelSettings);
  }
}
