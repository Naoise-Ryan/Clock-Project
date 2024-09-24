function codeLoop() {
    draw()
    window.requestAnimationFrame(codeLoop);
}

function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height); //Clears canvis

}

codeLoop()