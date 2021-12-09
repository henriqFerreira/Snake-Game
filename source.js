// Canvas element
var canvas = document.getElementById("canvas");
// Canvas context
var context = canvas.getContext("2d");
// Box width
var boxW = 20;
// Box height
var boxH = 20;
// Initial horizontal pos
var boxPosX = 0;
// Initial vertical pos
var boxPosY = 0;

function drawRect(boxPosX, boxPosY, boxW, boxH) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillRect(boxPosX, boxPosY, boxW, boxH);
}

drawRect(boxPosX, boxPosY, boxW, boxH);

window.onkeydown = (event) => {
    var keyPressed = event.keyCode;

    if (keyPressed === 37 && boxPosX > 10) {
        boxPosX = boxPosX - 20;
    } else if (keyPressed === 38 && boxPosY > 10) {
        boxPosY = boxPosY - 20;
    } else if (keyPressed === 39 && boxPosX <=  260) {
        boxPosX = boxPosX + 20;
    } else if (keyPressed === 40 && boxPosY <= 260) {
        boxPosY = boxPosY + 20;
    }

    drawRect(boxPosX, boxPosY, boxW, boxH);
}