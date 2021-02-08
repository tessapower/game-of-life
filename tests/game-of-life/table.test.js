const { Grid } = require("../../game-of-life/grid");
const gameLogic = require("../../game-of-life/game-logic")
const htmlTable = require("../../game-of-life/table");

// HMTL Table creation tests
test('a string with correct HTML for a table can be created from a grid', () => {
  let grid = new Grid({width: 4, height: 2});
  let table = htmlTable.gridToHtmlString(grid);

  let htmlString = "<table>"
  + "<tr>"
  + "<td><input type='checkbox'/></td>"
  + "<td><input type='checkbox'/></td>"
  + "<td><input type='checkbox'/></td>"
  + "<td><input type='checkbox'/></td>"
  + "</tr>"
  + "<tr>"
  + "<td><input type='checkbox'/></td>"
  + "<td><input type='checkbox'/></td>"
  + "<td><input type='checkbox'/></td>"
  + "<td><input type='checkbox'/></td>"
  + "</tr>"
  + "</table>";

  expect(table).toBe(htmlString);
});

test('an HTML table can be created from a grid', () => {
  let grid = new Grid({width: 4, height: 2});
  let table = htmlTable.gridToHtmlTable(grid);

  expect(table).toBeInstanceOf(HTMLTableElement);
});

test('an HTML table with the correct width and height can be created from a grid', () => {
  let grid = new Grid({width: 4, height: 2});
  let table = htmlTable.gridToHtmlTable(grid);

  let rows = table.rows;
  let cells = rows[0].cells;

  expect(rows.length).toBe(grid.height);
  expect(cells.length).toBe(grid.width);
});


test('an HTML table can be created from a 0x0 grid', () => {
  let grid = new Grid();
  let table = htmlTable.gridToHtmlTable(grid);
  expect(table).toBeInstanceOf(HTMLTableElement);
  
  let rows = table.rows;
  expect(rows.length).toBe(0);
});

test('an HTML table can be created from a 1x1 grid', () => {
  let grid = new Grid({width: 1});
  let table = htmlTable.gridToHtmlTable(grid);
  expect(table).toBeInstanceOf(HTMLTableElement);
  let rows = table.rows;
  expect(rows.length).toBe(1);
});

test('table can be created from grid with empty checkboxes as default values', () => {
  let grid = new Grid({width: 3, height: 4});
  let table = htmlTable.gridToHtmlTable(grid);
  
  let rows = table.rows;

  for (let row of rows) {
    let cells = row.cells;
    for (let cell of cells) {
      let checkbox = cell.firstElementChild;
      let isChecked = checkbox.getAttribute("checked");
      expect(isChecked).toBeFalsy;
    }
  }
});

test('table can be created from grid and reflects the grid starting state', () => {
  let grid = new Grid({width: 4, height: 2});
  grid.content = [[ "x", "x", " ", "x" ],
                  [ "x", " ", "x", " " ]];
                  
  let table = htmlTable.gridToHtmlTable(grid);

  let rows = table.rows;
  let numRows = rows.length;

  for (let i = 0; i < numRows; i++) {
    let cells = rows[i].cells;
    let numCells = cells.length;
    for (let j = 0; j < numCells; j++) {
      let checkbox = cells[j].firstElementChild;
      let isChecked = checkbox.getAttribute("checked");
      if (gameLogic.isAlive({x: j, y: i}, grid)) {
        expect(isChecked).toBeTruthy;
      } else {
        expect(isChecked).toBeFalsy;
      }
    }
  }
});
 