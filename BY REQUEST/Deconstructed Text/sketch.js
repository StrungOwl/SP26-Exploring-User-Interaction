// CONFIGURATION - Easily adjust these values
let SQUARE_SIZE; // Will be calculated based on screen width

// Physics constants
const GRAVITY = 0.5;
const BOUNCE = 0.7;
const FRICTION = 0.98;

let squares = [];
let gridSquares = [];
let isExploded = false;

// Calculate square size based on screen width
function calculateSquareSize() {
    // The word "HELLO" is 17 grid units wide (H:3 + space:1 + E:3 + space:1 + L:3 + space:1 + L:3 + space:1 + O:3 = 19, minus last space = 17)
    // Actually: H(3) + 1 + E(3) + 1 + L(3) + 1 + L(3) + 1 + O(3) = 19 total width including spaces
    const totalGridWidth = 19;
    // Use 80% of screen width for the text, divided by grid units
    return Math.min(100, (width * 0.8) / totalGridWidth);
}

// Letter patterns (1 = filled, 0 = empty)
const LETTERS = {
    'H': [
        [1, 0, 1],
        [1, 0, 1],
        [1, 1, 1],
        [1, 0, 1],
        [1, 0, 1],
        [1, 0, 1],
        [1, 0, 1]
    ],
    'E': [
        [1, 1, 1],
        [1, 0, 0],
        [1, 0, 0],
        [1, 1, 1],
        [1, 0, 0],
        [1, 0, 0],
        [1, 1, 1]
    ],
    'L': [
        [1, 0, 0],
        [1, 0, 0],
        [1, 0, 0],
        [1, 0, 0],
        [1, 0, 0],
        [1, 0, 0],
        [1, 1, 1]
    ],
    'O': [
        [1, 1, 1],
        [1, 0, 1],
        [1, 0, 1],
        [1, 0, 1],
        [1, 0, 1],
        [1, 0, 1],
        [1, 1, 1]
    ]
};

function setup() {
    createCanvas(windowWidth, windowHeight);

    // Calculate responsive square size
    SQUARE_SIZE = calculateSquareSize();

    // Generate the text grid
    generateTextGrid();

    console.log("Setup complete. Grid squares:", gridSquares.length);
}

function draw() {
    background(255);

    if (!isExploded) {
        // Draw static grid
        for (let sq of gridSquares) {
            sq.display();
        }
    } else {
        // Update and draw physics-based squares
        for (let sq of squares) {
            sq.update();
            sq.display();
        }
    }
}

function generateTextGrid() {
    gridSquares = [];

    const word = "HELLO";
    const spacing = 1; // Space between letters in grid units

    // Calculate total width needed
    let totalWidth = 0;
    for (let char of word) {
        if (LETTERS[char]) {
            totalWidth += LETTERS[char][0].length + spacing;
        }
    }
    totalWidth -= spacing; // Remove last spacing

    // Calculate starting position to center the text
    const startX = (width - (totalWidth * SQUARE_SIZE)) / 2;
    const startY = (height - (7 * SQUARE_SIZE)) / 2; // 7 rows high

    let currentX = 0;

    // Generate squares for each letter
    for (let char of word) {
        if (LETTERS[char]) {
            const pattern = LETTERS[char];

            for (let row = 0; row < pattern.length; row++) {
                for (let col = 0; col < pattern[row].length; col++) {
                    if (pattern[row][col] === 1) {
                        let x = startX + (currentX + col) * SQUARE_SIZE;
                        let y = startY + row * SQUARE_SIZE;
                        gridSquares.push(new GridSquare(x, y, SQUARE_SIZE));
                    }
                }
            }

            currentX += pattern[0].length + spacing;
        }
    }

    console.log("Generated grid with", gridSquares.length, "squares");
}

function mousePressed() {
    if (!isExploded) {
        explodeText();
    }
}

function explodeText() {
    isExploded = true;
    squares = [];

    // Convert grid squares to physics squares
    for (let sq of gridSquares) {
        let angle = random(TWO_PI);
        let speed = random(5, 15);
        let vx = cos(angle) * speed;
        let vy = sin(angle) * speed - random(5, 10); // Initial upward velocity

        squares.push(new PhysicsSquare(sq.x, sq.y, SQUARE_SIZE, vx, vy));
    }
}

// Static grid square (before explosion)
class GridSquare {
    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;
    }

    display() {
        fill(0);
        noStroke();
        rect(this.x, this.y, this.size, this.size);
    }
}

// Physics-based square (after explosion)
class PhysicsSquare {
    constructor(x, y, size, vx, vy) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.vx = vx;
        this.vy = vy;
        this.rotation = 0;
        this.rotationSpeed = random(-0.2, 0.2);
    }

    update() {
        // Apply gravity
        this.vy += GRAVITY;

        // Apply friction
        this.vx *= FRICTION;
        this.vy *= FRICTION;

        // Update position
        this.x += this.vx;
        this.y += this.vy;

        // Update rotation
        this.rotation += this.rotationSpeed;

        // Bounce off edges
        if (this.x < 0 || this.x + this.size > width) {
            this.vx *= -BOUNCE;
            this.x = constrain(this.x, 0, width - this.size);
        }

        if (this.y + this.size > height) {
            this.vy *= -BOUNCE;
            this.y = height - this.size;
            this.rotationSpeed *= 0.9; // Reduce rotation on bounce
        }

        // Remove squares that fall off screen
        if (this.y > height + 100) {
            this.y = height + 100;
            this.vy = 0;
            this.vx = 0;
        }
    }

    display() {
        push();
        translate(this.x + this.size / 2, this.y + this.size / 2);
        rotate(this.rotation);
        fill(0);
        noStroke();
        rectMode(CENTER);
        rect(0, 0, this.size, this.size);
        pop();
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    // Recalculate square size on resize
    SQUARE_SIZE = calculateSquareSize();
    if (!isExploded) {
        generateTextGrid();
    }
}
