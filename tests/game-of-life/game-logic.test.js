const { Grid } = require('../../game-of-life/grid');
const { Point } = require('../../game-of-life/point');
const gameLogic = require('../../game-of-life/game-logic');

// isAlive() Tests

test('tests that isAlive() can return if a cell is alive or not correctly', () => {
  let grid = new Grid({width: 2});
  grid.content = [[ " ", "x" ],
                  [ "x", " " ]];
  
  let aliveCell = new Point({x: 1, y: 0});
  expect(gameLogic.isAlive(aliveCell, grid)).toBeTruthy;
  
  let deadCell  = new Point({x: 1, y: 1});
  expect(gameLogic.isAlive(deadCell, grid)).toBeFalsy;
});

// numAliveNeighbors() Tests

test('tests that alive neighbors of corner points in a grid can be counted correctly', () => {

  let grid = new Grid({width: 5});
  
                                                // Test Points
  grid.content = [[ "x", " ", " ", " ", "x" ],  // [x][ ][ ][ ][x]
                  [ " ", " ", " ", "x", " " ],  // [ ][ ][ ][ ][ ]
                  [ " ", " ", " ", " ", " " ],  // [ ][ ][ ][ ][ ]
                  [ "x", "x", " ", " ", "x" ],  // [ ][ ][ ][ ][ ]
                  [ "x", "x", " ", "x", "x" ]]; // [x][ ][ ][ ][x]
  
  let topLeft = new Point({x: 0, y: 0});
  expect(gameLogic.numAliveNeighbors(topLeft, grid)).toBe(0);
  
  let topRight = new Point({x: 4, y: 0});
  expect(gameLogic.numAliveNeighbors(topRight, grid)).toBe(1);
  
  let bottomRight = new Point({x: 4, y: 4});
  expect(gameLogic.numAliveNeighbors(bottomRight, grid)).toBe(2);
  
  let bottomLeft = new Point({x: 0, y: 4});
  expect(gameLogic.numAliveNeighbors(bottomLeft, grid)).toBe(3);
});

test('tests that alive neighbors of edge points in a grid can be counted correctly', () => {

  let grid = new Grid({width: 5, height: 6});
  
                                                // Test Points
  grid.content = [[ "x", " ", "x", "x", " " ],  // [ ][ ][x][ ][ ]
                  [ "x", " ", "x", "x", "x" ],  // [x][ ][ ][ ][x]
                  [ "x", " ", " ", "x", "x" ],  // [x][ ][ ][ ][ ]
                  [ " ", " ", " ", " ", " " ],  // [ ][ ][ ][ ][ ]
                  [ "x", " ", "x", "x", "x" ],  // [x][ ][ ][ ][ ]
                  [ " ", " ", "x", "x", "x" ]]; // [ ][ ][ ][x][ ]
  
  let edgePoint0Neighbors = new Point({x: 0, y: 4});
  expect(gameLogic.numAliveNeighbors(edgePoint0Neighbors, grid)).toBe(0);
  
  let edgePoint1Neighbors = new Point({x: 0, y: 2});
  expect(gameLogic.numAliveNeighbors(edgePoint1Neighbors, grid)).toBe(1);
  
  let edgePoint2Neighbors = new Point({x: 0, y: 1});
  expect(gameLogic.numAliveNeighbors(edgePoint2Neighbors, grid)).toBe(2);
  
  let edgePoint3Neighbors = new Point({x: 2, y: 0});
  expect(gameLogic.numAliveNeighbors(edgePoint3Neighbors, grid)).toBe(3);
  
  let edgePoint4Neighbors = new Point({x: 4, y: 1});
  expect(gameLogic.numAliveNeighbors(edgePoint4Neighbors, grid)).toBe(4);
  
  let edgePoint5Neighbors = new Point({x: 3, y: 5});
  expect(gameLogic.numAliveNeighbors(edgePoint5Neighbors, grid)).toBe(5);
});

