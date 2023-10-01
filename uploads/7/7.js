var sfondo, logo, bacheca, lock, brush, eraser, victory;
var eLev1, eLev2, eLev3, eLev4, eLev5;
var mLev6, mLev7, mLev8, mLev9, mLev10;
var hLev11, hLev12, hLev13, hLev14, hLev15;
var font;
var play, easy, medium, hard;
var red, green, blue, black, orange, yellow;
var brushButton, eraserButton;
var grid;
var t;
var Tlevel;
var easyMode, mediumMode, hardMode; //settati a false
var mediumLock = true;
var hardLock = true;
var tileSize = 40;
var nOfTiles = 20;
var eTLev1 = 4, eTLev2 = 5, eTLev3 = 7, eTLev4 = 8, eTLev5 = 12;
var mTLev6 = 10, mTLev7 = 9, mTLev8 = 8, mTLev9 = 18, mTLev10 = 20;
var hTLev11 = 18, hTLev12 = 11, hTLev13 = 2, hTLev14 = 18, hTLev15 = 5;
var gridColor;
var lev1 = true, lev2, lev3, lev4, lev5;
var lev6, lev7, lev8, lev9, lev10;
var lev11, lev12, lev13, lev14, lev15;
var lockControls = false;
var levelStarted = false;
var youwon = false;

class Button {

  constructor(x, y, w, h, c) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.c = c;
    this.pressed = false;
    this.locked = false;
  }

   display() {
    fill(this.c);
    strokeWeight(3);
    stroke(0);
    rect(this.x, this.y, this.w, this.h);
    if ((mouseX >= this.x && mouseX <= this.x+this.w) && (mouseY >= this.y && mouseY <= this.y+this.h)) {
      fill(100, 50);
      rect(this.x, this.y, this.w, this.h);
    }
    if (this.pressed == true) {
      fill(70);
      noStroke();
      rect(this.x+2, this.y+2, this.w, this.h);
    }
  }

   displayColor() {
    fill(this.c);
    strokeWeight(3);
    stroke(0);
    rect(this.x, this.y, this.w, this.h);
    if (this.pressed == true) {
      noFill();
      strokeWeight(10);
      stroke(50);
      rect(this.x, this.y, this.w, this.h);
    }
  }

   update() {
    if (mouseIsPressed && !this.locked) {
      if ((mouseX >= this.x && mouseX <= this.x+this.w) && (mouseY >= this.y && mouseY <= this.y+this.h)) {
        this.pressed = true;
      }
    } else {
      this.pressed = false;
    }
  }

   keepPressed() {
    if ((mouseIsPressed || this.pressed == true)) {
      if ((mouseX >= this.x && mouseX <= this.x+this.w) && (mouseY >= this.y && mouseY <= this.y+this.h)) {
        this.pressed = true;
      }
    }
  }
}

class Tile {

  constructor( x,  y,  w,  h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.c = color(255, 255, 255);
  }

   display() {
    fill(this.c);
    strokeWeight(0.5);
    stroke(0);
    rect(this.x, this.y, this.w, this.h);
  }
}

class Timer {
  constructor() {
    this.startTime = 0;
    this.stopTime = 0;
    this.running = false;
  }
   start() {
    if (!this.running) {
      this.startTime = parseInt(millis());
      this.running = true;
    }
  }
   stop() {
    if (this.running)
      this.stopTime = parseInt(millis());
    this.running = false;
  }
   getElapsedTime() {
    let elapsed;
    if (this.running) {
      elapsed = (parseInt(millis()) - this.startTime);
    } else {
      elapsed = (this.stopTime - this.startTime);
    }
    return parseInt(elapsed);
  }
   second() {
    return (this.getElapsedTime() / 1000) % 60;
  }
   minute() {
    return (this.getElapsedTime() / (1000*60)) % 60;
  }
}

