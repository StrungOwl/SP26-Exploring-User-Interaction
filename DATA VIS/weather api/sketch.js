//API is just link to JSON data
// API KEY's
//User Input with Search bar to get temp in a specified city

//Troubleshoot:
//key might take a while to activate

let apiKey = "64930dfce89ccbac0f63dd3ed7af16b9";
let apiUrl = "https://api.openweathermap.org/data/2.5/weather";

// Example full URL:
// https://api.openweathermap.org/data/2.5/weather?q=New York&appid=YOUR_KEY&units=imperial

let data;
let input;
let button;

// Particle arrays for weather effects
let raindrops = [];
let snowflakes = [];
let clouds = [];
let lightningTimer = 0;
let lightningFlash = 0;
let thunderRumble = false;

// Sun rays
let sunRayAngle = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont('Space Grotesk');

  //USER INPUT — centered top, below nav bar
  input = createInput('');
  input.attribute('placeholder', 'Enter City Name');
  input.size(280, 36);
  input.style('font-family', 'Space Grotesk, sans-serif');
  input.style('font-size', '18px');
  input.style('padding', '8px 16px');
  input.style('border', '1px solid rgba(255,255,255,0.25)');
  input.style('border-radius', '25px 0 0 25px');
  input.style('background', 'rgba(255,255,255,0.08)');
  input.style('backdrop-filter', 'blur(10px)');
  input.style('color', '#e0e0e0');
  input.style('outline', 'none');
  input.style('z-index', '999');
  input.style('position', 'fixed');

  //SEARCH BUTTON — attached to input
  button = createButton('Search');
  button.size(90, 38);
  button.mousePressed(searchData);
  button.style('font-family', 'Space Grotesk, sans-serif');
  button.style('font-size', '16px');
  button.style('font-weight', '600');
  button.style('padding', '8px 20px');
  button.style('border', '1px solid rgba(255,255,255,0.25)');
  button.style('border-left', 'none');
  button.style('border-radius', '0 25px 25px 0');
  button.style('background', 'rgba(255,255,255,0.15)');
  button.style('backdrop-filter', 'blur(10px)');
  button.style('color', '#e0e0e0');
  button.style('cursor', 'pointer');
  button.style('z-index', '999');
  button.style('position', 'fixed');

  // Position input + button below the nav bar, left-aligned
  let inputX = 20;
  let inputY = 80;
  input.position(inputX, inputY);
  button.position(inputX + 280, inputY);

  // Press Enter to search
  input.elt.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') searchData();
  });

  // Init some clouds
  for (let i = 0; i < 5; i++) {
    clouds.push({
      x: random(width),
      y: random(height * 0.1, height * 0.4),
      w: random(150, 350),
      speed: random(0.2, 0.8)
    });
  }

  // Load default city on startup
  input.value('New York');
  searchData();
}

async function searchData() {
  let city = input.value();
  let url = apiUrl + "?q=" + city + "&appid=" + apiKey + "&units=imperial";
  data = await loadJSON(url);
  console.log(data);
  // Reset particles when new city loads
  raindrops = [];
  snowflakes = [];
}

// --- TEMPERATURE TO COLOR GRADIENT ---
function tempToColor(temp) {
  // Maps temperature (°F) to a color
  // Below 0: deep blue, 32: icy blue, 50: teal, 70: warm yellow, 90+: hot red
  let r, g, b;
  if (temp <= 0) {
    r = 20; g = 30; b = 120;
  } else if (temp <= 32) {
    let t = map(temp, 0, 32, 0, 1);
    r = lerp(20, 70, t);
    g = lerp(30, 130, t);
    b = lerp(120, 200, t);
  } else if (temp <= 50) {
    let t = map(temp, 32, 50, 0, 1);
    r = lerp(70, 40, t);
    g = lerp(130, 170, t);
    b = lerp(200, 160, t);
  } else if (temp <= 70) {
    let t = map(temp, 50, 70, 0, 1);
    r = lerp(40, 230, t);
    g = lerp(170, 200, t);
    b = lerp(160, 60, t);
  } else if (temp <= 90) {
    let t = map(temp, 70, 90, 0, 1);
    r = lerp(230, 220, t);
    g = lerp(200, 80, t);
    b = lerp(60, 30, t);
  } else {
    let t = map(constrain(temp, 90, 120), 90, 120, 0, 1);
    r = lerp(220, 180, t);
    g = lerp(80, 20, t);
    b = lerp(30, 20, t);
  }
  return color(r, g, b);
}

