// ── Flag color palettes (2–3 key colors per country) ──────────────────────
const FLAG_COLORS = {
  "Afghanistan": ["#000000", "#ce1126", "#007a3d"],
  "Albania": ["#e41e20", "#000000", "#e41e20"],
  "Algeria": ["#006233", "#ffffff", "#d21034"],
  "Argentina": ["#74acdf", "#ffffff", "#f6b40e"],
  "Armenia": ["#d90012", "#0033a0", "#f2a800"],
  "Australia": ["#00008b", "#ffffff", "#ff0000"],
  "Austria": ["#ed2939", "#ffffff", "#ed2939"],
  "Azerbaijan": ["#0092bc", "#e4002b", "#00af66"],
  "Bahrain": ["#ce1126", "#ffffff", "#ce1126"],
  "Bangladesh": ["#006a4e", "#f42a41", "#006a4e"],
  "Belgium": ["#000000", "#fae042", "#ed2939"],
  "Benin": ["#008751", "#fcd116", "#e8112d"],
  "Bolivia": ["#d52b1e", "#f9e300", "#007934"],
  "Bosnia and Herzegovina": ["#002395", "#fecb00", "#ffffff"],
  "Botswana": ["#75aadb", "#ffffff", "#000000"],
  "Brazil": ["#009c3b", "#ffdf00", "#002776"],
  "Bulgaria": ["#ffffff", "#00966e", "#d62612"],
  "Burkina Faso": ["#ef2b2d", "#009e49", "#fcd116"],
  "Cambodia": ["#032ea1", "#e00025", "#032ea1"],
  "Cameroon": ["#007a5e", "#ce1126", "#fcd116"],
  "Canada": ["#ff0000", "#ffffff", "#ff0000"],
  "Chad": ["#002664", "#fecb00", "#c60c30"],
  "Chile": ["#d52b1e", "#ffffff", "#0039a6"],
  "China": ["#de2910", "#ffde00", "#de2910"],
  "Colombia": ["#fcd116", "#003893", "#ce1126"],
  "Comoros": ["#3a7728", "#ffffff", "#ffc72c"],
  "Congo (Brazzaville)": ["#009543", "#fbde4a", "#dc241f"],
  "Congo (Kinshasa)": ["#007fff", "#f7d618", "#ce1021"],
  "Costa Rica": ["#002b7f", "#ffffff", "#ce1126"],
  "Croatia": ["#ff0000", "#ffffff", "#171796"],
  "Cyprus": ["#ffffff", "#d47600", "#4e7548"],
  "Czechia": ["#11457e", "#d7141a", "#ffffff"],
  "Denmark": ["#c8102e", "#ffffff", "#c8102e"],
  "Dominican Republic": ["#ce1126", "#002d62", "#ffffff"],
  "Ecuador": ["#ffdd00", "#034ea2", "#ce1126"],
  "Egypt": ["#ce171e", "#ffffff", "#000000"],
  "El Salvador": ["#0047ab", "#ffffff", "#0047ab"],
  "Estonia": ["#0072ce", "#000000", "#ffffff"],
  "Eswatini": ["#3e5eb9", "#ffd900", "#b10c0c"],
  "Ethiopia": ["#009a44", "#fcdd09", "#0f47af"],
  "Finland": ["#003580", "#ffffff", "#003580"],
  "France": ["#002654", "#ffffff", "#ce1126"],
  "Gabon": ["#009e60", "#fcd116", "#3a75c4"],
  "Gambia": ["#ce1126", "#0c1c8c", "#3a7728"],
  "Georgia": ["#ffffff", "#ff0000", "#ffffff"],
  "Germany": ["#000000", "#dd0000", "#ffce00"],
  "Ghana": ["#ef2929", "#fcd116", "#006b3f"],
  "Greece": ["#004c98", "#ffffff", "#004c98"],
  "Guatemala": ["#4997d0", "#ffffff", "#4997d0"],
  "Guinea": ["#ce1126", "#fcd116", "#009460"],
  "Honduras": ["#0073cf", "#ffffff", "#0073cf"],
  "Hong Kong S.A.R. of China": ["#de2910", "#ffffff", "#de2910"],
  "Hungary": ["#ce2939", "#ffffff", "#477050"],
  "Iceland": ["#003897", "#d72828", "#ffffff"],
  "India": ["#ff9933", "#ffffff", "#138808"],
  "Indonesia": ["#ce1126", "#ffffff", "#ce1126"],
  "Iran": ["#239f40", "#ffffff", "#da0000"],
  "Iraq": ["#ce1126", "#ffffff", "#007a3d"],
  "Ireland": ["#169b62", "#ffffff", "#ff883e"],
  "Israel": ["#0038b8", "#ffffff", "#0038b8"],
  "Italy": ["#009246", "#ffffff", "#ce2b37"],
  "Ivory Coast": ["#f77f00", "#ffffff", "#009e60"],
  "Jamaica": ["#009b3a", "#000000", "#fed100"],
  "Japan": ["#ffffff", "#bc002d", "#ffffff"],
  "Jordan": ["#000000", "#ffffff", "#007a3d"],
  "Kazakhstan": ["#00afca", "#fec50c", "#00afca"],
  "Kenya": ["#000000", "#bb0000", "#006600"],
  "Kosovo": ["#244aa5", "#d0a650", "#244aa5"],
  "Kuwait": ["#007a3d", "#ffffff", "#ce1126"],
  "Kyrgyzstan": ["#e8112d", "#ffef00", "#e8112d"],
  "Laos": ["#ce1126", "#002868", "#ffffff"],
  "Latvia": ["#9e3039", "#ffffff", "#9e3039"],
  "Lebanon": ["#ed1c24", "#ffffff", "#00a651"],
  "Lesotho": ["#00209f", "#ffffff", "#009543"],
  "Liberia": ["#bf0a30", "#ffffff", "#002868"],
  "Libya": ["#e70013", "#000000", "#239e46"],
  "Lithuania": ["#fdb913", "#006a44", "#c1272d"],
  "Luxembourg": ["#ed2939", "#ffffff", "#00a1de"],
  "Madagascar": ["#ffffff", "#fc3d32", "#007e3a"],
  "Malawi": ["#000000", "#ce1126", "#339e35"],
  "Malaysia": ["#cc0001", "#ffffff", "#010066"],
  "Mali": ["#14b53a", "#fcd116", "#ce1126"],
  "Malta": ["#cf142b", "#ffffff", "#cf142b"],
  "Mauritania": ["#006233", "#ffc400", "#ce1126"],
  "Mauritius": ["#ea2839", "#1a206d", "#ffcd00"],
  "Mexico": ["#006341", "#ffffff", "#ce1126"],
  "Moldova": ["#003da5", "#fcd116", "#cc0000"],
  "Mongolia": ["#c4272f", "#015197", "#c4272f"],
  "Montenegro": ["#d4af37", "#c40308", "#d4af37"],
  "Morocco": ["#c1272d", "#006233", "#c1272d"],
  "Mozambique": ["#007168", "#000000", "#fce100"],
  "Myanmar": ["#fecb00", "#34b233", "#ea2839"],
  "Namibia": ["#003580", "#ce1126", "#009a44"],
  "Nepal": ["#dc143c", "#003893", "#ffffff"],
  "Netherlands": ["#ae1c28", "#ffffff", "#21468b"],
  "New Zealand": ["#00247d", "#cc142b", "#ffffff"],
  "Nicaragua": ["#0067c6", "#ffffff", "#0067c6"],
  "Niger": ["#e05206", "#ffffff", "#0db02b"],
  "Nigeria": ["#008751", "#ffffff", "#008751"],
  "North Macedonia": ["#d20000", "#ffe600", "#d20000"],
  "Norway": ["#ef2b2d", "#ffffff", "#002868"],
  "Pakistan": ["#01411c", "#ffffff", "#01411c"],
  "Panama": ["#da121a", "#ffffff", "#072357"],
  "Paraguay": ["#d52b1e", "#ffffff", "#0038a8"],
  "Peru": ["#d91023", "#ffffff", "#d91023"],
  "Philippines": ["#0038a8", "#ce1126", "#fcd116"],
  "Poland": ["#ffffff", "#dc143c", "#ffffff"],
  "Portugal": ["#006600", "#ff0000", "#ffcc00"],
  "Romania": ["#002b7f", "#fcd116", "#ce1126"],
  "Russia": ["#ffffff", "#0039a6", "#d52b1e"],
  "Saudi Arabia": ["#006c35", "#ffffff", "#006c35"],
  "Senegal": ["#00853f", "#fdef42", "#e31b23"],
  "Serbia": ["#c6363c", "#21357e", "#ffffff"],
  "Sierra Leone": ["#1eb53a", "#ffffff", "#0072c6"],
  "Singapore": ["#ef3340", "#ffffff", "#ef3340"],
  "Slovakia": ["#ffffff", "#0b4ea2", "#ee1c25"],
  "Slovenia": ["#003da5", "#ffffff", "#ed1c24"],
  "South Africa": ["#007a4d", "#000000", "#ffb612"],
  "South Korea": ["#ffffff", "#cd2e3a", "#0047a0"],
  "Spain": ["#c60b1e", "#ffc400", "#c60b1e"],
  "Sri Lanka": ["#8d153a", "#ffb700", "#0f7b3f"],
  "State of Palestine": ["#000000", "#ffffff", "#009736"],
  "Sweden": ["#004b87", "#ffcd00", "#004b87"],
  "Switzerland": ["#ff0000", "#ffffff", "#ff0000"],
  "Taiwan Province of China": ["#fe0000", "#000095", "#ffffff"],
  "Tajikistan": ["#cc0000", "#ffffff", "#006600"],
  "Tanzania": ["#1eb53a", "#00a3dd", "#fcd116"],
  "Thailand": ["#a51931", "#f4f5f8", "#2d2a4a"],
  "Togo": ["#006a4e", "#ffce00", "#d21034"],
  "Tunisia": ["#e70013", "#ffffff", "#e70013"],
  "Turkiye": ["#e30a17", "#ffffff", "#e30a17"],
  "Uganda": ["#000000", "#fcdc04", "#d90000"],
  "Ukraine": ["#005bbb", "#ffd500", "#005bbb"],
  "United Arab Emirates": ["#00732f", "#ffffff", "#ff0000"],
  "United Kingdom": ["#c8102e", "#012169", "#ffffff"],
  "United States": ["#b22234", "#ffffff", "#3c3b6e"],
  "Uruguay": ["#001489", "#ffffff", "#f9a602"],
  "Uzbekistan": ["#1eb53a", "#ffffff", "#0099b5"],
  "Venezuela": ["#ffcc00", "#00247d", "#cf142b"],
  "Vietnam": ["#da251d", "#ffcd00", "#da251d"],
  "Yemen": ["#ce1126", "#ffffff", "#000000"],
  "Zambia": ["#198a00", "#de2010", "#ef7d00"],
  "Zimbabwe": ["#319208", "#ffd200", "#de2010"]
};