function drawingboard() {

  for (let i=0; i<nOfTiles; i++) {
    for (let j=0; j<nOfTiles; j++) {
      grid[i][j].display();
    }
  }

  fill(200);
  strokeWeight(1.5);
  stroke(0);
  rect(0, height-100, width-1, 99);
  rect(0, 0, width, 40);

  for (let i=100; i<800; i+=100) {
    line(i, height-100, i, height);
  }
  brushButton.keepPressed();
  if(brushButton.pressed) {
    eraserButton.pressed = false;
  }
  brushButton.display();
  image(brush, 12, 812);

  eraserButton.keepPressed();
  if(eraserButton.pressed) {
    brushButton.pressed = false;
  }
  eraserButton.display();
  image(eraser, 112, 812);


  red.keepPressed();
  if(red.pressed) {
    green.pressed = false;
    blue.pressed = false;
    yellow.pressed = false;
    orange.pressed = false;
    black.pressed = false;
  }
  red.displayColor();

  green.keepPressed();
  if(green.pressed) {
    red.pressed = false;
    blue.pressed = false;
    yellow.pressed = false;
    orange.pressed = false;
    black.pressed = false;
  }
  green.displayColor();

  blue.keepPressed();
  if(blue.pressed) {
    green.pressed = false;
    red.pressed = false;
    yellow.pressed = false;
    orange.pressed = false;
    black.pressed = false;
  }
  blue.displayColor();

  yellow.keepPressed();
  if(yellow.pressed) {
    green.pressed = false;
    blue.pressed = false;
    red.pressed = false;
    orange.pressed = false;
    black.pressed = false;
  }
  yellow.displayColor();

  orange.keepPressed();
  if(orange.pressed) {
    green.pressed = false;
    blue.pressed = false;
    yellow.pressed = false;
    red.pressed = false;
    black.pressed = false;
  }
  orange.displayColor();

  black.keepPressed();
  if(black.pressed) {
    green.pressed = false;
    blue.pressed = false;
    yellow.pressed = false;
    orange.pressed = false;
    red.pressed = false;
  }
  black.displayColor();

  mousePresses();

}

function mousePresses() {
  if(mouseY > 40 && mouseX < 800 && mouseX > 0 && mouseY < 800) {
    if(mouseIsPressed && !lockControls) {
      if(brushButton.pressed) {
        if(red.pressed) {
          grid[int(mouseX/tileSize)][int(mouseY/tileSize)].c = color(255, 0, 0);
        }
        if(green.pressed) {
          grid[int(mouseX/tileSize)][int(mouseY/tileSize)].c = color(0, 255, 0);
        }
        if(blue.pressed) {
          grid[int(mouseX/tileSize)][int(mouseY/tileSize)].c = color(0, 0, 255);
        }
        if(yellow.pressed) {
          grid[int(mouseX/tileSize)][int(mouseY/tileSize)].c = color(255, 255, 0);
        }
        if(orange.pressed) {
          grid[int(mouseX/tileSize)][int(mouseY/tileSize)].c = color(250, 100, 0);
        }
        if(black.pressed) {
          grid[int(mouseX/tileSize)][int(mouseY/tileSize)].c = color(0);
        }
      }
      else {
        grid[int(mouseX/tileSize)][int(mouseY/tileSize)].c = color(255, 255, 255);
      }
    }
  }

}

function newBoard() {
  for (let i=0; i<nOfTiles; i++) {
    for (let j=0; j<nOfTiles; j++) {
      grid[i][j] = new Tile(i*tileSize, j*tileSize, tileSize, tileSize);
    }
  }
}

 function preload() {
  sfondo = loadImage("./data/sfondo2.png");
  font = loadFont("./data/MysticGate.ttf");
  logo = loadImage("./data/DDGamesBW.png");
  bacheca = loadImage("./data/bacheca.png");
  lock = loadImage("./data/lockBW.png");
  brush = loadImage("./data/Brush.png");
  eraser = loadImage("./data/Eraser.png");
  eLev1 = loadImage("./data/Lev1.png");
  eLev2 = loadImage("./data/Lev2.png");
  eLev3 = loadImage("./data/Lev3.png");
  eLev4 = loadImage("./data/Lev4.png");
  eLev5 = loadImage("./data/Lev5.png");
  mLev6 = loadImage("./data/Lev6.png");
  mLev7 = loadImage("./data/Lev7.png");
  mLev8 = loadImage("./data/Lev8.png");
  mLev9 = loadImage("./data/Lev9.png");
  mLev10 = loadImage("./data/Lev10.png");
  hLev11 = loadImage("./data/Lev11.PNG");
  hLev12 = loadImage("./data/Lev12.PNG");
  hLev13 = loadImage("./data/Lev13.png");
  hLev14 = loadImage("./data/Lev14.PNG");
  hLev15 = loadImage("./data/Lev15.PNG");
  victory = loadImage("./data/youwon.png");

}

