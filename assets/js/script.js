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
const secondsData = [canvas.width - 280, 400, seconds, 25, 25, "red", 10, 0]
const minutesData = [515, 400, minutes, 25, 25, "blue", 10, 0]
const hoursData = [30, 400, hours, 62.5, 25, "green", 4, 0]

function codeLoop() {
    updateTime()
    draw()
    window.requestAnimationFrame(codeLoop);
}

function returnSeconds(){
    return new Date().getSeconds()
}

function returnMinutes(){
    return new Date().getMinutes()
}

function returnHours(){
    return new Date().getHours()
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
    if (timeArray[3] == hoursData[3]){
        xPos -= timeArray[3]
    }
    let yPos = timeArray[1] - 275

    //yPos = secondsData[1] - 300 * (1 - milisecs/(1000 + (118 * secondsData[7])))
    yPos = makeNextCubeFall(timeArray)

    context.clearRect(timeArray[0]-1, yPos-1, 350, 27);
    drawSquare(xPos, yPos, timeArray[3], timeArray[4], timeArray[5])
}

function makeNextCubeFall(timeArray){
    let newYPos = timeArray[1] - 275
    if (timeArray == secondsData){
        //newYPos = timeArray[1] - 300 * (1 - milisecs/(1000 + (118 * timeArray[7])))
       newYPos = timeArray[1] - 295 * (1 - milisecs/(1000 + (118 * timeArray[7])))
    }
    else if (timeArray == minutesData) {
        //newYPos = timeArray[1] - 500 * (0.6 - seconds/100)
        newYPos = timeArray[1] - 400 * ((0.6 + timeArray[7] / 20) - seconds/(100))
    }
    else if (timeArray == hoursData) {
        newYPos = timeArray[1] - 300 * ((0.6 + timeArray[7] / 11.7647) - (minutes/100))
        //Y is the base level of the first row, which is minused by 300 to have it 300 higher, A number from 0 - 1 is then calculated and then used
        //To multiply the 300 to gradually lower it by a % amount so that at 1 minute it is at the top and at 60 minutes its at the bottom
    }

    return newYPos
}


function callEverySecond(){
    secondsData[7] = Math.floor(returnSeconds() / 10)
}

function callEveryMinute(){
    minutesData[7] = Math.floor(returnMinutes() / 10)
}

function callEveryHour(){
    hoursData[7] = Math.floor(returnHours() / 4)
}

setInterval(callEverySecond, 100)

setInterval(callEveryMinute, 100)

setInterval(callEveryHour, 100)

codeLoop()