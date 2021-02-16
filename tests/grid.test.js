const { Grid } = require('../scripts/grid');
const { Point } = require('../scripts/point');

// Grid Creation Tests
test('a new 2x4 grid can be created', () => {
  let grid = new Grid({width: 2, height: 4});

  expect(grid.width).toBe(2);
  expect(grid.height).toBe(4);
});

test('a new grid cannot be created with negative width or height', () => {
  expect(
    () => new Grid({width: -2, height: 5})
  ).toThrowError("Error: invalid width or height");
});

test('a new grid cannot be created with non-number datatypes', () => {
  expect(
    () => new Grid({width: "two", height: "three"})
  ).toThrowError("Error: invalid width or height");

  expect(
    () => new Grid({width: true, height: false})
  ).toThrowError("Error: invalid width or height");
});

test('calling new Grid() with no args creates a 0x0 grid', () => {
  let grid = new Grid();
  expect(grid.width).toBe(0);
  expect(grid.height).toBe(grid.width);
});

test('calling new Grid() with no defaultValue arg sets all points to null', () => {
  let grid = new Grid({width: 2});
  for (let point of grid) {
    expect(grid.getValueAt(point)).toBeNull;
  }
});

test('calling new Grid() with a defaultValue arg sets all points to the default value', () => {
  let grid = new Grid({width: 2, defaultValue: "foo"});
  for (let point of grid) {
    expect(grid.getValueAt(point)).toBe("foo");
  }
});

test('calling new Grid() with only width arg sets height = width', () => {
  let grid = new Grid({width: 3});
  expect(grid.height).toBe(grid.width);
});

// Grid Method Tests
test('value at point in grid can be set', () => {
  let grid = new Grid({width: 4, height: 4});
  
  let point = new Point({x: 0, y: 3});
  grid.setValueAt(point, true);
  expect(grid.getValueAt(point)).toBeTruthy;
  
  grid.setValueAt(point, false);
  expect(grid.getValueAt(point)).toBeFalsy;
});

test('returns if grid contains point correctly', () => {
  let grid = new Grid({width: 2, height: 2});

  let invalidPoint = new Point({x: -1, y: 0});
  expect(grid.contains(invalidPoint)).toBeFalsy;

  let validPoint = new Point({x: 0, y: 2});
  expect(grid.contains(validPoint)).toBeTruthy;
});

test('two grids can correctly be compared', () => {

  let grid = new Grid({width: 2});
  grid.content = [["x", " "],
                  [" ", "x"]];

  // passing grid
  let equalGrid = new Grid({width: 2});
  equalGrid.content = [["x", " "],
                       [" ", "x"]];

  expect(grid.isEqualTo(equalGrid)).toBeTruthy;

  // failing grids
  let differentSizeGrid = new Grid({width: 3});
  expect(grid.isEqualTo(differentSizeGrid)).toBeFalsy;

  let sameSizeDifferentValuesGrid = new Grid({width: 2, defaultValue: true});
  expect(grid.isEqualTo(sameSizeDifferentValuesGrid)).toBeFalsy;

});

// Grid Iteration Tests

test('a 0x0 grid can be iterated over', () => {
  let grid = new Grid();
  let count = 0;

  for (let point of grid) count++;

  expect(count).toBe(0);
});


test('a 1x1 grid can be iterated over', () => {
  let grid = new Grid({width: 1});
  let count = 0;

  for (let point of grid) count++;

  expect(count).toBe(1);
});

test('a grid can be iterated over', () =>{
  let grid = new Grid({width: 4, height: 2});
  
  let value = 0;
  for (let point of grid) {
    value++;
    grid.setValueAt(point, value);
  }

  let expectedValues = [[ 1, 2, 3, 4 ],
                        [ 5, 6, 7, 8 ]];

  expect(grid.content).toEqual(expect.arrayContaining(expectedValues));
});
