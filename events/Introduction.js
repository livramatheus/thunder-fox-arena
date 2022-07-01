import Background from '../assets/Background.js';
import SolidColor from '../assets/SolidColor.js';
import Sprite from '../assets/Sprite.js';
import Plot from '../misc/Plot.js';

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

        // White Solid Color Overlay
        this.WhiteOverlay         = new SolidColor({ position: { x:0, y: 0 }, color: 'white'});
        this.WhiteOverlay.width   = CANVAS_WIDTH;
        this.WhiteOverlay.height  = CANVAS_HEIGHT;
        this.WhiteOverlay.opacity = 0;

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

        // Thunder Font
        this.ThunderFont = new Sprite({
            position: { x: CANVAS_WIDTH, y: 106 },
            imgSrc: './img/thunder_font.png',
            frames: 1
        });
        this.ThunderFont.scale = 1.5;

        // Fox Font
        this.FoxFont = new Sprite({
            position: { x: -316, y: 111 },
            imgSrc: './img/fox_font.png',
            frames: 1
        });
        this.FoxFont.scale = 1.5;

        // Animated logo
        this.logo = new Sprite({
            position: { x: 280.6, y: 110 },
            imgSrc: './img/logo_sprite.png',
            frames: 8
        });
        this.logo.scale   = 1.5;
        this.logo.opacity = 0;

        // "PRESS SPACE" text
        this.PressSpace = new Sprite({
            position: { x: 315.8, y: 330 },
            imgSrc: './img/press_space.png',
            frames: 2
        });
        this.PressSpace.scale     = 0.7;
        this.PressSpace.frameSkip = 50;
        this.PressSpace.opacity   = 0;

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
            case 4:
                this.sceneFour();
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
            this.subScene = 4;
        }, 5000);
        
        this.BlackOverlay.update();
        this.Thunder.update();
        this.Fox.update();
    }

    sceneFour() {
        let speed  = 10;
        let inPosition = { th: false, fx: false};

        if (this.ThunderFont.position.x + 21.6 > (CANVAS_WIDTH / 2) - ((this.ThunderFont.image.width * this.ThunderFont.scale) / 2)) {
            this.ThunderFont.position.x -= speed;
        } else {
            inPosition.th = true;
        }

        if (this.FoxFont.position.x - 74.6 < (CANVAS_WIDTH / 2) - ((this.FoxFont.image.width * this.FoxFont.scale) / 2)) {
            this.FoxFont.position.x += speed;
        } else {
            inPosition.fx = true;
        }
        
        this.BlackOverlay.update();

        if (inPosition.th && inPosition.fx) {
            this.WhiteOverlay.fadeIn(0.05);

            setTimeout(() => {
                this.ThunderFont.opacity = 0;
                this.FoxFont.opacity = 0;
                this.logo.opacity = 1;
                this.PressSpace.opacity = 1;
                this.WhiteOverlay.fadeOut(0.05);
            }, 1000);

            this.WhiteOverlay.update();
            this.logo.update();
            this.PressSpace.update();

            c.fillText('DEVELOPED BY MATHEUS DO LIVRAMENTO - 2022', 186, 500);
            c.fillText('ALL ASSETS, MUSIC, STAGES, SOUNDS AND THE', 186, 525);
            c.fillText('THUNDER FOX BRAND BELONG TO TAITO CORPORATION', 153, 550);
            c.fillText('V' + globalData.version, 920, 550);
        } else {
            this.ThunderFont.update();
            this.FoxFont.update();
        }
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
        if (event.key === ' ') this.shutDown();
    }

    removeKeys() {
        window.removeEventListener('keydown', this.startGame);
    }

    manageKeys() {
        window.addEventListener('keydown', this.startGame);
    }

    shutDown() {
        this.removeKeys();
        this.Background.sound.pause();
        this.Background.sound.currentTime = 0;
        globalData.next = 'stageselect';
    }

}