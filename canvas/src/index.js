// Canvas Game of Life

const gameLogic = require("../../scripts/game-logic");
const { Grid } = require("../../scripts/grid.js");

let gameOfLife, canvas, scale, randomBtn, nextBtn, runBtn, grid, tune;

setup();

/**
 * Sets up the webpage with event listeners for the "Randomize", "Next", and "Run" buttons,
 * gets the context of the canvas, and creates a grid the same size as the width and height of the browser window.
 */
function setup() {

  // Randomize Button
  randomBtn = document.getElementById("random");
  randomBtn.addEventListener("click", randomize);

  // Next Button
  nextBtn = document.getElementById("next");
  nextBtn.addEventListener("click", update);

  // Delightful tune
  tune = document.getElementById("tune");
  tune.src="../../assets/tune.mp3";

  // Run Button
  runBtn = document.getElementById("run");
  let running = null;

  runBtn.addEventListener("click", () => {
    if (running) {
      clearInterval(running);
      tune.pause();
      running = null;
      runBtn.textContent = "▶";
      runBtn.style.backgroundColor = "MediumSeaGreen";
      nextBtn.removeAttribute("disabled");
    } else {
      runBtn.textContent = "❙❙";
      runBtn.style.backgroundColor = "Salmon";
      nextBtn.setAttribute("disabled", "true");
      tune.play();
      running = setInterval(update, 250);
    }
  });

  // Get context of canvas where grid will be displayed
  gameOfLife = document.getElementById("gameOfLife");
  canvas = gameOfLife.getContext("2d");

  // Create and display initial empty grid
  scale = 4;
  grid = new Grid({width: window.innerWidth/scale, height: window.innerHeight/scale, defaultValue: " "});
  gameOfLife.width = window.innerWidth;
  gameOfLife.height = window.innerHeight;
  render(grid);
}

/**
 * Determines the next generation of the grid and renders it on the canvas.
 */
function update() {
  grid = gameLogic.nextState(grid);
  render(grid);
}

/**
 * Changes the grid so that each cell has a 50/50 chance of being
 * alive or dead and renders it on the canvas.
 */

function randomize() {
  grid = gameLogic.randomize(grid);
  render(grid);
}

/**
 * Clears the canvas and renders the given grid on the canvas. If a cell
 * is alive, it will be painted.
 * @param {Grid} grid
 */
function render(grid) {
  canvas.fillStyle = "white";
  canvas.fillRect(0, 0, gameOfLife.width, gameOfLife.height);
  for (let point of grid) {
    if (gameLogic.isAlive(point, grid)){
      canvas.fillStyle = "#68F";
      canvas.fillRect((point.x * scale), (point.y * scale), (1 * scale), (1 * scale));
    }
  }
}