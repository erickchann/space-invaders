class Game {
    constructor() {
        this.gameover = false;
        this.win = false;

        this.alien = [];
        this.player;
        this.bullet;

        this.score = 0;
        this.speed = 10;
        
        this.init();
        this.listener();
    }

    init() {
        score.innerHTML = `Score: ${this.score}`;

        this.player = new Player();
        this.drawBackground();
        this.generateAlien();
    }

    generateAlien() {
        for (let row = 0; row < 5; row++) {
            for (let col = 0; col < 11; col++) {
                this.alien.push(new Alien(col * 40 + 30, row * 25 + 50, row < 3));
            }
        }
    }

    update() {
        ctx.clearRect(0, 0, w, h);
        this.drawBackground();

        this.checkWin();
        this.checkBulletCollision();
        this.checkGameOver();

        if (this.bullet) {
            this.bullet.update();

            if (this.bullet.y <= 20) {
                this.bullet = null;
            }
        }

        this.player.draw();

        this.alien.forEach(val => {
            if (val.x > w - 40 || val.x < 0) this.moveDown();
        });

        this.alien.forEach(val => {
            val.update();
        });
    }
    
    moveDown() {
        this.alien.forEach(val => {
            val.speed *= -1;

            val.y += 4;
        });
    }

    checkWin() {
        if (this.alien.length <= 0) {
            this.win = true;
        }
    }

    checkGameOver() {
        this.alien.forEach(val => {
            if (val.y >= h - 120) {
                if (!history || this.score > parseInt(history)) {
                    localStorage.setItem('score', this.score);

                    highscore.innerHTML = this.score;
                }

                this.gameover = true;
            }
        });
    }

    checkBulletCollision() {
        if (!this.bullet) return;

        this.alien.forEach((val, i) => {
            if (this.bullet && val.x < this.bullet.x + this.bullet.width && val.x + val.width > this.bullet.x && val.y < this.bullet.y + this.bullet.height && val.y + val.height > this.bullet.y) {
                this.alien.splice(i, 1);
                this.bullet = null;

                this.score += 10;
                score.innerHTML = `Score: ${this.score}`;
                return;
            }
        });
    }

    shoot() {
        if (this.bullet) return;

        this.bullet = new Bullet(this.player.x + ~~(this.player.width / 2) - 13, this.player.y);
    }

    drawBackground() {
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, w, h - 100);
        
        ctx.fillStyle = 'gray';
        ctx.fillRect(0, h - 100, w, 100);
    }

    listener() {
        window.addEventListener('keydown', e => {
            switch(e.key) {
                case 'a':
                    this.player.move(-5);
                    break;
                case 'd':
                    this.player.move(5);
                    break;
                case ' ':
                    this.shoot();
                    break;
            }
        });
    }
}