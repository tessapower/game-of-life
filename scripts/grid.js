const { Point } = require("./point");

class Grid {
  /**
   * Represents a grid of values.
   *
   * @param {number} width - the integer width of the grid; defaults to 0 if
   * not provided.
   * @param {number} height - the integer height of the grid; defaults to the
   * same integer as the width if not provided.
   * @param {any} defaultValue - the default value found at each point of the
   * grid; defaults to null if not provided.
   * @returns Grid
   */
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

  /**
   * Gets the value found in the grid at the given point.
   *
   * @param {Point} point - A Point with an x and y coordinate, can be
   * represented as {x: x, y: y}.
   * @returns Value found at given point in grid.
   */
  getValueAt(point) {
    if (!this.contains(point)) {
      throw RangeError("Error: unable to get value at ", point);
    }

    return this.content[point.y][point.x];
  }

  /**
   * Sets the value in the grid at the given point.
   *
   * @param {Point} point - A Point with an x and y coordinate, can be
   * represented as {x: x, y: y}.
   * @param {any} value - The value that should be set at the given point.
   * @returns Grid with new value set at the given point.
   */
  setValueAt(point, value) {
    point.x = Math.trunc(point.x);
    point.y = Math.trunc(point.y);

    if (!this.contains(point)) {
      throw new RangeError("Error: unable to set value at ", point);
    }

    this.content[point.y][point.x] = value;

    return this.content;
  }

  /**
   * Returns if the given point is within the bounds of the grid.
   *
   * @param {Point} point - A Point with an x and y coordinate, can be
   * represented as {x: x, y: y}.
   */
  contains(point) {
    let withinXBounds = point.x < this.width  && point.x >= 0;
    let withinYBounds = point.y < this.height && point.y >= 0;

    return withinXBounds && withinYBounds;
  }

  /**
   * Returns if two grids have the same width, height, and values.
   *
   * @param {Grid} otherGrid - The grid to compare to.
   */
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


/**
 * Provides an interface to loop over each entry in a grid row-by-row.
 * Can be used in the following ways:
 *
 *     grid.ForEach(point => foo(point));
 *     for (let point of grid) {
 *       bar(point.x);
 *     }
 *
 * A point can also be represented as {x, y}, e.g.
 *
 *     for (let {x, y} of grid) {
 *      if (x % 3 == 0 && y % 5 == 0) fizzBuzz();
 *     }
 */

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
