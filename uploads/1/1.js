class Button {

  constructor(_x, _y, _w, _h) {
    this.x = _x;
    this.y = _y;
    this.w = _w;
    this.h = _h;
  }

  display() {
    fill(255, 149, 79);
    stroke(215, 86, 0);
    strokeWeight(5);
    rect(this.x, this.y, this.w, this.h);
    strokeWeight(0);
  }
}

class Exit extends Button {

    constructor(_x, _y, _w, _h) {
    super(_x, _y, _w, _h);
  }

  display() {
    super.display();
    fill(255);
    textSize(32);
    text("Exit", c.x+30, c.y+35);
  }

 checkMouse() {
    if ((mouseX > this.x) && (mouseX <= this.x+110) && (mouseY > this.y) && (mouseY < this.y+50)) {
      fill(200, 150);
      rect(c.x, c.y, this.w, this.h);
    }
  }
}

class Livelli extends Button {

  //let livello;
  //let locked = true;
 // let img;

  constructor(_x, _y, _w, _h, _livello, _img) {
    super(_x, _y, _w, _h);
    this.livello = _livello;
    this.img = _img;
    this.locked = true;
  }

  display() {
    super.display();
    if (!this.locked) {
      fill(0);
      textSize(28);
      text("Level "+ this.livello, this.x+10, this.y+30);
      this.checkMouse();
    } else {
      image(this.img, this.x+35, this.y);
    }
  }

 checkMouse() {
      if ((mouseX > this.x) && (mouseX <= this.x+this.w) && (mouseY > this.y) && (mouseY < this.y+this.h)) {
      fill(200, 150);
      rect(this.x, this.y, this.w, this.h);
    }
  }
}

class Play extends Button {

  constructor(_x, _y, _w, _h) {
    super(_x, _y, _w, _h);
  }

  display() {
    super.display();
    fill(255);
    textSize(32);
    text("Play", p.x+29, p.y+35);
  }

  checkMouse() {
    if ((mouseX > this.x) && (mouseX <= this.x+110) && (mouseY > this.y) && (mouseY < this.y+50)) {
      fill(200, 150);
      rect(p.x, p.y, this.w, this.h);
    }
  }
}

class Back {

  //let x, y;
  constructor(_x, _y) {
     this.x = _x;
     this.y = _y;
  }

  display() {
    fill(255);
    textSize(20);
    text("<- back", b.x, b.y+10);
  }

}

class Omino {

  //let x, y, vx, vy;
  //let s = 6;
  //let g = 0.2;
  //let terra = false;
  constructor(_x, _y, _vx, _s) {
    this.x = _x;
    this.y = _y;
    this.vx = _vx;
    this.s = _s;
    this.g = 0.2;
    this.terra = false;
  }

   display() {
    noFill();
    strokeWeight(4);
    stroke(0);
    ellipse(this.x, this.y-70, 20, 20);
    line(this.x, this.y-60, this.x, this.y-25);
    //braccia sx e dx
    line(this.x-15, this.y-45, this.x, this.y-60);
    line(this.x, this.y-60, this.x+15, this.y-45);
    //gambe sx e dx
    line(this.x-10, this.y-10, this.x, this.y-25);
    line(this.x, this.y-25, this.x+10, this.y-10);
    strokeWeight(0);
  }

   moveD() {
    this.x += this.vx;
    if (this.x > width+25) {
      this.x = -10;
    }
  }

   moveA() {
    this.x -= this.vx;
    if (this.x < -25) {
      this.x = width+10;
    }
  }

   moveW() {
    this.y -= this.s;
    this.s -= this.g;
    this.terra = false;
    if (this.y > height) {
      this.s = 0;
      this.y = height;
      this.terra = true;
    }
  }
}

class Ostacoli {

  //let x, y;

  constructor(_x, _y) {
    this.x = _x;
    this.y = _y;
  }

   display() {
    stroke(0);
    strokeWeight(5);
    line(this.x, this.y, this.x+50, this.y);
    strokeWeight(0);
  }

   displayMini() {
    stroke(0);
    strokeWeight(5);
    line(this.x, this.y, this.x+20, this.y);
    strokeWeight(0);
  }

