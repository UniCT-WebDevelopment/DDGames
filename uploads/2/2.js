
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
        let elapsed;
        if (this.running) {
             elapsed = (millis() - this.startTime);
        }
        else {
            elapsed = (this.stopTime - this.startTime);
        }
        return elapsed;
    }
  second() {
      return (this.getElapsedTime() / 1000) % 60;
    }
  minute() {
      return (this.getElapsedTime() / (1000*60)) % 60;
    }
}

class Node {

  constructor() {
    this.value = null;
    this.next = null;
    this.parent = null;

    this.gCost = null;
    this.hCost = null;
  }

  getFCost() {
    return this.gCost + this.hCost;
  }
}

class LinkedList {
  constructor(size) {
    this.size = size
    this.array = new Array(this.size);
    this.count = 0;
  }

  add(n) {
    if(this.count < this.size) {
      this.array[this.count++] = n;
    }
  }

  remove(n) {
    let index = null;
    for(let i = 0; i < this.count; i++) {
      if(this.array[i] == n) {
        index = i;
      }
    }
    if(index != null) {
      for(let i = index; i < this.count-1; i++) {
        this.array[i] = this.array[i+1];
      }
      this.count--;
    }
  }

  getSize() {return this.count;}

  get(i) {
    return this.array[i];
  }

  indexOf(n) {
    for(let i = 0; i < this.count; i++) {
      if(this.array[i] == n) {
        return i;
      }
    }
    return -1;
  }

  contains(n) {
    if(this.indexOf(n) != -1) {
      return true;
    }
    else {
      return false;
    }
  }

}

class List {

  constructor() {this.head = null;}

  insertValue(val) {
    let nw = new Node().value = val;
    nw.next = this.head;
    this.head = nw;
  }

  insertNode(n) {
    let nw = new Node();
    nw.value = n.value;
    nw.next = this.head;
    this.head = nw;
  }

}

class Tile {

  constructor(x, y, obstacle) {
    this.x = x;
    this.y = y;
    this.obstacle = obstacle;
    this.left = null;
    this.up = null;
    this.right = null;
    this.down = null;
  }

  display() {
    if (!this.obstacle) {
      fill(255, 50);
      noStroke();
      rect(this.x, this.y, side, side);
    } else {
     fill(0);
     noStroke();
     rect(this.x, this.y, side, side);
     }
  }

}

function getDistance(a, b) {
  return sqrt(pow(a.x + side/2 - b.x + side/2, 2) + pow(a.y + side/2 - b.y + side/2, 2));
}

