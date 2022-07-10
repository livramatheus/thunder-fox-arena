import Sprite from '../assets/Sprite.js';
import SolidColor from '../assets/SolidColor.js';
import KeyMap from '../misc/KeyMap.js';

export default class PressStart {

    constructor() {
        // Black Solid Color Background
        this.BlackBackground         = new SolidColor({ position: { x:0, y: 0 }, color: 'black'});
        this.BlackBackground.width   = CANVAS_WIDTH;
        this.BlackBackground.height  = CANVAS_HEIGHT;
        this.BlackBackground.opacity = 1;
        
        // Black Solid Color Overlay
        this.BlackOverlay         = new SolidColor({ position: { x:0, y: 0 }, color: 'black'});
        this.BlackOverlay.width   = CANVAS_WIDTH;
        this.BlackOverlay.height  = CANVAS_HEIGHT;
        this.BlackOverlay.opacity = 0;

        // Animated logo
        this.logo = new Sprite({
            position: { x: 280.6, y: 110 },
            imgSrc: './img/logo_sprite.png',
            frames: 8
        });
        this.logo.scale   = 1.5;
        this.logo.opacity = 1;

        this.cursorSound = new Audio('./sound/sound_21h.mp3');
        this.selectSound = new Audio('./sound/sound_22h.mp3');

        this.cursorPos = 0;

        this.menuItems = [
            { id: undefined        , text: 'ARCADE'       , x: 60 , y: 350 },
            { id: 'characterselect', text: 'LOCAL VERSUS' , x: 236, y: 350 },
            { id: undefined        , text: 'ONLINE VERSUS', x: 506, y: 350 },
            { id: 'howtoplay'      , text: 'HOW TO PLAY'  , x: 790, y: 350 }
        ];

        this.manageKeys();
    }

    animate = () => {
        this.BlackBackground.update();
        this.logo.update();

        c.font = "16px 'Press Start 2P', cursive";
        
        this.menuItems.forEach((itm) => {
            c.fillStyle = itm.id ? 'white' : 'grey';
            c.fillText(itm.text, itm.x, itm.y);
        });

        c.font = "18px 'Press Start 2P', cursive";
        c.fillText('►', this.menuItems[this.cursorPos].x - 25, 347);

        c.font = "16px 'Press Start 2P', cursive";
        c.fillStyle = 'white';
        c.fillText('DEVELOPED BY MATHEUS DO LIVRAMENTO - 2022', 186, 500);
        c.fillText('ALL ASSETS, MUSIC, STAGES, SOUNDS AND THE', 186, 525);
        c.fillText('THUNDER FOX BRAND BELONG TO TAITO CORPORATION', 153, 550);
        c.fillText('V' + globalData.version, 920, 550);

        this.BlackOverlay.update();
    }

    playUiSound(sound) {
        sound.currentTime = 0;
        sound.play();
    }

    moveCursor = (event) => {
        switch (event.key) {
            case KeyMap.Player1.left.key:
                if (this.cursorPos <= 0) return;
                this.playUiSound(this.cursorSound);
                this.cursorPos --;
                break;
            case KeyMap.Player1.right.key:
                if (this.cursorPos >= this.menuItems.length - 1) return;
                this.playUiSound(this.cursorSound);
                this.cursorPos ++;
                break;
            case KeyMap.Player1.start.key:
                if (this.menuItems[this.cursorPos].id) {
                    this.BlackOverlay.fadeIn(0.09);
                    this.playUiSound(this.selectSound);

                    setTimeout(() => {
                        this.shutDown();
                    }, 1500);
                }
                break;
        }    
    }

    removeKeys() {
        window.removeEventListener('keydown', this.moveCursor);
    }

    manageKeys() {
        window.addEventListener('keydown', this.moveCursor);
    }

    shutDown() {
        globalData.next = this.menuItems[this.cursorPos].id;
        this.removeKeys();
    }

}