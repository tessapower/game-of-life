// Checkbox Game of Life

const htmlTable = require("../../scripts/table.js");
const gameLogic = require("../../scripts/game-logic.js");
const { Grid } = require("../../scripts/grid.js");

let gameOfLife, randomBtn, nextBtn, runBtn, grid;

setup();

function setup() {

  // Randomize Button
  randomBtn = document.getElementById("random");
  randomBtn.addEventListener("click", randomize);

 // Next Button
  nextBtn = document.getElementById("next");
  nextBtn.addEventListener("click", update);

  // Run Button
  runBtn = document.getElementById("run");
  let running = null;
  runBtn.addEventListener("click", () => {
    if (running) {
      clearInterval(running);
      running = null;
      runBtn.textContent = "▶";
      runBtn.style.backgroundColor = "MediumSeaGreen";
      nextBtn.removeAttribute("disabled");
    } else {
      runBtn.textContent = "❙❙";
      runBtn.style.backgroundColor = "Salmon";
      nextBtn.setAttribute("disabled", "true");
      running = setInterval(update, 300);
    }
  });

  // Get div where grid will be displayed
  gameOfLife = document.getElementById("gameOfLife");

  // Create initial empty grid and render it on the webpage.
  grid = new Grid({width: 150, height: 75, defaultValue: " "});
  render(grid);

}

/**
 * Determines the next generation of the grid and renders it on the webpage.
 */
function update() {
  grid = gameLogic.nextState(grid);
  render(grid);
}

/**
 * Changes the grid so that each cell has a 50/50 chance of being alive or dead
 * and renders it on the webpage.
 */
function randomize() {
  grid = gameLogic.randomize(grid);
  render(grid);
}

/**
 * Replaces the current grid on the webpage with the provided grid.
 * Adds click listeners to each checkbox (cell) in the grid to watch if the user
 * toggles a checkbox.
 *
 * @param {Grid} grid
 */
function render(grid) {
  gameOfLife.replaceChildren(htmlTable.gridToHtmlTable(grid));
  addClickListenersToGrid();
}

/**
 * Adds click listeners to all the checkboxes (cells) found in the document.
 * This needs to be called each time the grid is rendered to watch for user input.
 */
function addClickListenersToGrid() {
  let gridCells = document.querySelectorAll("input");
  let index= 0;
  for (let cell of gridCells) {
    let x = index % grid.width;
    let y = (index - x) / grid.width;
    cell.addEventListener("input", () => {
      gameLogic.setIsAlive({x: x, y: y}, grid, !gameLogic.isAlive({x: x, y: y}, grid));
    });
    index++;
  }
}