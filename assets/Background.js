export default class Background {
    
    constructor({ position, imgSrc, c }) {
        this.position  = position;
        this.height    = 150;
        this.width     = 50;
        this.c         = c;
        this.image     = new Image();
        this.image.src = imgSrc;
    }

    draw() {
        this.c.drawImage(this.image, this.position.x, this.position.y);
    }

    update() {
        this.draw();
    }
}