function setup() {
  createCanvas(800,900);
  strokeWeight(0.5);
  textSize(70);
  play = new Button(530, height/2, 100, 50, 255);
  grid = new Array(nOfTiles);
  for (let i=0; i<nOfTiles; i++) {
    grid[i] = new Array(nOfTiles);
    for (let j=0; j<nOfTiles; j++) {
      grid[i][j] = new Tile(0, 0, 0, 0);
    }
  }
  newBoard();
  brushButton = new Button(12, 812, 75, 75, 255);
  brushButton.pressed = true;
  eraserButton = new Button(112, 812, 75, 75, 255);
  red = new Button(215, 815, 70, 70, color(255, 0, 0));
  green = new Button(315, 815, 70, 70, color(0, 255, 0));
  blue = new Button(415, 815, 70, 70, color(0, 0, 255));
  yellow = new Button(515, 815, 70, 70, color(255, 255, 0));
  orange = new Button(615, 815, 70, 70, color(250, 100, 0));
  black = new Button(715, 815, 70, 70, color(0));
  t = new Timer();
  Tlevel = new Timer();
  easy = new Button(147, 138, 101, 124, 255);
  medium = new Button(313, 261, 101, 124, 255);
  gridColor = new Array(nOfTiles);
  for (let i=0; i<nOfTiles; i++) {
    gridColor[i] = new Array(nOfTiles);
    for (let j=0; j<nOfTiles; j++) {
      gridColor[i][j] = color(0, 0, 0);
    }
  }
  logo.resize(80, 80);
  sfondo.resize(800, 900);
  lock.resize(40, 50);
  brush.resize(75, 75);
  eraser.resize(75, 75);
  victory.resize(1350, 900);
}

 function draw() {
  background(0);
  if (play.pressed == false) {
    homescreen();
  } else {
    play.pressed = true;
    if (!easyMode && !mediumMode && !hardMode && !youwon) {
      selectdifficulty();
    }
    if (easyMode == true && !youwon) {
      easyLevels();
    }
    if (mediumMode == true  && !youwon) {
      mediumLevels();
    }
    if (hardMode == true  && !youwon) {
      hardLevels();
    }
    if (youwon) {
      image(victory, -275, 0);
      fill(255);
      strokeWeight(0);
      text("Credits: DD Games", 500, height - 30);
    }
  }
}

function level(timer, im, timerLevel) {
  t.start();
  if ((timer - ((t.second() + parseInt(t.minute())*60)))  >= 0 && (!levelStarted)) {
    image(im, 0, 0);
    for (let i = 0; i < 800; i+=40) {
      for (let j = 0; j < 800; j+=40) {
        gridColor[(i/40)][(j/40)] = color(get(i+5, j+5));
      }
    }
    fill(200);
    strokeWeight(1.5);
    stroke(0);
    rect(0, height-100, width-1, 99);
    t.start();
    textSize(50);
    fill(0);
    strokeWeight(0);
    text(parseInt(timer - t.second()), width/2-15, height-35);
  } else {
    Tlevel.start();
    levelStarted = true;
    drawingboard();
    textSize(30);
    fill(0);
    strokeWeight(0);
    text(parseInt(timerLevel - (Tlevel.second() + parseInt(Tlevel.minute())*60 )), width/2 - 10, 30);
    if ((timerLevel - (Tlevel.second() + parseInt(Tlevel.minute())*60 )) >= 0 && checkWin()) {
      Tlevel.stop();
      lockControls = true;
      if (pressToContinue()) {
        return 1;
      } else {
      }
    }
    if ((timerLevel - (Tlevel.second() + parseInt(Tlevel.minute())*60 )) < 0) {
      Tlevel.stop();
      levelStarted = false;
      return -1;
    }
  }
  return 0;
}

function checkWin() {
  for (let i = 0; i < nOfTiles; i++) {
    for (let j = 1; j < nOfTiles; j++) {
      if (grid[i][j].c.toString() !== gridColor[i][j].toString()) {
        return false;
      }
    }
  }
  levelStarted = false;
  return true;
}

function pressToContinue() {
  fill(200);
  strokeWeight(1.5);
  stroke(0);
  rect(0, 0, width, 40);
  if (second() % 2 == 0) {
    textSize(30);
    fill(0);
    strokeWeight(0);
    text("Press any key to continue...", 5, 30);
  }
  if (keyIsPressed) {
    return true;
  }
  return false;
}

function homescreen() {
  image(sfondo, 0, 0);
  image(logo, 20, 20);
  fill(0);
  textSize(70);
  textFont(font);
  strokeWeight(0);
  text("Welcome", 420, 100);
  text("to", 540, 190);
  text("JustCopyIt", 400, 280);
  play.display();
  play.update();
  fill(0);
  textSize(25);
  strokeWeight(0);
  text("Play", 555, height/2+34);
}