   checkWin(o, l) {
    if ((o.y <= this.y && o.y >= this.y-5) && (o.x >= this.x-7 && o.x <= this.x+50)) {
      textSize(24);
      fill(138,0,138);
      text("Level " + l + " unlocked!", 220, 480);
      if (l <= 5) {
        ll[l-1].locked = false;
      }
      else if (l > 5 && l < 11) {
        lr[l-6].locked = false;
      }
    }
  }
   checkWinC(o, l, c) {
    if ((o.y <= this.y && o.y >= this.y-5) && (o.x >= this.x-7 && o.x <= this.x+50)) {
      textSize(24);
      fill(c);
      text("Level " + l + " unlocked!", 220, 480);
      if (l <= 5) {
        ll[l-1].locked = false;
      }
      else if (l > 5 && l < 11) {
        lr[l-6].locked = false;
      }
    }
  }
   checkFinalWin(o, bg) {
    if ((o.y <= this.y && o.y >= this.y-5) && (o.x >= this.x-7 && o.x <= this.x+50)) {
      background(255);
      image(bg, -150, 0);
      textSize(20);
      fill(255);
      text("Credits: DD Games", 240, 470);
    }
  }
}

class Bullet {

  //let x, y, vx, constXR;
  //color c;

  constructor(_x, _y, _vx) {
    this.x = _x;
    this.y = _y;
    this.vx = _vx;

    this.constXR = this.x;
    this.c = color(0);
  }

   display() {
    strokeWeight(2);
    stroke(0);
    fill(160);
    ellipse(this.x, this.y, 15, 15);
    strokeWeight(0);
  }

   moveR() {
    this.x += this.vx;
    if ((this.vx > 0) && (this.x >= 338)) {
      this.x = this.constXR;
    }
  }

  moveL() {
    this.x -= this.vx;
    if ((this.vx > 0) && (this.x <= 63)) {
      this.x = this.constXR;
    }
  }

}

var freeze = false, freeze2 = false, freeze3 = false, freeze4 = false;
var prova = false;
var gray = false;
var canJump = true;
var lev1 = false, lev2 = false, lev3 = false, lev4 = false, lev5 = false, lev6 = false, lev7 = false, lev8 = false, lev9 = false, lev10 = false;
var left = false, right = false, up = false;
var fly = false, fly2 = false;
var appear = false;
var pipeAppear = false;
var trampAppear = false;
var v1 = 0, v2 = 350, v3 = 0;
var y = 330; //coordinata immagine palloncino
var y2 = 170; //coordinata immagine palloncino2
var home;
var lock;
var balloon;
var grass;
var cactus;
var trampoline;
var yellowPipe, bluePipe;
var cannonLeft, cannonRight;
var bg;
var fontLevel1;
var s = 6;
var vx, vx2;

var p;
var c;
var o;
var b;
var os, os2, os3, os4, os5, os6, osi, osi2, osi3, osi4, osi5, osi6;
var bu, bu2, bu3, bu4, bu5, bu6, bu7, bu8;
var ll = new Array(5);
var lr = new Array(5);

function preload() {
  home = loadImage("./data/download3.jpg");
  lock = loadImage("./data/lock.png");
  grass = loadImage("./data/grass.png");
  balloon = loadImage("./data/ballon.png");
  trampoline = loadImage("./data/trampolino.png");
  cactus = loadImage("./data/cactus.png");
  yellowPipe = loadImage("./data/yellowpipe.png");
  bluePipe = loadImage("./data/bluepipe.png");
  cannonLeft = loadImage("./data/cannonleft.png");
  cannonRight = loadImage("./data/cannonright.png");
  bg = loadImage("./data/youwon.png");
  fontLevel1 = loadFont("./data/candara-light-italic.ttf");
}

