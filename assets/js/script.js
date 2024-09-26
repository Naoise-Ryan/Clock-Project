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

//Data setup = X, Y, time Type, SizeX, SizeY, Color, row length
const secondsData = [canvas.width - 255, 300, seconds, 25, 25, "red", 10]
const minutesData = [515, 300, minutes, 25, 25, "blue", 10]
const hoursData = [5, 300, hours, 75, 25, "green", 4]

const secondsBoxStartPos = [1000, 300]
const minutesBoxStartPos = [500, 300]
const hoursBoxStartPos = [5, 300]
const cubeSize = 25

function codeLoop() {
    updateTime()
    draw()
    window.requestAnimationFrame(codeLoop);
}

function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);


    drawBoxRows(secondsData)
    drawBoxRows(minutesData)
    drawBoxRows(hoursData)
    
    context.fillText(hours, (canvas.width / 2), 50)
    context.fillText(minutes, (canvas.width / 2 + 30), 50)
    context.fillText(seconds, (canvas.width / 2 + 60), 50)
}

function updateTime() {
    const d = new Date();
    seconds = d.getSeconds()
    minutes = d.getMinutes()
    hours = d.getHours()

    secondsData[2] = seconds
    minutesData[2] = minutes
    hoursData[2] = hours
}

function drawSquare(x, y, sizeX, sizeY, color) {
    context.fillStyle = color;
    context.fillRect(x, y, sizeX, sizeY);

    //outline
    context.fillStyle = "black";
    context.strokeRect(x, y, sizeX, sizeY);
}

function drawBoxRows(timeArray) {
    for (let i = 0; i < timeArray[2]; i++) {
        let xPosMultiplyer = i
        if (xPosMultiplyer >= timeArray[6]) {
            xPosMultiplyer %= timeArray[6]
        }

        let rowDividerMath = Math.floor((i / timeArray[6]) % timeArray[6])

        let xPos = timeArray[0] + (timeArray[3] * xPosMultiplyer)
        let yPos = timeArray[1] - (timeArray[4] * rowDividerMath)
        context.fillStyle = timeArray[4]
        drawSquare(xPos, yPos, timeArray[3], timeArray[4], timeArray[5])
    }
}

codeLoop()