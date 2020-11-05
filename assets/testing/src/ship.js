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
    this.radius = 14;
    this.frictionConstant = 0.99;
    this.collisionRadius = 11; 
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

    //determine if ship is off the screen
    this.checkIfShipOffScreen();

    //friction
    this.velY *= this.frictionConstant;
    this.velX *= this.frictionConstant;

    //update x and y positions of ship
    this.y -= this.velY;
    this.x -= this.velX;
  }

  checkIfShipOffScreen() {
    if (this.x < 0) {
      this.x = canvasWidth;
    }
    if (this.x > canvasWidth) {
      this.x = 0;
    }
    if (this.y > canvasHeight) {
      this.y = 0;
    }
    if (this.y < 0) {
      this.y = canvasHeight;
    }
  }

  drawShip() {
    context.strokeStyle = "white";

    //begin tracing out the shape of the ship
    context.beginPath();

    //determine the angle at each vertice of the triangular ship
    let verticeAngle = (Math.PI * 2) / 2.5; //approx. a 144 degree angle. We want the ship to have an isosceles shape
    let radians = convertAngleToRadians(this.angle);

    //move to nose of ship. Essentially move up x1 radius length from centre of triangle
    context.moveTo(
      this.x - this.radius * Math.cos(radians),
      this.y - this.radius * Math.sin(radians)
    );

    //trace a line from the nose of ship to the back of ship (right-hand side)
    context.lineTo(
      this.x - this.radius * Math.cos(verticeAngle + radians),
      this.y - this.radius * Math.sin(verticeAngle + radians)
    );

    //now move back to the nose of ship
    context.moveTo(
      this.x - this.radius * Math.cos(radians),
      this.y - this.radius * Math.sin(radians)
    );

    //trace a line from the nose of ship to the back of ship (left-hand side)
    context.lineTo(
      this.x - this.radius * Math.cos(-verticeAngle + radians),
      this.y - this.radius * Math.sin(-verticeAngle + radians)
    );

    //move back to nose of ship
    context.moveTo(
      this.x - this.radius * Math.cos(radians),
      this.y - this.radius * Math.sin(radians)
    );

    //trace a line from nose of ship to the centre of triangle. This gives the ship definition
    context.lineTo(
      this.x + Math.cos(radians) / 2,
      this.y + Math.sin(radians) / 2
    );

    //draw a small circle in centre of triangle, representing the cock-pit
    context.moveTo(this.x, this.y);
    context.arc(this.x, this.y, 3, 0, Math.PI * 2, false);

    //stroke out the entire shape
    context.stroke();
  }
}
