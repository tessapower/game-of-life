class Point {
  constructor({x: x, y: y}) {
    if (typeof x == "number" && typeof y == "number"){
      x = Math.trunc(x);
      y = Math.trunc(y);
      this.x = x;
      this.y = y;
    } else {
      throw new Error("Error: point can only consist of numbers");
    }
  }

  get neighbors() {
    return [this.up,       this.down,
            this.left,     this.right,
            this.topLeft,  this.bottomLeft,
            this.topRight, this.bottomRight];
  }
  
  get up() {
    return new Point({x: this.x, y: this.y + 1});
  }

  get topRight() {
    return new Point({x: this.x + 1, y: this.y + 1});
  }

  get right() {
    return new Point({x: this.x + 1, y: this.y});
  }

  get bottomRight() {
    return new Point({x: this.x + 1, y: this.y - 1});
  }

  get down() {
    return new Point({x: this.x, y: this.y - 1});
  }

  get bottomLeft() {
    return new Point({x: this.x - 1, y: this.y - 1});
  }

  get left() {
    return new Point({x: this.x - 1, y: this.y });
  }
  
  get topLeft() {
    return new Point({x: this.x - 1, y: this.y + 1});
  }
}

module.exports = { Point };
