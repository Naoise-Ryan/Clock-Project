const canvas = document.getElementById("the_canvas")
const context = canvas.getContext("2d");
context.imageSmoothingEnabled = false;
context.font = "20px Arial";
context.fillStyle = "red";
context.strokeStyle = "black";
context.lineWidth = 2;

let milisecs = 0
let seconds = 0
let minutes = 0
let hours = 0

//Data setup = X, Y, time Type, SizeX, SizeY, Color, row length, loops
const secondsData = [canvas.width - 280, 300, seconds, 25, 25, "red", 10, 0]
const minutesData = [515, 300, minutes, 25, 25, "blue", 10, 0]
const hoursData = [30, 300, hours, 62.5, 25, "green", 4, 0]

function codeLoop() {
    updateTime()
    draw()
    window.requestAnimationFrame(codeLoop);
}

function returnSeconds(){
    return new Date().getSeconds()
}

function updateTime() {
    const d = new Date();
    milisecs = d.getMilliseconds()
    seconds = d.getSeconds()
    minutes = d.getMinutes()
    hours = d.getHours()
    //Updates time variables
    secondsData[2] = seconds
    minutesData[2] = minutes
    hoursData[2] = hours
}

function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawBoxRows(secondsData)
    drawBoxRows(minutesData)
    drawBoxRows(hoursData)
}

function drawSquare(x, y, sizeX, sizeY, color) {
    context.fillStyle = color;
    context.fillRect(x, y, sizeX, sizeY);
    //outline
    context.fillStyle = "black";
    context.strokeRect(x, y, sizeX, sizeY);
}

function drawBoxRows(timeArray) {
    //Draws the background
    drawBackground(timeArray)
    
    //Draws the cubes representing time
    for (let i = 0; i < timeArray[2]; i++) {
        let xPosMultiplyer = i
        if (xPosMultiplyer >= timeArray[6]) {
            xPosMultiplyer %= timeArray[6]
        }

        drawNextCube(xPosMultiplyer, timeArray)

        let rowDividerMath = Math.floor((i / timeArray[6]) % timeArray[6])
        let xPos = timeArray[0] + (timeArray[3] * xPosMultiplyer)
        let yPos = timeArray[1] - (timeArray[4] * rowDividerMath)
        context.fillStyle = timeArray[4]
        drawSquare(xPos, yPos, timeArray[3], timeArray[4], timeArray[5])
    }
}

function drawBackground(timeArray) {
    drawSquare(timeArray[0], (timeArray[1] + 25), (timeArray[3] * timeArray[6]), (timeArray[4] * -6), "gray")
}

function drawNextCube(xPosMultiplyer, timeArray){
    xPosMultiplyer += 1;
    if (xPosMultiplyer > 9){
        xPosMultiplyer = 0
    }

    let xPos = timeArray[0] + (timeArray[3] * xPosMultiplyer)
    let yPos = timeArray[1] - 275

    //yPos = secondsData[1] - 300 * (1 - milisecs/(1000 + (118 * secondsData[7])))

    context.clearRect(timeArray[0]-1, yPos-2, 350, 30);
    drawSquare(xPos, yPos, timeArray[3], timeArray[4], timeArray[5])
}


function callEverySecond(){
    returnSeconds()

    secondsData[7] = Math.floor(returnSeconds() / 10)
}


setInterval(callEverySecond, 1000)

codeLoop()