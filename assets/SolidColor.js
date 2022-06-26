import Element from './Element.js';

export default class SolidColor extends Element {

    constructor({ position, color }) {
        super();

        this.position = position;
        this.height   = 150;
        this.width    = 50;
        this.color    = color;
    }

    draw() {
        if (this.outSpeed) this.updateFadeOut();
        if (this.inSpeed)  this.updateFadeIn();

        c.globalAlpha = this.opacity;
        c.fillStyle   = this.color;
        c.fillRect(
            this.position.x,
            this.position.y,
            this.width,
            this.height
        );
        c.globalAlpha = 1;
    }

    update() {
        this.draw();
    }

}