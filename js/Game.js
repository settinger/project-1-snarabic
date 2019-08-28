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

    // Set up scoring and timing
    this.score = 0;
    this.startTime = new Date();
    this.frameTimer = 0;

    // Set main game boolean to false (therefore, go to main menu)
    this.isInPlay = false;

    // Set up sound effects
    this.goodSound = new Audio('/assets/good.wav');
    this.badSound = new Audio('/assets/bad.wav');
  }

  // Start Menu: decorative patterns and a quick explainer of the rules
  startMenu() {
    // remove game keyboard listener
    window.removeEventListener('keydown', this.controls.gameListener);
    // add keyboard listener
    window.addEventListener('keydown', this.controls.mainMenuListener);
    this.background = new Background(this);
    this.isInPlay = false;
    this.startMenuLoop(0);
  }

  // Main menu loop: run at the beginning
  startMenuLoop(time) {
    let elapsed = (time - this.frameTimer) / 1000; // Time since last frame (in seconds)
    this.mainMenuUpdate(elapsed);
    this.frameTimer = time;
    if (!this.isInPlay) {
      window.requestAnimationFrame(t => this.startMenuLoop(t));
    }
  }

  // Start gameplay: reset score, reset timer, reset difficulty, reset drawing
  start() {
    // Set main game boolean to true
    this.isInPlay = true;
    // Remove the "Press A to start" Main Menu listener
    window.removeEventListener('keydown', this.controls.mainMenuListener);

    // Process the large block of Arabic text to get a large list of targets
    this.text = new TextProcessing(this);
    // Randomize the starting point
    let startingPointFound = false
    while (!startingPointFound) {
      let startIndex = Math.floor(Math.random() * this.text.text.length);
      if (this.text.alphabet.includes(this.text.text[startIndex])) {
        this.text.text = this.text.text.slice(startIndex) + this.text.text.slice(0, startIndex);
        startingPointFound = true;
      }
    }
    // Create the targets from the text
    this.text.prepTargets();
    
    // Draw background
    this.background = new Background(this);

    // Instantiate first target
    this.target = new Target(this);
    this.target.xPosition = -200;
    this.target.yPosition = 0;

    // Set up score and timer
    this.score = 0;
    this.startTime = new Date();
    this.frameTimer = 0;

    // I'm unsure if this actually does anything
    this.context.textAlign = 'center';
    this.context.textBaseline = 'middle';
    this.context.font = '40px NotoSansArabicRegular';
    this.context.save();

    // Instantiate Snake
    this.snake = new Snake(this);
    this.snake.text = [];

    // Start snake with length 1 and position [0, 0, 0]
    this.snake.text.unshift(this.text.targets.shift());
    this.snake.pathPoints.unshift([0,0,0]);
    this.snake.toTarget = this.snake.distanceToTarget();

    // Set text and expected keypresses at first target
    let newTargetFound = false;
    while (!newTargetFound) {
      this.target.text = this.text.targets.shift();
      if (this.text.alphabet.includes(this.target.text[1])) {
        newTargetFound = true;
      } else {
        this.snake.stowedText.unshift(this.target.text);
      }
    }
    this.target.expectedKeys = this.target.expected(this.target.text);
    this.target.expecting = true; // TODO: set this to false if we're in demo mode

    // Set up listener for keypresses
    window.addEventListener('keydown', this.controls.gameListener);

    // begin loop
    this.gameLoop(0);
  }

  // Main game loop: Check time between frames, update game mechanics
  gameLoop(time) {
    let elapsed = (time - this.frameTimer) / 1000; // Time since last frame (in seconds)
    // Clamp the update time -- If time between frames is greater than 60 ms, assume it was because the screen lost focus
    if (elapsed > 0.06) {elapsed = 0.02;}
    this.update(elapsed);
    this.frameTimer = time;
    if (this.isInPlay) {
      window.requestAnimationFrame(t => this.gameLoop(t));  // Request next frame
    }
  }

  // Update game: compute how far things should have moved since the last frame, draw them
  update(dt) {
    this.gameplayUpdate();
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
    if (this.target.expecting) {this.scoreDraw();}
  }

  // Gameplay update function: What to do when snake reaches a target
  gameplayUpdate() {
    // If snake is at target:
    if (this.snake.atTarget()) {
      // Calculate next target's position
      let randomY = this.height*Math.random() - this.height/2;
      randomY *= 0.8 // Don't let the target get too close to the top/bottom of the screen
      this.target.setPosition(-200, randomY);

      // Reset snake's rotational velocity multiplier
      this.snake.rotationalVelocityMultiplier = this.snake.initialRotationalVelocityMultiplier;

      // Check if any text was stowed before this target; add any stowed text to the snake
      while (this.snake.stowedText.length > 0) {
        this.snake.text.unshift(this.snake.stowedText.pop());
      }

      // Now, add the text from the target to the snake's head
      this.snake.text.unshift([this.target.text]);

      // Compute the next target's text
      // If invalid characters are found (e.g. punctuation, spaces), stow them
      let newTargetFound = false;
      while (!newTargetFound) {
        this.target.text = this.text.targets.shift();
        if (this.text.alphabet.includes(this.target.text[1])) {
          newTargetFound = true;
        } else {
          this.snake.stowedText.unshift(this.target.text);
        }
      }

      // Set the expected keypresses for the new target
      this.target.expectedKeys = this.target.expected(this.target.text);
      //console.log(this.target.expectedKeys);
      this.target.lastWrongKey = 1;

      // SCORING: If player pressed the target keypresses before snake reached the target, add points
      if (this.target.expecting && this.target.success) {
        this.score++;
        this.goodSound.play();
        this.target.success = false;
      } else if (this.target.expecting) {
        // If target keypresses weren't hit in time:
        this.score -= 3;
        this.badSound.play();
        if (this.score < -50) {
          // Restart game
          this.isInPlay = false;
          this.clear();
          this.startMenu();
        }
      }
      
      // SPEED UPDATE: Move faster as score increases
      this.snake.linearVelocityMultiplier = 75 + 2*this.score;
      this.snake.initialRotationalVelocityMultiplier = 1.5 * this.snake.linearVelocityMultiplier/75;
      console.log(`Speed: ${this.snake.linearVelocityMultiplier.toFixed(0)}`);
    }
  }

  // Draw current score in upper-left corner
  scoreDraw() {
    this.context.save();
    this.context.font = "20px sans-serif";
    this.context.textAlign = "left";
    this.context.textBaseline = "top"
    this.context.fillText(`SCORE: ${this.score}`, -this.width/2, -this.height/2);
    this.context.restore();
  }
}