test('tests that alive neighbors of points in a grid can be counted correctly', () => {

  let grid = new Grid({width: 6, height: 7});
                                                     // Test Points
  grid.content = [[ " ", " ", "x", " ", " ", "x" ],  // [ ][ ][ ][ ][ ][ ]
                  [ " ", "x", "x", "x", "x", " " ],  // [ ][x][x][ ][x][ ]
                  [ " ", " ", " ", " ", "x", "x" ],  // [ ][ ][ ][ ][x][ ]
                  [ "x", "x", " ", " ", "x", "x" ],  // [ ][x][ ][ ][x][ ]
                  [ " ", " ", " ", "x", "x", "x" ],  // [ ][ ][ ][ ][x][ ]
                  [ " ", "x", " ", "x", "x", "x" ],  // [ ][x][ ][ ][x][ ]
                  [ " ", " ", " ", "x", "x", "x" ]]; // [ ][ ][ ][ ][ ][ ]

  let pointWith0Neighbors = new Point({x: 1, y: 5});
  expect(gameLogic.numAliveNeighbors(pointWith0Neighbors, grid)).toBe(0);
  
  let pointWith1Neighbors = new Point({x: 1, y: 3});
  expect(gameLogic.numAliveNeighbors(pointWith1Neighbors, grid)).toBe(1);  
  
  let pointWith2Neighbors = new Point({x: 1, y: 1});
  expect(gameLogic.numAliveNeighbors(pointWith2Neighbors, grid)).toBe(2);
  
  let pointWith3Neighbors = new Point({x: 2, y: 1});
  expect(gameLogic.numAliveNeighbors(pointWith3Neighbors, grid)).toBe(3);
 
  let pointWith4Neighbors = new Point({x: 4, y: 1});
  expect(gameLogic.numAliveNeighbors(pointWith4Neighbors, grid)).toBe(4);
  
  let pointWith5Neighbors = new Point({x: 4, y: 2});
  expect(gameLogic.numAliveNeighbors(pointWith5Neighbors, grid)).toBe(5);

  let pointWith6Neighbors = new Point({x: 4, y: 3});
  expect(gameLogic.numAliveNeighbors(pointWith6Neighbors, grid)).toBe(6);

  let pointWith7Neighbors = new Point({x: 4, y: 4});
  expect(gameLogic.numAliveNeighbors(pointWith7Neighbors, grid)).toBe(7);

  let pointWith8Neighbors = new Point({x: 4, y: 5});
  expect(gameLogic.numAliveNeighbors(pointWith8Neighbors, grid)).toBe(8);
});

// willPointLive() & nextState() Tests

test('tests the next state of a single point can be determined correctly', () => {
  let grid = new Grid({width: 5});

                                                // Test Points
  grid.content = [[ "x", " ", "x", " ", " " ],  // [ ][ ][ ][ ][ ]
                  [ "x", "x", "x", " ", " " ],  // [x][ ][x][ ][ ]
                  [ " ", "x", "x", "x", " " ],  // [ ][ ][ ][ ][ ]
                  [ " ", " ", "x", " ", " " ],  // [ ][ ][ ][x][ ]
                  [ "x", " ", " ", " ", " " ]]; // [x][ ][ ][ ][ ]

  let isolatedPoint = new Point({x: 0, y: 4}); // "Alive" with 0 or 1 alive neighbors => "dead"
  expect(gameLogic.willPointLive(isolatedPoint, grid)).toBeFalsy;
  
  let survivingPoint = new Point({x: 0, y: 1}); // "Alive" with 2 or 3 alive neighbors => "alive" 
  expect(gameLogic.willPointLive(survivingPoint, grid)).toBeTruthy;
  
  let revivedPoint = new Point({x: 3, y: 3}); // "Dead" with 3 alive neighbors => "alive"
  expect(gameLogic.willPointLive(revivedPoint, grid)).toBeTruthy;
  
  let overpopulatedPoint = new Point({x: 2, y: 2}); // "Alive" with 4 or more alive neighbors => "dead"
  expect(gameLogic.willPointLive(overpopulatedPoint, grid)).toBeFalsy;
});

test('tests the next state of a whole grid can be determined correctly', () => {
  let grid = new Grid({width: 5});
  grid.content = [[ "x", " ", " ", "x", " " ],
                  [ " ", " ", "x", " ", " " ],
                  [ "x", "x", "x", "x", " " ],
                  [ " ", "x", " ", " ", "x" ],
                  [ " ", "x", " ", " ", "x" ]];

  let expectedGrid = new Grid({width: 5});
  expectedGrid.content = [[ " ", " ", " ", " ", " " ],
                          [ "x", " ", " ", " ", " " ],
                          [ "x", " ", " ", "x", " " ],
                          [ " ", " ", " ", " ", "x" ],
                          [ " ", " ", " ", " ", " " ]];

  grid = gameLogic.nextState(grid);
  expect(grid.isEqualTo(expectedGrid)).toBeTruthy;
  
});

test('tests the next state of a whole grid is not the same as the original state', () => {
  let grid = new Grid({width: 5});
  grid.content = [[ "x", " ", " ", "x", " " ],
                  [ " ", " ", "x", " ", " " ],
                  [ "x", "x", "x", "x", " " ],
                  [ " ", "x", " ", " ", "x" ],
                  [ " ", "x", " ", " ", "x" ]];

  let originalGrid = new Grid({width: 5});
  originalGrid.content = grid.content;

  grid = gameLogic.nextState(grid);
  expect(grid.isEqualTo(originalGrid)).toBeFalsy;
  
});