function setup() {
  createCanvas(400, 500);
  home.resize(500, 500);
  lock.resize(30, 40);
  grass.resize(400, 500);
  balloon.resize(35, 70);
  trampoline.resize(70, 20);
  cactus.resize(40, 50);
  yellowPipe.resize(40, 40);
  bluePipe.resize(40, 40);
  cannonLeft.resize(60, 45);
  cannonRight.resize(60, 45);
  bg.resize(700, 500);

  p = new Play(145, 135, 110, 50);
  c = new Exit(145, 325, 110, 50);
  o = new Omino(width/2, height, 1.5, s);
  b = new Back(5, 15);

  ll[0] = new Livelli(50, 50, 100, 40, 1, lock);
  ll[0].locked = false;
  ll[1] = new Livelli(50, 140, 100, 40, 2, lock);
  //ll[1].locked = false;
  ll[2] = new Livelli(50, 230, 100, 40, 3, lock);
  //ll[2].locked = false;
  ll[3] = new Livelli(50, 320, 100, 40, 4, lock);
  //ll[3].locked = false;
  ll[4] = new Livelli(50, 410, 100, 40, 5, lock);
  //ll[4].locked = false;
  lr[0] = new Livelli(250, 50, 100, 40, 6, lock);
  //lr[0].locked = false;
  lr[1] = new Livelli(250, 140, 100, 40, 7, lock);
  //lr[1].locked = false;
  lr[2] = new Livelli(250, 230, 100, 40, 8, lock);
  //lr[2].locked = false;
  lr[3] = new Livelli(250, 320, 100, 40, 9, lock);
  //lr[3].locked = false;
  lr[4] = new Livelli(250, 410, 100, 40, 10, lock);
  //lr[4].locked = false;
}

function draw() {
  background(0);
  image(home, -50, 0);
  textFont(fontLevel1);
  textSize(16);
  fill(255);
  text("Credits: DD Games", 280, 490);
  mainGame();
  update();
  if (lev1) {
    level1();
  }
  if (lev2) {
    level2();
  }
  if (lev3) {
    level3();
  }
  if (lev4) {
    level4();
  }
  if (lev5) {
    level5();
  }
  if (lev6) {
    level6();
  }
  if (lev7) {
    level7();
  }
  if (lev8) {
    level8();
  }
  if (lev9) {
    level9();
  }
  if (lev10) {
    level10();
  }
}

function mainGame() {
  //bottone exit
  if (!freeze2) {
    if (!freeze) {
      c.display();
      c.checkMouse();
    } else {
      exit();
    }
  }

  //bottone play
  if (!freeze2) {
    p.display();
    p.checkMouse();
  } else {
    image(grass, 0, 0);
    b.display();
    for (var i=0; i<5; i++) {
      ll[i].display();
      lr[i].display();
    }
  }
}

function level1() {
  background(199, 235, 243);
  fill(140, 58, 23);
  textSize(32);
  text("Level 1", 160, 30);
  o.display();
  if (prova == true) {
    o.moveW();
    canJump = false;
    if (o.terra == true) {
      canJump = true;
    }
  }
  os = new Ostacoli(50, 405);
  os2 = new Ostacoli(120, 305);
  os3 = new Ostacoli(190, 205);
  os4 = new Ostacoli(270, 105);
  os.display();
  os2.display();
  os3.display();
  os4.display();
  check(os);
  check(os2);
  check(os3);
  check(os4);
  os4.checkWin(o, 2);
  b.display();
}

function level2() {
  background(234, 219, 149);
  fill(140, 58, 23);
  textSize(32);
  text("Level 2", 160, 30);
  o.display();
  if (prova == true) {
    o.moveW();
    canJump = false;
    if (o.terra == true) {
      canJump = true;
    }
  }
  os = new Ostacoli(300, 405);
  os2 = new Ostacoli(220, 305);
  os3 = new Ostacoli(140, 205);
  os4 = new Ostacoli(50, 105);
  os.display();
  os2.display();
  os3.display();
  os4.display();
  check(os);
  check(os2);
  check(os3);
  check(os4);
  os4.checkWin(o, 3);
  b.display();
}

function level3() {
  background(242, 196, 197);
  fill(140, 58, 23);
  textSize(32);
  text("Level 3", 160, 30);
  o.display();
  if (prova == true) {
    o.moveW();
    canJump = false;
    if (o.terra == true) {
      canJump = true;
    }
  }
  os = new Ostacoli(10, 405);
  os2 = new Ostacoli(340, 310);
  os3 = new Ostacoli(10, 215);
  os4 = new Ostacoli(340, 120);
  os.display();
  os2.display();
  os3.display();
  os4.display();
  check(os);
  check(os2);
  check(os3);
  check(os4);
  os4.checkWin(o, 4);
  b.display();
}