function drawGradientBackground(temp) {
  let c = tempToColor(temp);
  let topColor = lerpColor(c, color(10, 10, 20), 0.3);
  let bottomColor = lerpColor(c, color(5, 5, 15), 0.7);

  noStroke();
  for (let y = 0; y < height; y++) {
    let inter = map(y, 0, height, 0, 1);
    let lineColor = lerpColor(topColor, bottomColor, inter);
    stroke(lineColor);
    line(0, y, width, y);
  }
  noStroke();
}

// --- WEATHER CONDITION DETECTION ---
function getCondition() {
  if (!data || !data.weather) return "clear";
  let id = data.weather[0].id;
  if (id >= 200 && id < 300) return "thunderstorm";
  if (id >= 300 && id < 400) return "drizzle";
  if (id >= 500 && id < 600) return "rain";
  if (id >= 600 && id < 700) return "snow";
  if (id >= 700 && id < 800) return "atmosphere"; // fog, mist, haze
  if (id === 800) return "clear";
  if (id > 800) return "clouds";
  return "clear";
}

function getRainIntensity() {
  if (!data || !data.weather) return 0;
  let id = data.weather[0].id;
  if (id >= 300 && id < 400) return 0.3; // drizzle
  if (id === 500) return 0.4; // light rain
  if (id === 501) return 0.6; // moderate rain
  if (id === 502 || id === 503 || id === 504) return 1.0; // heavy rain
  if (id >= 200 && id < 300) return 0.7; // thunderstorm rain
  return 0;
}

// --- PARTICLE EFFECTS ---
function updateRain(intensity) {
  let targetCount = Math.floor(intensity * 300);

  // Add raindrops
  while (raindrops.length < targetCount) {
    raindrops.push({
      x: random(width),
      y: random(-100, -10),
      speed: random(8, 16) * intensity + 4,
      len: random(10, 25) * intensity + 5,
      opacity: random(80, 200)
    });
  }

  // Remove excess
  while (raindrops.length > targetCount) {
    raindrops.pop();
  }

  // Draw and update
  for (let i = raindrops.length - 1; i >= 0; i--) {
    let r = raindrops[i];
    stroke(180, 200, 255, r.opacity);
    strokeWeight(1.5);
    line(r.x, r.y, r.x + 1, r.y + r.len);
    r.y += r.speed;
    r.x += 1; // slight wind drift
    if (r.y > height + 20) {
      r.y = random(-100, -10);
      r.x = random(width);
    }
  }
  noStroke();
}

function updateSnow() {
  let targetCount = 150;
  while (snowflakes.length < targetCount) {
    snowflakes.push({
      x: random(width),
      y: random(-50, -10),
      size: random(2, 7),
      speed: random(1, 3),
      drift: random(-0.5, 0.5),
      opacity: random(150, 255)
    });
  }

  for (let i = snowflakes.length - 1; i >= 0; i--) {
    let s = snowflakes[i];
    noStroke();
    fill(255, 255, 255, s.opacity);
    ellipse(s.x, s.y, s.size);
    s.y += s.speed;
    s.x += s.drift + sin(frameCount * 0.02 + i) * 0.3;
    if (s.y > height + 10) {
      s.y = random(-50, -10);
      s.x = random(width);
    }
  }
}

function drawClouds(heavy) {
  let alpha = heavy ? 180 : 100;
  noStroke();
  for (let c of clouds) {
    fill(200, 200, 210, alpha);
    ellipse(c.x, c.y, c.w, c.w * 0.4);
    ellipse(c.x - c.w * 0.25, c.y + 10, c.w * 0.6, c.w * 0.3);
    ellipse(c.x + c.w * 0.25, c.y + 5, c.w * 0.5, c.w * 0.35);
    c.x += c.speed;
    if (c.x > width + c.w) c.x = -c.w;
  }
}

