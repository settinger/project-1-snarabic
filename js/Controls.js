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
    // Only process keypresses if the game is in a mode that expects keypresses
    if (game.target.expecting && !game.target.success) {
      if ((event.which >= 65 && event.which <= 90) || [188, 190, 192, 222].includes(event.which)) {
        // Check if event.key matches what's expected by game.target
        // If it is: remove that key from game.target.expectedKeys; if there are no more expectedKeys, report success
        // If it isn't: reset game.target.expectedKeys; update when last wrongKey was pressed
        if (event.key.toLowerCase() === game.target.expectedKeys[0]) {
          game.target.expectedKeys.shift();
          if (game.target.expectedKeys.length === 0) {
            game.target.success = true;
          }
        } else {
          game.target.expectedKeys = game.target.expected(game.target.text);
          game.target.lastWrongKey = 0;
        }
      }
    }
  }
}