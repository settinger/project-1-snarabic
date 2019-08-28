////////
// Totally mundane stuff, definitely not a secret vertical game for learning old Mongol script

class Snongol {
  constructor(game) {
    this.game = game;
    this.game.target = new Target(this.game);
    this.game.text = new TextProcessing(this.game);
  }

  mainMenu() {
    // remove game keyboard listener
    window.removeEventListener('keydown', this.game.controls.gameListener);
    // remove keyboard listener (sorry, if you want to get back to Snarabic mode, you have to refresh the page)
    window.removeEventListener('keydown', this.game.controls.mainMenuListener);
    // this.background = new Background(this);
    this.game.isInPlay = false;
    this.game.vertical = true;
    this.menuTimer = 0;
    this.startMenuLoop(0);
  }

  startMenuLoop(time) {
    let elapsed = (time - this.game.frameTimer) / 1000; // Time since last frame (in seconds)
    this.mainMenuUpdate(elapsed);
    this.game.frameTimer = time;

    // If we've been on the start menu for five seconds, automatically enter Mongol gameplay mode
    this.menuTimer += elapsed;
    if (this.menuTimer >= 5) {
      this.game.isInPlay = true;
      this.start();
    }

    if (!this.game.isInPlay) {
      window.requestAnimationFrame(t => this.startMenuLoop(t));
    }
  }

  mainMenuUpdate(dt) {
    this.clear();
    this.game.context.save()
    this.game.context.textAlign = 'center';
    this.game.context.textBaseline = 'middle';
    this.game.context.font = '80px Merienda';
    this.game.context.fillText("SNONGOL", 0, -30);
    this.game.context.font = "30px Merienda";
    this.game.context.fillText("(Snake Mongol)", 0, 20);
    this.game.context.font = "30px serif";
    this.game.context.fillText("oh gosh oh no what is happening", 0, 100);
    // this.game.context.fillText("Press A to begin", 0, 100);
    this.game.context.restore();
  }

  clear() {
    this.game.context.clearRect(-this.game.height/2, -this.game.width/2, this.game.height, this.game.width);
  }

