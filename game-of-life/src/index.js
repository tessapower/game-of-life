const htmlTable = require("./table.js");
const gameLogic = require("./game-logic.js");
const { Grid } = require("./grid.js");

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
      running = setInterval(update, 400);
    }
  });

  // Get div where grid will be displayed
  gameOfLife = document.getElementById("gameOfLife");

  // Create initial grid
  grid = new Grid({width: 100, height: 50, defaultValue: " "});
  render(grid);

}

function update() {
  grid = gameLogic.nextState(grid);
  render(grid);
}

function randomize() {
  grid = gameLogic.randomize(grid);
  render(grid);
}

function render(grid) {
  gameOfLife.replaceChildren(htmlTable.gridToHtmlTable(grid));
  addClickListenersToGrid();
}

// This needs to be called each time the grid is rendered
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