export default class Sprite {
    
    constructor({ position, imgSrc, frames = 1 }) {
        this.position      = position;
        this.height        = 150;
        this.width         = 50;
        this.image         = new Image();
        this.image.src     = imgSrc;
        this.scale         = 1;
        this.frames        = frames
        this.curFrame      = 0;
        this.framesElapsed = 0;
        this.frameSkip     = 5;
        this.offset        = {x: 0, y: 0};
        this.gravity       = 0.4;
        this.lastKey       = null;
        this.opacity       = 1;
        this.outSpeed      = null;
        this.inSpeed       = null;
    }

    draw() {
        if (this.outSpeed) this.updateFadeOut();
        if (this.inSpeed)  this.updateFadeIn();

        c.globalAlpha = this.opacity;
        c.drawImage(
            this.image,
            this.curFrame * (this.image.width / this.frames),
            0,
            this.image.width / this.frames,
            this.image.height,
            this.position.x - this.offset.x,
            this.position.y - this.offset.y,
            this.image.width * this.scale / this.frames,
            this.image.height * this.scale
        );
        c.globalAlpha = 1;
    }

    animateFrame() {
        this.framesElapsed ++;

        if (this.framesElapsed % this.frameSkip === 0) {
            this.curFrame < (this.frames - 1) ? this.curFrame ++ : this.curFrame = 0;
        }
    }

    update() {
        this.draw();
        this.animateFrame();
    }

    fadeIn(inSpeed) {
        this.inSpeed = inSpeed;
    }

    updateFadeIn() {
        if (this.opacity < 1) {
            this.opacity += this.inSpeed;
        } else {
            this.opacity = 1;
            this.inSpeed = 0;
        }
    }

    fadeOut(outSpeed) {
        this.opacity  = 1;
        this.outSpeed = outSpeed;
    }

    updateFadeOut() {
        if (this.opacity >= 0) {
            this.opacity -= this.outSpeed;
        } else {
            this.opacity  = 0;
            this.outSpeed = 0;
        }
    }
}