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

function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont('Space Grotesk');

  //USER INPUT
  input = createInput('');
  input.attribute('placeholder', 'Enter City Name');
  input.position(windowWidth - 370, 200);
  input.size(250, 30);
  input.style('font-family', 'Space Grotesk, sans-serif');
  input.style('font-size', '16px');
  input.style('padding', '5px 10px');
  input.style('border', '1px solid rgba(255,255,255,0.3)');
  input.style('border-radius', '6px');
  input.style('background', 'rgba(255,255,255,0.1)');
  input.style('color', '#e0e0e0');
  input.style('outline', 'none');

  //SEARCH BUTTON
  button = createButton('Search');
  button.position(windowWidth - 370 + 265, 200);
  button.size(80, 32);
  button.mousePressed(searchData);
  button.style('font-family', 'Space Grotesk, sans-serif');
  button.style('font-size', '16px');
  button.style('padding', '5px 15px');
  button.style('border', '1px solid rgba(255,255,255,0.3)');
  button.style('border-radius', '6px');
  button.style('background', 'rgba(255,255,255,0.15)');
  button.style('color', '#e0e0e0');
  button.style('cursor', 'pointer');

  // Load default city on startup
  input.value('New York');
  searchData();
}

async function searchData() {
  let city = input.value();
  //you know how to format it by reading api doucmentation
  let url = apiUrl + "?q=" + city + "&appid=" + apiKey + "&units=imperial";
  data = await loadJSON(url);
  console.log(data);
}

function draw() {
  background(10, 10, 15);

  if (data && data.main) {
    // City name
    fill(255);
    noStroke();
    textSize(36);
    textStyle(BOLD);
    text(data.name, 20, 170);

    // Temperature
    textSize(64);
    text(Math.round(data.main.temp) + "°F", 20, 250);

    // Condition
    textSize(22);
    textStyle(NORMAL);
    fill(180);
    text(data.weather[0].description, 20, 290);

    // Extra details
    textSize(16);
    fill(140);
    let y = 340;
    text("Feels Like: " + Math.round(data.main.feels_like) + "°F", 20, y);
    text("Humidity: " + data.main.humidity + "%", 20, y + 30);
    text("Wind: " + Math.round(data.wind.speed) + " mph", 20, y + 60);
  } else if (data && data.message) {
    fill(255, 100, 100);
    textSize(20);
    text("Error: " + data.message, 20, 170);
  } else {
    fill(140);
    textSize(18);
    text("Loading weather data...", 20, 170);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  input.position(windowWidth - 370, 200);
  button.position(windowWidth - 370 + 265, 200);
}
