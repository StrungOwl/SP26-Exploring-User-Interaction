// ============================================
// UI Controls Demo
// Learn how to create interactive controls with p5.js!
//
// This example shows you how to use:
// - createSlider()     -> Adjustable number values
// - createCheckbox()   -> On/off toggles
// - createInput()      -> Text fields
// - createButton()     -> Clickable buttons
// - createSelect()     -> Dropdown menus
// - createColorPicker() -> Color selection
// ============================================


// ============================================
// STEP 1: Declare your control variables
// We put these at the top so we can use them anywhere
// ============================================

let sizeSlider;        // Controls the shape size
let speedSlider;       // Controls how fast the shape spins
let fillCheckbox;      // Toggles fill on/off
let textInput;         // User can type text
let randomButton;      // Moves the shape to a random spot
let shapeSelect;       // Dropdown to pick shape type
let colorPicker;       // Lets user pick a color

// Shape position (starts in center, can be randomized)
let shapeX;
let shapeY;

// Rotation angle (increases over time for spinning)
let angle = 0;


// ============================================
// STEP 2: Setup - runs once when page loads
// ============================================

function setup() {
  // Create the canvas and put it in the container div
  let canvas = createCanvas(600, 500);
  canvas.parent('canvas-container');

  // Start shape in the center
  shapeX = width / 2;
  shapeY = height / 2;

  // Create all our controls
  createAllControls();
}


// ============================================
// STEP 3: Create all the UI controls
// Each control is created and placed in its container
// ============================================

function createAllControls() {

  // --- SIZE SLIDER ---
  // createSlider(min, max, startValue, step)
  // This creates a slider from 20 to 200, starting at 80

  let sizeLabel = createP('Size: 80');      // Label to show current value
  sizeLabel.parent('size-slider');           // Put it in the size-slider div
  sizeLabel.addClass('control-label');       // Add CSS class for styling
  sizeLabel.id('size-label');                // Give it an ID so we can update it

  sizeSlider = createSlider(20, 200, 80, 1); // min, max, default, step
  sizeSlider.parent('size-slider');          // Put slider in the div
  sizeSlider.addClass('control-slider');     // Add CSS class

  // When slider changes, update the label
  sizeSlider.input(function() {
    select('#size-label').html('Size: ' + sizeSlider.value());
  });


  // --- SPEED SLIDER ---
  // Controls rotation speed from 0 (stopped) to 5 (fast)

  let speedLabel = createP('Spin Speed: 1');
  speedLabel.parent('speed-slider');
  speedLabel.addClass('control-label');
  speedLabel.id('speed-label');

  speedSlider = createSlider(0, 5, 1, 0.5);  // Allows half-steps
  speedSlider.parent('speed-slider');
  speedSlider.addClass('control-slider');

  speedSlider.input(function() {
    select('#speed-label').html('Spin Speed: ' + speedSlider.value());
  });


  // --- FILL CHECKBOX ---
  // createCheckbox(label, defaultState)
  // When checked (true), shape is filled; when unchecked, just outline

  fillCheckbox = createCheckbox(' Fill Shape', true);  // Space before text for padding
  fillCheckbox.parent('fill-checkbox');
  fillCheckbox.addClass('control-checkbox');


  // --- TEXT INPUT ---
  // createInput(defaultValue)
  // Whatever you type shows up on the canvas

  let inputLabel = createP('Display Text:');
  inputLabel.parent('text-input');
  inputLabel.addClass('control-label');

  textInput = createInput('Hello!');         // Default text
  textInput.parent('text-input');
  textInput.addClass('control-input');
  textInput.attribute('placeholder', 'Type something...');  // Hint text


  // --- RANDOM BUTTON ---
  // createButton(label)
  // When clicked, moves the shape to a random position

  randomButton = createButton('Randomize Position');
  randomButton.parent('random-button');
  randomButton.addClass('control-button');

  // mousePressed() runs a function when button is clicked
  randomButton.mousePressed(function() {
    // Move shape to random x,y within canvas
    // We add padding so shape doesn't go off edges
    shapeX = random(100, width - 100);
    shapeY = random(100, height - 100);
  });


  // --- SHAPE DROPDOWN ---
  // createSelect() creates an empty dropdown
  // Then we add options with .option()

  let selectLabel = createP('Shape Type:');
  selectLabel.parent('shape-select');
  selectLabel.addClass('control-label');

  shapeSelect = createSelect();
  shapeSelect.parent('shape-select');
  shapeSelect.addClass('control-select');

  // Add options to the dropdown
  shapeSelect.option('Circle');
  shapeSelect.option('Square');
  shapeSelect.option('Triangle');

  shapeSelect.selected('Circle');  // Set default selection


  // --- COLOR PICKER ---
  // createColorPicker(defaultColor)
  // Returns a color value you can use with fill() or stroke()

  let colorLabel = createP('Shape Color:');
  colorLabel.parent('color-picker');
  colorLabel.addClass('control-label');

  colorPicker = createColorPicker('#63d7f1');  // Cyan as default
  colorPicker.parent('color-picker');
  colorPicker.addClass('control-color');
}


