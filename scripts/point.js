class Point
{
  /**
 * Represents a 2D point with an x and y coordinate.
 *
 * @constructor
 * @param {number} x - the integer x-coordinate of the point.
 * @param {number} y - the integer y-coordinate of the point.
 */
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

  /**
   * Returns an array of points which are the vertical, horizontal, and diagonal
   * neighbors of the point, not including the point itself. The entries of the
   * array appear in this order:
   * [ top-left, up, top-right, left, right, bottom-left, down, bottom-right ]
   */
  get neighbors() {
    return [this.topLeft,    this.up,   this.topRight,   
            this.left,     /* this */   this.right,
            this.bottomLeft, this.down, this.bottomRight];
  }
  
  /**
   * Returns a new point with the coordinates one up from the point.
   */
  get up() {
    return new Point({x: this.x, y: this.y + 1});
  }

  /**
   * Returns a new point with the coordinates one to the right and one up from
   * the point.
   */
  get topRight() {
    return new Point({x: this.x + 1, y: this.y + 1});
  }

  /**
   * Returns a new point with the coordinates one to the right of the point.
   */
  get right() {
    return new Point({x: this.x + 1, y: this.y});
  }

  /**
   * Returns a new point with the coordinates one to the right and one down from
   * the point.
   */
  get bottomRight() {
    return new Point({x: this.x + 1, y: this.y - 1});
  }

  /**
   * Returns a new point with the coordinates one down from the point.
   */
  get down() {
    return new Point({x: this.x, y: this.y - 1});
  }

  /**
   * Returns a new point with the coordinates one to the left and one down from
   * the point.
   */
  get bottomLeft() {
    return new Point({x: this.x - 1, y: this.y - 1});
  }

  /**
   * Returns a new point with the coordinates one to the left of the point.
   */
  get left() {
    return new Point({x: this.x - 1, y: this.y });
  }
  
  /**
   * Returns a new point with the coordinates one to the left and one up from
   * the point.
   */
  get topLeft() {
    return new Point({x: this.x - 1, y: this.y + 1});
  }
}

module.exports = { Point };
