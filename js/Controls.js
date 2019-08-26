///////////////
// Controls class for keyboard inputs

class Controls {
  constructor(game) {
    this.game = game;
    this.mainMenuListener = (e) => this.startMenuEventListener(e);
  }

  startMenuEventListener(event) {
    if (event.code === "KeyA") {
      this.game.start();
      console.dir(this.game.snake);
    }
  }
}