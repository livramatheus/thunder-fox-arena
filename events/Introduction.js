import Background from '../assets/Background.js';
import SolidColor from '../assets/SolidColor.js';
import Sprite from '../assets/Sprite.js';
import Plot from '../misc/Plot.js';
import KeyMap from '../misc/KeyMap.js';

export default class Introduction {

    constructor() {
        this.Background = new Background({
            position: { x: 0, y: 0 },
            imgSrc: './img/introduction_bg.png',
            music: './sound/music_01.mp3'
        });

        // Black Solid Color Overlay
        this.BlackOverlay         = new SolidColor({ position: { x:0, y: 0 }, color: 'black'});
        this.BlackOverlay.width   = CANVAS_WIDTH;
        this.BlackOverlay.height  = CANVAS_HEIGHT;
        this.BlackOverlay.opacity = 0;

        // Thunder Render
        this.Thunder = new Sprite({
            position: { x: 504, y: 176 },
            imgSrc: './img/renders/thunder_1.png',
            frames: 1
        });
        this.Thunder.scale   = 0.8;
        this.Thunder.opacity = 0;

        // Fox Render
        this.Fox = new Sprite({
            position: { x: 30, y: 100 },
            imgSrc: './img/renders/fox_1.png',
            frames: 1
        });
        this.Fox.scale = 0.8;
        this.Fox.opacity = 0;

        this.currentText  = -4;
        this.textInterval = 500;
        this.subScene = 1;
        
        c.fillStyle = 'white'
        c.font = "16px 'Press Start 2P', cursive";

        this.initMusic();
        this.manageKeys();
        this.drawTexts();
    }

    initMusic() {
        this.Background.sound.volume = 0.4;
        this.Background.sound.play();
    }

    animate = () => {
        switch (this.subScene) {
            case 2:
                this.sceneTwo();
                break;
            case 3:
                this.sceneThree();
                break;
            default:
                break;
        }
    }

    sceneTwo() {
        this.BlackOverlay.fadeIn(0.009)
        
        setTimeout(() => {
            this.Thunder.fadeIn(0.009);
        }, 1500);

        setTimeout(() => {
            this.Fox.fadeIn(0.009);
        }, 3000);

        setTimeout(() => {
            this.subScene = 3;
        }, 5000);

        this.BlackOverlay.update();
        this.Thunder.update();
        this.Fox.update();
    }

    sceneThree() {
        this.Thunder.fadeOut(0.009);
        this.Fox.fadeOut(0.009);

        setTimeout(() => {
            this.shutDown();
        }, 1500);

        this.BlackOverlay.update();
        this.Thunder.update();
        this.Fox.update();
    }

    drawTexts() {
        if (this.currentText <= Plot.length - 3 && this.subScene === 1) {
            this.Background.update();
            
            // This is not nice but I had no choice - BG was not rendering on first iteration
            if (this.currentText >= 0) {
                c.fillText(Plot[this.currentText]    , 210 + (37 - Plot[this.currentText].length    ) * 5.5, 100);
                c.fillText(Plot[this.currentText + 1], 210 + (37 - Plot[this.currentText + 1].length) * 5.5, 160);
                c.fillText(Plot[this.currentText + 2], 210 + (37 - Plot[this.currentText + 2].length) * 5.5, 220);
                c.fillText(Plot[this.currentText + 3], 210 + (37 - Plot[this.currentText + 3].length) * 5.5, 280);

                this.textInterval = 3700;
            }
            this.currentText += 4;

            this.interval = setTimeout(() => {
                this.drawTexts();
            }, this.textInterval);
        } else {
            this.subScene = 2;
            clearTimeout(this.interval);
        }
    }

    startGame = (event) => {
        if (event.key === KeyMap.Player1.start.key) this.shutDown(true);
    }

    removeKeys() {
        window.removeEventListener('keydown', this.startGame);
    }

    manageKeys() {
        window.addEventListener('keydown', this.startGame);
    }

    stopMusic() {
        this.Background.sound.pause();
        this.Background.sound.currentTime = 0;
    }

    shutDown(force = false) {
        globalData.next = 'pressstart';
        this.removeKeys();

        if (force) this.stopMusic();
    }

}