  start() {
    // Process the large block of Mongol text to get a large list of targets
    this.game.text.text = `ᠦᠨᠳᠦᠰᠦᠲᠡᠨ ᠨᠦᠭᠦᠳ ᠦᠨ ᠬᠣᠯᠪᠣᠭᠠᠨ ᠤ ᠠᠦᠢᠰᠲᠷᠠᠯᠢᠶ᠎ᠠ ᠤᠯᠤᠰ ᠨᠢ ᠠᠦᠢᠰᠲᠷᠠᠯᠢᠶ᠎ᠠ ᠶᠢᠨ ᠡᠬᠡ ᠭᠠᠵᠠᠷ ᠢ ᠬᠠᠮᠤᠷᠤᠨ ᠣᠷᠣᠰᠢᠳᠠᠭ᠂ ᠣᠯᠠᠨ ᠲᠣᠭᠠᠨ ᠤ ᠵᠢᠵᠢᠭ ᠠᠷᠠᠯ ᠤᠳ ᠲᠠᠢ ᠤᠯᠤᠰ ᠶᠤᠮ᠃ ᠡᠳᠡᠭᠡᠷ ᠡᠴᠡ ᠬᠠᠮᠤᠭ ᠤᠨ ᠲᠣᠮᠣ ᠨᠢ ᠲᠠᠰᠠᠮᠠᠨ᠎ᠠ ᠶᠢᠨ ᠠᠷᠠᠯ ᠪᠢᠯᠡ᠃ ᠠᠦᠢᠰᠲᠷᠠᠯᠢᠶ᠎ᠠ ᠨᠢ ᠭᠠᠵᠠᠷ ᠨᠤᠲᠤᠭ ᠤᠨ ᠢᠶᠠᠨ ᠬᠡᠮᠵᠢᠶ᠎ᠡ ᠪᠡᠷ ᠳᠡᠯᠡᠬᠡᠢ ᠳᠦ ᠵᠢᠷᠭᠤᠭᠠᠳᠤᠭᠠᠷ ᠪᠠᠶᠢᠷᠢ ᠳᠤ ᠣᠷᠣᠳᠠᠭ᠃ ᠬᠣᠶᠢᠳ ᠲᠠᠯ᠎ᠠ ᠪᠠᠷ ᠢᠶᠠᠨ ᠵᠡᠭᠦᠨ ᠲᠢᠮᠣᠷ᠂ ᠢᠨᠳᠥᠶᠢᠨᠧᠽᠢ᠂ ᠫᠠᠫᠦᠠ ᠰᠢᠨ᠎ᠡ ᠭᠸᠢᠨᠧᠢ ᠲᠡᠢ᠂ ᠵᠡᠭᠦᠨ-ᠬᠣᠶᠢᠳ ᠲᠠᠯ᠎ᠠ ᠪᠠᠷ ᠢᠶᠠᠨ ᠰᠣᠯᠣᠮᠣᠨ ᠤ ᠠᠷᠠᠯ ᠤᠳ᠂ ᠸᠠᠩᠠᠲᠤ ᠲᠠᠢ᠂ ᠵᠡᠭᠦᠨ-ᠡᠮᠦᠨᠡᠲᠦ ᠲᠠᠯ᠎ᠠ ᠪᠠᠷ ᠢᠶᠠᠨ ᠰᠢᠨ᠎ᠡ ᠽᠧᠯᠠᠨ᠋ᠳ᠋ ᠍ ᠲᠠᠢ ᠬᠥᠷᠰᠢ᠃ ᠨᠡᠶᠢᠰᠯᠡᠯ ᠬᠣᠲᠠ ᠶᠢ ᠨᠢ ᠺᠠᠨᠪᠧᠷᠷᠠ᠂ ᠬᠠᠮᠤᠭ ᠤᠨ ᠲᠣᠮᠣ ᠬᠣᠲᠠ ᠨᠢ ᠰᠢᠳᠡᠨᠢ᠃  ᠪᠷᠢᠲ᠋ᠠᠩ ᠤᠨ ᠡᠵᠡᠯᠡᠨ ᠲᠦᠷᠢᠮᠡᠭᠡᠶᠢᠯᠡᠭᠴᠢᠳ ᠢᠷᠡᠬᠦ ᠡᠴᠡ ᠡᠮᠦᠨ᠎ᠡ 50 ᠮᠢᠩᠭᠠᠨ ᠵᠢᠯ ᠦᠨ ᠲᠡᠷᠲᠡᠭᠡ ᠡᠴᠡ ᠡᠨᠳᠡ ᠬᠦᠮᠦᠨ ᠠᠩᠬ᠎ᠠ ᠰᠠᠭᠤᠷᠢᠰᠢᠵᠤ ᠡᠬᠢᠯᠡᠵᠡᠢ᠃ ᠬᠠᠷᠢᠨ 18 ᠍ ᠳᠦᠭᠡᠷ ᠵᠠᠭᠤᠨ ᠤ ᠰᠡᠭᠦᠯᠴᠢ ᠪᠡᠷ ᠠᠦᠢᠰᠲᠷᠠᠯᠢᠶ᠎ᠠ ᠶᠢ ᠪᠷᠢᠲ᠋ᠠᠨᠢᠴᠤᠤᠳ ᠪᠦᠷᠢᠨ ᠡᠵᠡᠯᠡᠭᠰᠡᠨ ᠶᠤᠮ᠃ ᠠᠭᠤᠭᠤᠯ ᠠᠦᠢᠰᠲᠷᠠᠯᠢᠴᠢ ᠨᠤᠭᠤᠳ ᠢ ᠠᠪᠧᠷᠭᠢᠨ ᠭᠡᠳᠡᠭ ᠪᠥᠭᠡᠳ ᠨᠡᠶᠢᠲᠡ 250 ᠭᠠᠷᠤᠢ ᠣᠪᠤᠭ᠂ ᠠᠶᠢᠮᠠᠭ ᠪᠤᠢ᠃ ᠠᠦᠢᠰᠲᠷᠠᠯᠢᠶ᠎ᠠ ᠲᠢᠪ ᠢ 1606 ᠣᠨ ᠳᠤ ᠭᠣᠯᠯᠠᠨ᠋ᠳ᠋ ᠍ ᠤᠨ ᠠᠶᠠᠯᠠᠭᠴᠢᠳ ᠠᠩᠬ᠎ᠠ ᠢᠯᠡᠷᠡᠭᠦᠯᠦᠭᠰᠡᠨ ᠪᠥᠭᠡᠳ ᠵᠡᠭᠦᠨ ᠠᠦᠢᠰᠲᠷᠠᠯᠢᠶ᠎ᠠ ᠶᠢᠨ ᠲᠠᠯ᠎ᠠ ᠬᠡᠰᠡᠭ ᠢ 1770 ᠣᠨ ᠳᠤ ᠪᠷᠢᠲ᠋ᠠᠨᠢᠴᠤᠤᠳ ᠡᠵᠡᠯᠡᠭᠰᠡᠨ ᠢᠶᠡᠷ ᠲᠤᠰ ᠤᠯᠤᠰ ᠠᠦᠢᠰᠲᠷᠠᠯᠢᠶ᠎ᠠ ᠶᠢ ᠪᠦᠷᠢᠨ ᠵᠠᠬᠢᠷᠬᠤ ᠪᠣᠯᠤᠭᠰᠠᠨ ᠪᠢᠯᠡ᠃ 1850 ᠍ ᠊ᠭᠠᠳ ᠣᠨ ᠳᠤ ᠠᠦᠢᠰᠲᠷᠠᠯᠢᠶ᠎ᠠ ᠶᠢᠨ ᠲᠠᠪᠤᠨ ᠥᠭᠡᠷ᠎ᠡ ᠭᠠᠵᠠᠷ ᠢ ᠡᠵᠡᠯᠡᠨ ᠲᠦᠷᠢᠮᠡᠭᠡᠶᠢᠯᠡᠵᠦ᠂ ᠤᠯᠠᠮ ᠢᠶᠠᠷ ᠪᠦᠷᠢᠨ ᠬᠢᠨᠠᠯᠲᠠ ᠪᠠᠨ ᠲᠣᠭᠲᠠᠭᠠᠴᠠᠢ᠃ 1901 ᠣᠨ ᠤ ᠨᠢᠭᠡᠳᠦᠭᠡᠷ ᠰᠠᠷ᠎ᠠ ᠶᠢᠨ 1 ᠍ ᠦ ᠡᠳᠦᠷ ᠠᠦᠢᠰᠲᠷᠠᠯᠢᠶ᠎ᠠ ᠶᠢᠨ ᠵᠢᠷᠭᠤᠭᠠᠨ ᠮᠤᠵᠢ ᠤᠯᠤᠰ ᠨᠢᠭᠡᠳᠦᠨ ᠤᠯᠠᠮ ᠢᠶᠠᠷ ᠦᠨᠳᠦᠰᠦᠲᠡᠨ ᠨᠦᠭᠦᠳ ᠦᠨ ᠬᠣᠯᠪᠣᠭᠠᠨ ᠤ ᠠᠦᠢᠰᠲᠷᠠᠯᠢᠶ᠎ᠠ ᠤᠯᠤᠰ ᠢ ᠵᠠᠷᠯᠠᠨ ᠲᠤᠩᠬᠠᠭᠯᠠᠰᠠ ᠶᠤᠮ᠃ ᠯᠢᠪᠧᠷᠠᠯ ᠠᠷᠠᠳᠴᠢᠯᠠᠭᠰᠠᠨ ᠦᠵᠡᠯ ᠪᠠᠷᠢᠮᠲᠠᠯᠠᠯ ᠢᠶᠠᠷ ᠵᠠᠮᠨᠠᠵᠤ ᠪᠠᠶᠢᠭ᠎ᠠ ᠠᠦᠢᠰᠲᠷᠠᠯᠢᠶ᠎ᠠ ᠤᠯᠤᠰ ᠨᠢ ᠬᠣᠯᠪᠣᠭᠠᠨ ᠤ ᠫᠠᠷᠯᠠᠮᠧᠨᠲ ᠤᠨ ᠰᠢᠰᠲ᠋ᠧᠮ ᠪᠦᠬᠦᠢ ᠦᠨᠳᠦᠰᠦᠨ ᠬᠠᠤᠯᠢ ᠬᠠᠭᠠᠨ ᠳᠤ ᠵᠠᠰᠠᠭᠯᠠᠯ ᠲᠠᠢ᠃ ᠵᠢᠷᠭᠤᠭᠠᠨ ᠮᠤᠵᠢ᠂ ᠬᠠᠷᠢᠶ᠎ᠠ ᠣᠯᠠᠨ ᠭᠠᠵᠠᠷ ᠨᠤᠲᠤᠭ ᠲᠤ ᠨᠡᠶᠢᠲᠡ 24 ᠰᠠᠶ᠎ᠠ ᠬᠦᠮᠦᠨ ᠣᠳᠣ ᠶᠢᠨ ᠪᠠᠶᠢᠳᠠᠯ ᠢᠶᠠᠷ ᠠᠵᠢᠯᠯᠠᠵᠤ ᠪᠠᠶᠢᠨ᠎ᠠ᠃ ᠠᠦᠢᠰᠲᠷᠠᠯᠢᠶ᠎ᠠ ᠶᠢᠨ ᠵᠡᠭᠦᠨ ᠡᠷᠭᠢ ᠳᠠᠭᠠᠤ ᠬᠦᠮᠦᠨ ᠠᠮᠠ ᠶᠡᠬᠡ ᠪᠡᠷ ᠲᠥᠪᠯᠡᠷᠡᠵᠦ᠂ ᠬᠣᠲᠠᠵᠢᠯᠲᠠ ᠡᠭᠦᠰᠬᠡᠭᠰᠡᠨ ᠪᠠᠶᠢᠳᠠᠭ᠃ ᠠᠦᠢᠰᠲᠷᠠᠯᠢᠶ᠎ᠠ ᠨᠢ ᠡᠳ᠋ ᠍ ᠦᠨ ᠵᠠᠰᠠᠭ ᠤᠨ ᠪᠠᠭᠲᠠᠭᠠᠮᠵᠢ ᠪᠠᠷ ᠢᠶᠠᠨ ᠳᠡᠯᠡᠬᠡᠢ ᠳᠦ 13 ᠍ ᠷᠲ᠂ ᠨᠢᠭᠡ ᠬᠦᠨᠳᠦ ᠨᠣᠭᠳᠠᠬᠤ ДНБ ᠍ ᠢᠶᠡᠷ ᠢᠶᠡᠨ ᠳᠡᠯᠡᠬᠡᠢ ᠳᠦ ᠶᠢᠰᠦᠳᠦᠭᠡᠷ ᠲᠦ᠂ ᠬᠦᠮᠦᠨ ᠦ ᠬᠥᠭᠵᠢᠯ ᠦᠨ ᠢᠨᠳᠧᠺᠰ ᠢᠶᠡᠷ ᠢᠶᠡᠨ ᠳᠡᠯᠡᠬᠡᠢ ᠳᠦ ᠬᠣᠶᠠᠳᠤᠭᠠᠷ ᠲᠤ ᠡᠷᠢᠮᠪᠡᠯᠡᠭᠳᠡᠵᠦ ᠪᠠᠶᠢᠨ᠎ᠠ᠃ ᠬᠠᠷᠢᠨ ᠠᠮᠢᠳᠤᠷᠠᠯ ᠤᠨ ᠴᠢᠨᠠᠷ᠂ ᠡᠷᠡᠭᠦᠯ ᠮᠡᠨᠳᠦ᠂ ᠪᠣᠯᠪᠠᠰᠤᠷᠠᠯ᠂ ᠡᠳ᠋ ᠍ ᠦᠨ ᠵᠠᠰᠠᠭ ᠤᠨ ᠡᠷᠬᠡ ᠴᠢᠯᠦᠭᠡ᠂ ᠢᠷᠭᠡᠨ ᠦ ᠴᠢᠯᠦᠭᠡᠲᠦ ᠦᠵᠡᠯ ᠪᠣᠯᠤᠨ ᠤᠯᠤᠰᠤᠲᠥᠶᠢᠷ ᠦᠨ ᠡᠷᠬᠡ ᠪᠡᠷ ᠢᠶᠡᠨ ᠳᠡᠯᠡᠬᠡᠢ ᠳᠦ ᠲᠡᠷᠢᠭᠦᠯᠡᠳᠡᠭ᠃ ᠲᠡᠭᠦᠨᠴᠢᠯᠡᠨ ᠨᠢᠭᠡᠳᠦᠭᠰᠡᠨ ᠦᠨᠳᠦᠰᠦᠨ ᠦ ᠪᠠᠶᠢᠭᠤᠯᠤᠯᠭ᠎ᠠ᠂ ᠶᠡᠬᠡ 20᠂ ᠦᠨᠳᠦᠰᠦᠲᠡᠨ ᠨᠦᠭᠦᠳ ᠦᠨ ᠬᠣᠯᠪᠣᠭ᠎ᠠ᠂ ᠣᠯᠠᠨ ᠤᠯᠤᠰ ᠤᠨ ᠡᠳ᠋ ᠍ ᠦᠨ ᠵᠠᠰᠠᠭ᠂ ᠬᠠᠮᠲᠤ ᠶᠢᠨ ᠠᠵᠢᠯᠯᠠᠭᠠᠨ ᠤ ᠪᠠᠶᠢᠭᠤᠯᠤᠯᠭ᠎ᠠ᠂ ᠳᠡᠯᠡᠬᠡᠢ ᠶᠢᠨ ᠬᠤᠳᠠᠯᠳᠤᠭᠠᠨ ᠤ ᠪᠠᠶᠢᠭᠤᠯᠤᠯᠭ᠎ᠠ᠂ ᠠᠽᠢᠶ᠎ᠠ-ᠨᠣᠮᠣᠬᠠᠨ ᠳᠠᠯᠠᠢ ᠶᠢᠨ ᠡᠳ᠋ ᠍ ᠦᠨ ᠵᠠᠰᠠᠭ ᠤᠨ ᠬᠠᠮᠲᠤ ᠶᠢᠨ ᠠᠵᠢᠯᠯᠠᠭᠠᠨ ᠤ ᠪᠠᠶᠢᠭᠤᠯᠤᠭᠠ᠂ ᠨᠣᠮᠣᠬᠠᠨ ᠳᠠᠯᠠᠢ ᠶᠢᠨ ᠠᠷᠠᠯ ᠤᠳ ᠤᠨ ᠹᠣᠷᠣᠮ ᠵᠡᠷᠭᠡ ᠪᠥᠰᠡ ᠨᠤᠲᠤᠭ ᠲᠡᠳᠦᠢ ᠦᠭᠡᠢ ᠳᠡᠯᠡᠬᠡᠢ ᠶᠢᠨ ᠲᠣᠮᠣᠬᠠᠨ ᠬᠠᠮᠲᠤ ᠶᠢᠨ ᠠᠵᠢᠯᠯᠠᠭᠠᠨ ᠤ ᠪᠠᠶᠢᠭᠤᠯᠤᠯᠭ᠎ᠠ ᠨᠤᠭᠤᠳ ᠲᠤ ᠭᠡᠰᠢᠭᠦᠨ ᠢᠶᠡᠷ ᠡᠯᠡᠰᠦᠨ ᠣᠷᠣᠵᠠᠢ᠃  ᠠᠦᠢᠰᠲᠷᠠᠯᠢᠶ᠎ᠠ ᠭᠡᠳᠡᠭ ᠨᠢ ᠯᠠᠲ᠋ᠢᠨ ᠬᠡᠯᠡᠨ ᠦ ᠠᠦ᠋ᠰᠲᠷᠠᠯᠢᠰ ᠪᠤᠶᠤ ᠡᠮᠦᠨᠡᠲᠦ ᠶᠢᠨ ᠭᠠᠵᠠᠷ ᠨᠤᠲᠤᠭ ᠭᠡᠰᠡᠨ ᠤᠳᠬ᠎ᠠ ᠲᠠᠢ᠃ ᠴᠤᠬᠤᠮ ᠡᠷᠲᠡᠨ ᠦ ᠰᠤᠳᠤᠷ ᠪᠢᠴᠢᠭ ᠦᠳ ᠲᠦ ᠲᠧᠷᠷᠠ ᠠᠦ᠋ᠰᠲᠷᠠᠯᠢᠰ ᠭᠡᠵᠦ ᠲᠡᠮᠳᠡᠭᠯᠡᠭᠰᠡᠨ ᠪᠠᠶᠢᠳᠠᠭ᠃ ᠰᠢᠷ ᠷᠴᠢ ᠳᠤ ᠬᠠᠺᠯᠣᠢ ᠳᠤ ᠭᠡᠭᠴᠢ 1625 ᠣᠨ ᠳᠤ ᠠᠩᠬ᠎ᠠ ᠤᠳᠤᠭ᠎ᠠ ᠪᠠᠨ ᠠᠦᠢᠰᠲᠷᠠᠯᠢᠶ᠎ᠠ ᠭᠡᠳᠡᠭ ᠨᠡᠷᠡᠰᠢᠯ ᠬᠡᠷᠡᠭᠯᠡᠭᠰᠡᠨ ᠨᠢ ᠠᠩᠭᠯᠢ ᠬᠡᠯᠡ ᠳᠦ ᠣᠷᠣᠨ ᠨᠤᠭᠤᠳ ᠲᠤ ᠲᠦᠭᠡᠨ ᠳᠡᠯᠭᠡᠷᠡᠵᠡᠢ᠃ ᠭᠣᠯᠯᠠᠨ᠋ᠳ᠋ᠴᠤᠳ ᠡᠨᠡ ᠨᠡᠷᠡᠰᠢᠯ ᠢ ᠥᠪᠡᠷ ᠦᠨ ᠬᠡᠯᠡᠨ ᠳᠦ ᠪᠠᠭᠤᠯᠭᠠᠬᠤ ᠳᠤ ᠪᠠᠨ ᠠᠦ᠋ᠰᠲᠷᠠᠯᠢᠱᠧ ᠭᠡᠵᠦ ᠪᠠᠭᠤᠯᠭᠠᠭᠰᠠᠨ ᠪᠠᠶᠢᠳᠠᠭ᠃ ᠠᠦᠢᠰᠲᠷᠠᠯᠢᠶ᠎ᠠ ᠭᠡᠳᠡᠭ ᠨᠡᠷ᠎ᠡ ᠶᠢ ᠠᠯᠪᠠᠨ ᠶᠣᠰᠣᠭᠠᠷ ᠬᠠᠤᠯᠢᠴᠢᠯᠠᠵᠤ ᠠᠰᠢᠭᠯᠠᠬᠤ ᠰᠠᠨᠠᠭᠠᠴᠢᠯᠠᠭ᠎ᠠ ᠶᠢ ᠠᠩᠬ᠎ᠠ ᠯᠣᠷ ᠲᠤ ᠪᠠᠲᠤᠬᠥᠶᠢᠷᠰ ᠲᠤ 1817 ᠣᠨ ᠤ ᠳᠥᠷᠪᠡᠳᠦᠭᠡᠷ ᠰᠠᠷ᠎ᠠ ᠶᠢᠨ 4 ᠍ ᠦ ᠡᠳᠦᠷ ᠭᠠᠷᠭᠠᠭᠰᠠᠨ ᠪᠠᠶᠢᠳᠠᠭ᠃ ᠲᠡᠭᠦᠨ ᠢ ᠰᠠᠨᠠᠯ ᠭᠠᠷᠭᠠᠭᠰᠠᠨ ᠠᠴᠠ ᠬᠣᠶᠢᠰᠢ ᠶᠡᠷᠦ ᠳᠡᠭᠡᠨ ᠨᠠᠶᠢᠮᠠᠨ ᠰᠠᠷ᠎ᠠ ᠶᠢᠨ ᠳᠠᠷᠠᠭ᠎ᠠ ᠪᠤᠶᠤ 1817 ᠣᠨ ᠤ 12 ᠍ ᠳᠦᠭᠡᠷ ᠰᠠᠷ᠎ᠠ ᠶᠢᠨ 12 ᠍ ᠤ ᠡᠳᠦᠷ ᠺᠣᠯᠣᠨᠢ ᠨᠤᠭᠤᠳ ᠤᠨ ᠲᠥᠪ ᠬᠣᠷᠢᠶ᠎ᠠ ᠠᠦᠢᠰᠲᠷᠠᠯᠢᠶ᠎ᠠ ᠨᠡᠷ᠎ᠡ ᠶᠢ ᠠᠯᠪᠠᠨ ᠶᠣᠰᠣᠨ ᠤ ᠬᠢ ᠪᠣᠯᠭᠠᠵᠠᠢ᠃ ᠬᠠᠷᠢᠨ 1824 ᠣᠨ ᠠᠴᠠ ᠭᠠᠵᠠᠷ ᠤᠨ ᠵᠢᠷᠤᠭ ᠳᠡᠭᠡᠷ᠎ᠡ ᠠᠦᠢᠰᠲᠷᠠᠯᠢᠶ᠎ᠠ ᠭᠡᠳᠡᠭ ᠨᠡᠷ᠎ᠡ ᠶᠢ ᠠᠯᠪᠠᠨ ᠶᠣᠰᠣᠭᠠᠷ ᠲᠠᠯᠪᠢᠵᠤ ᠡᠬᠢᠯᠡᠭᠰᠡᠨ ᠪᠠᠶᠢᠨ᠎ᠠ᠃ ᠭᠣᠯᠯᠠᠨ᠋ᠳ᠋ ᠲᠡᠮᠳᠡᠭ ᠨᠡᠷ᠎ᠡ ᠶᠢᠨ ᠬᠡᠯᠪᠡᠷᠢ ᠪᠣᠯᠬᠤ ᠬᠡᠮᠡᠬᠦ ᠦᠭᠡ ᠶᠢ ᠠᠩᠬ᠎ᠠ ᠪᠠᠲᠠᠪᠢᠶ᠎ᠠ ᠳᠤ ᠭᠣᠯᠯᠠᠨ᠋ᠳ᠋ ᠍ ᠤᠨ ᠵᠡᠭᠦᠨ ᠡᠨᠡᠳᠬᠡᠭ ᠦᠨ ᠺᠣᠮᠫᠠᠨᠢ ᠶᠢᠨ ᠠᠯᠪᠠᠨ ᠲᠤᠰᠢᠶᠠᠯᠲᠠᠨ ᠨᠤᠭᠤᠳ 1638 ᠣᠨ ᠳᠤ ᠡᠮᠦᠨ᠎ᠡ ᠵᠦᠭ ᠲᠦ ᠰᠢᠨ᠎ᠡ ᠪᠡᠷ ᠨᠡᠭᠡᠭᠡᠭᠰᠡᠨ ᠭᠠᠵᠠᠷ ᠤᠨ ᠲᠤᠬᠠᠢ ᠶᠠᠷᠢᠬᠤ ᠳᠤ ᠪᠠᠨ ᠬᠡᠷᠡᠭᠯᠡᠭᠰᠡᠨ᠃ 1676 ᠣᠨ ᠳᠤ ᠹᠷᠠᠨᠼᠢ ᠶᠢᠨ ᠵᠣᠬᠢᠶᠠᠯᠴᠢ ᠭᠠᠪᠷᠢᠶᠡᠯ ᠳᠡ ᠹᠦᠠᠨᠢᠭ᠎ᠠ ᠶᠢᠨ (ᠵᠠᠺ ᠰᠳᠦᠷ ᠨᠡᠷ᠎ᠡ ᠪᠡᠷ ᠭᠠᠷᠭᠠᠭᠰᠠᠨ) ᠪᠢᠴᠢᠭᠰᠡᠨ ᠬᠡᠮᠡᠬᠦ ᠲᠤᠭᠤᠵᠢ ᠶᠢᠨ ᠣᠷᠴᠢᠭᠤᠯᠭ᠎ᠠ ᠳᠤ ᠠᠩᠬ᠎ᠠ ᠤᠳᠠᠭ᠎ᠠ ᠭᠡᠰᠡᠨ ᠨᠡᠷ᠎ᠡ ᠶᠢ ᠬᠡᠷᠡᠭᠯᠡᠭᠰᠡᠨ. ᠠᠯᠧᠺᠰᠠᠨᠳᠧᠷ ᠳᠠᠯᠤᠷᠢᠮᠫᠯ ᠳᠠᠷᠠᠭ᠎ᠠ ᠨᠢ ᠡᠨᠡ ᠨᠡᠷ᠎ᠡ ᠶᠢ (1771) ᠬᠡᠮᠡᠬᠦ ᠪᠦᠲᠦᠭᠡᠯ ᠳᠦ ᠪᠡᠨ ᠡᠮᠦᠨᠡᠲᠦ ᠨᠣᠮᠣᠬᠠᠨ ᠳᠠᠯᠠᠢ ᠶᠢᠨ ᠪᠥᠰᠡ ᠶᠢ ᠲᠡᠷᠡ ᠴᠢᠭ ᠲᠦ ᠨᠢ ᠨᠡᠷᠡᠯᠡᠵᠦ ᠬᠡᠷᠡᠭᠯᠡᠭᠰᠡᠨ᠃ 1793 ᠣᠨ ᠳᠤ ᠵᠣᠷᠵᠢ ᠱᠣᠣ ᠪᠠ ᠰᠡᠷᠡ ᠵᠡᠮᠰ ᠰᠮᠢᠲ ᠨᠠᠷ ᠠᠰᠤᠷᠤ ᠲᠣᠮᠣ ᠠᠷᠠᠯ᠂ ᠪᠠᠷᠤᠭ ᠲᠢᠪ ᠪᠣᠯᠬᠤ ᠠᠦᠢᠰᠲᠷᠠᠯᠢᠶ᠎ᠠ᠂ ᠠᠦᠢᠰᠲᠷᠠᠯᠠᠽᠢ ᠪᠤᠶᠤ ᠰᠢᠨ᠎ᠡ ᠭᠣᠯᠯᠠᠨ᠋ᠳ᠋ ᠍ ᠤᠨ ᠲᠠᠯ᠎ᠠ ᠪᠠᠷ ᠪᠢᠴᠢᠭᠰᠡᠨ ᠨᠣᠮᠣᠨ ᠳᠤ ᠪᠠᠨ ᠪᠠᠰᠠ ᠬᠡᠷᠡᠭᠯᠡᠵᠡᠢ᠃  ᠠᠦᠢᠰᠲᠷᠠᠯᠢᠶ᠎ᠠ ᠶᠢ ᠠᠩᠬ᠎ᠠ ᠤᠳᠠᠭ᠎ᠠ ᠡᠷᠡᠭ ᠦᠨ ᠬᠢ ᠨᠢ ᠳᠠᠭᠠᠤ ᠲᠣᠭᠣᠷᠢᠵᠤ ᠠᠶᠠᠯᠠᠭᠰᠠᠨ ᠬᠦᠮᠦᠨ ᠪᠣᠯᠬᠤ ᠮᠡᠲᠦᠲᠶᠤ ᠹᠯᠤᠶᠢᠨᠳᠧᠷᠰ ᠦᠨ 1814 ᠣᠨ ᠳᠤ ᠪᠢᠴᠢᠭᠰᠡᠨ ᠬᠡᠮᠡᠬᠦ ᠪᠦᠲᠦᠭᠡᠯ ᠢᠶᠡᠷ ᠬᠡᠮᠡᠬᠦ ᠨᠡᠷ᠎ᠡ ᠠᠩᠬ᠎ᠠ ᠤᠳᠠᠭ᠎ᠠ ᠲᠦᠭᠡᠮᠡᠯ ᠪᠣᠯᠤᠭᠰᠠᠨ᠃ ᠹᠯᠤᠶᠢᠨᠳᠧᠷᠰ ᠨᠣᠮ ᠤᠨ ᠢᠶᠠᠨ ᠭᠠᠷᠴᠠᠭ ᠲᠤ ᠪᠷᠢᠲ᠋ᠠᠩ ᠤᠨ ᠲᠡᠩᠭᠢᠰ ᠦᠨ ᠴᠡᠷᠢᠭ ᠦᠨ ᠶᠠᠮᠤᠨ ᠤ ᠬᠡᠷᠡᠭᠯᠡᠳᠡᠭ ᠨᠡᠷ᠎ᠡ ᠲᠣᠮᠢᠶ᠎ᠠ ᠶᠢ ᠬᠡᠷᠡᠭᠯᠡᠭᠰᠡᠨ ᠪᠣᠯᠪᠠᠴᠤ ᠨᠣᠮᠣᠨ ᠳᠣᠲᠣᠷ᠎ᠠ ᠪᠠᠨ ᠭᠡᠰᠡᠨ ᠦᠭᠡ ᠶᠢ ᠬᠡᠷᠡᠭᠯᠡᠵᠡᠢ᠃ ᠡᠨᠡ ᠨᠣᠮ ᠶᠡᠬᠡ ᠤᠩᠰᠢᠭᠳᠠᠭᠰᠠᠨ ᠤᠴᠢᠷ ᠠᠴᠠ ᠲᠤᠬᠠᠢ ᠶᠢᠨ ᠨᠡᠷ᠎ᠡ ᠲᠣᠮᠢᠶ᠎ᠠ ᠶᠢ ᠥᠷᠭᠡᠨ ᠳᠡᠯᠭᠡᠷ ᠲᠠᠷᠬᠠᠬᠤ ᠳᠤ ᠶᠡᠬᠡᠳᠡ ᠨᠥᠯᠦᠭᠡᠯᠡᠵᠡᠢ᠃ ᠰᠢᠨ᠎ᠡ ᠡᠮᠦᠨᠡᠲᠦ ᠸᠯᠰ ᠦᠨ ᠠᠮᠪᠠᠨ ᠵᠠᠬᠢᠷᠤᠭᠴᠢ ᠯᠠᠺᠯᠠᠨ ᠮᠠᠺᠺᠦ᠋ᠷᠢ ᠠᠩᠭᠯᠢ ᠷᠤ ᠶᠠᠪᠤᠭᠤᠯᠵᠤ ᠪᠠᠶᠢᠭᠰᠠᠨ ᠢᠯᠡᠭᠡᠯᠲᠡ ᠳᠦ ᠪᠡᠨ ᠡᠨᠡ ᠦᠭᠡ ᠶᠢ ᠬᠡᠷᠡᠭᠯᠡᠬᠦ ᠪᠣᠯᠤᠭᠰᠠᠨ ᠪᠥᠭᠡᠳ 1817 ᠣᠨ ᠤ ᠠᠷᠪᠠᠨᠬᠣᠶᠠᠳᠤᠭᠠᠷ ᠰᠠᠷ᠎ᠠ ᠶᠢᠨ 12 ᠍ ᠳᠦ ᠺᠣᠯᠣᠨᠢ ᠶᠢᠨ ᠤᠳᠤᠷᠢᠳᠬᠤ ᠭᠠᠵᠠᠷ ᠲᠤ ᠡᠨᠡ ᠦᠭᠡ ᠶᠢ ᠠᠯᠪᠠᠨ ᠶᠣᠰᠣᠭᠠᠷ ᠬᠡᠷᠡᠭᠯᠡᠬᠦ ᠶᠢ ᠵᠥᠪᠯᠡᠭᠰᠡᠨ ᠪᠠᠶᠢᠨ᠎ᠠ᠃ 1824 ᠣᠨ ᠳᠤ ᠲᠡᠩᠭᠢᠰ ᠦᠨ ᠴᠡᠷᠢᠭ ᠦᠨ ᠶᠠᠮᠤ ᠲᠤᠰ ᠲᠢᠪ ᠢ ᠠᠯᠪᠠᠨ ᠶᠣᠰᠣᠭᠠᠷ ᠭᠡᠵᠦ ᠪᠠᠶᠢᠬᠤ ᠶᠢ ᠵᠥᠪᠰᠢᠶᠡᠷᠡᠴᠡᠢ᠃ ᠬᠦᠮᠦᠨ ᠦ ᠡᠪᠦᠭᠡ ᠳᠡᠭᠡᠳᠦᠰ ᠠᠦᠢᠰᠲᠷᠠᠯᠢᠶ᠎ᠠ ᠶᠢᠨ ᠭᠠᠵᠠᠷ ᠨᠤᠲᠤᠭ ᠲᠤ ᠣᠳᠣ ᠠᠴᠠ 42-48 ᠮᠢᠩᠭᠠᠨ ᠵᠢᠯ ᠦᠨ ᠲᠡᠷᠲᠡᠭᠡ ᠢᠷᠡᠭᠰᠡᠨ ᠭᠡᠵᠦ ᠦᠵᠡᠳᠡᠭ᠃ ᠲᠤᠬᠠᠢ ᠶᠢᠨ ᠦᠶ᠎ᠡ ᠳᠦ ᠵᠡᠭᠦᠨ ᠡᠮᠦᠨᠡᠲᠦ ᠠᠽᠢᠶ᠎ᠠ ᠪᠣᠯᠤᠨ ᠠᠦᠢᠰᠲᠷᠠᠯᠢᠶ᠎ᠠ ᠨᠢ ᠲᠣᠮᠣᠬᠠᠨ ᠮᠥᠰᠦᠨ ᠬᠠᠪᠲᠠᠩ ᠢᠶᠠᠷ ᠨᠡᠶᠢᠯᠡᠵᠦ ᠪᠠᠶᠢᠭᠰᠠᠨ ᠲᠤᠯᠠ ᠡᠭᠦᠪᠡᠷ ᠳᠠᠮᠵᠢᠨ ᠠᠦᠢᠰᠲᠷᠠᠯᠢᠶ᠎ᠠ ᠳᠤ ᠬᠦᠮᠦᠨ ᠰᠠᠭᠤᠷᠢᠰᠢᠵᠤ᠂ ᠨᠤᠲᠤᠭᠯᠠᠭᠰᠠᠨ ᠭᠡᠵᠦ ᠶᠡᠬᠡᠩᠬᠢ ᠡᠷᠳᠡᠮᠲᠡᠳ ᠲᠠᠭᠠᠮᠠᠭᠯᠠᠳᠠᠭ ᠪᠠᠶᠢᠨ᠎ᠠ᠃ ᠴᠤᠬᠤᠮ ᠳᠠᠭᠠᠨ ᠲᠡᠳᠡ ᠯᠠ ᠠᠭᠤᠭᠤᠯ ᠠᠦᠢᠰᠲᠷᠠᠯᠢᠴᠢ ᠨᠤᠭᠤᠳ ᠢ ᠪᠤᠢ ᠪᠣᠯᠭᠠᠭᠰᠠᠨ ᠶᠤᠮ᠃ ᠠᠭᠤᠭᠤᠯ ᠠᠦᠢᠰᠲᠷᠠᠯᠢᠴᠢ ᠨᠤᠭᠤᠳ ᠲᠩᠷᠢ ᠰᠢᠲᠦᠯᠭᠡ ᠲᠡᠢ᠂ ᠠᠨ ᠭᠥᠷ ᠢᠶᠡᠨ ᠶᠡᠬᠡ ᠬᠢᠳᠡᠭ᠂ ᠠᠷᠠᠳ ᠤᠨ ᠠᠮᠠᠨ ᠵᠣᠬᠢᠶᠠᠯ᠂ ᠦᠯᠢᠭᠡᠷ ᠶᠡᠬᠡᠬᠡᠨ ᠬᠥᠭᠵᠢᠭᠰᠡᠨ ᠪᠠᠶᠢᠳᠠᠭ᠃ ᠴᠤᠬᠤᠮ ᠡᠨᠡ ᠯᠠ ᠴᠢᠨᠠᠷ ᠢᠶᠠᠷ ᠢᠶᠠᠨ ᠠᠭᠤᠭᠤᠯ ᠠᠮᠧᠷᠢᠺᠠᠴᠤᠳ ᠪᠣᠯᠤᠨ ᠠᠽᠢᠶ᠎ᠠ ᠶᠢᠨ ᠶᠡᠬᠡᠩᠬᠢ ᠤᠯᠠᠰ ᠤᠳ ᠲᠠᠢ ᠲᠥᠰᠲᠡᠢ᠃ ᠲᠤᠰ ᠤᠯᠤᠰ ᠤᠨ ᠮᠤᠩ ᠢᠶᠠ ᠭᠣᠣᠯ ᠤᠨ ᠰᠠᠪᠠ ᠭᠠᠵᠠᠷ ᠠᠴᠠ ᠡᠷᠲᠡᠨ ᠦ ᠬᠦᠮᠦᠨ ᠦ ᠠᠷᠤᠭ ᠶᠠᠰᠤ ᠶᠡᠬᠡ ᠪᠡᠷ ᠣᠯᠳᠠᠳᠠᠭ᠃ ᠰᠡᠭᠦᠯ ᠦᠨ ᠦᠶ᠎ᠡ ᠶᠢᠨ ᠰᠤᠳᠤᠯᠭᠠᠨ ᠠᠴᠠ ᠬᠠᠷᠠᠬᠤ ᠳᠤ ᠣᠳᠣ ᠠᠴᠠ 70 ᠮᠢᠩᠭᠠᠨ ᠵᠢᠯ ᠦᠨ ᠲᠡᠷᠲᠡᠭᠡ ᠬᠦᠮᠦᠨ ᠦ ᠡᠪᠦᠭᠡ ᠳᠡᠭᠡᠳᠦᠰ ᠢᠷᠡᠵᠦ ᠰᠠᠭᠤᠷᠢᠰᠢᠭᠰᠠᠨ ᠪᠠᠶᠢᠬᠤ ᠪᠣᠯᠤᠮᠵᠢ ᠲᠠᠢ ᠠᠵᠢ᠃  1770 ᠣᠨ ᠳᠤ ᠬᠥᠯᠥᠭ ᠣᠩᠭᠣᠴᠠ ᠪᠠᠷ ᠠᠶᠠᠯᠠᠵᠤ ᠠᠦᠢᠰᠲᠷᠠᠯᠢᠶ᠎ᠠ ᠶᠢᠨ ᠭᠠᠵᠠᠷ ᠨᠤᠲᠤᠭ ᠤᠨ ᠲᠠᠯ᠎ᠠ ᠪᠠᠷ ᠳᠡᠯᠡᠬᠡᠢ ᠨᠡᠶᠢᠲᠡ ᠳᠦ ᠠᠩᠬ᠎ᠠ ᠲᠠᠨᠢᠭᠤᠯᠵᠤ᠂ ᠠᠶᠠᠯᠤᠭᠴᠢᠳ ᠢ ᠠᠩᠬᠠᠯᠠᠨ ᠢᠯᠡᠭᠡᠭᠰᠡᠨ ᠤᠯᠤᠰ ᠪᠣᠯ ᠭᠣᠯᠯᠠᠨ᠋ᠳ᠋ ᠶᠤᠮ᠃ ᠲᠡᠳᠡ 1606 ᠣᠨ ᠳᠤ ᠠᠦᠢᠰᠲᠷᠠᠯᠢᠶ᠎ᠠ ᠨᠤᠲᠤᠭ ᠲᠤ ᠬᠥᠯ ᠲᠠᠯᠪᠢᠵᠠᠢ᠃ ᠲᠡᠦᠬᠡᠨ ᠳᠦ ᠲᠡᠮᠳᠡᠭᠯᠡᠭᠰᠡᠨ ᠡᠴᠡ ᠬᠠᠷᠠᠪᠠᠯ ᠭᠣᠯᠯᠠᠨ᠋ᠳ᠋ ᠍ ᠤᠨ ᠨᠡᠷᠡᠲᠦ ᠠᠶᠠᠯᠠᠭᠴᠢ ᠸᠢᠯᠯᠧᠮ ᠶᠠᠨᠰᠴᠡᠭᠦᠨ 1606 ᠣᠨ ᠤ ᠬᠣᠶᠠᠳᠤᠭᠠᠷ ᠰᠠᠷ᠎ᠠ ᠶᠢᠨ 26 ᠍ ᠤ ᠡᠳᠦᠷ ᠢᠣᠷᠺ ᠬᠣᠰᠢᠭᠤᠨ ᠤ ᠡᠷᠭᠢ ᠳᠦ ᠠᠩᠬ᠎ᠠ ᠬᠦᠷᠴᠦ ᠣᠴᠢᠵᠠᠢ᠃ ᠲᠡᠷᠡ ᠪᠡᠷ ᠬᠣᠶᠢᠳ ᠪᠣᠯᠤᠨ ᠪᠠᠷᠠᠭᠤᠨ ᠲᠠᠯ᠎ᠠ ᠶᠢᠨ ᠡᠷᠭᠢ ᠶᠢ ᠪᠦᠲᠦᠨ ᠲᠣᠭᠣᠷᠢᠵᠤ᠂ ᠠᠩᠬᠠᠯᠠᠨ ᠪᠠᠭᠤᠭᠰᠠᠨ ᠭᠠᠵᠠᠷ ᠢᠶᠠᠨ 《ᠨᠶᠤ ᠬᠣᠯᠯᠠᠨ᠋ᠳ᠋》 ᠪᠤᠶᠤ 《ᠰᠢᠨ᠎ᠡ ᠭᠣᠯᠯᠠᠨ᠋ᠳ᠋》 ᠬᠡᠮᠡᠨ ᠨᠡᠷᠡᠯᠡᠵᠡᠢ᠃  ᠭᠣᠯᠯᠠᠨ᠋ᠳ᠋ᠴᠤᠳ ᠤᠨ ᠠᠮᠵᠢᠯᠲᠠ ᠠᠴᠠ ᠰᠢᠯᠲᠠᠭᠠᠯᠠᠨ ᠶᠡᠬᠡ ᠪᠷᠢᠲ᠋ᠠᠨᠢᠴᠤᠤᠳ ᠮᠥᠨ ᠠᠦᠢᠰᠲᠷᠠᠯᠢᠶ᠎ᠠ ᠶᠢᠨ ᠵᠦᠭ ᠬᠠᠷᠠᠭ᠎ᠠ ᠰᠤᠩᠭᠠᠵᠤ ᠡᠬᠢᠯᠡᠭᠰᠡᠨ ᠶᠤᠮ᠃ ᠠᠩᠭᠯᠢ ᠶᠢᠨ ᠠᠶᠠᠯᠠᠭᠴᠢ ᠤᠢᠯᠤᠮ ᠳᠠᠮᠫᠢᠶᠧᠷ 1688 ᠣᠨ ᠳᠤ ᠰᠢᠨ᠎ᠡ ᠭᠣᠯᠯᠠᠨ᠋ᠳ᠋ ᠍ ᠤᠨ ᠪᠠᠷᠠᠭᠤᠨ ᠬᠣᠶᠢᠳ ᠬᠡᠰᠡᠭ ᠦᠨ ᠡᠷᠭᠢ ᠳᠦ ᠬᠦᠷᠦᠭᠰᠡᠨ ᠪᠣᠯ 11 ᠵᠢᠯ ᠦᠨ ᠳᠠᠷᠠᠭ᠎ᠠ ᠪᠤᠶᠤ 1699 ᠣᠨ ᠳᠤ ᠡᠨᠡ ᠭᠠᠵᠠᠷ ᠢᠶᠠᠨ ᠳᠠᠬᠢᠨ ᠢᠷᠡᠭᠰᠡᠨ ᠪᠢᠯᠡ᠃ ᠲᠡᠷᠡ ᠪᠡᠷ ᠡᠵᠡᠨ ᠬᠠᠭᠠᠨ ᠤ ᠵᠥᠪᠯᠡᠯ ᠦᠨ ᠭᠡᠰᠢᠭᠦᠳ ᠲᠦ ᠡᠨᠡ ᠲᠠᠯ᠎ᠠ ᠪᠠᠷ ᠮᠡᠳᠡᠭᠡᠯᠡᠯ ᠥᠭᠴᠦ᠂ ᠤᠯᠠᠮ ᠢᠶᠠᠷ ᠠᠦᠢᠰᠲᠷᠠᠯᠢᠶ᠎ᠠ ᠶᠢ ᠡᠵᠡᠯᠡᠨ ᠲᠦᠷᠢᠮᠡᠭᠡᠶᠢᠯᠡᠬᠦ ᠭᠡᠰᠡᠨ ᠶᠡᠬᠡ ᠪᠷᠢᠲ᠋ᠠᠨᠢᠴᠤᠤᠳ ᠤᠨ ᠬᠦᠰᠡᠯ ᠤᠯᠠᠮ ᠳᠡᠪᠡᠷᠡᠭᠰᠡᠨ ᠶᠤᠮ᠃ 1770 ᠣᠨ ᠳᠤ ᠠᠯᠳᠠᠷᠲᠤ ᠠᠶᠠᠯᠠᠭᠴᠢ ᠵᠧᠮᠰ ᠺᠦ᠋ᠺ ᠡᠵᠡᠨ ᠬᠠᠭᠠᠨ ᠤ ᠵᠥᠪᠰᠢᠶᠡᠷᠡᠯ ᠦᠨ ᠳᠠᠭᠠᠤ ᠭᠣᠯᠯᠠᠨ᠋ᠳ᠋ᠴᠤᠳ ᠤᠨ ᠬᠦᠷ᠎ᠡ ᠭᠦᠢ ᠵᠡᠭᠦᠨ ᠡᠷᠭᠢ ᠳᠦ ᠬᠦᠷᠴᠦ ᠤᠯᠠᠮ ᠢᠶᠠᠷ ᠡᠨᠡ ᠭᠠᠵᠠᠷ ᠢ 《ᠰᠢᠨ᠎ᠡ ᠡᠮᠦᠨᠡᠲᠦ ᠤᠥᠯᠰ》 ᠭᠡᠵᠦ ᠨᠡᠷᠡᠯᠡᠭᠰᠡᠨ ᠪᠠᠶᠢᠨ᠎ᠠ᠃ `;
    
    // Randomize the starting point within the list of targets
    let startIndex = Math.floor(Math.random() * this.game.text.text.length);
    this.game.text.text = this.game.text.text.slice(startIndex) + this.game.text.text.slice(0, startIndex);
    
    // Create the targets from the text
    this.game.text.targets = [...this.game.text.text];
    // for (let char of [...this.game.text.text]) {
    //   this.game.targets.push(char)
    // }
    
    // Draw background?
    
    // Instantiate first target
    this.game.target = new Target(this.game);
    this.game.target.xPosition = -200;
    this.game.target.yPosition = 0;
    this.game.target.expecting = false;

    // Set up score and timer
    
    this.game.score = 0;
    this.game.startTime = new Date();
    this.game.frameTimer = 0;
    
    // Instantiate Snake
    this.snake = new Snake(this.game);
    this.snake.text = [];

    // Start snake with length 1 and position [0, 0, 0]
    this.snake.text.unshift(this.game.text.targets.shift());
    this.snake.pathPoints.unshift([0,0,0]);
    this.snake.toTarget = this.snake.dist([this.game.target.xPosition, this.game.target.yPosition], [this.snake.xPosition, this.snake.yPosition]);

    // Set text and expected keypresses at first target
    this.game.target.text = this.game.text.targets.shift();

    // begin loop
    this.gameLoop(0);
  }