// ============================================
// STEP 4: Draw - runs 60 times per second
// This is where we read control values and draw the shape
// ============================================

function draw() {
  // Dark background
  background(10, 10, 15);

  // --- READ VALUES FROM CONTROLS ---
  // We read these every frame so changes happen instantly

  let shapeSize = sizeSlider.value();        // Get slider value (20-200)
  let spinSpeed = speedSlider.value();       // Get speed (0-5)
  let isFilled = fillCheckbox.checked();     // Get checkbox state (true/false)
  let displayText = textInput.value();       // Get text from input
  let shapeType = shapeSelect.value();       // Get selected option ("Circle", "Square", etc)
  let shapeColor = colorPicker.color();      // Get color object

  // Update rotation angle
  angle += spinSpeed * 0.02;


  // --- DRAW THE SHAPE ---

  push();  // Save current drawing state
  translate(shapeX, shapeY);  // Move to shape position
  rotate(angle);              // Apply rotation

  // Set fill or no fill based on checkbox
  if (isFilled) {
    fill(shapeColor);
    noStroke();
  } else {
    noFill();
    stroke(shapeColor);
    strokeWeight(3);
  }

  // Draw the selected shape
  if (shapeType === 'Circle') {
    ellipse(0, 0, shapeSize, shapeSize);
  }
  else if (shapeType === 'Square') {
    rectMode(CENTER);
    rect(0, 0, shapeSize, shapeSize);
  }
  else if (shapeType === 'Triangle') {
    // Triangle: 3 points arranged around center
    let r = shapeSize / 2;  // radius
    triangle(
      0, -r,                          // top point
      -r * 0.866, r * 0.5,            // bottom left
      r * 0.866, r * 0.5              // bottom right
    );
  }

  pop();  // Restore drawing state


  // --- DRAW THE TEXT ---
  // Show user's text below the shape

  if (displayText.length > 0) {
    fill(255, 255, 255, 180);  // White with some transparency
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(24);
    text(displayText, shapeX, shapeY + shapeSize / 2 + 40);
  }


  // --- DRAW HELPER INFO ---
  // Show current values in corner (helpful for learning)

  fill(100);
  noStroke();
  textAlign(LEFT, TOP);
  textSize(12);
  text('Current Values:', 15, 15);
  text('Size: ' + shapeSize, 15, 32);
  text('Speed: ' + spinSpeed, 15, 47);
  text('Filled: ' + isFilled, 15, 62);
  text('Shape: ' + shapeType, 15, 77);
}


// ============================================
// STEP 5: Window Resize Handler
// Keeps canvas responsive when browser resizes
// ============================================

function windowResized() {
  // Resize canvas to fit container
  resizeCanvas(600, 500);

  // Keep shape in bounds after resize
  shapeX = constrain(shapeX, 100, width - 100);
  shapeY = constrain(shapeY, 100, height - 100);
}