// ── State ─────────────────────────────────────────────────────────────────
let table;
let countries = [];
let cols, rows, cellW, cellH, circleR, padding;
let selectedIndex = -1;
let hoveredIndex = -1;

// ── Color helpers ─────────────────────────────────────────────────────────
function hexToRgb(hex) {
  let r = parseInt(hex.slice(1, 3), 16);
  let g = parseInt(hex.slice(3, 5), 16);
  let b = parseInt(hex.slice(5, 7), 16);
  return [r, g, b];
}

function rgbToHex(r, g, b) {
  return "#" + [r, g, b]
    .map((x) => {
      let h = Math.round(Math.max(0, Math.min(255, x))).toString(16);
      return h.length === 1 ? "0" + h : h;
    })
    .join("");
}

function lightenColor(hex, amount) {
  let [r, g, b] = hexToRgb(hex);
  return rgbToHex(
    r + (255 - r) * amount,
    g + (255 - g) * amount,
    b + (255 - b) * amount
  );
}

function darkenColor(hex, factor) {
  let [r, g, b] = hexToRgb(hex);
  return rgbToHex(r * factor, g * factor, b * factor);
}

// ── Setup ─────────────────────────────────────────────────────────────────
async function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont("Space Grotesk");

  table = await loadTable("worldHappiness2024.csv", ",", "header");

  let names = table.getColumn("Country name");
  let scores = table.getColumn("Ladder score");

  // Build data array and sort alphabetically
  let data = [];
  for (let i = 0; i < names.length; i++) {
    data.push({
      name: names[i],
      score: parseFloat(scores[i]) || 0,
      colors: FLAG_COLORS[names[i]] || ["#888888", "#aaaaaa", "#666666"],
    });
  }
  data.sort((a, b) => a.name.localeCompare(b.name));

  // Compute score range for size scaling
  let minScore = Infinity, maxScore = -Infinity;
  for (let d of data) {
    if (d.score < minScore) minScore = d.score;
    if (d.score > maxScore) maxScore = d.score;
  }

  // Compute grid dimensions
  computeGrid(data.length);

  // Assign grid positions
  let lastRowCount = data.length % cols || cols;
  let lastRowIndex = Math.ceil(data.length / cols) - 1;

  for (let i = 0; i < data.length; i++) {
    let col = i % cols;
    let row = Math.floor(i / cols);

    // Center the last row if it's not full
    let rowOffset = 0;
    if (row === lastRowIndex && lastRowCount < cols) {
      rowOffset = ((cols - lastRowCount) * cellW) / 2;
    }

    let x = padding + rowOffset + col * cellW + cellW / 2;
    let y = padding + row * cellH + cellH / 2;

    // Scale 0.35 (lowest score) → 1.0 (highest score)
    let sizeScale = 0.35 + ((data[i].score - minScore) / (maxScore - minScore)) * 0.65;

    countries.push({
      ...data[i],
      sizeScale: sizeScale,
      gridX: x,
      gridY: y,
      currentX: x,
      currentY: y,
      targetX: x,
      targetY: y,
      currentR: circleR * sizeScale,
      targetR: circleR * sizeScale,
      phase: Math.random() * Math.PI * 2,
    });
  }
}

