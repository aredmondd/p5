const WIDTH = 400;
const HEIGHT = 400;
const RECT_SIZE = 5;
let COLOR = [0,255,0];
const SCALE = 1.5;

export function setup() {
  createCanvas(WIDTH, HEIGHT);
  background("#000000");
  grid();
}

function grid() {
  printer();
}

function drawRectangle(x, y) {
  fill(COLOR);
  // noStroke();
  rect(x, y, RECT_SIZE);
}

function updateColor() {
  // COLOR = [COLOR[0] + SCALE, COLOR[1] + SCALE, COLOR[2] + SCALE];
  COLOR[1] = COLOR[1] - SCALE;
  COLOR[2] = COLOR[2] + SCALE;
}

function printer() {
  let max = 0;
  let x = 0;
  let y = max;

  // left half
  while (max < WIDTH) {
    while (x <= max && y >= 0) {
      drawRectangle(x,y)
      x += RECT_SIZE;
      y -= RECT_SIZE;
    }
    updateColor();
    max += RECT_SIZE;
    x = 0;
    y = max;
  }

  // right half
  let newLow = 0;
  x = newLow;
  while (x !== y && (x !== max || y !== max)) { // stop when x and y are equal and they hit the max
    while (x <= max && y >= newLow) {
      drawRectangle(x, y);
      x += RECT_SIZE;
      y -= RECT_SIZE;
    }
    updateColor()
    newLow += RECT_SIZE;
    x = newLow;
    y = max;
  }
}

export function keyPressed() {
  if (key === "s") saveCanvas("two", "png");
}

// 0,0

// 0,2
// 2,0

// 0,4
// 2,2
// 4,0

// 0,6
// 2,4
// 4,2
// 6,0

// 2,6
// 4,4
// 6,2

// 4,6
// 6,4

// 6,6 -- stop