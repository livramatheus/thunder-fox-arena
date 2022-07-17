import Sprite from '../assets/Sprite.js';
import SolidColor from '../assets/SolidColor.js';
import KeyMap from '../misc/KeyMap.js';

export default class PressStart {

    constructor() {
        // Thunder Font
        this.ThunderFont = new Sprite({
            position: { x: CANVAS_WIDTH, y: 106 },
            imgSrc: './img/thunder_font.png',
            frames: 1
        });
        this.ThunderFont.scale = 1.5;

        // Fox Font
        this.FoxFont = new Sprite({
            position: { x: -360, y: 111 },
            imgSrc: './img/fox_font.png',
            frames: 1
        });
        this.FoxFont.scale = 1.5;

        // Black Solid Color Overlay
        this.BlackOverlay         = new SolidColor({ position: { x:0, y: 0 }, color: 'black'});
        this.BlackOverlay.width   = CANVAS_WIDTH;
        this.BlackOverlay.height  = CANVAS_HEIGHT;
        this.BlackOverlay.opacity = 1;

        // White Solid Color Overlay
        this.WhiteOverlay         = new SolidColor({ position: { x:0, y: 0 }, color: 'white'});
        this.WhiteOverlay.width   = CANVAS_WIDTH;
        this.WhiteOverlay.height  = CANVAS_HEIGHT;
        this.WhiteOverlay.opacity = 0;

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

        c.fillStyle = 'white'
        c.font = "16px 'Press Start 2P', cursive";

        this.manageKeys();
    }

    animate = () => {
        let speed  = 10;
        let inPosition = { th: false, fx: false };

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

            c.font = "16px 'Press Start 2P', cursive";
            c.fillText('DEVELOPED BY MATHEUS DO LIVRAMENTO - 2022', 186, 500);
            c.fillText('ALL ASSETS, MUSIC, STAGES, SOUNDS AND THE', 186, 525);
            c.fillText('THUNDER FOX BRAND BELONG TO TAITO CORPORATION', 153, 550);

            c.font = "14px 'Press Start 2P', cursive";
            c.fillText('V' + globalData.version, 905, 550);
        } else {
            this.ThunderFont.update();
            this.FoxFont.update();
        }
    }

    leave = (event) => {
        if (event.key === KeyMap.Player1.start.key) this.shutDown();
    }

    removeKeys() {
        window.removeEventListener('keydown', this.leave);
    }

    manageKeys() {
        window.addEventListener('keydown', this.leave);
    }

    shutDown() {
        globalData.next = 'mainmenu';
        this.removeKeys();
    }

}