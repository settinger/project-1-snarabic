///////////////
// Target class for determining the behavior of the target

class Target {
  constructor(game) {
    this.game = game;
    this.xPosition = 0;
    this.yPosition = 0;
    this.dx = 0; // dx is only used for shaking the target left-right when wrong key is pressed
    this.text = ''; // The characters rendered inside the target circle
    this.expecting = false; // Whether or not the game is expecting keypresses
    this.expectedKeys = [] // The keypress(es) expected by game listener
    this.success = false; // True if user has pressed the right keys before snake reaches target
    this.lastWrongKey = 1; // Time since last wrong keypress was recorded (used to shake screen)
  }

  // Update function: Only used to calculate this.dx, to shake the target left-right if the wrong key was pressed
  update(dt) {
    if (0 < this.lastWrongKey && this.lastWrongKey <= .75) {
      this.dx = 20*Math.sin(12*Math.PI*this.lastWrongKey);
    } else {
      this.dx = 0;
    }
    this.lastWrongKey += dt;
  }

  // Draw function: Draw letter and a circle around it; red if a wrong key was pressed, green if a right key was pressed; black otherwise
  draw() {
    const ctx = this.game.context;
    ctx.save()
    // ctx.textAlign = 'center';
    // ctx.textBaseline = 'middle';
    // ctx.font = '40px NotoSansArabicRegular';
    if (this.success) {
      ctx.strokeStyle = 'green';
      ctx.fillStyle = 'green';
    } else if (0 < this.lastWrongKey && this.lastWrongKey <= .75) {
      ctx.strokeStyle = 'red';
      ctx.fillStyle = 'red';
    } else {
      ctx.strokeStyle = 'black';
      ctx.fillStyle = 'black';
    }
    ctx.fillText(this.text, this.xPosition+this.dx, this.yPosition);
    ctx.beginPath()
    ctx.arc(this.xPosition+this.dx, this.yPosition, 15, 0, 2*Math.PI);
    ctx.stroke();
    ctx.closePath();
    ctx.restore();
  }

  // Set position of new target, update snake.toTarget value (in order to compute snake speed)
  setPosition(x,y) {
    this.xPosition = x;
    this.yPosition = y;
    this.game.snake.toTarget = this.game.snake.distanceToTarget();
  }

  // Return an array of keypresses expected when a particular character is the target
  expected(string) {
    let character = string[1]; // Ignore the zero-width characters on either end of the target string
    switch (character) {
      case 'ا':       // 'alif
      case 'إ':       // 'alif
      case 'أ':       // 'alif
      case 'آ':       // 'alif
      case 'ى':       // 'alif maksura
        return ['a'];
      case 'ب':       // baa
        return ['b'];
      case 'ة':       // teh marbuta
      case 'ح':       // hah
      case 'ه':       // heh
        return ['h'];
      case 'ت':       // teh
      case 'ط':       // tah
        return ['t'];
      case 'ث':       // theh
        return ['t', 'h'];
      case 'ج':       // jim
        return ['j'];
      case 'خ':       // khah
        return ['k', 'h'];
      case 'د':       // dal
      case 'ض':       // dad
        return ['d'];
      case 'ذ':       // dhal
        return ['d', 'h'];
      case 'ر':       // reh
        return ['r'];
      case 'ز':       // zain
      case 'ظ':       // zah
        return ['z'];
      case 'س':       // sin
      case 'ص':       // sad
        return ['s'];
      case 'ش':       // shin
        return ['s', 'h']
      case 'ع':       // 'ain
        return ["'"];
      case 'غ':       // ghain
        return ['g', 'h'];
      case 'ػ':       // keheh
      case 'ؼ':       // keheh
      case 'ك':       // kaf
        return ['k'];
      case 'ف':       // feh
        return ['f'];
      case 'ق':       // qaf
        return ['q'];
      case 'ل':       // lam
        return ['l'];
      case 'م':       // mim
        return ['m'];
      case 'ن':       // nun
        return ['n'];
      case 'و':       // waw
        return ['w'];
      case 'ي':       // yeh
        return ['y'];
    }
  }
}