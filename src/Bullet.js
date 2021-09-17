class Bullet {
    constructor(x, y) {
        this.x = x;
        this.y = y;

        this.width = 5;
        this.height = 10;

        this.draw();
    }

    draw() {
        ctx.fillStyle = 'white';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    update() {
        this.y -= 15;

        this.draw();
    }
}