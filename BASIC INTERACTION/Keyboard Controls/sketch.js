// ============================================
// KEYBOARD CONTROLS DEMO
// Learn how to use keyboard input in p5.js!
//
// This example demonstrates:
// - Arrow Keys (UP, DOWN, LEFT, RIGHT)
// - WASD Keys (W, A, S, D)
// - Spacebar for jumping
// ============================================


// ============================================
// STEP 1: Declare Variables
// ============================================

let mushroomX;      // X position
let mushroomY;      // Y position
let moveSpeed = 5;  // How fast the mushroom moves
let legAngle = 0;   // For walking animation
let isMoving = false;  // Track if mushroom is moving


// ============================================
// STEP 2: Setup - Runs Once
// ============================================

function setup() {
    let canvas = createCanvas(1000, 600);
    canvas.parent('canvas-container');

    // Start mushroom in the center
    mushroomX = width / 2;
    mushroomY = height / 2;
}


// ============================================
// STEP 3: Draw - Runs Every Frame
// ============================================

function draw() {
    background(40, 50, 70);  // Darker background

    // Check keyboard and move mushroom
    checkKeys();

    // Draw the mushroom
    drawMushroom();

    // Show position info
    showInfo();
}


// ============================================
// STEP 4: Check Keyboard Input
// keyIsDown() returns true if a key is pressed
// ============================================

function checkKeys() {
    isMoving = false;  // Reset movement flag

    // ARROW KEYS - Move the mushroom
    if (keyIsDown(LEFT_ARROW)) {
        mushroomX -= moveSpeed;  // Move left
        isMoving = true;
    }

    if (keyIsDown(RIGHT_ARROW)) {
        mushroomX += moveSpeed;  // Move right
        isMoving = true;
    }

    if (keyIsDown(UP_ARROW)) {
        mushroomY -= moveSpeed;  // Move up
        isMoving = true;
    }

    if (keyIsDown(DOWN_ARROW)) {
        mushroomY += moveSpeed;  // Move down
        isMoving = true;
    }


    // WASD KEYS - Also move the mushroom
    // 65=A, 68=D, 87=W, 83=S
    if (keyIsDown(65)) {  // A key
        mushroomX -= moveSpeed;
        isMoving = true;
    }

    if (keyIsDown(68)) {  // D key
        mushroomX += moveSpeed;
        isMoving = true;
    }

    if (keyIsDown(87)) {  // W key
        mushroomY -= moveSpeed;
        isMoving = true;
    }

    if (keyIsDown(83)) {  // S key
        mushroomY += moveSpeed;
        isMoving = true;
    }

    // Animate legs when moving
    if (isMoving) {
        legAngle += 0.2;  // Increase angle for walking animation
    } else {
        legAngle = 0;  // Reset legs when not moving
    }

    // Keep mushroom on screen
    mushroomX = constrain(mushroomX, 60, width - 60);
    mushroomY = constrain(mushroomY, 60, height - 60);
}


// ============================================
// STEP 5: keyPressed() Function
// This runs ONCE when you press a key
// Good for actions like jumping!
// ============================================

function keyPressed() {
    // Press SPACEBAR to jump!
    if (key === ' ') {
        // Make mushroom jump up then back down
        mushroomY -= 50;
        setTimeout(() => { mushroomY += 50; }, 200);
    }
}


// ============================================
// STEP 6: Draw the Mushroom
// ============================================

function drawMushroom() {
    push();
    translate(mushroomX, mushroomY);

    // LEGS (animated when moving)
    let legSwing = sin(legAngle) * 15;  // Swing back and forth

    stroke(220, 200, 180);
    strokeWeight(8);
    line(-15, 20, -15 - legSwing, 45);  // Left leg swings
    line(15, 20, 15 + legSwing, 45);    // Right leg swings opposite

    // FEET (small circles)
    noStroke();
    fill(200, 180, 160);
    ellipse(-15 - legSwing, 48, 18, 10);  // Left foot
    ellipse(15 + legSwing, 48, 18, 10);   // Right foot

    // STEM (mushroom body)
    fill(240, 230, 210);
    stroke(200, 190, 180);
    strokeWeight(2);
    rect(-25, -20, 50, 40, 8);  // Rounded rectangle

    // CAP (red mushroom top)
    fill(220, 60, 60);
    arc(0, -20, 80, 70, PI, TWO_PI);

    // WHITE SPOTS on cap
    noStroke();
    fill(255);
    ellipse(-20, -35, 12, 12);
    ellipse(15, -40, 10, 10);
    ellipse(-5, -45, 8, 8);

    // EYES
    fill(40);
    ellipse(-12, -5, 7, 7);
    ellipse(12, -5, 7, 7);

    // SMILE
    noFill();
    stroke(40);
    strokeWeight(2);
    arc(0, 5, 20, 15, 0, PI);

    pop();
}


// ============================================
// STEP 7: Show Info on Screen
// ============================================

function showInfo() {
    fill(255);
    textSize(16);
    textAlign(LEFT);
    text('Position: (' + round(mushroomX) + ', ' + round(mushroomY) + ')', 20, 30);
    text('Use Arrow Keys or WASD to move', 20, 55);
    text('Press SPACEBAR to jump', 20, 80);
}


// ============================================
// KEY CONCEPTS:
// ============================================
//
// keyIsDown(keyCode) - Check if key is held down
//   - LEFT_ARROW, RIGHT_ARROW, UP_ARROW, DOWN_ARROW
//   - Letter keys use numbers: 65=A, 68=D, 83=S, 87=W
//   - Good for continuous movement
//
// keyPressed() - Runs once when key is pressed
//   - Use 'key' variable: if (key === ' ')
//   - Good for one-time actions
//
// constrain(value, min, max) - Keep value in range
//   - Keeps mushroom on screen
//
// TRY THIS:
// - Change moveSpeed to 10 (faster!)
// - Add more keys (space, enter, etc.)
// - Make mushroom change color when moving
// ============================================