function easyLevels() {
  if (lev1 && !lev2) {
    let n = level(eTLev1, eLev1, 12);
    switch(n) {
    case 0:
      lev1 = true;
      break;
    case 1:
      lev1 = false;
      break;
    case -1:
      easy.locked = false;
      easyMode = false;
      t.stop();
      return;
    }
    if (!lev1) {
      newBoard();
      lockControls = false;
      t.startTime = millis();
      lev2 = true;
    }
  } else if (lev2 && !lev3) {
    let n = level(eTLev2, eLev2, 15);
    switch(n) {
    case 0:
      lev2 = true;
      break;
    case 1:
      lev2 = false;
      break;
    case -1:
      easy.locked = false;
      easyMode = false;
      t.stop();
      return;
    }
    if (!lev2) {
      newBoard();
      lockControls = false;
      t.startTime = millis();
      lev3 = true;
    }
  } else if (lev3 && !lev4) {
    let n = level(eTLev3, eLev3, 22);
    switch(n) {
    case 0:
      lev3 = true;
      break;
    case 1:
      lev3 = false;
      break;
    case -1:
      easy.locked = false;
      easyMode = false;
      t.stop();
      return;
    }
    if (!lev3) {
      newBoard();
      lockControls = false;
      t.startTime = millis();
      lev4 = true;
    }
  } else if (lev4 && !lev5) {
    let n = level(eTLev4, eLev4, 20);
    switch(n) {
    case 0:
      lev4 = true;
      break;
    case 1:
      lev4 = false;
      break;
    case -1:
      easy.locked = false;
      easyMode = false;
      t.stop();
      return;
    }
    if (!lev4) {
      newBoard();
      lockControls = false;
      t.startTime = millis();
      lev5 = true;
    }
  } else if (lev5) {
    let n = level(eTLev5, eLev5, 33);
    switch(n) {
    case 0:
      lev5 = true;
      break;
    case 1:
      lev5 = false;
      break;
    case -1:
      easy.locked = false;
      easyMode = false;
      t.stop();
      return;
    }
    if (!lev5) {
      newBoard();
      lockControls = false;
      t.stop();
      mediumLock = false;
      easyMode = false;
    }
  }
}

function mediumLevels() {
  if (lev6 && !lev7) {
    let n = level(mTLev6, mLev6, 25);
    switch(n) {
    case 0:
      lev6 = true;
      break;
    case 1:
      lev6 = false;
      break;
    case -1:
      medium.locked = false;
      mediumMode = false;
      t.stop();
      return;
    }
    if (!lev6) {
      newBoard();
      lockControls = false;
      t.stop();
      lev7 = true;
    }
  } else if (lev7 && !lev8) {
    let n = level(mTLev7, mLev7, 25);
    switch(n) {
    case 0:
      lev7 = true;
      break;
    case 1:
      lev7 = false;
      break;
    case -1:
      medium.locked = false;
      mediumMode = false;
      t.stop();
      return;
    }
    if (!lev7) {
      newBoard();
      lockControls = false;
      t.startTime = millis();
      lev8 = true;
    }
  } else if (lev8 && !lev9) {
    let n = level(mTLev8, mLev8, 32);
    switch(n) {
    case 0:
      lev8 = true;
      break;
    case 1:
      lev8 = false;
      break;
    case -1:
      medium.locked = false;
      mediumMode = false;
      t.stop();
      return;
    }
    if (!lev8) {
      newBoard();
      lockControls = false;
      t.startTime = millis();
      lev9 = true;
    }
  } else if (lev9 && !lev10) {
    let n = level(mTLev9, mLev9, 40);
    switch(n) {
    case 0:
      lev9 = true;
      break;
    case 1:
      lev9 = false;
      break;
    case -1:
      medium.locked = false;
      mediumMode = false;
      t.stop();
      return;
    }
    if (!lev9) {
      newBoard();
      lockControls = false;
      t.startTime = millis();
      lev10 = true;
    }
  } else if (lev10) {
    let n = level(mTLev10, mLev10, 37);
    switch(n) {
    case 0:
      lev10 = true;
      break;
    case 1:
      lev10 = false;
      break;
    case -1:
      medium.locked = false;
      mediumMode = false;
      t.stop();
      return;
    }
    if (!lev10) {
      newBoard();
      lockControls = false;
      t.stop();
      hardLock = false;
      mediumMode = false;
    }
  }
}

