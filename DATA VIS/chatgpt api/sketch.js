//ChatGPT API Demo
//User Input with prompt to ask ChatGPT a question
//This demo uses sample responses to show how the API works

let apiKey = "api key here";
let apiUrl = "https://api.openai.com/v1/chat/completions";

let data;
let input;
let button;
let response = "";
let currentQuestion = "";

// Demo responses to simulate ChatGPT without needing an API key
let demoResponses = {
  "default": "I'm a demo of the ChatGPT API! Try asking me something like:\n\n• \"What is JavaScript?\"\n• \"Explain APIs\"\n• \"What is p5.js?\"\n• \"How does the internet work?\"\n• \"What is creative coding?\"",

  "javascript": "JavaScript is a programming language that makes websites interactive. It runs in your web browser and can respond to user actions like clicks, form submissions, and keyboard input. Along with HTML and CSS, it's one of the three core technologies of web development.",

  "api": "An API (Application Programming Interface) is a way for two programs to talk to each other. Think of it like a waiter at a restaurant — you tell the waiter what you want (your request), the waiter goes to the kitchen (the server), and brings back your food (the response). The OpenWeatherMap and ChatGPT APIs work exactly this way!",

  "p5": "p5.js is a JavaScript library for creative coding. It makes it easy to draw shapes, handle user input, and create animations in the browser. This entire demo is built with p5.js! Functions like setup(), draw(), createInput(), and createButton() all come from p5.js.",

  "internet": "The internet is a global network of connected computers. When you visit a website, your browser sends a request to a server, which sends back HTML, CSS, and JavaScript files. APIs work similarly — your code sends a request to a server and gets data back, usually in JSON format.",

  "creative coding": "Creative coding is using programming as a tool for artistic expression rather than purely functional purposes. Libraries like p5.js, Processing, and openFrameworks make it easy to create generative art, interactive installations, data visualizations, and more.",

  "weather": "Great question! The Weather API demo on this site uses the OpenWeatherMap API. It sends a request with a city name, and the server responds with temperature, humidity, wind speed, and weather conditions in JSON format. That's how most APIs work — request in, data out!",

  "hello": "Hello! I'm a demo version of ChatGPT. In a real implementation, your question would be sent to OpenAI's API using a POST request with your message in the body. The API would respond with generated text. Try asking me about JavaScript, APIs, or creative coding!",

  "how": "In a real ChatGPT integration, your question gets sent as a POST request to OpenAI's API endpoint. The request includes your message, the model name (like gpt-4o-mini), and an authorization header with your API key. The server processes your prompt and returns a response in JSON format."
};

function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont('Space Grotesk');

  //USER INPUT
  input = createInput('');
  input.attribute('placeholder', 'Ask ChatGPT a question');
  input.position(20, 80);
  input.size(350, 30);
  input.style('font-family', 'Space Grotesk, sans-serif');
  input.style('font-size', '16px');
  input.style('padding', '5px 10px');
  input.style('border', '1px solid rgba(255,255,255,0.3)');
  input.style('border-radius', '6px');
  input.style('background', 'rgba(255,255,255,0.1)');
  input.style('color', '#e0e0e0');
  input.style('outline', 'none');

  //ASK BUTTON
  button = createButton('Ask');
  button.position(input.x + input.width + 15, 80);
  button.size(60, 32);
  button.mousePressed(askChatGPT);
  button.style('font-family', 'Space Grotesk, sans-serif');
  button.style('font-size', '16px');
  button.style('padding', '5px 15px');
  button.style('border', '1px solid rgba(255,255,255,0.3)');
  button.style('border-radius', '6px');
  button.style('background', 'rgba(255,255,255,0.15)');
  button.style('color', '#e0e0e0');
  button.style('cursor', 'pointer');

  // Show default message on load
  response = demoResponses["default"];
}

async function askChatGPT() {
  let question = input.value().trim();
  if (!question) return;

  currentQuestion = question;

  // Check if a real API key is provided
  if (apiKey !== "api key here" && apiKey.startsWith("sk-")) {
    // Use the real API
    response = "Loading...";

    //fetch is used instead of loadJSON because OpenAI requires an Authorization header
    let result = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + apiKey
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "user", content: question }
        ]
      })
    });

    data = await result.json();
    console.log(data);

    if (data.choices) {
      response = data.choices[0].message.content;
    } else {
      response = "Error: " + data.error.message;
    }
  } else {
    // Demo mode — match question to a canned response
    let lowerQ = question.toLowerCase();
    let matched = false;

    for (let key in demoResponses) {
      if (key !== "default" && lowerQ.includes(key)) {
        response = demoResponses[key];
        matched = true;
        break;
      }
    }

    if (!matched) {
      response = "That's a great question! In a live version, this would be sent to OpenAI's ChatGPT API as a POST request. The API would process your prompt using a model like gpt-4o-mini and return a generated response.\n\nTry asking about: JavaScript, APIs, p5.js, the internet, or creative coding!";
    }
  }
}

function draw() {
  background(10, 10, 15);

  // Label
  fill(140);
  noStroke();
  textSize(13);
  textStyle(NORMAL);
  text("DEMO MODE — sample responses shown below", 20, 135);

  // Show the question if one was asked
  if (currentQuestion) {
    fill(100, 180, 255);
    textSize(16);
    textStyle(BOLD);
    text("Q: " + currentQuestion, 20, 170);
    textStyle(NORMAL);
  }

  // Show the response
  if (response) {
    fill(230);
    textSize(17);
    let yStart = currentQuestion ? 200 : 170;
    text(response, 20, yStart, width - 40, height - yStart - 20);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
