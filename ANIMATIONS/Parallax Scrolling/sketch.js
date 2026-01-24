// Parallax scrolling effect using vanilla JavaScript

// Select all parallax layers
const bgLayer1 = document.querySelector('.bg-layer-1');
const bgLayer2 = document.querySelector('.bg-layer-2');
const bgLayer3 = document.querySelector('.bg-layer-3');
const bgLayer4 = document.querySelector('.bg-layer-4');
const bgLayer5 = document.querySelector('.bg-layer-5');
const bgLayer6 = document.querySelector('.bg-layer-6');
const bgLayer7 = document.querySelector('.bg-layer-7');
const bgLayer8 = document.querySelector('.bg-layer-8');
const bgLayer9 = document.querySelector('.bg-layer-9');
const textLayer1 = document.querySelector('.layer-text-1');
const textLayer2 = document.querySelector('.layer-text-2');
const textLayer3 = document.querySelector('.layer-text-3');
const textLayer4 = document.querySelector('.layer-text-4');
const leftRect1 = document.querySelector('.left-rect-1');
const leftRect2 = document.querySelector('.left-rect-2');
const leftRect3 = document.querySelector('.left-rect-3');
const leftRect4 = document.querySelector('.left-rect-4');
const leftRect5 = document.querySelector('.left-rect-5');
const leftRect6 = document.querySelector('.left-rect-6');

let ticking = false;

function updateParallax() {
    const scrolled = window.pageYOffset;

    // Background layers move at different speeds (furthest = slowest, closest = fastest)
    if (bgLayer1) {
        bgLayer1.style.transform = `translate3d(0, ${scrolled * 0.1}px, 0)`;
    }

    if (bgLayer2) {
        bgLayer2.style.transform = `translate3d(0, ${scrolled * 0.2}px, 0)`;
    }

    if (bgLayer3) {
        bgLayer3.style.transform = `translate3d(0, ${scrolled * 0.3}px, 0)`;
    }

    if (bgLayer4) {
        bgLayer4.style.transform = `translate3d(0, ${scrolled * 0.4}px, 0)`;
    }

    if (bgLayer5) {
        bgLayer5.style.transform = `translate3d(0, ${scrolled * 0.5}px, 0)`;
    }

    if (bgLayer6) {
        bgLayer6.style.transform = `translate3d(0, ${scrolled * 0.6}px, 0)`;
    }

    if (bgLayer7) {
        bgLayer7.style.transform = `translate3d(0, ${scrolled * 0.65}px, 0)`;
    }

    if (bgLayer8) {
        bgLayer8.style.transform = `translate3d(0, ${scrolled * 0.7}px, 0)`;
    }

    if (bgLayer9) {
        bgLayer9.style.transform = `translate3d(0, ${scrolled * 0.75}px, 0)`;
    }

    // Left side rectangles (slowest = darkest/largest, fastest = lightest/smallest)
    if (leftRect1) {
        leftRect1.style.transform = `translate3d(0, ${scrolled * 0.15}px, 0)`;
    }

    if (leftRect2) {
        leftRect2.style.transform = `translate3d(0, ${scrolled * 0.25}px, 0)`;
    }

    if (leftRect3) {
        leftRect3.style.transform = `translate3d(0, ${scrolled * 0.35}px, 0)`;
    }

    if (leftRect4) {
        leftRect4.style.transform = `translate3d(0, ${scrolled * 0.5}px, 0)`;
    }

    if (leftRect5) {
        leftRect5.style.transform = `translate3d(0, ${scrolled * 0.65}px, 0)`;
    }

    if (leftRect6) {
        leftRect6.style.transform = `translate3d(0, ${scrolled * 0.75}px, 0)`;
    }

    // Text layers - calculate position based on scroll with parallax effect
    // Each layer appears at a different scroll position
    const viewportHeight = window.innerHeight;

    if (textLayer1) {
        // Layer 1 starts at top (0) and moves with parallax
        textLayer1.style.transform = `translate3d(0, ${scrolled * -0.3}px, 0)`;
    }

    if (textLayer2) {
        // Layer 2 should appear around 1.5 viewport scroll - starts off screen below
        const offset2 = (viewportHeight * 1.5) - (scrolled * 0.7);
        textLayer2.style.transform = `translate3d(0, ${offset2}px, 0)`;
    }

    if (textLayer3) {
        // Layer 3 should appear around 3 viewports scroll - starts off screen below
        const offset3 = (viewportHeight * 3) - (scrolled * 0.5);
        textLayer3.style.transform = `translate3d(0, ${offset3}px, 0)`;
    }

    if (textLayer4) {
        // Layer 4 should appear around 4.5 viewports scroll - starts off screen below
        const offset4 = (viewportHeight * 4.5) - (scrolled * 0.3);
        textLayer4.style.transform = `translate3d(0, ${offset4}px, 0)`;
    }

    ticking = false;
}

// Parallax effect on scroll with requestAnimationFrame for smooth performance
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
    }
});

// Initialize positions on page load
updateParallax();