function level4() {
  background(167, 230, 157);
  fill(140, 58, 23);
  textSize(32);
  text("Level 4", 160, 30);
  o.display();
  if (prova == true) {
    o.moveW();
    canJump = false;
    if (o.terra == true) {
      canJump = true;
    }
  }
  v1 += 1.5;
  v2 -= 3;
  v3 += 2.5;
  os = new Ostacoli(v1, 405);
  if (v1 > width+40) {
    v1 = -55;
  }
  os2 = new Ostacoli(v2, 310);
  if (v2 < -50) {
    v2 = width+50;
  }
  os3 = new Ostacoli(v3, 215);
  if (v3 > width+40) {
    v3 = -55;
  }
  os.display();
  os2.display();
  os3.display();
  check(os);
  check(os2);
  check(os3);
  os3.checkWin(o, 5);
  b.display();
}

function level5() {
  background(193);
  fill(140, 58, 23);
  textSize(32);
  text("Level 5", 160, 30);
  o.display();
  if (prova == true) {
    o.moveW();
    canJump = false;
    if (o.terra == true) {
      canJump = true;
    }
  }
  v1 += 1.5;
  v2 -= 4;
  os = new Ostacoli(v1, 405);
  if (v1 > width+40) {
    v1 = -55;
  }
  os2 = new Ostacoli(v2, 310);
  if (v2 < -50) {
    v2 = width+50;
  }
  os3 = new Ostacoli(250, 215);
  if (gray) {
    os2.display(color(0));
  } else {
    os.display(color(0));
  }
  os3.display();
  if (second() % 2 == 0) {
    gray = true;
  } else {
    gray = false;
  }
  os4 = new Ostacoli(135, 120);
  os4.display();
  check(os);
  check(os2);
  check(os3);
  check(os4);
  os4.checkWin(o, 6);
  b.display();
}

function level6() {
  background(166, 0, 166);
  fill(255);
  textSize(32);
  text("Level 6", 160, 30);
  o.display();
  if (prova == true) {
    o.moveW();
    canJump = false;
    if (o.terra == true) {
      canJump = true;
    }
  }
  os = new Ostacoli(v1, 120);
  os.display();
  v1 += vx;
  if ((vx > 0) && (v1 >= width/2)) {
    vx = -vx;
  }
  if ((vx < 0) && (v1 <= 50)) {
    vx = -vx;
  }
  check(os);
  os.checkWinC(o, 7, 255);
  b.display();
  os2 = new Ostacoli(200, 340);
  os2.display();
  check(os2);
  image(balloon, 95, y);
  if (!fly) {
    if (o.y > 330 && o.y < 450 && o.x > 95 && o.x < 120) {
      fly = true;
      o.s = 8;
    }
  }
  if (fly == true) {
    y -= 3;
  }
  if (y < -70 && o.y == height) {
    y = 330;
    fly = false;
  }
  image(balloon, 315, y2);
  if (!fly2) {
    if (o.y > 170 && o.y < 290 && o.x > 315 && o.x < 340) {
      fly2 = true;
      o.s = 10;
    }
  }
  if (fly2 == true) {
    y2 -= 3;
  }
  if (y2 < -70 && o.y == height) {
    y2 = 170;
    fly2 = false;
  }
}

function level7() {
  background(184, 175, 20);
  fill(255);
  textSize(32);
  text("Level 7", 160, 30);
  o.display();
  if (prova == true) {
    o.moveW();
    canJump = false;
    if (o.terra == true) {
      canJump = true;
    }
  }
  os = new Ostacoli(30, 200);
  os.display();
  check(os);
  image(trampoline, 160, height/2);
  if (o.y > 250 && o.y < 270 && o.x > 150 && o.x < 235) {
    o.s = 7.5;
  }
  if (o.y == height) {
    o.x = 50;
    o.y = 200;
    appear = false;
    vx = 10;
  }
  os3 = new Ostacoli(v1, 450);
  if (appear == true) {
    os3.display();
    check(os3);
    os3.checkWinC(o, 8, 255);
    v1 += vx;
    if ((vx > 0) && (v1 >= width-50)) {
      vx = -vx;
    }
    if ((vx < 0) && (v1 <= width/2-50)) {
      vx = -vx;
    }
  }
  os2 = new Ostacoli(308, 105);
  check(os2);
  os2.display();
  if ((o.y >= os2.y && o.y < os2.y+10) && (o.x >= os2.x-10 && o.x <= os2.x+55) && o.s < 0) {
    appear = true;
  }
  if ((o.y >= os3.y-10 && o.y < os3.y) && (o.x >= os3.x-10 && o.x <= os3.x+55) && o.s < 0) {
    vx = 0;
  }
  b.display();
}

