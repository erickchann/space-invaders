class Alien {
    constructor(x, y, type) {
        this.x = x;
        this.y = y;
        
        this.width = 30;
        this.height = 20;

        this.type = !type ? 225 : 0;
        this.mask = {
            x: this.type,
            y: 0,
            width: 112 - (!type ? 25 : 0),
            height: 80
        };

        this.state = 0;
        this.speed = 10;

        this.draw();
    }

    draw() {
        ctx.drawImage(image, this.mask.x, this.mask.y, this.mask.width, this.mask.height, this.x, this.y, this.width, this.height);
    }

    update() {
        if (this.state > 1) this.state = 0;

        this.mask.x = this.mask.width * this.state + this.type;
        this.state++;

        this.x += this.speed;

        this.draw();
    }
}