import Element from './Element.js';

export default class Background extends Element {
    
    constructor({ position, imgSrc, music }) {
        super();

        this.position  = position;
        this.height    = 150;
        this.width     = 50;
        this.image     = new Image();
        this.image.src = imgSrc;
        this.music     = music

        if (this.music) {
            this.sound = new Audio(this.music);
        }
    }

    draw() {
        if (this.outSpeed) this.updateFadeOut();
        if (this.inSpeed)  this.updateFadeIn();

        c.globalAlpha = this.opacity;
        c.drawImage(this.image, this.position.x, this.position.y);
        c.globalAlpha = 1;
    }

    update() {
        this.draw();
    }
}