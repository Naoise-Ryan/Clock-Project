const canvas = document.getElementById("the_canvas")
const context = canvas.getContext("2d");
context.imageSmoothingEnabled = false;

function codeLoop() {
    draw()
    updateTime()
    window.requestAnimationFrame(codeLoop);
}

function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "red";
    context.fillRect(0,0,10,10);
}

function updateTime() {
    const d = new Date();
    seconds = d.getSeconds()
    minutes = d.getMinutes()
    hours = d.getHours()

    console.log("seconds ", seconds)
    console.log("minutes ", minutes)
    console.log("hours ", hours)
}

let seconds = 0
let minutes = 0
let hours = 0

codeLoop()