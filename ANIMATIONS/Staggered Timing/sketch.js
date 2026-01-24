// Staggered Timing Animation with Lerp Color Gradient

const grid = document.getElementById('circle-grid');
const circles = [];

// Grid configuration
const cols = 20;
const rows = 12;

// Generate two random colors for the gradient
let startColor, endColor;

function generateRandomColor() {
    const h = Math.random() * 360;
    const s = 60 + Math.random() * 40; // 60-100% saturation
    const l = 45 + Math.random() * 25; // 45-70% lightness
    return { h, s, l };
}

function hslToString(color) {
    return `hsl(${color.h}, ${color.s}%, ${color.l}%)`;
}

function lerpColor(color1, color2, t) {
    // Handle hue wrapping for smooth transitions
    let h1 = color1.h;
    let h2 = color2.h;

    // Take the shortest path around the color wheel
    if (Math.abs(h2 - h1) > 180) {
        if (h1 < h2) {
            h1 += 360;
        } else {
            h2 += 360;
        }
    }

    return {
        h: (h1 + (h2 - h1) * t) % 360,
        s: color1.s + (color2.s - color1.s) * t,
        l: color1.l + (color2.l - color1.l) * t
    };
}

function initializeColors() {
    startColor = generateRandomColor();
    endColor = generateRandomColor();
}

function createGrid() {
    grid.style.gridTemplateColumns = `repeat(${cols}, 40px)`;
    grid.style.gridTemplateRows = `repeat(${rows}, 40px)`;

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const circle = document.createElement('div');
            circle.className = 'circle';

            // Calculate lerp factor based on column position (left to right)
            const t = col / (cols - 1);
            const color = lerpColor(startColor, endColor, t);
            circle.style.backgroundColor = hslToString(color);

            // Store column index for staggered timing
            circle.dataset.col = col;
            circle.dataset.row = row;

            grid.appendChild(circle);
            circles.push(circle);
        }
    }
}

// Staggered reveal animation on page load
function revealCircles() {
    circles.forEach((circle, index) => {
        const col = parseInt(circle.dataset.col);
        const row = parseInt(circle.dataset.row);

        // Stagger based on column (left to right) with slight row variation
        const delay = col * 50 + row * 15;

        setTimeout(() => {
            circle.classList.add('visible');
        }, delay + 500); // Initial 500ms delay before animation starts
    });
}

// Mouse interaction - reveal/hide based on horizontal position
let mouseX = 0;
let isInitialized = false;

function updateCirclesVisibility() {
    if (!isInitialized) return;

    const windowWidth = window.innerWidth;
    const threshold = mouseX / windowWidth; // 0 to 1

    circles.forEach((circle) => {
        const col = parseInt(circle.dataset.col);
        const row = parseInt(circle.dataset.row);
        const circleThreshold = col / (cols - 1);

        // Staggered delay for smooth wave effect
        const delay = Math.abs(circleThreshold - threshold) * 100 + row * 10;

        circle.style.transitionDelay = `${delay}ms`;

        if (circleThreshold <= threshold) {
            circle.classList.add('visible');
            circle.classList.remove('hidden');
        } else {
            circle.classList.remove('visible');
            circle.classList.add('hidden');
        }
    });
}

// Track mouse movement
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    if (isInitialized) {
        updateCirclesVisibility();
    }
});

// Handle mouse leaving the window
document.addEventListener('mouseleave', () => {
    if (isInitialized) {
        // Keep current state when mouse leaves
    }
});

// Initialize
function init() {
    initializeColors();
    createGrid();

    // Reveal animation plays first
    revealCircles();

    // After reveal completes, enable mouse interaction
    const totalRevealTime = cols * 50 + rows * 15 + 500 + 400;
    setTimeout(() => {
        isInitialized = true;
        // Set initial mouse position to right side (all visible)
        mouseX = window.innerWidth;
    }, totalRevealTime);
}

// Start when DOM is ready
init();
