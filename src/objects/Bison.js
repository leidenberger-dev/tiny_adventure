import { Enemy } from "./Enemy.js";

export class Bison extends Enemy {
  constructor(sprite, player, position) {
    super(sprite, player, position);
    this.damageBox = { x: sprite.offsetX, y: sprite.offsetY };
    this.damageBoxAttacking = { x: sprite.offsetX - 50, y: sprite.offsetY };
    this.speed = 2.5;
    this.damageAmount = 24;
  }
}
