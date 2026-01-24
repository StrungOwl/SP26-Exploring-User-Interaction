// Easing Animation Demo
// Hover over the button to trigger easing animations
// Click anywhere to restart

let c1, c2; // colors for gradient
let cSize = 100; // starting size of circle
let cSpeed = 1; // orange circle ease out speed
let speed = 200; // yellow circle ease in speed

let buttonOn = true;

// Yellow circle
let x; // x starting position for big circle
let a = 0;
let a2 = 0;
let easeComplete = false; // flag to indicate if easing anim is done

// Fading circles
let fade = 0;

function setup() {
    let canvas = createCanvas(windowWidth - 80, windowHeight - 140);
    canvas.parent('canvas-container');
}

function windowResized() {
    resizeCanvas(windowWidth - 80, windowHeight - 140);
}

function draw() {
    gradient();

    // Middle Button
    noStroke();
    fill(255, 85, 0);
    circle(width / 2, height / 2, cSize);

    // If mouse moves over circle then cause easing animation
    if (
        buttonOn &&
        mouseX >= width / 2 - 50 &&
        mouseX <= width / 2 + 50 &&
        mouseY >= height / 2 - 50 &&
        mouseY <= height / 2 + 50
    ) {
        cSize -= cSpeed;
    }

    // Easing animation
    if (cSize <= 0) {
        buttonOn = false;

        // Ease in from left
        let x = -(cos(a) * speed);
        fill(255, 226, 3, fade * 2); // fade in faster than other 2
        circle(x + width / 2, height / 2, 200);
        a += 0.1;
        speed -= 1;

        if (speed <= 0) {
            easeComplete = true;
            speed = 0;
        }
    }

    // Fade in circles
    if (cSize <= 0) {
        fade += 1;
        fill(255, 226, 3, fade);
        circle(width / 2 - 200, height / 2 - 200, 100);
        circle(width / 2 + 200, height / 2 + 200, 100);
    }
}

// Gradient background
function gradient() {
    c1 = color(89, 153, 255);
    c2 = color(63, 191, 191);

    for (let y = 0; y < height; y++) {
        let n = map(y, 0, height, 0, 1);
        let newc = lerpColor(c1, c2, n);
        stroke(newc);
        line(0, y, width, y);
    }
}

function mousePressed() {
    // Reset variables to their initial values
    cSize = 100;
    buttonOn = true;
    a = 0;
    easeComplete = false;
    fade = 0;
    speed = 200;
}