function level8() {
  background(21, 147, 157);
  fill(255);
  textSize(32);
  text("Level 8", 160, 30);
  o.display();
  b.display();
  if (prova == true) {
    o.moveW();
    canJump = false;
    if (o.terra == true) {
      canJump = true;
    }
  }
  stroke(0);
  line(width/2, 50, width/2, height-20);
  if (o.x > width-20) {
    o.x = width-20;
  }
  if (o.x < width/2+20) {
    o.x = width/2+20;
  }
  //primo ostacolo
  os = new Ostacoli(40, 420);
  os.displayMini();
  osi = new Ostacoli(width/2+40, 420);
  checkMini(osi);
  //secondo ostacolo
  os2 = new Ostacoli(v1-width/2, 330);
  os2.displayMini();
  osi2 = new Ostacoli(v1, 330);
  checkMini(osi2);
  v1 += vx;
  if ((vx > 0) && (v1 >= width-30)) {
    vx = -vx;
  }
  if ((vx < 0) && (v1 <= width/2+80)) {
    vx = -vx;
  }
  //terzo ostacolo
  os3 = new Ostacoli(v2-width/2, 240);
  os3.displayMini();
  osi3 = new Ostacoli(v2, 240);
  checkMini(osi3);
  v2 += vx2;
  if ((vx2 > 0) && (v2 >= width-40)) {
    vx2 = -vx2;
  }
  if ((vx2 < 0) && (v2 <= width/2+40)) {
    vx2 = -vx2;
  }
  //quarto ostacolo
  os4 = new Ostacoli(40, 130);
  os4.displayMini();
  osi4 = new Ostacoli(width/2+40, 140);
  checkMini(osi4);
  os5 = new Ostacoli(width/2-75, 80);
  os5.displayMini();
  osi5 = new Ostacoli(width-75, 80);
  checkMini(osi5);
  osi5.checkWinC(o, 9, 255);
}

function level9() {
  background(0, 255, 128);
  fill(140, 58, 23);
  textSize(32);
  text("Level 9", 160, 30);
  o.display();
  b.display();
  if (prova == true) {
    o.moveW();
    canJump = false;
    if (o.terra == true) {
      canJump = true;
    }
  }

  bu.display();
  bu.moveR();
  bu2.display();
  bu2.moveR();
  bu3.display();
  bu3.moveR();
  bu4.display();
  bu4.moveR();

  bu5.display();
  bu5.moveL();
  bu6.display();
  bu6.moveL();
  bu7.display();
  bu7.moveL();
  bu8.display();
  bu8.moveL();

  checkB(bu);
  checkB(bu2);
  checkB(bu3);
  checkB(bu4);
  checkB(bu5);
  checkB(bu6);
  checkB(bu7);
  checkB(bu8);

  image(cannonRight, 20, 370);
  image(cannonRight, 20, 270);
  image(cannonRight, 20, 170);
  image(cannonRight, 20, 70);
  image(cannonLeft, 320, 370);
  image(cannonLeft, 320, 270);
  image(cannonLeft, 320, 170);
  image(cannonLeft, 320, 70);
  os = new Ostacoli(width/2-10, 410);
  os2 = new Ostacoli(width/2-10, 310);
  os3 = new Ostacoli(width/2-10, 210);
  os4 = new Ostacoli(width/2-10, 110);
  os.displayMini();
  os2.displayMini();
  os3.displayMini();
  os4.displayMini();
  checkMini(os);
  checkMini(os2);
  checkMini(os3);
  checkMini(os4);
  os4.checkWin(o, 10);
}

