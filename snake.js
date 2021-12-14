class Snake {
    constructor(posx, posy, size) {
        this.posx = posx; // Posição X da cobra (cabeça)
        this.posy = posy; // Posição Y da cobra (cabeça)
        this.size = size; // Tamanho da cobra (Por quadrado)
        this.tail = [{x: this.posx, y: this.posy}]; // Array de coordenadas de cada parte da cauda
        this.rotX = 0; // Rotação no eixo X (1 => Direita, -1 => Esquerda, 0 => Sem movimento no eixo)
        this.rotY = 1; // Rotação no eixo Y (1 => Baixo, -1 => Cima, 0 => Sem movimento no eixo)
    }

    moveSnake() {
        var rectDirection;
        if (this.rotX == 1) {
            rectDirection = {
                x: this.tail[this.tail.length - 1].x + this.size,
                y: this.tail[this.tail.length - 1].y
            }
        } else if (this.rotX == -1) {
            rectDirection = {
                x: this.tail[this.tail.length - 1].x - this.size,
                y: this.tail[this.tail.length - 1].y
            }
        } else if (this.rotY == 1) {
            rectDirection = {
                x: this.tail[this.tail.length - 1].x,
                y: this.tail[this.tail.length - 1].y + this.size
            }
        } else if (this.rotY == -1) {
            rectDirection = {
                x: this.tail[this.tail.length - 1].x,
                y: this.tail[this.tail.length - 1].y - this.size
            }
        }

        this.tail.shift();
        this.tail.push(rectDirection);
    }
}

class Apple {
    constructor() {
        var isTouching;

        while (true) {
            isTouching = false;

            this.x = Math.floor(Math.random() * canvas.width / snake.size) * snake.size;
            this.y = Math.floor(Math.random() * canvas.height / snake.size) * snake.size;
            
            for (var i = 0; i < snake.tail.length; i++) {
                if (this.x == snake.tail[i].x && this.y == snake.tail[i].y) {
                    isTouching = true;
                }
            }
            
            this.size = snake.size;
            this.color = "red";

            if (!isTouching) {
                break;
            }
        }
    }
}

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var snake = new Snake(20, 20, 20);
var apple = new Apple();

// Função que cria um loop de atualização de frame para o jogo
function gameLoop() {
    setInterval(loadGame, 1000/10);
}

// Função que carrega o jogo
function loadGame() {
    updateGameFrame();
    drawCanvas();
}

// Função que atualiza as mudanças em cada frame do jogo
function updateGameFrame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    snake.moveSnake();
    eatApple();
    checkWallTouch();
}

// Função que exibe o canvas (tela do jogo) na página
function drawCanvas() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (var i = 0; i < snake.tail.length; i++) {
        ctx.fillStyle = "green";
        ctx.fillRect(snake.tail[i].x + 1.5, snake.tail[i].y + 1.5, snake.size - 3, snake.size - 3);
    }

    ctx.fillStyle = apple.color;
    ctx.fillRect(apple.x, apple.y, apple.size, apple.size);
}

// Função que verifica se a cabeça da cobra está atravessando/tocando a borda do canvas
function checkWallTouch() {
    var snakeHead = snake.tail[snake.tail.length - 1];

    if (snakeHead.x == -snake.size) {
        snakeHead.x = canvas.width - snake.size;
    } else if (snakeHead.x == canvas.width) {
        snakeHead.x = 0;
    } else if (snakeHead.y == -snake.size) {
        snakeHead.y = canvas.height - snake.size;
    } else if (snakeHead.y == canvas.height) {
        snakeHead.y = 0;
    }
}

// Função que verifica se a cobra encostou na maçã
function eatApple() {
    if (snake.tail[snake.tail.length - 1].x == apple.x && snake.tail[snake.tail.length - 1].y == apple.y) {
        snake.tail[snake.tail.length] = {x: apple.x, y: apple.y}
        apple = new Apple();
    }
}

// Executará quando a página terminar de carregar
window.onload = () => {
    gameLoop();
}


// Cria um evento que verifica as teclas pressionadas na guia
window.addEventListener("keydown", (event) => {
    setTimeout(() => {
        // Se a tecla pra esquerda for pressionada e a
        // rotação NÃO estiver para a direita, então a
        // cobra vira para a esquerda
        if (event.keyCode == 37 && snake.rotX != 1) {
            snake.rotX = -1;
            snake.rotY = 0;
            
            // Se a tecla para cima for pressionada e a
            // rotação NÃO estiver para baixo, então a
            // cobra vira para cima
        } else if (event.keyCode == 38 && snake.rotY != 1) {
            snake.rotX = 0;
            snake.rotY = -1;

            // Se a tecla para a direita for pressionada e a
            // rotação NÃO estiver para a esquerda, então a
            // cobra vira para a direita
        } else if (event.keyCode == 39 && snake.rotX != -1) {
            snake.rotX = 1;
            snake.rotY = 0;

            // Se a tecla para baixo for pressionada e a
            // rotação NÃO estiver para cima, então a
            // cobra vira para baixo
        } else if (event.keyCode == 40 && snake.rotY != -1) {
            snake.rotX = 0;
            snake.rotY = 1;
        }
    }, 1);
})