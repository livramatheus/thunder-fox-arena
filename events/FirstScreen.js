import Sprite from '../assets/Sprite.js';

export default class FirstScreen {

    constructor() {
        this.logo = new Sprite({
            position: { x: 306.6, y: 40 },
            imgSrc: './img/logo_sprite.png',
            frames: 8
        });
        this.Thunder = new Sprite({
            position: { x: 504, y: 176 },
            imgSrc: './img/renders/thunder_1.png',
            frames: 1
        });
        this.Fox = new Sprite({
            position: { x: 30, y: 100 },
            imgSrc: './img/renders/fox_1.png',
            frames: 1
        });
        this.Click = new Sprite({
            position: { x: 355.8, y: 400 },
            imgSrc: './img/click_to_play.png',
            frames: 2
        });

        // Scaling sprites
        this.logo.scale      = 1.3;
        this.Thunder.scale   = 0.7;
        this.Fox.scale       = 0.8;
        this.Click.scale     = 0.8;

        this.Click.frameSkip = 50;

        this.manageKeys();
    }

    animate = () => {
        c.fillStyle = 'black';
        c.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        this.logo.update();
        this.Thunder.update();
        this.Fox.update();
        if (!globalData.gameLoading) this.Click.update();
    }

    startIntroduction = (event) => {
        if (globalData.gameLoading) return;

        this.removeKeys();
        [this.logo, this.Thunder, this.Fox, this.Click].forEach((spr) => {
            spr.fadeOut(0.05);
        });

        setTimeout(this.shutDown, 2000);
    }

    removeKeys() {
        document.querySelector("#canvas").removeEventListener('click', this.startIntroduction);
    }

    manageKeys() {
        document.querySelector("#canvas").addEventListener('click', this.startIntroduction);
    }

    shutDown() {
        globalData.next = 'introduction';
    }

}