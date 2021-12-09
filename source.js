window.onload = () => {
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");

    setInterval(gameLoop, 100);

    const veloc = 1;

    var velocX = velocY = 0;
    var posX = posY = 5;
    var boxSize = 20;
    var boxQnt = 20;
    var appleX = appleY = 15;

    var trail = [];
    tail = 5;

    function gameLoop() {
        posX += velocX;
        posY += velocY;

        if (posX < 0) {
            posX = boxQnt - 1;
        }
        if (posX > boxQnt - 1) {
            posX = 0;
        }
        if (posY < 0) {
            posY = boxQnt - 1;
        }
        if (posY > boxQnt - 1) {
            posY = 0;
        }

        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "red";
        ctx.fillRect(appleX * boxSize, appleY * boxSize, boxSize, boxSize);
        
        ctx.fillStyle = "green";
        for (var i = 0; i < trail.length; i++) {
            ctx.fillRect(trail[i].x*boxSize, trail[i].y*boxSize, boxSize-1, boxSize-1);
            
            if (trail[i].x == posX && trail[i].y == posY) {
                velocX = velocY = 0;
                tail = 5;
            }
        }

        trail.push({x: posX, y: posY})
        // Verifica se o rastro está maior que a cauda
        while(trail.length > tail) {
            trail.shift()
        }

        if (appleX == posX && appleY == posY) {
            tail++;
            appleX = Math.floor(Math.random()*boxQnt);
            appleY = Math.floor(Math.random()*boxQnt);
        }
    }

    window.addEventListener("keydown", (event) => {
        switch (event.keyCode) {
            case 37: // Left
                velocX = -veloc;
                velocY = 0;
                break;
            case 38: // Up
                velocX = 0;
                velocY = -veloc;
                break;
            case 39: // Right
                velocX = veloc;
                velocY = 0;
                break;
            case 40: // Down
                velocX = 0;
                velocY = veloc;
                break;
            default:
                break;
        }
    });

}