class Grid {
  constructor() {
    var map = new Array(vTiles);
    for(let i = 0; i < vTiles; i++) {
      map[i] = new Array(hTiles);
      for(let j = 0; j < hTiles; j++) {
        map[i][j] = true;
      }
    }
    {
      map[1][0] = true;
      map[1][1] = false;
      map[1][2] = false;
      map[1][3] = false;
      map[1][4] = false;
      map[1][5] = false;
      map[1][6] = false;
      map[1][7] = false;
      map[1][8] = false;
      map[1][9] = true;
      map[1][10] = false;
      map[1][11] = false;
      map[1][12] = false;
      map[1][13] = false;
      map[1][14] = false;
      map[1][15] = false;
      map[1][16] = false;
      map[1][17] = false;
      map[1][18] = true;
    }
    {
      map[2][0] = true;
      map[2][1] = false;
      map[2][2] = true;
      map[2][3] = true;
      map[2][4] = false;
      map[2][5] = true;
      map[2][6] = true;
      map[2][7] = true;
      map[2][8] = false;
      map[2][9] = true;
      map[2][10] = false;
      map[2][11] = true;
      map[2][12] = true;
      map[2][13] = true;
      map[2][14] = false;
      map[2][15] = true;
      map[2][16] = true;
      map[2][17] = false;
      map[2][18] = true;
    }
    {
      map[3][0] = true;
      map[3][1] = false;
      map[3][2] = true;
      map[3][3] = true;
      map[3][4] = false;
      map[3][5] = true;
      map[3][6] = true;
      map[3][7] = true;
      map[3][8] = false;
      map[3][9] = true;
      map[3][10] = false;
      map[3][11] = true;
      map[3][12] = true;
      map[3][13] = true;
      map[3][14] = false;
      map[3][15] = true;
      map[3][16] = true;
      map[3][17] = false;
      map[3][18] = true;
    }
    {
      map[4][0] = true;
      map[4][1] = false;
      map[4][2] = false;
      map[4][3] = false;
      map[4][4] = false;
      map[4][5] = false;
      map[4][6] = false;
      map[4][7] = false;
      map[4][8] = false;
      map[4][9] = false;
      map[4][10] = false;
      map[4][11] = false;
      map[4][12] = false;
      map[4][13] = false;
      map[4][14] = false;
      map[4][15] = false;
      map[4][16] = false;
      map[4][17] = false;
      map[4][18] = true;
    }
    {
      map[5][0] = true;
      map[5][1] = false;
      map[5][2] = true;
      map[5][3] = true;
      map[5][4] = false;
      map[5][5] = true;
      map[5][6] = false;
      map[5][7] = true;
      map[5][8] = true;
      map[5][9] = true;
      map[5][10] = true;
      map[5][11] = true;
      map[5][12] = false;
      map[5][13] = true;
      map[5][14] = false;
      map[5][15] = true;
      map[5][16] = true;
      map[5][17] = false;
      map[5][18] = true;
    }
    {
      map[6][0] = true;
      map[6][1] = false;
      map[6][2] = false;
      map[6][3] = false;
      map[6][4] = false;
      map[6][5] = true;
      map[6][6] = false;
      map[6][7] = false;
      map[6][8] = false;
      map[6][9] = true;
      map[6][10] = false;
      map[6][11] = false;
      map[6][12] = false;
      map[6][13] = true;
      map[6][14] = false;
      map[6][15] = false;
      map[6][16] = false;
      map[6][17] = false;
      map[6][18] = true;
    }
    {
      map[7][0] = true;
      map[7][1] = true;
      map[7][2] = true;
      map[7][3] = true;
      map[7][4] = false;
      map[7][5] = true;
      map[7][6] = true;
      map[7][7] = true;
      map[7][8] = false;
      map[7][9] = true;
      map[7][10] = false;
      map[7][11] = true;
      map[7][12] = true;
      map[7][13] = true;
      map[7][14] = false;
      map[7][15] = true;
      map[7][16] = true;
      map[7][17] = true;
      map[7][18] = true;
    }
    {
      map[8][0] = true;
      map[8][1] = true;
      map[8][2] = true;
      map[8][3] = true;
      map[8][4] = false;
      map[8][5] = true;
      map[8][6] = false;
      map[8][7] = false;
      map[8][8] = false;
      map[8][9] = false;
      map[8][10] = false;
      map[8][11] = false;
      map[8][12] = false;
      map[8][13] = true;
      map[8][14] = false;
      map[8][15] = true;
      map[8][16] = true;
      map[8][17] = true;
      map[8][18] = true;
    }
    {
      map[9][0] = true;
      map[9][1] = true;
      map[9][2] = true;
      map[9][3] = true;
      map[9][4] = false;
      map[9][5] = true;
      map[9][6] = false;
      map[9][7] = true;
      map[9][8] = true;
      map[9][9] = true;
      map[9][10] = true;
      map[9][11] = true;
      map[9][12] = false;
      map[9][13] = true;
      map[9][14] = false;
      map[9][15] = true;
      map[9][16] = true;
      map[9][17] = true;
      map[9][18] = true;
    }
    {
      map[10][0] = false;
      map[10][1] = false;
      map[10][2] = false;
      map[10][3] = false;
      map[10][4] = false;
      map[10][5] = false;
      map[10][6] = false;
      map[10][7] = true;
      map[10][8] = true;
      map[10][9] = true;
      map[10][10] = true;
      map[10][11] = true;
      map[10][12] = false;
      map[10][13] = false;
      map[10][14] = false;
      map[10][15] = false;
      map[10][16] = false;
      map[10][17] = false;
      map[10][18] = false;
    }
    {
      map[11][0] = true;
      map[11][1] = true;
      map[11][2] = true;
      map[11][3] = true;
      map[11][4] = false;
      map[11][5] = true;
      map[11][6] = false;
      map[11][7] = true;
      map[11][8] = true;
      map[11][9] = true;
      map[11][10] = true;
      map[11][11] = true;
      map[11][12] = false;
      map[11][13] = true;
      map[11][14] = false;
      map[11][15] = true;
      map[11][16] = true;
      map[11][17] = true;
      map[11][18] = true;
    }
    {
      map[12][0] = true;
      map[12][1] = true;
      map[12][2] = true;
      map[12][3] = true;
      map[12][4] = false;
      map[12][5] = true;
      map[12][6] = false;
      map[12][7] = false;
      map[12][8] = false;
      map[12][9] = false;
      map[12][10] = false;
      map[12][11] = false;
      map[12][12] = false;
      map[12][13] = true;
      map[12][14] = false;
      map[12][15] = true;
      map[12][16] = true;
      map[12][17] = true;
      map[12][18] = true;
    }
    {
      map[13][0] = true;
      map[13][1] = true;
      map[13][2] = true;
      map[13][3] = true;
      map[13][4] = false;
      map[13][5] = true;
      map[13][6] = false;
      map[13][7] = true;
      map[13][8] = true;
      map[13][9] = true;
      map[13][10] = true;
      map[13][11] = true;
      map[13][12] = false;
      map[13][13] = true;
      map[13][14] = false;
      map[13][15] = true;
      map[13][16] = true;
      map[13][17] = true;
      map[13][18] = true;
    }
    {
      map[14][0] = true;
      map[14][1] = false;
      map[14][2] = false;
      map[14][3] = false;
      map[14][4] = false;
      map[14][5] = false;
      map[14][6] = false;
      map[14][7] = false;
      map[14][8] = false;
      map[14][9] = true;
      map[14][10] = false;
      map[14][11] = false;
      map[14][12] = false;
      map[14][13] = false;
      map[14][14] = false;
      map[14][15] = false;
      map[14][16] = false;
      map[14][17] = false;
      map[14][18] = true;
    }
    {
      map[15][0] = true;
      map[15][1] = false;
      map[15][2] = true;
      map[15][3] = true;
      map[15][4] = false;
      map[15][5] = true;
      map[15][6] = true;
      map[15][7] = true;
      map[15][8] = false;
      map[15][9] = true;
      map[15][10] = false;
      map[15][11] = true;
      map[15][12] = true;
      map[15][13] = true;
      map[15][14] = false;
      map[15][15] = true;
      map[15][16] = true;
      map[15][17] = false;
      map[15][18] = true;
    }
    {
      map[16][0] = true;
      map[16][1] = false;
      map[16][2] = false;
      map[16][3] = true;
      map[16][4] = false;
      map[16][5] = false;
      map[16][6] = false;
      map[16][7] = false;
      map[16][8] = false;
      map[16][9] = false;
      map[16][10] = false;
      map[16][11] = false;
      map[16][12] = false;
      map[16][13] = false;
      map[16][14] = false;
      map[16][15] = true;
      map[16][16] = false;
      map[16][17] = false;
      map[16][18] = true;
    }
    {
      map[17][0] = true;
      map[17][1] = true;
      map[17][2] = false;
      map[17][3] = true;
      map[17][4] = false;
      map[17][5] = true;
      map[17][6] = false;
      map[17][7] = true;
      map[17][8] = true;
      map[17][9] = true;
      map[17][10] = true;
      map[17][11] = true;
      map[17][12] = false;
      map[17][13] = true;
      map[17][14] = false;
      map[17][15] = true;
      map[17][16] = false;
      map[17][17] = true;
      map[17][18] = true;
    }
    {
      map[18][0] = true;
      map[18][1] = false;
      map[18][2] = false;
      map[18][3] = false;
      map[18][4] = false;
      map[18][5] = true;
      map[18][6] = false;
      map[18][7] = false;
      map[18][8] = false;
      map[18][9] = true;
      map[18][10] = false;
      map[18][11] = false;
      map[18][12] = false;
      map[18][13] = true;
      map[18][14] = false;
      map[18][15] = false;
      map[18][16] = false;
      map[18][17] = false;
      map[18][18] = true;
    }
    {
      map[19][0] = true;
      map[19][1] = false;
      map[19][2] = true;
      map[19][3] = true;
      map[19][4] = true;
      map[19][5] = true;
      map[19][6] = true;
      map[19][7] = true;
      map[19][8] = false;
      map[19][9] = true;
      map[19][10] = false;
      map[19][11] = true;
      map[19][12] = true;
      map[19][13] = true;
      map[19][14] = true;
      map[19][15] = true;
      map[19][16] = true;
      map[19][17] = false;
      map[19][18] = true;
    }
    {
      map[20][0] = true;
      map[20][1] = false;
      map[20][2] = false;
      map[20][3] = false;
      map[20][4] = false;
      map[20][5] = false;
      map[20][6] = false;
      map[20][7] = false;
      map[20][8] = false;
      map[20][9] = false;
      map[20][10] = false;
      map[20][11] = false;
      map[20][12] = false;
      map[20][13] = false;
      map[20][14] = false;
      map[20][15] = false;
      map[20][16] = false;
      map[20][17] = false;
      map[20][18] = true;
    }
    this.t = new Array(vTiles);
   for(let i = 0; i < vTiles; i++) {
     this.t[i] = new Array(hTiles);
     for(let j = 0; j < hTiles; j++) {
       this.t[i][j] = new Tile(j*side-23, i*side+54, map[i][j]);
     }
   }

   for(let i = 0; i < vTiles; i++) {
     for(let j = 0; j < hTiles; j++) {
       if(i > 0)
         this.t[i][j].up = this.t[i-1][j];
       if(i < vTiles-1)
         this.t[i][j].down = this.t[i+1][j];
       if(j > 0)
         this.t[i][j].left = this.t[i][j-1];
       if(j < hTiles-1)
         this.t[i][j].right = this.t[i][j+1];
     }
   }
   this.t[10][0].left = new Tile(this.t[10][0].x - side, this.t[10][0].y, false);
   this.t[10][0].left.up = new Tile(this.t[10][0].left.x, this.t[10][0].left.y - side, false);
   this.t[10][0].left.down = new Tile(this.t[10][0].left.x, this.t[10][0].left.y + side, false);

   this.t[10][18].right = new Tile(this.t[10][18].x - side, this.t[10][18].y, false);
   this.t[10][18].right.up = new Tile(this.t[10][18].x, this.t[10][18].y - side, false);
   this.t[10][18].right.down = new Tile(this.t[10][18].x, this.t[10][18].y + side, false);
  }

