
document.addEventListener('contextmenu', (e) => {
  e.preventDefault();
})

class Casella {
  constructor(_x, _y, _bomba) {
    this.x = _x;
    this.y = _y;
    this.bomba = _bomba;
    this.scoperta = false;
    this.flag = false;
    this.perso = false;
  }
}

class Timer {
  constructor() {
    this.startTime = 0;
    this.stopTime = 0;
    this.running = false;
  }

  start() {
      this.startTime = millis();
      this.running = true;
  }

  stop() {
      if(this.running)
        this.stopTime = millis();
        this.running = false;
  }

  getElapsedTime() {
      var elapsed;
      if (this.running) {
           this.elapsed = (millis() - this.startTime);
      }
      else {
          this.elapsed = (this.stopTime - this.startTime);
      }
      return this.elapsed;
  }

  second() {
    return (this.getElapsedTime() / 1000) % 60;
  }

  minute() {
    return parseInt((this.getElapsedTime() / (1000*60)) % 60);
  }
}


var lost = false;
var won = false;
var start = false;
var width = 720;
var height = 600;
var t;
var numCaselleX = 24;
var numCaselleY = 20;
var numBombe;
var numFlag = 0;
var numCaselleVuote = 381;
var numCaselleScoperte = 0;
var sizeCasella = 30;
var c;
var coperta = new Array(2);
var bomba;
var noBomba = new Array(2);
var bombaLost;
var flag;
var flag2;
var font;
var button = new Array(6);
var tempo = new Timer();

function preload() {
  font = loadFont('./data/CenturyGothic.ttf');
  coperta[0] = loadImage('./data/casella.png');
  coperta[1] = loadImage('./data/casella2.png');
  bomba = loadImage('./data/bomb.png');
  noBomba[0] = loadImage('./data/noBomb1.png');
  noBomba[1] = loadImage('./data/noBomb2.png');
  bombaLost = loadImage('./data/bombLost.png');
  button[0] = loadImage('./data/button1.png');
  button[1] = loadImage('./data/button2.png');
  button[2] = loadImage('./data/button3.png');
  button[3] = loadImage('./data/buttonM1.png');
  button[4] = loadImage('./data/buttonM2.png');
  button[5] = loadImage('./data/buttonM3.png');
  flag = loadImage('./data/flag.png');
  flag2 = loadImage('./data/flag2.png');
}

function setup() {
  createCanvas(720,700);
  textFont(font);
  textSize(24);
  c = new Array(numCaselleX);
  for(var i = 0; i < numCaselleX; i++) {
    c[i] = new Array(numCaselleY);
  }
  t = new Timer();
  creaBombe();
  tempo.start();
}

function draw() {
  fill(200);
  rect(-1, 599, 719, 699);
  if(mouseX >= 335 && mouseX <= 385 && mouseY >= 625 && mouseY <= 675)
    if(lost)
      image(button[4], 335, 625);
    else
      image(button[3], 335, 625);
  else
    image(button[lost ? 1 : 0], 335, 625);
  disegnaCaselle();
  textSize(50);
  fill(0);
  text(parseInt(t.second() + t.minute()*60), 335-120, 667);
  text((99 - numFlag), 335+180, 667);
  image(flag2, 335+120, 625);
  if(t.second() + t.minute() == 999){
    t.stopTime = t.stopTime;
    t.running = false;
  }
}

function bombeAdiacenti(x, y) {
  var num = 0;
  for(var i = x-1; i <= x+1; i++) {
    for(var j = y-1; j <= y+1; j++) {
      if(i >= 0 && j >= 0) {
        if(i < numCaselleX && j < numCaselleY) {
          if(c[i][j].bomba)
          num++;
        }
      }
    }
  }
  return num;
}

function keyPressed() {
  if(keyCode == 82) {
    restart();
  }
  else if(!(won || lost)) {
    let i = parseInt(mouseX / 30);
    let j = parseInt(mouseY / 30);
    if(i < numCaselleX && j < numCaselleY) {
      if(keyCode == 67) {
        if(start == false) {
          start = true;
          t.start();
          rimpiazzaPrimeBombe(i,j);
        }
        if(!won && !c[i][j].flag) {
          c[i][j].scoperta = true;
          if(c[i][j].bomba ==  true) {
            c[i][j].perso = true;
            lost = true;
            perso();
          }
        }
      }
      else if(keyCode == 86) {
        c[i][j].flag = !c[i][j].flag;
      }
    }
  }
}

function mousePressed() {
  if(mouseX >= 335 && mouseX <= 385 && mouseY >= 625 && mouseY <= 675 && mouseButton == LEFT) {
    restart();
    return;
  }
  if(!(won || lost)) {
    var i = parseInt(mouseX / 30);
    var j = parseInt(mouseY / 30);
    if(i < numCaselleX && j < numCaselleY) {
      if(mouseButton == LEFT) {
        if(start == false) {
          start = true;
          t.start();
          rimpiazzaPrimeBombe(i,j);
        }
        if(!won && !c[i][j].flag) {
          c[i][j].scoperta = true;
          if(c[i][j].bomba ==  true) {
            c[i][j].perso = true;
            lost = true;
            perso();
          }
        }
      }
      if(mouseButton == RIGHT) {
        c[i][j].flag = !c[i][j].flag;
      }
    }
  }
}

