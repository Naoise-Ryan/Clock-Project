const canvas = document.getElementById("the_canvas")
const context = canvas.getContext("2d");
context.imageSmoothingEnabled = false;
context.font = "20px Arial";
context.fillStyle = "red";
context.strokeStyle = "black";
context.lineWidth = 2;

let seconds = 0
let minutes = 0
let hours = 0

const secondsBoxStartPos = [5, 300]
const cubeSize = 25

function codeLoop() {
    updateTime()
    draw()
    window.requestAnimationFrame(codeLoop);
}

function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    //drawSquare(10, 10, cubeSize)
    drawSecondsBox(seconds)

    context.fillText(hours, (canvas.width / 2), 50)
    context.fillText(minutes, (canvas.width / 2 + 30), 50)
    context.fillText(seconds, (canvas.width / 2 + 60), 50)
}

function updateTime() {
    const d = new Date();
    seconds = d.getSeconds()
    minutes = d.getMinutes()
    hours = d.getHours()
}

function drawSquare(x, y, size) {
    context.fillStyle = "red";
    context.fillRect(x, y, size, size);

    //outline
    context.fillStyle = "black";
    context.strokeRect(x, y, size, size);
}

function drawSecondsBox(time) {
    for (let i = 0; i < time; i++) {
        let xPos = secondsBoxStartPos[0] + (cubeSize * i)
        let yPos = secondsBoxStartPos[1] - (cubeSize * Math.floor((i / 10) % 10))
        drawSquare(xPos, yPos, cubeSize)
    }
}

codeLoop()