  display() {
    for(let i = 0; i < vTiles; i++) {
      for(let j = 0; j < hTiles; j++) {
        this.t[i][j].display();
      }
    }
  }
}

class Path {

  constructor(grid, start, finish) {
    this.tiles = new LinkedList(418);
    for(let i = 0; i < vTiles; i++) {
      for(let j = 0; j < hTiles; j++) {
        let nw = new Node();
        nw.value = grid.t[i][j];
        this.tiles.add(nw);
        if(grid.t[i][j] == start) {
          this.startNode = nw;
        }
        if(grid.t[i][j] == finish) {
          this.endNode = nw;
        }
      }
    }
    this.open = new LinkedList(418);
    this.closed = new LinkedList(418);
    this.open.add(this.startNode);

    this.path = new List();
    this.createPath();
  }

  createPath() {
    while(this.open.getSize() > 0) {
      let current = this.open.get(0);
      for(let i = 1; i < this.open.getSize(); i++) {
        let iter = this.open.get(i);
        if(iter.getFCost() < current.getFCost() ||
          (iter.getFCost() == current.getFCost() ||
           iter.hCost < current.hCost)) {
          current = iter;
        }
      }
      this.open.remove(current);
      this.closed.add(current);

      if(current.value == this.endNode.value) {
        this.retracePath();
        return;
      }

      let neighbour = new Array(4);
      neighbour[0] = this.tiles.get(this.tiles.indexOf(current)-1);
      neighbour[1] = this.tiles.get(this.tiles.indexOf(current)+1);
      neighbour[2] = this.tiles.get(this.tiles.indexOf(current)-hTiles);
      neighbour[3] = this.tiles.get(this.tiles.indexOf(current)+hTiles);

      for(let i = 0; i < 4; i++) {
        if(neighbour[i] != null) {
          if(neighbour[i].value.obstacle || this.closed.contains(neighbour[i])) {}
          else {
            let newMovementCostToNeighbour = current.gCost + this.getDistance(current, neighbour[i]);
            if(newMovementCostToNeighbour < neighbour[i].gCost || !this.open.contains(neighbour[i])) {
              neighbour[i].gCost = newMovementCostToNeighbour;
              neighbour[i].hCost = this.getDistance(neighbour[i], this.endNode);
              neighbour[i].parent = current;

              if(!this.open.contains(neighbour[i])) {
                this.open.add(neighbour[i]);
              }
            }
          }
        }
      }
    }
  }

