///////////////
// Target class for determining the behavior of the target
class Target {
  constructor(game) {
    this.game = game;
    this.xPosition = 0;
    this.yPosition = 0;
    this.text = '';
  }

  update(dt) {
    ;
  }

  draw() {
    const ctx = this.game.context;    
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = '40px serif';
    ctx.fillText(this.text, this.xPosition, this.yPosition);
    // ctx.beginPath()
    // ctx.arc(this.xPosition, this.yPosition, 10, 0, 2*Math.PI);
    // ctx.fill();
    // ctx.closePath();
  }

  setPosition(x,y) {
    this.xPosition = x;
    this.yPosition = y;
    this.game.snake.toTarget = this.game.snake.distanceToTarget();
  }
}