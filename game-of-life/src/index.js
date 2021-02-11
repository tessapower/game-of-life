const htmlTable = require("./table.js");
const gameLogic = require("./game-logic.js");
const { Grid } = require("./grid.js");

let gameOfLife, randomBtn, nextBtn, runBtn;

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
  let grid = new Grid({width: 75, height: 35, defaultValue: " "});
  setCurrentGrid(grid);

  // Watch if user makes manual changes to grid
  let cells = document.querySelectorAll("checkbox");
  cells.addEventListener("input", console.log("You changed: ", event.currentTarget));
}

function update() {
  let currentGrid = getCurrentGrid();
  let updatedGrid = gameLogic.nextState(currentGrid);
  setCurrentGrid(updatedGrid);
}

function randomize() {
  let currentGrid = getCurrentGrid();
  let randomGrid = gameLogic.randomize(currentGrid);
  setCurrentGrid(randomGrid);
}

function getCurrentGrid() {
  let currentTable = document.querySelector("table").cloneNode(true);
  return htmlTable.htmlTableToGrid(currentTable);
}

function setCurrentGrid(grid) {
  let updatedTable = htmlTable.gridToHtmlTable(grid);
  gameOfLife.replaceChildren(updatedTable);
}