function computeGrid(n) {
  if (!n) n = countries.length;
  padding = Math.min(width, height) * 0.04;
  let availW = width - 2 * padding;
  let availH = height - 2 * padding;

  cols = Math.round(Math.sqrt(n * (availW / availH)));
  cols = Math.max(8, Math.min(20, cols));
  rows = Math.ceil(n / cols);

  cellW = availW / cols;
  cellH = availH / rows;
  circleR = Math.min(cellW, cellH) * 0.38;
}

// ── Drawing ───────────────────────────────────────────────────────────────
function draw() {
  drawBackground();
  if (!table || countries.length === 0) return;

  // Lerp all positions and sizes
  for (let c of countries) {
    c.currentX = lerp(c.currentX, c.targetX, 0.06);
    c.currentY = lerp(c.currentY, c.targetY, 0.06);
    c.currentR = lerp(c.currentR, c.targetR, 0.08);
  }

  // Update hover state
  updateHover();

  // Draw non-selected circles
  for (let i = 0; i < countries.length; i++) {
    if (i === selectedIndex) continue;
    let c = countries[i];
    let ox = Math.sin(frameCount * 0.015 + c.phase) * 2;
    let oy = Math.cos(frameCount * 0.02 + c.phase * 1.3) * 2;
    let isDark = i === hoveredIndex;
    drawGradientCircle(c.currentX + ox, c.currentY + oy, c.currentR, c.colors, isDark);
  }

  // Overlay + selected circle on top
  if (selectedIndex >= 0) {
    let ctx = drawingContext;
    ctx.fillStyle = "rgba(5, 5, 20, 0.6)";
    ctx.fillRect(0, 0, width, height);

    let c = countries[selectedIndex];
    drawGradientCircle(c.currentX, c.currentY, c.currentR, c.colors, false);

    // Fade in text as circle enlarges
    let enlargedR = Math.min(width, height) * 0.22;
    let baseR = circleR * c.sizeScale;
    let progress = constrain(map(c.currentR, baseR, enlargedR, 0, 1), 0, 1);
    if (progress > 0.3) {
      let alpha = constrain(map(progress, 0.3, 0.8, 0, 255), 0, 255);
      drawCountryInfo(c.currentX, c.currentY, c, alpha);
    }
  }

  // Cursor
  cursor(hoveredIndex >= 0 ? HAND : ARROW);
}

