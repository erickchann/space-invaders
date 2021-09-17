const button = document.querySelector('button');
const score = document.querySelector('.score');
const highscore = document.querySelector('.high');

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const w = canvas.width;
const h = canvas.height;

const image = new Image();
image.src = 'images/sprite.png';

let game;
let gameInterval;
let gameSpeed = 80;

let history = localStorage.getItem('score') || null;
highscore.innerHTML = history;

init();

function init() {
    button.innerHTML = 'Pause';

    game = new Game();

    main();
}

function main() {
    button.onclick = function () {
        this.innerHTML = 'Play';

        pause();
    }

    gameInterval = setInterval(() => {
        if (!game.gameover) {
            if (game.win) {
                gameSpeed -= 20;
                game.win = false;

                game.init();
                main();
            } else {
                game.update();
            }
        } else {
            clearInterval(gameInterval);

            alert('Game Over!');

            button.innerHTML = 'Retry';
            button.onclick = () => {
                this.init();
            }
        }
    }, gameSpeed);
}

function pause() {
    clearInterval(gameInterval);

    button.innerHTML = 'Play';
    button.onclick = function () {
        this.innerHTML = 'Pause';

        main();
    }
}