export default class Sprite {
    
    constructor({ position, imgSrc, c, scale = 2, frames = 1}) {
        this.position      = position;
        this.height        = 150;
        this.width         = 50;
        this.c             = c;
        this.image         = new Image();
        this.image.src     = imgSrc;
        this.scale         = scale;
        this.frames        = frames
        this.curFrame      = 0;
        this.framesElapsed = 0;
        this.frameSkip     = 5;
    }

    draw() {
        this.c.drawImage(
            this.image,
            this.curFrame * (this.image.width / this.frames),
            0,
            this.image.width / this.frames,
            this.image.height,
            this.position.x,
            this.position.y,
            this.image.width * this.scale / this.frames,
            this.image.height * this.scale
        );
    }

    update() {
        this.draw();
        this.framesElapsed ++;

        if (this.framesElapsed % this.frameSkip === 0) {
            this.curFrame < (this.frames - 1) ? this.curFrame ++ : this.curFrame = 0;
        }
    }
}