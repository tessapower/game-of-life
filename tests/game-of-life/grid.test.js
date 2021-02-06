const { Grid } = require('../../game-of-life/grid');
const { Point } = require('../../game-of-life/point');

// Grid Creation Tests

test('tests that a new 2x4 grid is created', () => {
  let grid = new Grid({width: 2, height: 4});

  expect(grid.width).toBe(2);
  expect(grid.height).toBe(4);
});


test('tests that a grid cannot be created with negative width or height', () => {
  expect(
    () => new Grid({width: -2, height: 5})
  ).toThrowError("Invalid width or height");
});


test('tests that a grid cannot be created with non-number datatypes', () => {
  expect(
    () => new Grid({width: "two", height: "three"})
  ).toThrowError("Invalid width or height");

  expect(
    () => new Grid({width: true, height: false})
  ).toThrowError("Invalid width or height");
});

test('tests that the default grid will be created if called with no args', () => {
  let grid = new Grid();
  expect(grid.width).toBe(2);
  expect(grid.height).toBe(grid.width);
  
  for (let i = 0; i < grid.height; i++) {
    for (let j = 0; j < grid.width; j++) {
      expect(grid.getValueAt({x: j, y: i})).toBeNull;
    }
  }
});

test('tests that grid height = width if called with only width arg', () => {
  let grid = new Grid({width: 3});
  expect(grid.height).toBe(grid.width);
});

test('tests if all values in a new grid are null by default', () => {
  let grid = new Grid({width: 2, height: 2});

  for (let {x, y} of grid) {
    expect(grid.getValueAt({x: x, y: y})).toBeNull;
  }
});

// Grid Method Tests

test('tests if value at point in grid can be set', () => {
  let grid = new Grid({width: 4, height: 4});
  
  let point = new Point({x: 0, y: 3});
  grid.setValueAt(point, true);
  expect(grid.getValueAt(point)).toBeTruthy;
  
  grid.setValueAt(point, false);
  expect(grid.getValueAt(point)).toBeFalsy;
});

test('tests that grid.has() returns if grid contains point correctly', () => {
  let grid = new Grid({width: 2, height: 2});

  let invalidPoint = new Point({x: -1, y: 0});
  expect(grid.contains(invalidPoint)).toBeFalsy;

  let validPoint = new Point({x: 0, y: 2});
  expect(grid.contains(validPoint)).toBeTruthy;
});

// Grid Iteration Tests

test('tests that a grid can be iterated over', () =>{
  let grid = new Grid({width: 4, height: 2});
  
  let value = 0;
  for (let point of grid) {
    value++;
    grid.setValueAt(point, value);
  }

  let expectedGrid = [ [ 1, 2, 3, 4 ],
                       [ 5, 6, 7, 8 ] ];

  expect(grid.content).toStrictEqual(expectedGrid);
});

test('tests that a 1x1 grid can be iterated over', () => {
  let grid = new Grid({width: 1}); // [0][0]
  
  for (let point of grid) {
    grid.setValueAt(point, 1);
  }
  expect(grid.getValueAt(new Point({x: 0, y: 0}))).toBe(1);
});
