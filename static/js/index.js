const guessBtn = document.getElementById('guess-btn');
const clearBtn = document.getElementById('clear-btn');
const guessText = document.getElementById('guess-text');
const url = 'http://localhost:5000/predict';
let isProcessing;

document.addEventListener('DOMContentLoaded', () => {
    const elems = document.querySelectorAll('.modal');
    const instances = M.Modal.init(elems, {});
});

guessBtn.addEventListener('click', (e) => {
    e.preventDefault();
    guessBtn.classList.add('disabled');
    clearBtn.classList.add('disabled');
    guessText.innerText = 'I am thinking...';
    isProcessing = true;

    doodle = get();
    doodle.resize(28, 28);
    doodle.loadPixels();
    input = [];
    for (let i = 0; i < doodle.pixels.length; i += 4) {
        input.push(255 - doodle.pixels[i]);
    }

    const postData = { image: input };
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            guessBtn.classList.remove('disabled');
            clearBtn.classList.remove('disabled');
            guessText.innerText = `I believe it is ${data.label}`;
            isProcessing = false;
        });
});

clearBtn.addEventListener('click', (e) => {
    guessText.innerText = '';
    background(255);
});

function setup() {
    isProcessing = false;
    guessText.innerText = '';
    cvs = createCanvas(500, 500);
    cvs.parent('canvas');
    background(255);
}

function draw() {
    strokeWeight(15);
    stroke(0);
    if (!isProcessing) {
        if (mouseIsPressed) {
            line(pmouseX, pmouseY, mouseX, mouseY);
        }
    }
}