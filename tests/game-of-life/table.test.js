const { Grid } = require("../../game-of-life/src/grid");
const gameLogic = require("../../game-of-life/src/game-logic")
const htmlTable = require("../../game-of-life/src/table");

// HMTL Table creation tests
test('a string with correct HTML for a table can be created from a grid', () => {
  let grid = new Grid({width: 4, height: 2});
  let table = htmlTable.gridToHtmlString(grid);

  let htmlString = ""
  + "<table>"
  +   "<tr>"
  +     "<td><input type='checkbox' checked='false'/></td>"
  +     "<td><input type='checkbox' checked='false'/></td>"
  +     "<td><input type='checkbox' checked='false'/></td>"
  +     "<td><input type='checkbox' checked='false'/></td>"
  +   "</tr>"
  +   "<tr>"
  +     "<td><input type='checkbox' checked='false'/></td>"
  +     "<td><input type='checkbox' checked='false'/></td>"
  +     "<td><input type='checkbox' checked='false'/></td>"
  +     "<td><input type='checkbox' checked='false'/></td>"
  +   "</tr>"
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
      expect(checkbox.getAttribute("type")).toBe("checkbox");
      let isChecked = checkbox.getAttribute("checked");
      expect(isChecked).toBeFalsy;
    }
  }
});

test('table checkboxes are checked if grid cell is alive', () => {
  let grid = new Grid({width: 4, height: 2});
  grid.content = [["x", "x", " ", "x"],
                  ["x", " ", "x", " "]];
                  
  let table = htmlTable.gridToHtmlTable(grid);

  let rows = table.rows;

  for (let i = 0; i < rows.length; i++) {
    let cells = rows[i].cells;
    for (let j = 0; j < cells.length; j++) {
      let checkbox = cells[j].firstElementChild;
      let isChecked = checkbox.hasAttribute("checked");
      if (gameLogic.isAlive({x: j, y: i}, grid)) {
        expect(isChecked).toBeTruthy;
      } else {
        expect(isChecked).toBeFalsy;
      }
    }
  }
});

test('grid can be created from a table', () => {

  let table = document.createElement("table");
  let tableContent = ""
  +   "<tr>"
  +     "<td><input type='checkbox' checked='true'/></td>"
  +     "<td><input type='checkbox' checked='false'/></td>"
  +     "<td><input type='checkbox' checked='true'/></td>"
  +     "<td><input type='checkbox' checked='false'/></td>"
  +   "</tr>"
  +   "<tr>"
  +     "<td><input type='checkbox' checked='false'/></td>"
  +     "<td><input type='checkbox' checked='true'/></td>"
  +     "<td><input type='checkbox' checked='true'/></td>"
  +     "<td><input type='checkbox' checked='false'/></td>"
  +   "</tr>"
  +   "<tr>"
  +     "<td><input type='checkbox' checked='false'/></td>"
  +     "<td><input type='checkbox' checked='true'/></td>"
  +     "<td><input type='checkbox' checked='false'/></td>"
  +     "<td><input type='checkbox' checked='true'/></td>"
  +   "</tr>";

  /* Table Content:
    [x][ ][x][ ]
    [ ][x][x][ ]
    [ ][x][ ][x ]
  */

  table.innerHTML = tableContent;
  grid = htmlTable.htmlTableToGrid(table);

  let expectedGridContent = [["x", " ", "x", " "],
                             [" ", "x", "x", " "],
                             [" ", "x", " ", "x"]];
  
  expect(grid.content).toEqual(expectedGridContent);
});

test('a grid can be converted to a table and then from a table back to a grid', () => {
  
  // 0x0 grid round trip
  let grid0x0 = new Grid();
  let table = htmlTable.gridToHtmlTable(grid0x0);
  let rows = table.rows;
  expect(rows.length).toBe(0);

  grid0x0 = htmlTable.htmlTableToGrid(table);
  expect(grid0x0.width).toBe(0);
  expect(grid0x0.height).toBe(0);
  expect(grid0x0.content).toEqual([]);

  // 1x1 grid round trip
  grid1x1 = new Grid({width: 1});
  grid1x1.content = [[" "]];
  table = htmlTable.gridToHtmlTable(grid1x1);

  rows = table.rows;
  expect(rows.length).toBe(1);
  cells = rows[0].cells;
  expect(cells.length).toBe(1);

  grid1x1 = htmlTable.htmlTableToGrid(table);
  expect(grid1x1.height).toBe(1);
  expect(grid1x1.width).toBe(1);
  expect(grid1x1.content).toEqual([[" "]]);

  // typical grid round trip
  let width = 4, height = 2;
  grid = new Grid({width: width, height: height});
  let expectedGridContent = [["x"," ","x"," "],
                             [" ","x"," ","x"]];
  grid.content = expectedGridContent;
  
  table = htmlTable.gridToHtmlTable(grid);

  rows = table.rows;
  expect(rows.length).toBe(height);
  cells = rows[0].cells;
  expect(cells.length).toBe(width);

  grid = htmlTable.htmlTableToGrid(table);
  expect(grid.height).toBe(height);
  expect(grid.width).toBe(width);
  expect(grid.content).toEqual(expect.arrayContaining(expectedGridContent));

});