function hardLevels() {
  if (lev11 && !lev12) {
    let n = level(hTLev11, hLev11, 55);
    switch(n) {
    case 0:
      lev11 = true;
      break;
    case 1:
      lev11 = false;
      break;
    case -1:
      hard.locked = false;
      hardMode = false;
      t.stop();
      return;
    }
    if (!lev11) {
      newBoard();
      lockControls = false;
      t.stop();
      lev12 = true;
    }
  } else if (lev12 && !lev13) {
    let n = level(hTLev12, hLev12, 42);
    switch(n) {
    case 0:
      lev12 = true;
      break;
    case 1:
      lev12 = false;
      break;
    case -1:
      hard.locked = false;
      hardMode = false;
      t.stop();
      return;
    }
    if (!lev12) {
      newBoard();
      lockControls = false;
      t.startTime = millis();
      lev13 = true;
    }
  } else if (lev13 && !lev14) {
    let n = level(hTLev13, hLev13, 35);
    switch(n) {
    case 0:
      lev13 = true;
      break;
    case 1:
      lev13 = false;
      break;
    case -1:
      hard.locked = false;
      hardMode = false;
      t.stop();
      return;
    }
    if (!lev13) {
      newBoard();
      lockControls = false;
      t.startTime = millis();
      lev14 = true;
    }
  } else if (lev14 && !lev15) {
    let n = level(hTLev14, hLev14, 42);
    switch(n) {
    case 0:
      lev14 = true;
      break;
    case 1:
      lev14 = false;
      break;
    case -1:
      hard.locked = false;
      hardMode = false;
      t.stop();
      return;
    }
    if (!lev14) {
      newBoard();
      lockControls = false;
      t.startTime = millis();
      lev15 = true;
    }
  } else if (lev15) {
    let n = level(hTLev15, hLev15, 7);
    switch(n) {
    case 0:
      lev15 = true;
      break;
    case 1:
      lev15 = false;
      youwon = true;
      break;
    case -1:
      hard.locked = false;
      hardMode = false;
      t.stop();
      return;
    }
    if (!lev15) {
      newBoard();
      lockControls = false;
      t.stop();
      hardMode = false;
    }
  }
}

function selectdifficulty() {

  image(bacheca, 0, 0);
  easy.update();
  if (easy.pressed == true) {
    easy.locked = true;
    easyMode = true;
    lev1 = true;
    lev2 = false;
    lev3 = false;
    lev4 = false;
    lev5 = false;
    t.startTime = millis();
    newBoard();
  }
  fill(0);
  textSize(20);
  strokeWeight(0);
  text("Easy", 175, 208);
  strokeWeight(3);
  if ((mouseX >= easy.x && mouseX <= easy.x+easy.w) && (mouseY >= easy.y && mouseY <= easy.y+easy.h)) {
    noFill();
    stroke(255, 0, 0);
    rect(easy.x, easy.y, easy.w, easy.h, 21);
  }

  if (mediumLock == true) {
    image(lock, 340, 265);
  } else {
    medium = new Button(310, 224, 101, 124, 255);
    strokeWeight(0);
    fill(0);
    text("Medium", 321, 295);
    medium.update();
    if ((mouseX >= medium.x && mouseX <= medium.x+medium.w) && (mouseY >= medium.y && mouseY <= medium.y+medium.h)) {
      noFill();
      stroke(255, 0, 0);
      strokeWeight(3);
      rect(medium.x, medium.y, medium.w, medium.h, 21);
    }
    if (medium.pressed == true) {
      mediumMode = true;
      lev6 = true;
      lev7 = false;
      lev8 = false;
      lev9 = false;
      lev10 = false;
      newBoard();
    }
  }

  if (hardLock == true) {
    image(lock, 485, 130);
  } else {
    hard = new Button(455, 90, 101, 124, 255);
    strokeWeight(0);
    fill(0);
    text("Hard", 482, 160);
    hard.update();
    if ((mouseX >= hard.x && mouseX <= hard.x+hard.w) && (mouseY >= hard.y && mouseY <= hard.y+hard.h)) {
      noFill();
      stroke(255, 0, 0);
      strokeWeight(3);
      rect(hard.x, hard.y, hard.w, hard.h, 21);
    }
    if (hard.pressed == true) {
      hardMode = true;
      lev11 = true;
      lev12 = false;
      lev13 = false;
      lev14 = false;
      lev15 = false;
      newBoard();
    }
  }
}