  retracePath() {
    let iter = this.endNode;
    while(iter != null) {
      this.path.insertNode(iter);
      iter = iter.parent;
    }
  }

  getDistance(a, b) {
    let dstX = Math.abs(a.value.x - b.value.x);
    let dstY = Math.abs(a.value.y - b.value.y);

    if(dstX > dstY)
      return 14*dstY + 10*(dstX - dstY);
    return 14*dstX + 10*(dstY - dstX);
  }

  display() {
    let iter = this.path.head;
    while(iter != null) {
      fill(255, 0, 0);
      noStroke();
      rect(iter.value.x, iter.value.y, side, side);
      iter = iter.next;
    }
  }

}

const Direction = {
    UP          :0,
    DOWN        :1,
    LEFT        :2,
    RIGHT       :3
};
class Pacman {
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.r1 = PI/6;
    this.r2 = 11*PI/6;
    this.v = 0.03;
    this.d = Direction.RIGHT;
    this.offset = 0;
    this.currentTile = null;
  }

  display() {
    if(this.x < 11 || this.x > 589) {}
    else {
      this.currentTile = g.t[(int)((this.y-63)/side)][(int)((this.x+20)/side)];
    }
    noStroke();
    fill(255, 255, 0);
    arc(this.x, this.y, this.radius, this.radius, this.r1 - this.offset, this.r2 - this.offset);
    switch(this.d) {
    case 0:
      this.offset = PI/2;
      fill(0);
      circle(this.x+10, this.y-3, this.radius/8);
      break;

    case 1:
      this.offset = 3*PI/2;
      fill(0);
      circle(this.x+10, this.y+3, this.radius/8);
      break;

    case 2:
      this.offset = PI;
      fill(0);
      circle(this.x-5, this.y-8, this.radius/8);
      break;

    case 3:
      this.offset = 0;
      fill(0);
      circle(this.x+2, this.y-8, this.radius/8);
      break;
    }
    this.r1 += this.v;
    this.r2 -= this.v;
    if ((this.v > 0) && (this.r1 >= PI/6)) {
      this.v = -this.v;
    }
    if ((this.v < 0) && (this.r1 <= 0)) {
      this.v = -this.v;
    }

    if (this.x > width + this.radius) {
      this.x = 0 - this.radius;
    }
    if (this.x < 0 - this.radius) {
      this.x = width + this.radius;
    }
  }

  moveW() {
    if(this.currentTile.up.obstacle && this.y - this.radius/2 - 4 < this.currentTile.up.y + side) {}
    else {
      if(this.currentTile.up.left.obstacle && this.x - this.radius/2 < this.currentTile.up.left.x + side) {}
      else {
        if(this.currentTile.up.right.obstacle && this.x + this.radius/2 > this.currentTile.up.right.x) {}
        else {
          this.y -= 2;
          this.d = Direction.UP;
        }
      }
    }
  }
  moveS() {
    if(this.currentTile.down.obstacle && this.y + this.radius/2 + 4 > this.currentTile.down.y) {}
    else {
      if(this.currentTile.down.left.obstacle && this.x - this.radius/2 < this.currentTile.down.left.x + side) {}
      else {
        if(this.currentTile.down.right.obstacle && this.x + this.radius/2 > this.currentTile.down.right.x) {}
        else {
          this.y += 2;
          this.d = Direction.DOWN;
        }
      }
    }
  }
  moveA() {
    if(this.currentTile.left.obstacle && this.x - this.radius/2 - 4 < this.currentTile.left.x + side) {}
    else {
      if(this.currentTile.left.up.obstacle && this.y - this.radius/2 < this.currentTile.left.up.y + side) {}
      else {
        if(this.currentTile.left.down.obstacle && this.y + this.radius/2 > this.currentTile.left.down.y) {}
        else {
          this.x -= 2;
          this.d = Direction.LEFT;
        }
      }
    }
  }
  moveD() {
    if(this.currentTile.right.obstacle && this.x + this.radius/2 + 4 > this.currentTile.right.x) {}
    else {
      if(this.currentTile.right.up.obstacle && this.y - this.radius/2 < this.currentTile.right.up.y + side) {}
      else {
        if(this.currentTile.right.down.obstacle && this.y + this.radius/2 > this.currentTile.right.down.y) {}
        else {
          this.x += 2;
          this.d = Direction.RIGHT;
        }
      }
    }
  }
}


