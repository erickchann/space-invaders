class Player {
    constructor() {
        this.width = 80;
        this.height = 50;

        this.x = (w / 2) - (this.width / 2);
        this.y = h - 50;

        this.draw();
    }

    draw() {
        ctx.drawImage(image, 400, 0, 100, 80, this.x, this.y, this.width, this.height)
    }

    move(dir) {
        if (this.x + dir > w - 70 || this.x + dir < 10) return;

        this.x += dir;
    }
}