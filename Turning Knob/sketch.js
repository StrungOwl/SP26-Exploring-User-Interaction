let osc, playing, freq, amp;

//for knob
let tickAngle = 0;
let knobSize;
let knobTickSize;
let knobX, knobY;
let channel = 1;
let maxChannels = 13;

function setup() {
    // Account for nav bar height (60px) and padding
    let availableHeight = windowHeight - 80;
    let canvasSize = min(windowWidth * 0.8, availableHeight * 0.8, 500);
    let cnv = createCanvas(canvasSize, canvasSize);
    cnv.parent('tv-container');
    cnv.mousePressed(playOscillator);
    osc = new p5.Oscillator('sine');

    // Scale knob based on canvas size
    knobSize = min(width, height) * 0.6;
    knobTickSize = knobSize * 0.2;

    knobX = width / 2;
    knobY = height / 2;

    // Create TV container if it doesn't exist
    if (!select('#tv-container')) {
        let container = createDiv('');
        container.id('tv-container');
        cnv.parent(container);
    }

    // Create channel display if it doesn't exist
    if (!select('#channel-display')) {
        let display = createDiv('CH ' + channel);
        display.id('channel-display');
        display.parent('tv-container');
    }

    // Create instructions if they don't exist
    if (!select('#instructions')) {
        let instructions = createDiv('Click and drag the knob');
        instructions.id('instructions');
        instructions.parent('tv-container');
    }
}

function draw() {
    // Dark retro background
    background(40, 35, 35);

    // Map angle to channel (1-13)
    let normalizedAngle = (tickAngle % TWO_PI + TWO_PI) % TWO_PI;
    channel = floor(map(normalizedAngle, 0, TWO_PI, 1, maxChannels + 1));
    if (channel > maxChannels) channel = maxChannels;

    // Update channel display
    let display = select('#channel-display');
    if (display) {
        display.html('CH ' + channel);
    }

    // Map channel to frequency for interesting sound variation
    freq = map(channel, 1, maxChannels, 150, 800);
    amp = playing ? 0.3 : 0;

    if (playing) {
        // smooth the transitions by 0.1 seconds
        osc.freq(freq, 0.1);
        osc.amp(amp, 0.1);

        //Hide cursor when playing
        noCursor();
    } else {
        cursor(ARROW);
    }

    knob(); // Draw the knob
}

function playOscillator() {
    // starting an oscillator on a user gesture will enable audio
    // in browsers that have a strict autoplay policy.
    // See also: userStartAudio();

    //Only play if mouse is over knob and pressed
    if (dist(mouseX, mouseY, knobX, knobY) < knobSize / 2) {
        osc.start();
        playing = true;
    }
}

function mouseReleased() {
    // ramp amplitude to 0 over 0.5 seconds
    osc.amp(0, 0.5);
    playing = false;
}

function knob() {
    if (playing) {
        // Calculate angle based on mouse position relative to knob center
        tickAngle = atan2(mouseY - knobY, mouseX - knobX);
    }

    push();

    // Outer rim shadow
    fill(20, 15, 15);
    noStroke();
    circle(knobX, knobY, knobSize + 10);

    // Main knob body - metallic gradient effect
    for (let i = knobSize; i > knobSize - 30; i -= 2) {
        let c = map(i, knobSize - 30, knobSize, 180, 100);
        fill(c, c - 10, c - 20);
        circle(knobX, knobY, i);
    }

    // Inner knob face
    fill(60, 55, 55);
    circle(knobX, knobY, knobSize - knobTickSize);

    // Draw tick marks around the knob (like channel indicators)
    stroke(200, 180, 150);
    strokeWeight(2);
    for (let i = 0; i < maxChannels; i++) {
        let angle = map(i, 0, maxChannels, 0, TWO_PI);
        let r1 = knobSize / 2 - 15;
        let r2 = knobSize / 2 - 5;
        let x1 = knobX + cos(angle) * r1;
        let y1 = knobY + sin(angle) * r1;
        let x2 = knobX + cos(angle) * r2;
        let y2 = knobY + sin(angle) * r2;
        line(x1, y1, x2, y2);
    }

    // Center circle
    fill(40, 35, 35);
    noStroke();
    circle(knobX, knobY, knobSize * 0.3);

    // Pointer/indicator
    stroke(255, 107, 53);
    strokeWeight(4);
    strokeCap(ROUND);
    let pointerLength = knobSize * 0.35;
    let pointerX = knobX + cos(tickAngle) * pointerLength;
    let pointerY = knobY + sin(tickAngle) * pointerLength;
    line(knobX, knobY, pointerX, pointerY);

    // Center dot
    fill(255, 107, 53);
    noStroke();
    circle(knobX, knobY, 15);

    // Highlight for 3D effect
    fill(255, 255, 255, 50);
    arc(knobX, knobY, knobSize - 40, knobSize - 40, PI + QUARTER_PI, TWO_PI + QUARTER_PI);

    pop();
}

function windowResized() {
    // Account for nav bar height (60px) and padding
    let availableHeight = windowHeight - 80;
    let newSize = min(windowWidth * 0.8, availableHeight * 0.8, 500);
    resizeCanvas(newSize, newSize);
    knobSize = min(width, height) * 0.6;
    knobTickSize = knobSize * 0.2;
    knobX = width / 2;
    knobY = height / 2;
}