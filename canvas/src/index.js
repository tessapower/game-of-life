// Canvas Game of Life

const gameLogic = require("../../scripts/game-logic");
const { Grid } = require("../../scripts/grid.js");

let gameOfLife, canvas, scale, randomBtn, nextBtn, runBtn, grid;

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
     running = setInterval(update, 250);
    }
  });

  // Get canvas where grid will be displayed
  gameOfLife = document.getElementById("gameOfLife");
  canvas = gameOfLife.getContext("2d");

  // Create initial grid
  scale = 3;
  grid = new Grid({width: window.innerWidth/scale, height: window.innerHeight/scale, defaultValue: " "});
  gameOfLife.width = window.innerWidth;
  gameOfLife.height = window.innerHeight;
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
  canvas.fillStyle = "white";
  canvas.fillRect(0, 0, gameOfLife.width, gameOfLife.height);
  for (let point of grid) {
    if (gameLogic.isAlive(point, grid)){
      canvas.fillStyle = "green";
      canvas.fillRect((point.x * scale), (point.y * scale), (1 * scale), (1 * scale));
    }
  }
}