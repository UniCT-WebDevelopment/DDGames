
class Button {

  constructor(value, x, y, width, height) {
    this.value = value;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.mouseHeld = false;
    this.mouseReleased = true;
  }

  display() {
    stroke(20);
    strokeWeight(2);
    fill(120);
    rect(this.x, this.y, this.width, this.height, 2);
    textSize(this.height/2);
    fill(255);
    text(this.value, this.x+this.width/2.8, this.y+this.height/1.5);

    if(mouseX > this.x && mouseX < this.x+this.width && mouseY > this.y && mouseY < this.y+this.height && !mouseIsPressed) {
      fill(200, 100);
      rect(this.x, this.y, this.width, this.height, 2);
    }

  }

  mousePressed() {
    if(mouseIsPressed) {
      if(mouseX > this.x && mouseX < this.x+this.width && mouseY > this.y && mouseY < this.y+this.height) {
        this.mouseHeld = true;
      }
    }
    if(!mouseIsPressed && this.mouseHeld) {
      this.mouseHeld = false;
      return true;
    }
    return false;
  }

}

const operator = {
  SUM:              0,
  SUBTRACTION:      1,
  MULTIPLICATION:   2,
  DIVISION:         3
};
class Calculator {

  constructor() {
    this.a = 0;
    this.b = 0;
    this.result = 0;
    this.screen = "0";
    this.offSet = 0;
    this.firstNumber = false;
    this.resultNumber = false;
    this.op = null;
    this.number = new Array(10);
    for(let i = 0; i < 10; i++) {
      this.number[i] = new Button((char)(i + 48), 0, 0, 100, 120);
    }
    this.number[0].x = 10; this.number[0].y = 510;
    this.number[1].x = 10; this.number[1].y = 380;
    this.number[2].x = 130; this.number[2].y = 380;
    this.number[3].x = 250; this.number[3].y = 380;
    this.number[4].x = 10; this.number[4].y = 250;
    this.number[5].x = 130; this.number[5].y = 250;
    this.number[6].x = 250; this.number[6].y = 250;
    this.number[7].x = 10; this.number[7].y = 120;
    this.number[8].x = 130; this.number[8].y = 120;
    this.number[9].x = 250; this.number[9].y = 120;

    this.point = new Button('.', 130, 510, 100, 120);
    this.equal = new Button('=', 250, 510, 100, 120);
    this.minus = new Button('-', 370, 510, 100, 120);
    this.plus = new Button('+', 370, 380, 100, 120);
    this.mult = new Button('x', 370, 250, 100, 120);
    this.div = new Button('/', 370, 120, 100, 120);
  }

  display() {
    stroke(20);
    strokeWeight(3);
    fill(0, 0, 200, 100);
    rect(30, 20, 420, 80, 5);
    fill(0);
    textSize(46);
    text(this.screen, 400 - this.offSet*25.5, 75);

    for(let i = 0; i < 10; i++) {
      this.number[i].display();
    }
    this.point.display();
    this.equal.display();
    this.minus.display();
    this.plus.display();
    this.mult.display();
    this.div.display();
  }

  checkPresses() {
    for(let i = 0; i < 10; i++) {
      if(this.number[i].mousePressed() && this.offSet < 14) {
        if(this.screen.charAt(0) == '0' && !this.screen.includes(".")) {
          this.screen = (this.number[i].value);
        }
        else {
          this.screen += this.number[i].value;
          this.offSet++;
        }
      }
    }

    if(this.point.mousePressed()) {
      if(!this.screen.includes(".")) {
        this.screen += this.point.value;
        this.offSet++;
      }
    }
    if(this.plus.mousePressed()) {
      if(!this.firstNumber) {
        this.a = parseFloat(this.screen);
        this.screen = "0";
        this.offSet = 0;
        this.firstNumber = true;
        this.op = operator.SUM;
      }
    }
    if(this.minus.mousePressed()) {
      if(!this.firstNumber) {
        this.a = parseFloat(this.screen);
        this.screen = "0";
        this.offSet = 0;
        this.firstNumber = true;
        this.op = operator.SUBTRACTION;
      }
    }
    if(this.mult.mousePressed()) {
      if(!this.firstNumber) {
        this.a = parseFloat(this.screen);
        this.screen = "0";
        this.offSet = 0;
        this.firstNumber = true;
        this.op = operator.MULTIPLICATION;
      }
    }
    if(this.div.mousePressed()) {
      if(!this.firstNumber) {
        this.a = parseFloat(this.screen);
        this.screen = "0";
        this.offSet = 0;
        this.firstNumber = true;
        this.op = operator.DIVISION;
      }
    }
    if(this.equal.mousePressed()) {
      if(this.op == null) {
        this.result = parseFloat(this.screen);
      }
      else {
        this.b = parseFloat(this.screen);
        switch(this.op) {
          case 0:   //  ADD
            this.result = this.a + this.b;
            break;
          case 1:   //  SUB
            this.result = this.a - this.b;
            break;
          case 2:   //  MULT
            this.result = this.a * this.b;
            break;
          case 3:   //  DIV
            this.result = this.a / this.b;
            break;
        }
      }
      this.resultNumber = true;
    }
  }


}

