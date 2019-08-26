///////////////
// Main script for interactions with window

window.addEventListener('load', () => loadGame());

function loadGame() {
  const $canvas = document.getElementById("game-canvas");
  const game = new Game($canvas);
  //game.startMenu();
  game.testCode();
}