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
    this.controls = new Controls(this);

    // Enter the Start Menu
    
    // Set up scoring and timing
    this.score = 0;
    this.startTime = new Date();
    this.frameTimer = 0;
    this.startMenuLoopTimer

    this.isRunning = false;
  }

  // Start Menu: decorative patterns and a quick explainer of the rules
  startMenu() {
    // add keyboard listener
    window.addEventListener('keydown', this.controls.mainMenuListener);
    this.background = new Background(this);
    this.startMenuLoop(0);
  }

  // Main menu loop: run at the beginning
  startMenuLoop(time) {
    let elapsed = (time - this.frameTimer) / 1000; // Time since last frame (in seconds)
    this.mainMenuUpdate(elapsed);
    this.frameTimer = time;
    if (!this.isRunning) {
      window.requestAnimationFrame(t => this.startMenuLoop(t));
    }
  }

  // Start gameplay: reset score, reset timer, reset difficulty, reset drawing
  start() {
    this.isRunning = true;
    // Remove the "Press A to start" Main Menu listener
    window.removeEventListener('keydown', this.controls.mainMenuListener);

    this.text = new TextProcessing(this);
    this.text.prepTargets();
    
    this.background = new Background(this);

    this.target = new Target(this);
    this.target.xPosition = -200;
    this.target.yPosition = 0;

    this.score = 0;
    this.startTime = new Date();
    this.frameTimer = 0;

    this.context.textAlign = 'center';
    this.context.textBaseline = 'middle';
    this.context.font = '40px NotoSansArabicRegular';

    this.snake = new Snake(this);
    this.snake.text = [];
    this.snake.text.unshift(this.text.targets.shift());
    this.snake.pathPoints.unshift([0,0,0]);
    this.snake.toTarget = this.snake.distanceToTarget();

    this.target.text = this.text.targets.shift();

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

    this.clear();
    this.draw();
  }

  // Main Menu update function: gently scroll the azulejo background
  mainMenuUpdate(dt) {
    this.background.mainMenuUpdate(dt);
    this.background.mainMenuDraw();
  }

  // Clear screen: clear all graphics before drawing new frame
  clear() {
    this.context.clearRect(-this.width/2, -this.height/2, this.width, this.height);
  }

  // Draw screen: Draw snake, target, special effects
  draw() {
    // Draw background
    this.background.draw();
    this.snake.drawText();
    this.target.draw();
  }
}