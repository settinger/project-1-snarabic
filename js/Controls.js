///////////////
// Controls class for keyboard inputs

class Controls {
  constructor(game) {
    this.game = game;
    this.mainMenuListener = (e) => this.startMenuEventListener(e);
    this.gameListener = (e) => this.gameEventListener(e, this.game);
  }

  // At start menu: Listen for key "A" to start normally
  // TODO: Listen for key "L" to start with latin letters
  // TODO: Listen for key "X" for demo mode (impossible to lose)
  // TODO: Listen for key "M" for Snongol (Snake Mongol) (stretch goal)
  startMenuEventListener(event) {
    if (event.code === "KeyA") {
      this.game.start();
    }
  }

  // Within game: listen for keys A-Z and '
  gameEventListener(event, game) {
    if ((event.which >= 65 && event.which <= 90) || [188, 190, 192, 222].includes(event.which)) {
      // Check if event.key matches what's expected by game.target
    }
  }
}