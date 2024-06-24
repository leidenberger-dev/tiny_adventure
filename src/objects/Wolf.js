import { Enemy } from "./Enemy.js";

export class Wolf extends Enemy {
  constructor(sprite, player, position) {
    super(sprite, player, position);
    this.damageBox = { x: sprite.offsetX, y: sprite.offsetY };
    this.damageBoxAttacking = { x: sprite.offsetX - 50, y: sprite.offsetY };
    this.speed = 5;
  }
}