function drawSun() {
  let cx = width / 2;
  let cy = height * 0.35;

  sunRayAngle += 0.005;

  // Outer glow
  noStroke();
  for (let r = 250; r > 0; r -= 5) {
    let alpha = map(r, 0, 250, 60, 0);
    fill(255, 220, 50, alpha);
    ellipse(cx, cy, r * 2, r * 2);
  }

  // Radiating rays
  push();
  translate(cx, cy);
  rotate(sunRayAngle);
  for (let i = 0; i < 12; i++) {
    let angle = (TWO_PI / 12) * i;
    let x1 = cos(angle) * 80;
    let y1 = sin(angle) * 80;
    let x2 = cos(angle) * (180 + sin(frameCount * 0.03 + i) * 30);
    let y2 = sin(angle) * (180 + sin(frameCount * 0.03 + i) * 30);
    stroke(255, 230, 80, 80);
    strokeWeight(6);
    line(x1, y1, x2, y2);
  }
  pop();

  // Sun circle
  noStroke();
  fill(255, 220, 60);
  ellipse(cx, cy, 120, 120);
  fill(255, 240, 100);
  ellipse(cx - 10, cy - 10, 90, 90);
}

function drawLightning() {
  lightningTimer--;

  if (lightningTimer <= 0) {
    lightningTimer = Math.floor(random(60, 180)); // flash every 1-3 seconds
    lightningFlash = 15;
  }

  if (lightningFlash > 0) {
    // White flash overlay
    noStroke();
    fill(255, 255, 255, lightningFlash * 12);
    rect(0, 0, width, height);

    // Lightning bolt
    if (lightningFlash > 10) {
      let lx = random(width * 0.2, width * 0.8);
      drawBolt(lx, 0, lx + random(-50, 50), height * 0.6, 4);
    }
    lightningFlash--;
  }
}

function drawBolt(x1, y1, x2, y2, depth) {
  if (depth <= 0) return;
  let midX = (x1 + x2) / 2 + random(-40, 40);
  let midY = (y1 + y2) / 2 + random(-20, 20);

  stroke(255, 255, 255, 200);
  strokeWeight(depth);
  line(x1, y1, midX, midY);
  line(midX, midY, x2, y2);

  // Branch
  if (depth > 2 && random() > 0.5) {
    let bx = midX + random(-80, 80);
    let by = midY + random(30, 100);
    drawBolt(midX, midY, bx, by, depth - 2);
  }
}

function drawFog() {
  noStroke();
  for (let y = 0; y < height; y += 40) {
    let alpha = 30 + sin(frameCount * 0.01 + y * 0.01) * 15;
    fill(200, 200, 210, alpha);
    rect(0, y + sin(frameCount * 0.005 + y * 0.05) * 10, width, 30);
  }
}

// --- MAIN DRAW ---
function draw() {
  if (data && data.main) {
    let temp = data.main.temp;
    let condition = getCondition();

    // Temperature gradient background
    drawGradientBackground(temp);

    // Weather condition graphics
    switch (condition) {
      case "clear":
        drawSun();
        break;
      case "clouds":
        drawClouds(true);
        break;
      case "rain":
      case "drizzle":
        drawClouds(true);
        updateRain(getRainIntensity());
        break;
      case "thunderstorm":
        drawClouds(true);
        updateRain(getRainIntensity());
        drawLightning();
        break;
      case "snow":
        drawClouds(false);
        updateSnow();
        break;
      case "atmosphere":
        drawFog();
        break;
    }

    // --- CITY NAME (centered, big) ---
    fill(255, 255, 255, 230);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(min(width * 0.12, 120));
    textStyle(BOLD);
    text(data.name.toUpperCase(), width / 2, height / 2);

    // --- CONDITION (lower left) ---
    textAlign(LEFT, BOTTOM);
    textSize(24);
    textStyle(NORMAL);
    fill(255, 255, 255, 180);
    let desc = data.weather[0].description;
    // Capitalize first letter of each word
    desc = desc.replace(/\b\w/g, c => c.toUpperCase());
    text(desc, 30, height - 30);

    // --- TEMPERATURE (lower right, color-coded) ---
    textAlign(RIGHT, BOTTOM);
    textSize(48);
    textStyle(BOLD);
    let tempColor = tempToColor(temp);
    // Make the temp text brighter version of gradient color
    let brightTemp = lerpColor(tempColor, color(255), 0.5);
    fill(brightTemp);
    text(Math.round(temp) + "°F", width - 30, height - 25);

  } else if (data && data.message) {
    background(20, 10, 15);
    fill(255, 100, 100);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(24);
    text("Error: " + data.message, width / 2, height / 2);
  } else {
    background(10, 10, 15);
    fill(140);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(18);
    text("Loading weather data...", width / 2, height / 2);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  // Reposition input below the nav bar, left-aligned
  let inputX = 20;
  let inputY = 80;
  input.position(inputX, inputY);
  button.position(inputX + 280, inputY);
}
