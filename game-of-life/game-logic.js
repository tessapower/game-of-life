const { Grid } = require('./grid');

function isAlive(point, grid) {
  return grid.getValueAt(point);
}

function countAliveNeighbors(point, grid) {
  let neighbors = point.neighbors;
  let count = 0;
  for (let neighbor of neighbors) {
    if (grid.contains(neighbor) && isAlive(neighbor, grid)) count++;
  }
  return count;
}

function nextStateAtPoint(point, grid) {
  let aliveNeighbors = countAliveNeighbors(point, grid);
  let alive = isAlive(point, grid);

  if (alive && (aliveNeighbors < 2 || aliveNeighbors > 3)) return false;
  if (!alive && aliveNeighbors == 3) return true;

  return grid.getValueAt(point);
}

function nextState(grid) {
  let nextGrid = new Grid({width: grid.width, height: grid.height});
  let nextValue;
  for (let point of grid) {
    nextValue = nextStateAtPoint(point, grid);
    nextGrid.setValueAt(point, nextValue);
  }
  
  return nextGrid;
}

exports.isAlive = isAlive;
exports.countAliveNeighbors = countAliveNeighbors;
exports.nextStateAtPoint = nextStateAtPoint;
exports.nextState = nextState;
