// Hover/Click Reveals - Basic Interaction Demo
// Left side: Hover elements to change color
// Right side: Click element to animate smiley face in

let hoverShapes = [];
let clickElement;
let smiley;
let dividerX;

function setup() {
    let canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent('canvas-container');

    dividerX = width / 2;

    // Create hover shapes on left side
    createHoverShapes();

    // Create click element on right side
    createClickElement();

    // Initialize smiley (starts off screen)
    smiley = {
        x: width + 100,
        targetX: width + 100,
        y: height / 2,
        size: 80,
        visible: false
    };
}

function createHoverShapes() {
    hoverShapes = [];
    let leftArea = dividerX - 100;
    let cols = 3;
    let rows = 3;
    let spacingX = leftArea / (cols + 1);
    let spacingY = (height - 150) / (rows + 1);

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            hoverShapes.push({
                x: spacingX * (i + 1),
                y: spacingY * (j + 1) + 80,
                size: 60,
                baseColor: color(60, 60, 70),
                hoverColor: color(
                    random(100, 255),
                    random(100, 255),
                    random(100, 255)
                ),
                currentColor: color(60, 60, 70),
                isHovered: false,
                shape: floor(random(3)) // 0: circle, 1: square, 2: triangle
            });
        }
    }
}

function createClickElement() {
    clickElement = {
        x: dividerX + (width - dividerX) / 2,
        y: height / 2,
        size: 100,
        baseColor: color(80, 80, 100),
        hoverColor: color(100, 150, 200),
        currentColor: color(80, 80, 100),
        isHovered: false,
        pulsePhase: 0
    };
}

function draw() {
    background(10, 10, 15);

    // Draw divider line
    stroke(40);
    strokeWeight(2);
    line(dividerX, 60, dividerX, height - 60);

    // Draw labels
    noStroke();
    fill(150);
    textAlign(CENTER, TOP);
    textSize(14);
    textFont('Inter');
    text('HOVER', dividerX / 2, 80);
    text('CLICK', dividerX + (width - dividerX) / 2, 80);

    // Update and draw hover shapes
    drawHoverShapes();

    // Update and draw click element
    drawClickElement();

    // Update and draw smiley
    updateSmiley();
    drawSmiley();
}

function drawHoverShapes() {
    for (let shape of hoverShapes) {
        // Check if mouse is hovering
        let d = dist(mouseX, mouseY, shape.x, shape.y);
        shape.isHovered = d < shape.size / 2;

        // Smooth color transition
        let targetColor = shape.isHovered ? shape.hoverColor : shape.baseColor;
        shape.currentColor = lerpColor(shape.currentColor, targetColor, 0.15);

        // Draw shape
        fill(shape.currentColor);
        noStroke();

        push();
        translate(shape.x, shape.y);

        // Scale up slightly when hovered
        let s = shape.isHovered ? 1.2 : 1;
        scale(s);

        if (shape.shape === 0) {
            ellipse(0, 0, shape.size);
        } else if (shape.shape === 1) {
            rectMode(CENTER);
            rect(0, 0, shape.size * 0.8, shape.size * 0.8, 8);
        } else {
            let r = shape.size / 2;
            triangle(0, -r, -r * 0.866, r * 0.5, r * 0.866, r * 0.5);
        }
        pop();
    }
}

function drawClickElement() {
    // Check hover state
    let d = dist(mouseX, mouseY, clickElement.x, clickElement.y);
    clickElement.isHovered = d < clickElement.size / 2;

    // Smooth color transition
    let targetColor = clickElement.isHovered ? clickElement.hoverColor : clickElement.baseColor;
    clickElement.currentColor = lerpColor(clickElement.currentColor, targetColor, 0.1);

    // Pulse animation
    clickElement.pulsePhase += 0.05;
    let pulse = sin(clickElement.pulsePhase) * 5;

    // Draw glow when hovered
    if (clickElement.isHovered) {
        fill(100, 150, 200, 30);
        noStroke();
        ellipse(clickElement.x, clickElement.y, clickElement.size + 40 + pulse);
    }

    // Draw main element
    fill(clickElement.currentColor);
    noStroke();
    ellipse(clickElement.x, clickElement.y, clickElement.size + pulse);

    // Draw "Click me" text
    fill(200);
    textAlign(CENTER, CENTER);
    textSize(12);
    text('Click me!', clickElement.x, clickElement.y);
}

function updateSmiley() {
    // Smooth movement toward target
    smiley.x = lerp(smiley.x, smiley.targetX, 0.08);
}

function drawSmiley() {
    if (!smiley.visible && smiley.x > width) return;

    push();
    translate(smiley.x, smiley.y);

    // Face
    fill(255, 220, 100);
    noStroke();
    ellipse(0, 0, smiley.size);

    // Eyes
    fill(40);
    ellipse(-15, -10, 12, 16);
    ellipse(15, -10, 12, 16);

    // Eye shine
    fill(255);
    ellipse(-12, -12, 4);
    ellipse(18, -12, 4);

    // Smile
    noFill();
    stroke(40);
    strokeWeight(4);
    arc(0, 5, 40, 30, 0.2, PI - 0.2);

    // Cheeks
    noStroke();
    fill(255, 150, 150, 100);
    ellipse(-25, 8, 15, 10);
    ellipse(25, 8, 15, 10);

    pop();
}

function mousePressed() {
    // Check if click element was clicked
    let d = dist(mouseX, mouseY, clickElement.x, clickElement.y);
    if (d < clickElement.size / 2) {
        // Toggle smiley animation
        if (smiley.visible) {
            // Animate out
            smiley.targetX = width + 100;
            smiley.visible = false;
        } else {
            // Animate in
            smiley.visible = true;
            smiley.x = width + 100; // Start from right
            smiley.targetX = dividerX + (width - dividerX) / 2 + 120;
            smiley.y = height / 2;
        }
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    dividerX = width / 2;
    createHoverShapes();
    createClickElement();

    // Reset smiley position if visible
    if (smiley.visible) {
        smiley.targetX = dividerX + (width - dividerX) / 2 + 120;
        smiley.y = height / 2;
    } else {
        smiley.x = width + 100;
        smiley.targetX = width + 100;
    }
}
