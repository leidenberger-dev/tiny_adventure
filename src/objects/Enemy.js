import { MoveableObject } from "./MoveableObject.js";

export class Enemy extends MoveableObject {
  constructor(sprite, player, position) {
    super(sprite, player);
    this.position = position;
    this.healthBarPosition = {
      x: this.position.x,
      y: this.position.y,
      width: 200,
      height: 40,
      barOffsetY: -5,
      barHeight: 18,
    };

    this.maxHealth = 100;
    this.health = this.maxHealth;
    this.hasTakenDamage = false;
    this.damageAmount = 30;
    this.isDead = false;
    this.deleteDraw = false;
    this.walkRoute = position.walkRoute;
    this.walkDistance = 0;
    this.idleTime = 0;
    this.state = "walking";
    this.canAttack = false;
    this.lastAttackTime = 0;
  }

  update() {
    this.switchState();
    this.detectCollision();
    this.detectCollisionWithPlayerHead();
    this.attacking();
    this.takeDamage();
    if (!this.player.isAttacking) {
      this.hasTakenDamage = false;
    }
  }

  switchState() {
    if (this.canAttack) {
      return;
    }
    if (!this.isDead) {
      switch (this.state) {
        case "walking":
          this.handleWalkingState();
          break;
        case "idle":
          this.handleIdleState();
          break;
        case "changingOrientation":
          this.changeOrientation();
          break;
      }
    } else {
      this.handleDeathAnimation();
    }
  }

  handleWalkingState() {
    this.animation(this.sprite.walk);
    if (this.isLookingRight) {
      this.moveRight();
    } else {
      this.moveLeft();
    }
    this.walkDistance += 1;

    if (this.walkDistance >= this.walkRoute) {
      this.walkDistance = 0;
      this.state = "idle";
    }
  }

  handleIdleState() {
    this.idleState();
    this.idleTime += 1;

    if (this.idleTime >= 60) {
      this.idleTime = 0;
      this.state = "changingOrientation";
    }
  }

  changeOrientation() {
    this.isLookingRight = !this.isLookingRight;
    this.state = "walking";
  }

  handleDeathAnimation() {
    if (this.column < this.sprite.dead.maxColumns - 1) {
      this.animation(this.sprite.dead);
    } else {
      if (this.deleteDraw) {
        this.column = this.sprite.dead.maxColumns;
        return;
      }
      this.animation(this.sprite.dead);
      this.column = this.sprite.dead.maxColumns - 1;
      setTimeout(() => {
        this.deleteDraw = true;
      }, 2000);
    }
  }

  drawWithWalkRoute() {
    this.drawCorrectOrientation();
  }

  idleState() {
    this.animation(this.sprite.idle);
    this.offsetX = this.damageBox.x;
  }

  drawCorrectOrientation() {
    this.drawHealthBar();
    if (this.isLookingRight) {
      this.draw();
    } else {
      this.drawMirrored();
    }
  }

  detectCollision() {
    if (
      this.collisionDetector.isCollision(
        this.player.getBounds(),
        this.getBounds()
      )
    ) {
      this.collision = true;
    } else {
      this.collision = false;
    }
  }

  detectCollisionWithPlayerHead() {
    const now = Date.now();
    if (now - this.lastAttackTime < 1000 || this.isDead) {
      return;
    }
    if (
      this.collisionDetector.isCollisionWithPlayerHead(
        this.getBounds(),
        this.player.getBounds(),
        this.isLookingRight
      )
    ) {
      this.canAttack = true;
      this.lastAttackTime = now;
    } else {
      this.canAttack = false;
    }
  }

  takeDamage(shoot) {
    if (shoot) {
      this.health -= this.damageAmount;
      this.hasTakenDamage = true;
      if (this.health < 0) {
        this.health = 0;
        this.isDead = true;
      }
    }
    if (this.collision && this.player.isAttacking && !this.hasTakenDamage) {
      this.health -= this.damageAmount;
      this.hasTakenDamage = true;
      if (this.health < 0) {
        this.health = 0;
        this.isDead = true;
      }
    }
  }

  drawHealthBar() {
    const offsetX = 50;
    if (this.isDead) {
      return;
    }
    // Hintergrund der Lebensleiste zeichnen
    this.ctx.fillStyle = "gray";
    this.ctx.fillRect(
      this.position.x + offsetX,
      this.position.y + this.healthBarPosition.barOffsetY,
      this.healthBarPosition.width,
      this.healthBarPosition.barHeight
    );

    // Farbe der Lebensleiste je nach verbleibender Gesundheit anpassen
    let healthPercentage = this.health / this.maxHealth;
    let color = this.getColorForPercentage(healthPercentage);

    this.ctx.fillStyle = color;
    let barWidth = this.healthBarPosition.width * healthPercentage;
    this.ctx.fillRect(
      this.position.x + offsetX,
      this.position.y + this.healthBarPosition.barOffsetY,
      barWidth,
      this.healthBarPosition.barHeight
    );
  }

  getColorForPercentage(percentage) {
    // Je nach prozentualem Wert der Lebensleiste eine passende Farbe wählen
    if (percentage > 0.5) {
      return "green"; // Grün, wenn mehr als 50% Gesundheit übrig
    } else if (percentage > 0.2) {
      return "yellow"; // Gelb, wenn mehr als 20% Gesundheit übrig
    } else {
      return "red"; // Rot, wenn weniger als 20% Gesundheit übrig
    }
  }

  attacking() {
    if (!this.canAttack) {
      return;
    }
    if (this.column < this.spriteState.maxColumns - 1) {
      this.animation(this.sprite.attack);
      if (this.column === this.spriteState.maxColumns - 3) {
        this.player.setTakeDamage();
      }
    } else {
      this.canAttack = false;
      this.switchState();
    }
  }
}
