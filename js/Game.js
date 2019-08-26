///////////////
// Game class for controlling game object interactions, timing, and drawing

class Game {
  constructor(canvas) {
    // First, set up the canvas and context
    this.canvas = canvas;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.context = this.canvas.getContext('2d');
    this.context.resetTransform();
    this.context.translate(this.width/2, this.height/2); // Set origin to center of canvas

    // Set up keyboard controls
    // May not be necessary for this game?

    // Set up scoring and timing
    this.score = 0;
    this.startTime = new Date();
    this.frameTimer = 0;
  }

  // Start Menu: decorative patterns and a quick explainer of the rules
  startMenu() {
    ;
  }

  // Start gameplay: reset score, reset timer, reset difficulty, reset drawing
  start() {
    this.score = 0;
    this.startTime = new Date();
    this.frameTimer = 0;

    this.snake = new Snake(this);

    this.gameLoop(0);
  }

  // Main game loop: Check time between frames, update game mechanics
  gameLoop(time) {
    let elapsed = (time - this.frameTimer) / 1000; // Time since last frame (in seconds)
    this.update(elapsed);
    this.frameTimer = time;
    window.requestAnimationFrame(t => this.gameLoop(t));  // Request next frame
  }

  // Update game: compute how far things should have moved since the last frame, draw them
  update(dt) {
    this.snake.update(dt);
    this.target.update(dt);

    let offset = 0; // DELETE THIS LINE LATER
    this.clear();
    this.draw(offset);
  }

  // Clear screen: clear all graphics before drawing new frame
  clear() {
    this.context.clearRect(-this.width/2, -this.height/2, this.width, this.height);
  }

  // Draw screen: Draw snake, target, special effects
  draw(offset) {
    this.snake.drawText();
    this.target.draw();
  }

  // Test function for examining whatever I'm working on at the moment
  testCode() {
    text = new TextProcessing(this);
    text.prepTargets();

    this.score = 0;
    this.startTime = new Date();
    this.frameTimer = 0;

    this.context.textAlign = 'center';
    this.context.textBaseline = 'middle';
    this.context.font = '40px serif';

    this.snake = new Snake(this);
    this.snake.text = "ﺔﻴﺑﺮﻌﻟﺍ"; // VSCode renders this unicode block RTL but it should be rendered LTR...
    this.snake.pathPoints.unshift([0,0,0]);
    this.target = new Target(this);
    this.target.xPosition = -200;
    this.target.yPosition = 0;
    this.snake.toTarget = this.snake.distanceToTarget();

    this.gameLoop(0);

  }
}