class Ghost {

  constructor(_x, _y, _Im) {
    this.x = _x;
    this.y = _y;
    this.speed = 2;
    this.v = 1;
    this.Im = _Im;
    this.Im.resize(29, 29);
    this.c = 0;
    this.r = 0;
    this.left = false;
    this.right = false;
    this.up = false;
    this.down = false;
    this.middle = true;
    this.currentTile = null;
    this.scatterPath = null;
    this.chasePath = null;
    this.nextPath = true;
  }

  display() {
    if (this.x < 11 || this.x > 589) {
    } else {
      this.currentTile = g.t[(int)((this.y-63)/side)][(int)((this.x+20)/side)];
    }
    image(this.Im, this.x-14, this.y-14);
    if (this.x > width + 29) {
      this.x = 0 - 29;
    }
    if (this.x < 0 - 29) {
      this.x = width + 29;
    }
  }

  movement() {
    if (this.left) {
      this.moveA();
    } else if (this.right) {
      this.moveD();
    } else if (this.up) {
      this.moveW();
    } else if (this.down) {
      this.moveS();
    }
  }

  scatter(a, b) {
    if (this.middle) {
      this.left = false;
      this.right = false;
      this.up = false;
      this.down = false;
      if (this.x < 300) {
        this.x += 1;
      } else
        if (this.x > 300) {
          this.x -= 1;
        } else
          if (this.y > 343) {
            this.y -= 2;
          } else {
            this.middle = false;
          }
    } else {
      if (this.nextPath) this.scatterPath = new Path(g, this.currentTile, a);
      else this.scatterPath = new Path(g, this.currentTile, b);
      if (this.nextPath && this.currentTile == a) {
        this.scatterPath = new Path(g, this.currentTile, b);
        this.nextPath = false;
      }
      if (!this.nextPath && this.currentTile == b) {
        this.scatterPath = new Path(g, this.currentTile, a);
        this.nextPath = true;
      }
      this.followPath(this.scatterPath);
    }
  }

