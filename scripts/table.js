const gameLogic = require("./game-logic");
const { Grid } = require("./grid");

/**
 * Creates an a string containing an HTML table from a grid, representing
 * "alive" cells with a checked checkbox and "dead" cells with an empty checkbox.
 *
 * @param {Grid} grid - The grid to create an HTML table from.
 * @returns A string containing the HTML for a table created from the provided
 * grid.
 */
function gridToHtmlString(grid) {
  let width = grid.width;
  let height = grid.height;

  let htmlString = "";

  htmlString += "<table>";
  for (let i = 0; i < height; i++) {
    htmlString += "<tr>";
    for (let j = 0; j < width; j++) {
      if (gameLogic.isAlive({x: j, y: i}, grid)) {
        htmlString += "<td><input type='checkbox' checked='true'/></td>";
      } else {
        htmlString += "<td><input type='checkbox' checked='false'/></td>";
      }
    }
    htmlString += "</tr>";
  }
  htmlString += "</table>";

  return htmlString;
}

/**
 * Creates an HTML table from a grid, representing "alive" cells with a checked
 * checkbox and "dead" cells with an empty checkbox.
 *
 * @param {Grid} grid - The Grid to create an HTML table from.
 * @returns An HTMLTableElement.
 */
function gridToHtmlTable(grid) {
  let width = grid.width;
  let height = grid.height;

  let htmlTable = document.createElement("table");

  for (let i = 0; i < height; i++) {
    let row = document.createElement("tr");
    for (let j = 0; j < width; j++) {
      let cell = document.createElement("td");
      let checkbox = document.createElement("input");
      checkbox.setAttribute("type", "checkbox");
      if (gameLogic.isAlive({x: j, y: i}, grid)) {
        checkbox.setAttribute("checked", "true");
      }
      cell.append(checkbox);
      row.append(cell);
    }
    htmlTable.append(row);
  }

  return htmlTable;
}

/**
 * Creates a grid from an HTML table, "alive" cells are created from checked
 * checkbox and "dead" cells are created from empty checkboxes.
 *
 * @param {HTMLTableElement} table - The HTML table to create a grid from.
 * @returns A Grid created from the provided table.
 */
function htmlTableToGrid(table) {
  let rows = table.rows;
  let height = 0, width = 0;
  let tableContent = [];

  for (let i = 0; i < rows.length; i++) {
    tableContent.push([]);
    cells = rows[i].cells;
    for (let j = 0; j < cells.length; j++) {
      let checkbox = cells[j].firstElementChild;
      let isChecked = checkbox.getAttribute("checked");
      tableContent[i].push((isChecked == "true" ? "x" : " "));
      width = cells.length;
    }
    height = rows.length;
  }

  let grid = new Grid({width: width, height: height});
  grid.content = tableContent;

  return grid;
}

exports.gridToHtmlString = gridToHtmlString;
exports.gridToHtmlTable = gridToHtmlTable;
exports.htmlTableToGrid = htmlTableToGrid;