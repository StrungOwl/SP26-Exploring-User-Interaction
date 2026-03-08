//ChatGPT API Demo
//User Input with prompt to ask ChatGPT a question

let apiKey = "api key here";
let apiUrl = "https://api.openai.com/v1/chat/completions";

let data;
let input;
let button;
let response = "";

function setup() {
  createCanvas(windowWidth, windowHeight);

  //USER INPUT
  input = createInput('Ask ChatGPT a question');
  input.position(20, 20);
  input.size(400, 20);

  //ASK BUTTON
  button = createButton('Ask');
  button.position(input.x + input.width + 10, 20);
  button.mousePressed(askChatGPT);
}

async function askChatGPT() {
  let question = input.value();
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
}

function draw() {
  background(220);

  if (response) {
    textSize(18);
    text(response, 20, 80, width - 40, height - 100);
  }
}
