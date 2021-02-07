const { Point } = require('../../game-of-life/point')

test('tests if new point can be created', () => {
  let posXposY = new Point({x: 12,  y:  3});
  expect(posXposY).toEqual(expect.objectContaining({x: 12, y: 3}));

  let negXnegY = new Point({x: -2,  y: -5});
  expect(negXnegY).toEqual(expect.objectContaining({x: -2, y: -5}));
  
  let posXnegY = new Point({x:  7,  y: -2});
  expect(posXnegY).toEqual(expect.objectContaining({x: 7, y: -2}));
  
  let negXposY = new Point({x: -5,  y:  1});
  expect(negXposY).toEqual(expect.objectContaining({x: -5, y: 1}));
  
  let origin   = new Point({x:  0,  y:  0});
  expect(origin).toEqual(expect.objectContaining({x: 0, y: 0}));
});

test('tests if point.up() returns correct point above given point', () => {
  let point = new Point({x: 2, y: 3});

  expect(point.up).toEqual({x: 2, y: 4});
});

test('tests if point.topRight() returns correct point one up and to the right from given point', () => {
  let point = new Point({x: 2, y: 3});

  expect(point.topRight).toEqual({x: 3, y: 4});
});

test('tests if point.right() returns correct point to the right of a given point', () => {
  let point = new Point({x: 2, y: 3});

  expect(point.right).toEqual({x: 3, y: 3});
});

test('tests if point.bottomRight() returns correct point one down and to the right from given point', () => {
  let point = new Point({x: 2, y: 3});

  expect(point.bottomRight).toEqual({x: 3, y: 2});
});

test('tests if point.down() returns correct point below given point', () => {
  let point = new Point({x: 2, y: 3});

  expect(point.down).toEqual({x: 2, y: 2});
});

test('tests if point.bottomLeft() returns correct point one down and to the left of a given point', () => {
  let point = new Point({x: 2, y: 3});

  expect(point.bottomLeft).toEqual({x: 1, y: 2});
});

test('tests if point.left() returns correct point to the left of a given point', () => {
  let point = new Point({x: 2, y: 3});

  expect(point.left).toEqual({x: 1, y: 3});
});

test('tests if point.topLeft() returns correct point one up and to the left of a given point', () => {
  let point = new Point({x: 2, y: 3});

  expect(point.topLeft).toEqual({x: 1, y: 4});
});

test('tests if new point has correct neighboring points [up, down, left, right, topLeft, bottomLeft, topRight, bottomRight]', () => {
  let origin = new Point({x: 0, y: 0});

  /* Expected neighbors of origin:
    [-1, 1] [ 0, 1] [ 1, 1]
    [-1, 0] [ 0, 0] [ 1, 0]
    [-1,-1] [ 0,-1] [ 1,-1]
  */

  let expectedNeighbors = [{x:  0, y: 1}, {x:  0, y: -1},
                           {x: -1, y: 0}, {x:  1, y:  0},
                           {x: -1, y: 1}, {x: -1, y: -1},
                           {x:  1, y: 1}, {x:  1, y: -1}];

  expect(origin.neighbors).toEqual(expect.arrayContaining(expectedNeighbors));

  let posXposY = new Point({x: 1, y: 3});

  /* Expected neighbors of posXposY:
    [ 0, 4] [ 1, 4] [ 2, 4]
    [ 0, 3] [ 1, 3] [ 2, 3]
    [ 0, 2] [ 1, 2] [ 2, 2]
  */
  expectedNeighbors = [{x: 1, y: 4}, {x: 1, y: 2},
                       {x: 0, y: 3}, {x: 2, y: 3},
                       {x: 0, y: 4}, {x: 0, y: 2},
                       {x: 2, y: 4}, {x: 2, y: 2}];

  expect(posXposY.neighbors).toEqual(expect.arrayContaining(expectedNeighbors));
});