function level10() {
  background(190, 24, 29);
  fill(255);
  textSize(32);
  text("Level 10", 160, 30);
  o.display();
  if (prova == true) {
    o.moveW();
    canJump = false;
    if (o.terra == true) {
      canJump = true;
    }
  }
  b.display();
  os = new Ostacoli(110, 90);
  os.displayMini();
  checkMini(os);
  if (o.y == height) {
    o.x = 120;
    o.y = 90;
    vx = 10;
    appear = false;
    pipeAppear = true;
    trampAppear = false;
  }
  image(cactus, 35, 110);
  if ((o.x >= 25 && o.x < 80) && (o.y >= 110 && o.y < 250)) {
    o.x = 120;
    o.y = 90;
  }
  if (pipeAppear == true) {
    image(yellowPipe, 30, 220);
    if ((o.x >= 30 && o.x < 79) && (o.y >= 220 && o.y < 270)) {
      o.x = 370;
      o.y = 0;
    }
  }
  image(bluePipe, 350, 0);
  os2 = new Ostacoli(356, 140);
  os2.displayMini();
  checkMini(os2);
  if ((o.y >= os2.y && o.y < os2.y+10) && (o.x >= os2.x-10 && o.x <= os2.x+25) && o.s < 0) {
    appear = true;
  }
  os3 = new Ostacoli(v1, 300);
  os4 = new Ostacoli(30, 380);
  if (appear == true) {
    os3.display();
    check(os3);
    v1 += vx;
    if ((vx > 0) && (v1 >= width-50)) {
      vx = -vx;
    }
    if ((vx < 0) && (v1 <= width/2+30)) {
      vx = -vx;
    }
    if ((o.y >= os3.y && o.y < os3.y+10) && (o.x >= os3.x-10 && o.x <= os3.x+55) && o.s < 0) {
      vx = 0;
      pipeAppear = false;
      trampAppear = true;
    }
  }
  if (trampAppear == true) {
    image(trampoline, v2, 450);
    v2 += vx2;
    if ((vx2 > 0) && (v2 >= width-80)) {
      vx2 = -vx2;
    }
    if ((vx2 < 0) && (v2 <= width/2-60)) {
      vx2 = -vx2;
    }
    if (o.y > 450 && o.y < 470 && o.x > v2 && o.x < v2+75) {
      o.s = 8;
    }
    os4.display();
    check(os4);
    os4.checkFinalWin(o, bg);
    if ((o.y <= os4.y && o.y >= os4.y-5) && (o.x >= os4.x-7 && o.x <= os4.x+50)) {
      freeze4 = true;
    }
  }
}

function checkB(bul) {
  if ((bul.x >= o.x-15 && bul.x < o.x+15) && (bul.y <= o.y && bul.y > o.y-50)) {
    o.x = width/2;
    o.y = height;
  }
}

function check(obj) {
  if ((o.y > obj.y && o.y < obj.y+10) && (o.x >= obj.x-10 && o.x <= obj.x+55) && o.s < 0) {
    o.y = obj.y;
    o.s = 0;
    o.terra = true;
    canJump = true;
  }
}

function checkMini(obj) {
  if ((o.y > obj.y && o.y < obj.y+10) && (o.x >= obj.x-10 && o.x <= obj.x+25) && o.s < 0) {
    o.y = obj.y;
    o.s = 0;
    o.terra = true;
    canJump = true;
  }
}

