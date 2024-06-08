import { MoveableObject } from "./MoveableObject.js";

export const boy = {
  img: "../assets/img/boy.png",
  position: {
    x: 50,
    y: 50,
  },
  frameWidth: 220,
  frameHeight: 250,
};

export class Player extends MoveableObject {}
