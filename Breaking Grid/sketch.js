// Interactive grid that pushes away when clicked

let cols, rows;
let spacing, rectSize;
let clickedOn = false;
let largeRect = false;
let clickedX, clickedY;

function setup() {
  const canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('canvas-container');
  rectMode(CENTER);

  let minDimension = min(width, height);
  spacing = minDimension * 0.12;
  rectSize = minDimension * 0.1;
  cols = width / spacing;
  rows = height / spacing;
}

function draw() {
  background(220, 20);
  fill(100);
  noStroke();

  largeRect = false;

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * spacing + spacing / 2;
      let y = j * spacing + spacing / 2;

      // Push squares away from click point
      if (clickedOn) {
        let direction = createVector(x - clickedX, y - clickedY);
        if (direction.mag() > 0) {
          direction.setMag(500);
        }
        x += direction.x;
        y += direction.y;
      }

      // Highlight square under mouse
      if (mouseX > x - rectSize / 2 && mouseX < x + rectSize / 2 &&
          mouseY > y - rectSize / 2 && mouseY < y + rectSize / 2) {
        largeRect = true;
        rect(x, y, rectSize + 10, rectSize + 10);
      } else {
        rect(x, y, rectSize, rectSize);
      }
    }
  }
}

function mousePressed() {
  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    if (largeRect) {
      clickedOn = !clickedOn;
      clickedX = mouseX;
      clickedY = mouseY;
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  let minDimension = min(width, height);
  spacing = minDimension * 0.12;
  rectSize = minDimension * 0.1;
  cols = width / spacing;
  rows = height / spacing;
}