function drawBackground() {
  let ctx = drawingContext;
  let grad = ctx.createLinearGradient(0, 0, width * 0.3, height);
  grad.addColorStop(0, "#0a0e1a");
  grad.addColorStop(0.5, "#111428");
  grad.addColorStop(1, "#1a0e2e");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, width, height);
}

function drawGradientCircle(x, y, r, colors, darken) {
  let ctx = drawingContext;
  let c1 = colors[0];
  let c2 = colors[1] || c1;
  let c3 = colors[2] || c2;

  if (darken) {
    c1 = darkenColor(c1, 0.65);
    c2 = darkenColor(c2, 0.65);
    c3 = darkenColor(c3, 0.65);
  }

  // Shadow
  ctx.shadowColor = "rgba(0, 0, 0, 0.4)";
  ctx.shadowBlur = Math.min(r * 0.4, 25);
  ctx.shadowOffsetX = r * 0.08;
  ctx.shadowOffsetY = r * 0.1;

  // Main gradient (offset center for light-source effect)
  let gx = x - r * 0.25;
  let gy = y - r * 0.25;
  let grad = ctx.createRadialGradient(gx, gy, r * 0.05, x, y, r);
  grad.addColorStop(0, lightenColor(c1, 0.35));
  grad.addColorStop(0.35, c1);
  grad.addColorStop(0.65, c2);
  grad.addColorStop(1, darkenColor(c3, 0.55));

  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fill();

  // Reset shadow
  ctx.shadowColor = "transparent";
  ctx.shadowBlur = 0;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;

  // Glossy highlight
  let hGrad = ctx.createRadialGradient(
    x - r * 0.3, y - r * 0.3, r * 0.01,
    x - r * 0.1, y - r * 0.1, r * 0.55
  );
  hGrad.addColorStop(0, "rgba(255,255,255,0.22)");
  hGrad.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = hGrad;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fill();
}