  gameLoop(time) {
    let elapsed = (time - this.game.frameTimer) / 1000; // Time since last frame (in seconds)
    // console.log(`Snake angle (snangle) is ${this.snake.angle}`)
    this.update(elapsed);
    this.game.frameTimer = time;
    if (this.game.isInPlay && this.game.vertical) {
      window.requestAnimationFrame(t => this.gameLoop(t));  // Request next frame
    }
  }

  update(dt) {
    /////////////////// Update snake with Mongol rules
    // Update linear velocity
    this.snake.linearVelocity = this.snake.linearVelocityMultiplier * (1.5 - 0.5*Math.cos(Math.PI*2 / this.snake.toTarget * this.snake.dist([this.game.target.xPosition, this.game.target.yPosition], [this.snake.xPosition, this.snake.yPosition])));
    // Compute new rotational velocity
    let dX = this.game.target.xPosition - this.snake.xPosition;
    let dY = this.game.target.yPosition - this.snake.yPosition;
    let newAngle = Math.atan2(dY, dX) - this.snake.angle;

    // If we're on the left half of the screen (positive Y), turn clockwise
    if (this.snake.yPosition < -20) {
      // If newAngle is significantly anti-clockwise, unwrap it
      while (newAngle < -0.1) { newAngle += 2*Math.PI; }
    } else if (this.snake.yPosition > 20) {
      // If newAngle is significantly clockwise, unwrap it
      while (newAngle > 0.1) { newAngle -= 2*Math.PI; }
    }
    this.snake.rotationalVelocity = newAngle * this.snake.rotationalVelocityMultiplier;
    // Very slightly increase rotationalvelocitymultiplier as time goes on, to prevent infinite orbits
    this.snake.rotationalVelocityMultiplier += 0.5*dt;

    // Advance snake a certain distance
    let dx = Math.cos(this.snake.angle) * this.snake.linearVelocity * dt;
    let dy = Math.sin(this.snake.angle) * this.snake.linearVelocity * dt;
    let dw = this.snake.rotationalVelocity * dt;
    this.snake.xPosition += dx;
    this.snake.yPosition += dy;
    this.snake.angle += dw;
    // Wrap this.angle so it stays in range [0, 2*pi)
    while (this.snake.angle >= 2*Math.PI) {this.snake.angle -= 2*Math.PI;}
    
    // Update array of pathPoints
    this.snake.pathPoints.unshift([this.snake.xPosition, this.snake.yPosition, this.snake.angle]);

    // Subtract this.xPosition from target and pathPoints x positions (so snake stays fixed in the center of the screen)
    let offset = this.snake.xPosition;
    this.snake.xPosition -= offset;
    // this.game.background.xPosition -= offset/this.game.background.parallax;
    this.game.target.xPosition -= offset;
    this.snake.pathPoints = this.snake.pathPoints.map(x => [x[0] - offset, x[1], x[2]]);


    // If snake is at target:
    if (10 > this.snake.dist([this.game.target.xPosition, this.game.target.yPosition], [this.snake.xPosition, this.snake.yPosition])) {
      this.snake.text.unshift(this.game.target.text);
      // Calculate next target's position
      let randomY = this.game.width*Math.random() - this.game.width/2;
      randomY *= 0.8 // Don't let the target get too close to the top/bottom of the screen
      this.game.target.xPosition = -200
      this.game.target.yPosition = randomY;
      this.snake.toTarget = 200;

      // Reset snake's rotational velocity multiplier
      this.snake.rotationalVelocityMultiplier = this.snake.initialRotationalVelocityMultiplier;

      // Update text on next target
      this.game.target.text = this.game.text.targets.shift();
    }

    this.clear();
    // draw snake
    this.drawText();
    // draw target
    this.snake.rotatedChar(this.game.target.text, 180, this.game.target.xPosition, this.game.target.yPosition)
  }

  // Function to draw an array of characters along the snake's path
  drawText() {
    let i = 0;
    let j = 0;
    let dx = 0;
    this.game.context.font = '40px NotoSansMongolianRegular';
    for (let char of [...this.snake.text]) {
      // Draw character using [x,y,heading] at this.pathPoints[i]
      let angle = this.snake.pathPoints[i][2]*180/Math.PI;
      let x = this.snake.pathPoints[i][0];
      let y = this.snake.pathPoints[i][1];
      this.snake.rotatedChar(char, angle, x, y);
      // Speed boost: stop rendering characters when they go off the screen
      if (x > (this.game.height/2)*1.1) {
        break;
      }
      
      // Get the width of the character
      let txtMeasure = this.game.context.measureText(char);
      let charWidth = txtMeasure.width;
      // Find a point on the path that's approx. charWidth away from current point
      j = i;
      dx = 0;
      while (dx<charWidth && j<this.snake.pathPoints.length-1) {
        dx += this.snake.dist(this.snake.pathPoints[j], this.snake.pathPoints[++j]);
      }
      // Explanation of the above: After the while loop, pathpoints[j-1] should be the position of the next character
      i = j-1;
    }
  }

}