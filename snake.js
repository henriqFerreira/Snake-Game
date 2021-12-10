class Snake {
    constructor(posx, posy, size) {
        this.posx = posx; // Posição X da cobra (cabeça)
        this.posy = posy; // Posição Y da cobra (cabeça)
        this.size = size; // Tamanho da cobra (Por quadrado)
        this.tail = [{x: this.posx, y: this.posy}]; // Coordenadas da cauda
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

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

// Executará quando a página terminar de carregar
window.onload = () => {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}