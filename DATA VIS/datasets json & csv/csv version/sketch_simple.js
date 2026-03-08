//Get row 0, country name
//Get row 2, happiness (ladder) score
//show text for each country
//show happiness score in circle size 
//use AI to make it cool 

let table
let country
let textX, textY;
let scale; //scale up the size so it's not tiny

async function setup() {
    createCanvas(windowWidth, windowHeight);



    table = await loadTable("worldHappiness2024.csv", ",", "header");

    country = table.getColumn("Country name");
    happiness = table.getColumn("Ladder score");

    scale = width * 0.01;

    textAlign(CENTER, CENTER);  
}

function draw() {
    background(220);
    if (table) {
        for (let i = 0; i < table.getRowCount(); i++) {
            textX = random(width);
            textY = random(height);
            circle(textX, textY, happiness[i] * scale);
            text(country[i], textX, textY);

        }
    }
    noLoop();
}
