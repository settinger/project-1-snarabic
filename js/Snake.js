///////////////
// Snake class for determining the behavior of the snakey text

class Snake {
  constructor(game) {
    this.game = game;

    // State properties
    this.xPosition = 0; // Position of snake's head
    this.yPosition = 0; // Position of snake's head
    this.angle = 0; // Heading of the front of the snake, measured in radians, clockwise from due-right
    this.linearVelocity = 0; // Measured in pixels per second
    this.linearVelocityMultiplier = 75;
    this.rotationalVelocity = 0; // Measured in radians per second
    this.initialRotationalVelocityMultiplier = 1.5;
    this.rotationalVelocityMultiplier = this.initialRotationalVelocityMultiplier;

    // Textpath properties
    this.text = []; // The snake's body
    this.stowedText = []; // Non-target text (e.g. spaces, punctuation, numbers) that will be added to the snake after the current target is reached
    this.pathPoints = []; // Every point in this array should be of the form [x, y, heading]

    // Target properties
    this.toTarget = 0; // Distance to target when target was spawned (used to calculate speed)
  }

  // Function to compute distance between two points
  dist(p1, p2) {
    return Math.sqrt((p1[0] - p2[0])**2 + (p1[1] - p2[1])**2);
  }

  // Function to quickly get linear distance to target:
  distanceToTarget() {
    return this.dist([this.game.target.xPosition, this.game.target.yPosition], [this.xPosition, this.yPosition]);
  }

  // Function to determine if snake is at the target
  atTarget() {
    return this.distanceToTarget() < this.game.width/72;
  }

  // Function to draw a single rotated character at position (x, y)
  rotatedChar(letter, angle, x, y) {
    const ctx = this.game.context;
    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    // ctx.font = '40px NotoSansArabicRegular';
    ctx.font = `${this.game.height/6}px NotoSansArabicRegular`;
    if (this.game.vertical) {ctx.font = `${this.game.width/6}px serif`}
    ctx.translate(x, y);
    ctx.rotate(Math.PI/180 * angle);
    ctx.translate(-x, -y);
    ctx.fillText(letter, x, y);
    ctx.restore();
  }

  // Function to draw an array of characters along the snake's path
  drawText() {
    let i = 0;
    let j = 0;
    let dx = 0;
    this.game.context.font = `${this.game.height/6}px NotoSansArabicRegular`;
    for (let char of [...this.text]) {
      // Draw character using [x,y,heading] at this.pathPoints[i]
      let angle = this.pathPoints[i][2]*180/Math.PI + 180;
      let x = this.pathPoints[i][0];
      let y = this.pathPoints[i][1];
      this.rotatedChar(char, angle, x, y);
      // Speed boost: stop rendering characters when they go off the screen
      if (x > (this.game.width/2)*1.1) {
        break;
      }
      
      // Get the width of the character
      let txtMeasure = this.game.context.measureText(char);
      let charWidth = txtMeasure.width;
      // Find a point on the path that's approx. charWidth away from current point
      j = i;
      dx = 0;
      while (dx<charWidth && j<this.pathPoints.length-1) {
        dx += this.dist(this.pathPoints[j], this.pathPoints[++j]);
      }
      // Explanation of the above: After the while loop, pathpoints[j-1] should be the position of the next character
      i = j-1;
    }
  }

  // Snake update function: advance forward, compute new heading
  update(dt) {
    // Compute new linear velocity
    this.linearVelocity = this.linearVelocityMultiplier * (1.5 - 0.5*Math.cos(this.distanceToTarget() * Math.PI*2 / this.toTarget));
    if (this.game.gameOver) {this.linearVelocity = this.game.height;}
    
    // Compute new rotational velocity
    let dX = this.game.target.xPosition - this.xPosition;
    let dY = this.game.target.yPosition - this.yPosition;
    let newAngle = Math.atan2(dY, dX) - this.angle;
    // If newAngle is significantly anti-clockwise, unwrap it
    while (newAngle < -0.1) { newAngle += 2*Math.PI; }
    this.rotationalVelocity = newAngle * this.rotationalVelocityMultiplier;
    // Very slightly increase rotationalvelocitymultiplier as time goes on, to prevent infinite orbits
    this.rotationalVelocityMultiplier += 0.5*dt;

    // Advance snake a certain distance
    let dx = Math.cos(this.angle) * this.linearVelocity * dt;
    let dy = Math.sin(this.angle) * this.linearVelocity * dt;
    let dw = this.rotationalVelocity * dt;
    this.xPosition += dx;
    this.yPosition += dy;
    this.angle += dw;
    // Wrap this.angle so it stays in range [0, 2*pi)
    while (this.angle >= 2*Math.PI) {this.angle -= 2*Math.PI;}
    
    // Update array of pathPoints
    this.pathPoints.unshift([this.xPosition, this.yPosition, this.angle]);

    // Subtract this.xPosition from target and pathPoints x positions (so snake stays fixed in the center of the screen)
    let offset = this.xPosition;
    this.xPosition -= offset;
    this.game.background.xPosition -= offset/this.game.background.parallax;
    this.game.target.xPosition -= offset;
    this.pathPoints = this.pathPoints.map(x => [x[0] - offset, x[1], x[2]]);

    // Performance improvement: discard path points that are more than 2 screenwidths off-screen
    this.pathPoints = this.pathPoints.filter(p => p[0] < this.game.width*2);
  }
}
