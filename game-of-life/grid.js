const { Point } = require("./point");

class Grid {
  constructor({width: width=0, height: height=width, defaultValue: defaultValue=null} = {}) {
    if (typeof width != "number" || typeof height != "number") {
      throw new TypeError("Error: invalid width or height");
    }
    
    width = Math.trunc(width);
    height = Math.trunc(height);

    if (width < 0 || height < 0) {
      throw new RangeError("Error: invalid width or height")
    }

    this.width = width;
    this.height = height;
    this.content = [];

    for (let i = 0; i < height; i++) {
      this.content.push([]);
      for (let j = 0; j < width; j++) {
        this.content[i].push(defaultValue);
      }
    }
  }

  getValueAt(point) {
    if (!this.contains(point)) {
      throw RangeError("Error: unable to get value at ", point);
    }

    return this.content[point.y][point.x];
  }

  setValueAt(point, value) {
    point.x = Math.trunc(point.x);
    point.y = Math.trunc(point.y);

    if (!this.contains(point)) {
      throw new RangeError("Error: unable to set value at ", point);
    }

    this.content[point.y][point.x] = value;

    return this.content;
  }

  contains(point) {
    let withinXBounds = point.x < this.width  && point.x >= 0;
    let withinYBounds = point.y < this.height && point.y >= 0;

    return withinXBounds && withinYBounds;
  }

  isEqualTo(otherGrid) {

    let isEqual = true;
    if (!(otherGrid instanceof Grid)) isEqual = false;
    for (let point of this) {
      if (this.getValueAt(point) != otherGrid.getValueAt(point)) isEqual = false;
    }

     return isEqual;
  }
}

Grid.prototype[Symbol.iterator] = function() {
  return new GridIterator(this);
};

class GridIterator {

  constructor(grid) {
    this.x = 0;
    this.y = 0;
    this.grid = grid;
  }

  next() {
    if (this.y == this.grid.height) return {done: true};
    
    let point = new Point({x: this.x, y: this.y});
    this.x++;
    if (this.x == this.grid.width) {
      this.x = 0;
      this.y++;
    }

    return {value: point, done: false};
  }
}

module.exports = { Grid, GridIterator };
