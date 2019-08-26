///////////////
// Target class for determining the behavior of the target
class Target {
  constructor(game) {
    this.game = game;
    this.xPosition = 0;
    this.yPosition = 0;
  }

  update(dt) {
    ;
  }

  draw() {
    const ctx = this.game.context;
    ctx.beginPath()
    ctx.arc(this.xPosition, this.yPosition, 10, 0, 2*Math.PI);
    ctx.fill();
    ctx.closePath();
  }
}