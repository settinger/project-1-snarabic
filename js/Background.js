///////////////
// Background class for a gentle scrolling azulejo pattern

class Background {
  constructor(game) {
    this.game = game;
    this.background = new Image();
    this.background.src = '../assets/bgtile2.png';
    this.backgroundpattern = false;
    this.background.addEventListener('load', () => { this.draw(); } );
    this.xPosition = 0;
    this.yPosition = 0;
    this.parallax = 2;
    this.mainMenuScrollSpeed = this.game.height/6;
    this.mainMenuScrollAngle = 70; // In degrees
  }

  // Draw function for regular gameplay: draw three repeating tiles
  draw() {
    const xArray = [this.xPosition % this.background.width,
      this.xPosition % this.background.width - this.background.width,
      this.xPosition % this.background.width - 2*this.background.width];
    for (let x of xArray ) {
      this.game.context.drawImage(this.background, x, -this.game.height/2);
    }
  }

  // Update function for main menu: pan up and slightly to the left
  mainMenuUpdate(dt) {
    this.xPosition += dt * this.mainMenuScrollSpeed * Math.cos(this.mainMenuScrollAngle/180*Math.PI);
    this.yPosition += dt * this.mainMenuScrollSpeed * Math.sin(this.mainMenuScrollAngle/180*Math.PI);
  }

  // Draw function for main menu: render a 4x4 array of tiles and then render the text
  mainMenuDraw() {
    const xArray = [this.xPosition % this.background.width + this.background.width,
      this.xPosition % this.background.width,
      this.xPosition % this.background.width - this.background.width,
      this.xPosition % this.background.width - 2*this.background.width];
    const yArray = [this.yPosition % this.background.height + this.background.height,
      this.yPosition % this.background.height,
      this.yPosition % this.background.height - this.background.height,
      this.yPosition % this.background.height - 2*this.background.height];
    for (let x of xArray) {
      for (let y of yArray) {
        this.game.context.drawImage(this.background, x, y);
      }
    }
    // Draw the title text
    // "Snarabic / Click anywhere to begin"
    // Font suggestion: https://fonts.google.com/specimen/Merienda
    this.game.context.save()
    this.game.context.textAlign = 'center';
    this.game.context.textBaseline = 'middle';
    // this.game.context.font = '80px Merienda';
    this.game.context.font = `${this.game.height/3}px Merienda`;
    this.game.context.fillText("SNARABIC", 0, -this.game.height/8);
    this.game.context.font = `${this.game.height/8}px Merienda`;;
    this.game.context.fillText("(Snake Arabic)", 0, this.game.height/12);
    // this.game.context.font = `${this.game.height/8}px Serif`;;
    // this.game.context.fillText("Press ʼalif [A] to begin", 0, 100);
    this.game.context.font = `${this.game.height/240*21}px Serif`;
    this.game.context.fillText("Press [A] for normal game, [T] for teacher, [X] for demo mode", 0, this.game.height/2.4);
    this.game.context.restore();
  }
}