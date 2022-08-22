let canvas = document.getElementById("canvas");

let ROWS = 30;
let COLS = 50;
let PIXEL = 10;

let pixels = new Map();

function initializeCanvas() {
    for (let i = 0; i < ROWS; i++) {
        for (let j = 0; j < COLS; j++) {
            let pixel = document.createElement("div");
            pixel.style.position = "absolute";
            pixel.style.border = " 1px solid #aaa";
            pixel.style.left = j * PIXEL + "px";
            pixel.style.top = i * PIXEL + "px";
            pixel.style.width = PIXEL + "px";
            pixel.style.height = PIXEL + "px";
            let position = i + '_' + j
            canvas.appendChild(pixel);
            pixels.set(position, pixel)
        }
    }
}

initializeCanvas();

function drawSnake(snake) {
    let snakePositions = new Set();
    for (let [top, left] of snake) {
        let position = top + '_' + left;
        snakePositions.add(position);
    }

    for (let i = 0; i < ROWS; i++) {
        for (let j = 0; j < COLS; j++) {
            let position = i + '_' + j;
            let pixel = pixels.get(position);
            pixel.style.background =
                snakePositions.has(position) ?
                    'black' :
                    'white';
        }
    }
}


let currentSnake = [
    [0, 0],
    [0, 1],
    [0, 2],
    [0, 3],
    [0, 4],
];


let moveRight = ([t, l]) => [t, l + 1];
let moveLeft = ([t, l]) => [t, l - 1];
let moveTop = ([t, l]) => [t - 1, l];
let moveBottom = ([t, l]) => [t + 1, l];

let currentDirection = moveRight;
let flushedDirection = currentDirection;

window.addEventListener("keydown", (e) => {
    switch (e.key) {
        case 'ArrowLeft':
            if (flushedDirection !== moveRight) { currentDirection = moveLeft; }
            break;
        case 'ArrowRight':
            if (flushedDirection !== moveLeft) { currentDirection = moveRight; }
            break;
        case "ArrowUp":
            if (flushedDirection !== moveBottom) { currentDirection = moveTop; }
            break;
        case "ArrowDown":
            if (flushedDirection !== moveTop) { currentDirection = moveBottom }
            break;
    }
});

function step() {
    currentSnake.shift();
    let head = currentSnake[currentSnake.length - 1];
    let nextHead = currentDirection(head);
    flushedDirection = currentDirection;
    currentSnake.push(nextHead);
    drawSnake(currentSnake);
}

drawSnake(currentSnake);
setInterval(() => {
    step();
}, 200);
