export default class Element {

    constructor() {
        this.opacity  = 1;
        this.outSpeed = null;
        this.inSpeed  = null;
    }

    fadeIn(inSpeed) {
        if (this.inSpeed != 0) this.inSpeed = inSpeed;
    }

    updateFadeIn() {
        if (this.opacity < 1 - (this.inSpeed * 2)) {
            this.opacity += this.inSpeed;
        } else {
            this.opacity = 1;
            this.inSpeed = 0;
        }
    }

    fadeOut(outSpeed) {
        if (this.outSpeed != 0) this.outSpeed = outSpeed;
    }

    updateFadeOut() {
        if (this.opacity > 0 + (this.outSpeed * 2)) {
            this.opacity -= this.outSpeed;
        } else {
            this.opacity  = 0;
            this.outSpeed = 0;
        }
    }
}