  chase(pacman) {
    if (this.middle) {
      if (this.x < width/2) {
        this.x += 1;
      } else
        if (this.x > width/2) {
          this.x -= 1;
        } else
          if (this.y > 343) {
            this.y -= 1;
          } else {
            this.middle = false;
          }
    } else {
      this.chasePath = new Path(g, this.currentTile, pacman);
      this.followPath(this.chasePath);
    }
  }

  followPath(p) {
    let iter = p.path.head.next;
    if(iter != null) {
      if (this.currentTile.left == iter.value) {
        if (this.y < this.currentTile.y + side/2 - 1) {
          this.left = false;
          this.right = false;
          this.up = false;
          this.down = true;
        } else if (this.y > this.currentTile.y + side/2 + 1) {
          this.left = false;
          this.right = false;
          this.up = true;
          this.down = false;
        } else {
          this.left = true;
          this.right = false;
          this.up = false;
          this.down = false;
        }
      }

      if (this.currentTile.right == iter.value) {
        if (this.y < this.currentTile.y + side/2 - 1) {
          this.left = false;
          this.right = false;
          this.up = false;
          this.down = true;
        } else if (this.y > this.currentTile.y + side/2 + 1) {
          this.left = false;
          this.right = false;
          this.up = true;
          this.down = false;
        } else {
          this.left = false;
          this.right = true;
          this.up = false;
          this.down = false;
        }
      }

      if (this.currentTile.up == iter.value) {
        if (this.x < this.currentTile.x + side/2 - 1) {
          this.left = false;
          this.right = true;
          this.up = false;
          this.down = false;
        } else if (this.x > this.currentTile.x + side/2 + 1) {
          this.left = true;
          this.right = false;
          this.up = false;
          this.down = false;
        } else {
          this.left = false;
          this.right = false;
          this.up = true;
          this.down = false;
        }
      }
      if (this.currentTile.down == iter.value) {
        if (this.x < this.currentTile.x + side/2 - 1) {
          this.left = false;
          this.right = true;
          this.up = false;
          this.down = false;
        } else if (this.x > this.currentTile.x + side/2 + 1) {
          this.left = true;
          this.right = false;
          this.up = false;
          this.down = false;
        } else {
          this.left = false;
          this.right = false;
          this.up = false;
          this.down = true;
        }
      }
    }
    if (p.path.head.value == this.currentTile)
      return true;
    return false;
  }

  cMovement() {
    if (this.middle) {
      if ((this.v > 0) && (this.y >= height/2 -10)) {
        this.v = -this.v;
      }
      if ((this.v < 0) && (this.y <= height/2 - 35)) {
        this.v = -this.v;
      }
      this.y += this.v;
    }
  }

  checkP(p) {
    let distance = sqrt( pow(p.x - this.x, 2) + pow(p.y - this.y, 2) );
    if (distance <= p.radius/2) {
      return true;
    } else {
      return false;
    }
  }

