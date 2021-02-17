const { Grid } = require("./grid");
const { Point } = require("./point");


/**
 * Returns a boolean representing if the cell at the point in the grid is alive
 * or not.
 *
 * @param {Point} point - A Point with an x and y coordinate, can be represented
 * as {x: x, y: y}.
 * @param {Grid} grid - A Grid where the value at each point indicates if the
 * cell is alive or dead.
 */
function isAlive(point, grid) {
  /*
   * Will return true (i.e. alive) if the value at the point in the grid is "x",
   * and false (i.e. dead) if the value is " ". You might expect this to be true
   * or false, but using "x" for true and " " for false makes it easier to read
   * and distinguish between the two states when testing and reading hardcoded
   * grids without having a huge impact on performance.
   */
  return grid.getValueAt(point) == "x";
}

/**
 * Sets if a cell at the point in the grid is alive or not.
 *
 * @param {Point} point - A Point with an x and y coordinate, can be represented
 * as {x: x, y: y}.
 * @param {Grid} grid - A Grid where the value at each point indicates if the
 * cell is alive or dead.
 * @param {boolean} isAlive - true: set cell to alive; false: set cell to dead.
 */
function setIsAlive(point, grid, isAlive) {
  grid.setValueAt(point, isAlive ? "x" : " ");
}

/**
 * Returns the number of cells surrounding the provided point in the provided
 * grid that are alive.
 *
 * @param {Point} point - A Point with an x and y coordinate, can be represented
 * as {x: x, y: y}.
 * @param {Grid} grid - A Grid where the value at each point indicates if the
 * cell is alive or dead.
 */
function numAliveNeighbors(point, grid) {
  let neighbors = point.neighbors;
  let count = 0;
  for (let neighbor of neighbors) {
    if (grid.contains(neighbor) && isAlive(neighbor, grid)) count++;
  }

  return count;
}

/**
 * Returns a boolean representing if a point will live on to the next generation.
 *
 * @param {Point} point - A Point with an x and y coordinate, can be represented
 * as {x: x, y: y}.
 * @param {Grid} grid - A Grid where the value at each point indicates if the
 * cell is alive or dead.
 */
function willPointLive(point, grid) {
  let aliveNeighbors = numAliveNeighbors(point, grid);
  let alive = isAlive(point, grid);

  if (alive && (aliveNeighbors < 2 || aliveNeighbors > 3)) alive = false;
  if (!alive && aliveNeighbors == 3) alive = true;

  return alive;
}

/**
 * Returns a new grid with the cells that lived on to the next generation from
 * the provided grid.
 *
 * @param {Point} point - A Point with an x and y coordinate, can be represented
 * as {x: x, y: y}.
 * @param {Grid} grid - A Grid where the value at each point indicates if the
 * cell is alive or dead.
 */
function nextState(grid) {
  let nextGrid = new Grid({width: grid.width, height: grid.height});
  for (let point of grid) {
    setIsAlive(point, nextGrid, willPointLive(point, grid));
  }
  
  return nextGrid;
}

/**
 * Returns a new grid where each cell has a random chance of being alive or dead.
 *
 * @param {Grid} grid
 */
function randomize(grid) {
  for (let point of grid) {
    setIsAlive(point, grid, (Math.random() > 0.7 ? true : false));
  }
  return grid;
}


exports.isAlive = isAlive;
exports.setIsAlive = setIsAlive;
exports.numAliveNeighbors = numAliveNeighbors;
exports.willPointLive = willPointLive;
exports.nextState = nextState;
exports.randomize = randomize;