function mousePressed() {
  if (!freeze4) {
    if ((mouseButton == LEFT) && ((mouseX > c.x) && (mouseX <= c.x+110) && (mouseY > c.y) && (mouseY < c.y+50))) {
      freeze = true;
    }
    if ((mouseButton == LEFT) && ((mouseX > p.x) && (mouseX <= p.x+110) && (mouseY > p.y) && (mouseY < p.y+50))) {
      freeze2 = true;
    }
    if ((mouseButton == LEFT) && ((mouseX > b.x) && (mouseX <= b.x+55) && (mouseY > b.y-5) && (mouseY < b.y+20))) {
      if (lev1 == true || lev2 == true || lev3 == true || lev4 == true || lev5 == true || lev6 == true || lev7 == true || lev8 == true || lev9 == true || lev10 == true ) {
        freeze2 = true;
        freeze3 = false;
        lev1 = false;
        lev2 = false;
        lev3 = false;
        lev4 = false;
        lev5 = false;
        lev6 = false;
        lev7 = false;
        lev8 = false;
        lev9 = false;
        lev10 = false;
      } else {
        freeze2 = false;
      }
    }
    if (freeze2 && !freeze3) {
      if ((mouseX > ll[0].x) && (mouseX <= ll[0].x+ll[0].w) && (mouseY > ll[0].y) && (mouseY < ll[0].y+ll[0].h)) {
        freeze3 = true;
        lev1 = true;
        o.x = width/2;
        o.y = height;
      } else if ((mouseX > ll[1].x) && (mouseX <= ll[1].x+ll[1].w) && (mouseY > ll[1].y) && (mouseY < ll[1].y+ll[1].h) && ll[1].locked == false) {
        freeze3 = true;
        lev2 = true;
        o.x = width/2;
        o.y = height;
      } else if ((mouseX > ll[2].x) && (mouseX <= ll[2].x+ll[2].w) && (mouseY > ll[2].y) && (mouseY < ll[2].y+ll[2].h) && ll[2].locked == false) {
        freeze3 = true;
        lev3 = true;
        o.x = width/2;
        o.y = height;
      } else if ((mouseX > ll[3].x) && (mouseX <= ll[3].x+ll[3].w) && (mouseY > ll[3].y) && (mouseY < ll[3].y+ll[3].h) && ll[3].locked == false) {
        freeze3 = true;
        lev4 = true;
        o.x = width/2;
        o.y = height;
        v1 = 0;
        v2 = 350;
        v3 = 0;
      } else if ((mouseX > ll[4].x) && (mouseX <= ll[4].x+ll[4].w) && (mouseY > ll[4].y) && (mouseY < ll[4].y+ll[4].h) && ll[4].locked == false) {
        freeze3 = true;
        lev5 = true;
        o.x = width/2;
        o.y = height;
        v1 = 0;
        v2 = 350;
      } else if ((mouseX > lr[0].x) && (mouseX <= lr[0].x+lr[0].w) && (mouseY > lr[0].y) && (mouseY < lr[0].y+lr[0].h) && lr[0].locked == false) {
        freeze3 = true;
        lev6 = true;
        o.x = width/2;
        o.y = height;
        vx = 5;
        v1 = 50;
        v2 = 350;
        v3 = 0;
        y = 330;
        y2 = 170;
        fly = false;
        fly2 = false;
      } else if ((mouseX > lr[1].x) && (mouseX <= lr[1].x+lr[1].w) && (mouseY > lr[1].y) && (mouseY < lr[1].y+lr[1].h) && lr[1].locked == false) {
        freeze3 = true;
        lev7 = true;
        o.x = 50;
        o.y = 200;
        vx = 10;
        v1 = width/2;
        appear = false;
      } else if ((mouseX > lr[2].x) && (mouseX <= lr[2].x+lr[2].w) && (mouseY > lr[2].y) && (mouseY < lr[2].y+lr[2].h) && lr[2].locked == false) {
        freeze3 = true;
        lev8 = true;
        o.x = 300;
        o.y = height;
        vx = 1.5;
        v1 = width/2+80;
        v2 = width/2+70;
        vx2 = 3.5;
        appear = false;
      } else if ((mouseX > lr[3].x) && (mouseX <= lr[3].x+lr[3].w) && (mouseY > lr[3].y) && (mouseY < lr[3].y+lr[3].h) && lr[3].locked == false) {
        freeze3 = true;
        lev9 = true;
        o.x = width/2;
        o.y = height;
        bu = new Bullet(63, 382, 2);
        bu2 = new Bullet(63, 282, 3);
        bu3 = new Bullet(63, 182, 4.5);
        bu4 = new Bullet(63, 82, 6);
        bu5 = new Bullet(338, 382, 2.5);
        bu6 = new Bullet(338, 282, 3.5);
        bu7 = new Bullet(338, 182, 4);
        bu8 = new Bullet(338, 82, 6.5);
      } else if ((mouseX > lr[4].x) && (mouseX <= lr[4].x+lr[4].w) && (mouseY > lr[4].y) && (mouseY < lr[4].y+lr[4].h) && lr[4].locked == false) {
        freeze3 = true;
        lev10 = true;
        o.x = 120;
        o.y = 90;
        vx = 10;
        appear = false;
        pipeAppear = true;
        trampAppear = false;
        v1 = 310;
        v2 = width/2-10;
        vx2 = 3;
      }
    }
  }
}

function update() {
  if (right == true) {
    o.moveD();
  }
  if (left == true) {
    o.moveA();
  }
  if (up == true) {
    prova = true;
    if (canJump == true) {
      o.s = 6;
    }
  }
}

function keyPressed() {
  if (!freeze4) {
    switch(key) {
    case 'd':
    case 'D':
      right = true;
      break;
    case 'a':
    case 'A':
      left = true;
      break;
    case 'w':
    case 'W':
      up = true;
    }
  }
}

function keyReleased() {
    switch(key) {
    case 'd':
    case 'D':
      right = false;
      break;
    case 'a':
    case 'A':
      left = false;
      break;
    case 'w':
    case 'W':
      up = false;
    }
  }
