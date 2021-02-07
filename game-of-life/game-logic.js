const { Grid } = require('./grid');

function isAlive(point, grid) {
  return grid.getValueAt(point) == "x";
}

function setIsAlive(point, grid, isAlive) {
  grid.setValueAt(point, isAlive ? "x" : " ");
}

function numAliveNeighbors(point, grid) {
  let neighbors = point.neighbors;
  let count = 0;
  for (let neighbor of neighbors) {
    if (grid.contains(neighbor) && isAlive(neighbor, grid)) count++;
  }

  return count;
}

function willPointLive(point, grid) {
  let aliveNeighbors = numAliveNeighbors(point, grid);
  let alive = isAlive(point, grid);

  if (alive && (aliveNeighbors < 2 || aliveNeighbors > 3)) alive = false;
  if (!alive && aliveNeighbors == 3) alive = true;

  return alive;
}

function nextState(grid) {
  let nextGrid = new Grid({width: grid.width, height: grid.height});
  for (let point of grid) {
    setIsAlive(point, nextGrid, willPointLive(point, grid));
  }
  
  return nextGrid;
}

exports.isAlive = isAlive;
exports.numAliveNeighbors = numAliveNeighbors;
exports.willPointLive = willPointLive;
exports.nextState = nextState;
