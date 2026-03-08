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

  //USER INPUT
  input = createInput('Enter City Name');
  input.position(20, 20);
  input.size(200, 20);

  //SEARCH BUTTON
  button = createButton('Search');
  button.position(input.x + input.width + 10, 20);
  button.mousePressed(searchData);
}

async function searchData() {
  let city = input.value();
  //you know how to format it by reading api doucmentation 
  let url = apiUrl + "?q=" + city + "&appid=" + apiKey + "&units=imperial";
  data = await loadJSON(url);
  console.log(data);
}

function draw() {
  background(220);

  if (data && data.main) {
    textSize(24);
    text("Location: " + data.name, 20, 100);
    text("Temp: " + data.main.temp + "°F", 20, 140);
    text("Condition: " + data.weather[0].description, 20, 180);
  }
}