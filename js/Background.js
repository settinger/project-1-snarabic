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
    this.parallax = 2;
  }

  draw() {
    this.game.context.drawImage(this.background , this.xPosition % this.background.width, -this.game.height/2);
    this.game.context.drawImage(this.background , this.xPosition % this.background.width - this.background.width, -this.game.height/2);
    this.game.context.drawImage(this.background , this.xPosition % this.background.width - 2*this.background.width, -this.game.height/2);
  }
}