  moveA() {
    let move = true;
    if (this.y < this.currentTile.y + side/2 - 1 || this.y > this.currentTile.y + side/2 + 1) {
      move = false;
    }
    if (move) {
      this.x -= this.speed;
    }
  }
  moveD() {
    let move = true;
    if (this.y < this.currentTile.y + side/2 - 1 || this.y > this.currentTile.y + side/2 + 1) {
      move = false;
    }
    if (move) {
      this.x += this.speed;
    }
  }
  moveW() {
    let move = true;
    if (this.x < this.currentTile.x + side/2 - 1 || this.x > this.currentTile.x + side/2 + 1) {
      move = false;
    }
    if (move) {
      this.y -= this.speed;
    }
  }
  moveS() {
    let move = true;
    if (this.x < this.currentTile.x + side/2 - 1 || this.x > this.currentTile.x + side/2 + 1) {
      move = false;
    }
    if (move) {
      this.y += this.speed;
    }
  }
}

class Fruit {
  // float x, y, d;
  // boolean eaten = false;
  constructor(_x, _y) {
    this.x = _x;
    this.y = _y;
    this.d = 8;
    this.eaten = false;
  }

  display() {
    if(!this.eaten) {
      fill(255);
      noStroke();
      ellipse(this.x, this.y, this.d, this.d);
    }
  }

  checkFruit(p) {
    if (!this.eaten && p.x >= this.x-8 && p.x < this.x+8 && p.y >= this.y-8 && p.y < this.y+8) {
      this.eaten = true;
      score += 10;
    }
  }
}

var up, down, left, right;
var upKey, downKey, leftKey, rightKey;
var startGame;
var stop;
var score;
var hTiles = 19;
var vTiles = 22;
var side = 34;
var g;
var start;
var finish;
var inky, pinky, blinky, clyde;
var p;
var f;
var tInky, tPinky, tBlinky, tClyde;

var sfondo;
var won;
var inkyIMG;
var pinkyIMG;
var blinkyIMG;
var clydeIMG;
function preload() {
  sfondo = loadImage('./data/mapTMP.png');
  won = loadImage('./data/youwon.png');
  inkyIMG = loadImage('./data/inky.png');
  pinkyIMG = loadImage('./data/pinky.png');
  blinkyIMG = loadImage('./data/blinky.png');
  clydeIMG = loadImage('./data/clyde.png');
}

function setup() {
  var cnv = createCanvas(600, 860);
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  cnv.position(x,y);

  up = false;
  down = false;
  left = false;
  right = false;
  startGame = false;
  stop = false;
  score = 0;
  tInky = new Timer();
  tPinky = new Timer();
  tBlinky = new Timer();
  tClyde = new Timer();
  g = new Grid();
  f = new Array(183);
  let count = 0;
  for (let i = 0; i < vTiles; i++) {
    for (let j = 0; j < hTiles; j++) {
      if (!g.t[i][j].obstacle) {
        if ((i == 10) && (j < 4 || j > 14)) {
        } else {
          f[count++] = new Fruit(g.t[i][j].x+side/2, g.t[i][j].y+side/2);
        }
      }
    }
  }
  p = new Pacman(28, 411, 28);
  inky = new Ghost(300, height/2-80, inkyIMG);
  inky.middle = false;
  pinky = new Ghost(260, height/2-10, pinkyIMG);
  blinky = new Ghost(300, height/2-35, blinkyIMG);
  clyde = new Ghost(340, height/2-10, clydeIMG);
}

function draw() {
  background(0);
  image(sfondo, 0, 0);
  displayFruit();
  fill(255);
  textSize(26);
  text("SCORE: " + score, 30, 45);
  displayGhost();
  p.display();
  update();
  if (startGame && !stop) {
    if (!tInky.running) {
      tInky.start();
    }
    movementGhost();
  }
  checkWin();
  checkLose();
}

function displayFruit() {
  for (let i = 0; i < 183; i++) {
    f[i].display();
    f[i].checkFruit(p);
  }
}

function displayGhost() {
  inky.display();
  pinky.display();
  // console.log(pinky);
  blinky.display();
  clyde.display();
}