function rimpiazzaPrimeBombe(x, y){
  var count = 0;
  for(var i = x-1; i <= x+1; i++) {
    for(var j = y-1; j <= y+1; j++) {
      if(i >= 0 && i < numCaselleX && j >= 0 && j < numCaselleY  && c[i][j].bomba) {
        count++;
        c[i][j].bomba = false;
      }
    }
  }
  while(count > 0) {
    var i = parseInt(random(0,numCaselleX));
    var j = parseInt(random(0,numCaselleY));
    if((i < x-1 || i > x+1) && (j < y-1 || j > y+1) && c[i][j].bomba == false) {
      count--;
      c[i][j].bomba = true;
    }
  }
}

function perso() {
  t.stop();
  for(var i = 0; i < numCaselleX; i++) {
    for(var j = 0; j < numCaselleY; j++) {
      if(c[i][j].bomba && !c[i][j].flag) {
        c[i][j].scoperta = true;
      }
    }
  }
}

function vinto() {
  t.stop();
  if(mouseX >= 335 && mouseX <= 385 && mouseY >= 625 && mouseY <= 675)
    image(button[5], 335, 625);
  else
    image(button[2], 335, 625);
}

function clearArea(x, y) {
  if(c[x][y].scoperta == false) {
    c[x][y].scoperta = true;
  }
  if(bombeAdiacenti(x,y) == 0) {
    if(x-1 >= 0 && y-1 >= 0 && c[x-1][y-1].bomba == false && c[x-1][y-1].scoperta == false && c[x-1][y-1].flag == false)            //  ANGOLO IN ALTO A SINISTRA
      clearArea(x-1,y-1);

    if(x-1 >= 0 && c[x-1][y].bomba == false && c[x-1][y].scoperta == false && c[x-1][y].flag == false)                          //  SINISTRA
      clearArea(x-1,y);

    if(x-1 >= 0 && y+1 < numCaselleY && c[x-1][y+1].bomba == false && c[x-1][y+1].scoperta == false && c[x-1][y+1].flag == false)   //  ANGOLO IN BASSO A SINISTRA
      clearArea(x-1,y+1);

    if(y-1 >= 0 && c[x][y-1].bomba == false && c[x][y-1].scoperta == false && c[x][y-1].flag == false)                          //  SOPRA
      clearArea(x,y-1);

    if(y+1 < numCaselleY && c[x][y+1].bomba == false && c[x][y+1].scoperta == false && c[x][y+1].flag == false)                 //  SOTTO
      clearArea(x,y+1);

    if(x+1 < numCaselleX && y-1 >= 0 && c[x+1][y-1].bomba == false && c[x+1][y-1].scoperta == false && c[x+1][y-1].flag == false)   //  ANGOLO IN ALTO A DESTRA
      clearArea(x+1,y-1);

    if(x+1 < numCaselleX && c[x+1][y].bomba == false && c[x+1][y].scoperta == false && c[x+1][y].flag == false)                 //  DESTRA
      clearArea(x+1,y);

    if(x+1 < numCaselleX && y+1 < numCaselleY && c[x+1][y+1].bomba == false && c[x+1][y+1].scoperta == false && c[x+1][y+1].flag == false)   //  ANGOLO IN BASSO A DESTRA
      clearArea(x+1,y+1);
  }
}

function disegnaCaselle() {
  var count = 0;
  numFlag = 0;
  for(var i = 0; i < numCaselleX; i++) {
    for(var j = 0; j < numCaselleY; j++) {
      if(!(c[i][j].scoperta)) {
        if(c[i][j].flag) {
          image(flag, i*30, j*30);
          numFlag++;
        }
        else {
          if((!won && !lost) && parseInt(mouseX / 30) == i && parseInt(mouseY / 30) == j) {
            image(coperta[1], i*30, j*30);
          }
          else
            image(coperta[0], i*30, j*30);
        }
      }
      else {
        if(c[i][j].bomba) {
          if(c[i][j].perso)
            image(bombaLost, i*30, j*30);
          else
            image(bomba, i*30, j*30);
        }
        else {
          image(noBomba[i%2 ^ j%2], i*30, j*30);
          count++;
          var num = bombeAdiacenti(i,j);
          switch(num) {
            case 0:
              clearArea(i,j);
            case 1:
              fill(0,128,255);
              break;
            case 2:
              fill(0,200,0);
              break;
            case 3:
              fill(255,0,0);
              break;
            case 4:
              fill(163,73,164);
              break;
            case 5:
              fill(128,128,0);
              break;
            case 6:
              fill(0,255,255);
              break;
            case 7:
              fill(0,0,0);
              break;
          }
          if(num != 0) {
            textSize(24);
            text(num, (i*30) + 8, (j*30) + 24);
          }
        }
      }
    }
  }
  if(count == numCaselleVuote)
    vinto();
}

function restart() {
  creaBombe();
  won = false;
  lost = false;
  start = false;
  numFlag = 0;
  t.stop();
  t.running = false;
  t.startTime = 0;
  t.stopTime = 0;
}

function creaBombe() {
  numBombe = 99;
  for(var i = 0; i < (numCaselleX); i++) {
    for(var j = 0; j < (numCaselleY); j++) {
      c[i][j] = new Casella(i*sizeCasella, j*sizeCasella, false);
      c[i][j].scoperta = false;
      c[i][j].flag = false;
      c[i][j].perso = false;
    }
  }
  while(numBombe > 0) {
    var i = parseInt(random(0, numCaselleX));
    var j = parseInt(random(0, numCaselleY));
    if(!c[i][j].bomba) {
      c[i][j].bomba = true;
      numBombe--;
    }
  }
}