class Hangman {
  // Button keys[];
  // boolean buttons[];
  // Button retry;
  //
  // float result;
  // float offSet;
  // String screen;
  // boolean won;
  // boolean lost;
  // boolean restart = false;

  constructor() {
    this.result = null;
    this.length = null;
    this.offSet = null;
    this.screen = null;
    this.won = null;
    this.lost = null;
    this.restart = false;
    this.retry = new Button(' ', 140, 530, 200, 70);
    this.keys = new Array(11);
    this.buttons = new Array(11);
    for(let i = 0; i < 10; i++) {
      this.buttons[i] = false;
      this.keys[i] = new Button((char) (i + 48), i*40 + 20, 450, 30, 40);
    }
    this.buttons[10] = false;
    this.keys[10] = new Button('.', 10*40+20, 450, 30, 40);
  }

  display() {
    this.won = true;
    this.lost = false;

    strokeWeight(5);
    line(100, 300, 380, 300);
    line(100, 300, 100, 100);
    line(100, 150, 150, 100);
    line(100, 100, 300, 100);
    line(280, 100, 280, 140);

    this.screen = this.result.toString();
    this.offSet = this.screen.length * 14;
    this.length = this.offSet / 14;
    let count = 0;
    for(let i = 0; i < 11; i++) {
      if(i == 10) {
        if(this.buttons[10] && !this.screen.includes('.')) {
          count++;
        }
      }
      else {
        if(this.buttons[i] && !this.screen.includes(i)) {
          count++;
        }
      }
    }
    if(count >= 5) {
      this.lost = true;
    }
    noFill();
    switch(count) {
      case 5:
        line(280, 220, 290, 250);
      case 4:
        line(280, 220, 270, 250);
      case 3:
        line(280, 195, 260, 185);
        line(280, 195, 300, 185);
      case 2:
        line(280, 180, 280, 220);
      case 1:
        ellipse(280, 160, 40, 40);
    }
    for(let i = 0; i < this.length; i++) {
      strokeWeight(3);
      line(i * 30 + 240 - this.offSet, 350, i * 30 + 260 - this.offSet, 350);
      let c = this.screen.charAt(i);
      textSize(26);
      fill(0);
      if(c == '.' && this.buttons[10]) {
        text(this.screen.charAt(i), i * 30 + 243 - this.offSet, 340);
      } else
      if(this.buttons[c]) {
        text(this.screen.charAt(i), i * 30 + 243 - this.offSet, 340);
      }
      else {
        this.won = false;
      }
    }

    for(let i = 0; i < 11; i++) {
      if(!this.buttons[i])
        this.keys[i].display();
    }

    if(this.lost) {
      fill(0);
      ellipse(275, 155, 5, 5);
      ellipse(285, 155, 5, 5);
      arc(280, 170, 10, 10, -PI, 0);
      textSize(20);
      fill(0);
      text("You lost.", 200, 400);
      this.retry.display();
      fill(255);
      textSize(32);
      text("Restart", 180, 575);
      if(this.retry.mousePressed()) {
        this.restart = true;
        return;
      }
    } else {
      if(count > 0 && count < 5) {
        fill(0);
        ellipse(275, 155, 5, 5);
        ellipse(285, 155, 5, 5);
        arc(280, 165, 10, 10, 0, PI);
      }
      if(!this.won) {
        this.checkPresses();
        textSize(20);
        fill(0);
        strokeWeight(0);
        text("The answer is the calculation. Good luck.", 15, 400);
      }
      else {
        textSize(20);
        fill(0);
        strokeWeight(0);
        text("Correct!", 200, 400);
        this.retry.display();
        fill(255);
        textSize(32);
        text("Restart", 180, 575);
        if(this.retry.mousePressed()) {
          this.restart = true;
          return;
        }
      }
    }
  }

  checkPresses() {
    for(let i = 0; i < 11; i++) {
      if(this.keys[i].mousePressed()) {
        this.buttons[i] = true;
      }
    }
  }

}

var c;
var h;

function setup() {
  var cnv = createCanvas(480, 640);
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  cnv.position(x,y);
  textFont(loadFont("./data/CONSOLA.TTF"));
  c = new Calculator();
  h = new Hangman();
}

function draw() {
  background(255);
  if(!c.resultNumber) {
    c.display();
    c.checkPresses();
  }
  else {
    h.result = c.result;
    h.display();
    if(h.restart) {
      c = new Calculator();
      h = new Hangman();
    }
  }
}