function movementGhost() {
  inky.movement();
  pinky.movement();
  blinky.movement();
  clyde.movement();

  if (tInky.second() > 25 && tInky.second() < 40) {
    inky.chase(p.currentTile);
  } else {
    if (tInky.second() > 40) {
      tInky.stop();
      tInky.startTime = tInky.stopTime;
      tInky.start();
    }
    inky.scatter(g.t[20][17], g.t[17][12]);
  }



  if (score >= 70) {
    if (!tBlinky.running) {
      tBlinky.start();
    }
    if (tBlinky.second() + tBlinky.minute()*60 > 15) {
      blinky.chase(p.currentTile);
    } else {
      blinky.scatter(g.t[1][17], g.t[4][14]);
    }
  } else {
    blinky.cMovement();
  }



  if (score > 140) {
    if (!tPinky.running) {
      tPinky.start();
    }
    if (tPinky.second() > 25 && tPinky.second() < 40) {
      pinky.chase(p.currentTile);
    } else {
      if (tPinky.second() > 40) {
        tPinky.stop();
        tPinky.startTime = tPinky.stopTime;
        tPinky.start();
      }
      pinky.scatter(g.t[2][1], g.t[3][4]);
    }
  } else {
    pinky.cMovement();
  }



  if (score > 210) {
    if (!tClyde.running) {
      tClyde.start();
    }
    if (tClyde.second() > 20 && tClyde.second() < 35) {
      clyde.chase(p.currentTile);
    } else {
      if (tClyde.second() > 40) {
        tClyde.stop();
        tClyde.startTime = tClyde.stopTime;
        tClyde.start();
      }
      clyde.scatter(g.t[20][1], g.t[17][6]);
    }
  } else {
    clyde.cMovement();
  }
}

function update() {
  if(!stop) {
    if(p.currentTile != null) {
      if (upKey) {
        if(!p.currentTile.up.obstacle) {
          if(p.x >= p.currentTile.x + side/2 - 6 && p.x <= p.currentTile.x + side/2 + 6) {
            p.x = p.currentTile.x+side/2;
            up = true;
            down = false;
            left = false;
            right = false;
            startGame = true;
          }
        }
        else {}
      }
      if (downKey) {
        if(!p.currentTile.down.obstacle) {
          if(p.x >= p.currentTile.x + side/2 - 6 && p.x <= p.currentTile.x + side/2 + 6) {
            p.x = p.currentTile.x+side/2;
            up = false;
            down = true;
            left = false;
            right = false;
            startGame = true;
          }
        }
      }
      if (leftKey) {
        if(!p.currentTile.left.obstacle) {
          if(p.y >= p.currentTile.y + side/2 - 6 && p.y <= p.currentTile.y + side/2 + 6) {
            p.y = p.currentTile.y+side/2;
            up = false;
            down = false;
            left = true;
            right = false;
            startGame = true;
          }
        }
      }
      if (rightKey) {
        if(!p.currentTile.right.obstacle) {
          if(p.y >= p.currentTile.y + side/2 - 6 && p.y <= p.currentTile.y + side/2 + 6) {
            p.y = p.currentTile.y+side/2;
            up = false;
            down = false;
            left = false;
            right = true;
            startGame = true;
          }
        }
      }
    }
    if (up)
      p.moveW();
    else if (down)
      p.moveS();
    else if (left)
      p.moveA();
    else if (right)
      p.moveD();
  }
}

function checkWin() {
  if (score >= 1830) {
    stop = true;
    let youwon = loadImage("youwon.png");
    youwon.resize((int)(width*2), height);
    image(youwon, 0-width/2, 0);
    fill(255);
    textSize(32);
    text("Credits: DD Games", width-280, height - 36);
  }
}

function checkLose() {
  if (inky.checkP(p) || blinky.checkP(p) || pinky.checkP(p) || clyde.checkP(p)) {
    stop = true;
    fill(255);
    textSize(26);
    text("GAME OVER!", 30, 830);
    if(second() % 2 == 0) {
      text("PRESS R TO RESTART", width/2, 830);
    }
  }
}

function keyPressed() {

  if(!stop) {
    if(keyCode == 38 || keyCode == 87) {
      upKey = true;
      downKey = false;
      leftKey = false;
      rightKey = false;
    }
    if(keyCode == 40 || keyCode == 83) {
      upKey = false;
      downKey = true;
      leftKey = false;
      rightKey = false;
    }
    if(keyCode == 37 || keyCode == 65) {
      upKey = false;
      downKey = false;
      leftKey = true;
      rightKey = false;
    }
    if(keyCode == 39 || keyCode == 68) {
      upKey = false;
      downKey = false;
      leftKey = false;
      rightKey = true;
    }
  } else {
    if (keyCode == 82) {
      setup();
    }
  }
}

function keyReleased() {
  if(keyCode == 38 || keyCode == 87) {
    upKey = false;
  }
  if(keyCode == 40 || keyCode == 83) {
    downKey = false;
  }
  if(keyCode == 37 || keyCode == 65) {
    leftKey = false;
  }
  if(keyCode == 39 || keyCode == 68) {
    rightKey = false;
  }
}
