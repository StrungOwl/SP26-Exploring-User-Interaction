let s1 = 3;
let s2 = 3;
let sSpeed = 10;

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('canvas-container');
}

function draw() {
  background(0);

  // Scale star size based on screen height
  let scaledS1 = s1 * (height / 600);

  for(let i = 0; i < 1000; i++){
    fill(100);
    circle(random(width), random(height), scaledS1);
  }

  // Scale the expanding circle based on screen height
  let scaledS2 = s2 * (height / 600);
  circle(width/2, height/2, scaledS2);

  s2 += sSpeed;
  sSpeed += 0.03;

  // Check if circle has filled the screen (use height as the reference)
  if(s2 * (height / 600) >= height){
    sSpeed = 0;
    fill(255);
    // Scale text size based on screen height
    textSize(50 * (height / 600));
    textAlign(CENTER, CENTER);
    text("BOOM", width/2, height/2);
  }
}

function mousePressed(){
  s1 = 3;
  s2 = 3;
  sSpeed = 1;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