function drawCountryInfo(x, y, c, alpha) {
  push();
  textAlign(CENTER, CENTER);
  noStroke();

  // Country name
  fill(255, 255, 255, alpha);
  textStyle(BOLD);
  textSize(c.currentR * 0.16);
  text(c.name, x, y - c.currentR * 0.18);

  // Divider
  stroke(255, 255, 255, alpha * 0.35);
  strokeWeight(1);
  line(x - c.currentR * 0.3, y - c.currentR * 0.02, x + c.currentR * 0.3, y - c.currentR * 0.02);
  noStroke();

  // Label
  fill(200, 200, 220, alpha * 0.7);
  textStyle(NORMAL);
  textSize(c.currentR * 0.085);
  text("HAPPINESS SCORE", x, y + c.currentR * 0.1);

  // Score
  fill(255, 255, 255, alpha);
  textStyle(BOLD);
  textSize(c.currentR * 0.24);
  text(c.score.toFixed(2), x, y + c.currentR * 0.28);

  pop();
}

// ── Interaction ───────────────────────────────────────────────────────────
function updateHover() {
  hoveredIndex = -1;

  // Check selected circle first (it's drawn on top)
  if (selectedIndex >= 0) {
    let c = countries[selectedIndex];
    if (dist(mouseX, mouseY, c.currentX, c.currentY) < c.currentR) {
      hoveredIndex = selectedIndex;
      return;
    }
    return; // When overlay is up, only the selected circle is clickable
  }

  for (let i = 0; i < countries.length; i++) {
    let c = countries[i];
    let ox = Math.sin(frameCount * 0.015 + c.phase) * 2;
    let oy = Math.cos(frameCount * 0.02 + c.phase * 1.3) * 2;
    if (dist(mouseX, mouseY, c.currentX + ox, c.currentY + oy) < c.currentR) {
      hoveredIndex = i;
      break;
    }
  }
}

function mousePressed() {
  if (selectedIndex >= 0) {
    // Any click deselects
    deselectCircle();
  } else if (hoveredIndex >= 0) {
    selectCircle(hoveredIndex);
  }
}

function selectCircle(index) {
  selectedIndex = index;
  let enlargedR = Math.min(width, height) * 0.22;
  countries[index].targetX = width / 2;
  countries[index].targetY = height / 2;
  countries[index].targetR = enlargedR;
}

function deselectCircle() {
  if (selectedIndex >= 0) {
    let c = countries[selectedIndex];
    c.targetX = c.gridX;
    c.targetY = c.gridY;
    c.targetR = circleR * c.sizeScale;
    selectedIndex = -1;
  }
}

// ── Resize ────────────────────────────────────────────────────────────────
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  computeGrid();

  let n = countries.length;
  let lastRowCount = n % cols || cols;
  let lastRowIndex = Math.ceil(n / cols) - 1;

  for (let i = 0; i < n; i++) {
    let col = i % cols;
    let row = Math.floor(i / cols);

    let rowOffset = 0;
    if (row === lastRowIndex && lastRowCount < cols) {
      rowOffset = ((cols - lastRowCount) * cellW) / 2;
    }

    let x = padding + rowOffset + col * cellW + cellW / 2;
    let y = padding + row * cellH + cellH / 2;
    countries[i].gridX = x;
    countries[i].gridY = y;

    if (i !== selectedIndex) {
      countries[i].targetX = x;
      countries[i].targetY = y;
      countries[i].targetR = circleR * countries[i].sizeScale;
    } else {
      countries[i].targetX = width / 2;
      countries[i].targetY = height / 2;
      countries[i].targetR = Math.min(width, height) * 0.22;
    }
  }
}
