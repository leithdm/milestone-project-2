class Ship {
  constructor() {
    this.visible = true;
    this.movingForward = false;
    this.x = canvasWidth / 2;
    this.y = canvasHeight / 2;
    this.speed = 0.1;
    this.rotationSpeed = 5;
    this.angle = 90;
    this.velX = 0;
    this.velY = 0;
  }

  rotate(direction) {
    //direction = 1 for right, and -1 for left
    this.angle += this.rotationSpeed * direction;
  }

  updateShip() {
    let radians = convertAngleToRadians(this.angle);
    if (this.movingForward) {
        this.velX += Math.cos(radians) * this.speed; 
        this.velY += Math.sin(radians) * this.speed; 
    }
  }
}