import Sprite from '../assets/Sprite.js';
import SolidColor from '../assets/SolidColor.js';
import KeyMap from '../misc/KeyMap.js';

export default class HowToPlay {

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

        // Player 1 Keys
        this.Player1Movement = new Sprite({
            position: { x: 50, y: 150 },
            imgSrc: './img/keys/p1_movement.png',
            frames: 1
        });
        this.Player1Actions = new Sprite({
            position: { x: 92 , y: 265 },
            imgSrc: './img/keys/p1_actions.png',
            frames: 1
        });
        this.Player1Confirm = new Sprite({
            position: { x: 65, y: 470 },
            imgSrc: './img/keys/p1_confirm.png',
            frames: 1
        });

        // Player 2 Keys
        this.Player2Movement = new Sprite({
            position: { x: 620, y: 150 },
            imgSrc: './img/keys/p2_movement.png',
            frames: 1
        });
        this.Player2Actions = new Sprite({
            position: { x: 662 , y: 265 },
            imgSrc: './img/keys/p2_actions.png',
            frames: 1
        });
        this.Player2Confirm = new Sprite({
            position: { x: 635, y: 470 },
            imgSrc: './img/keys/p2_confirm.png',
            frames: 1
        });

        this.manageKeys();
    }

    animate = () => {
        this.BlackBackground.update();

        c.fillStyle = 'white';
        c.font = "20px 'Press Start 2P', cursive";
        c.fillText('HOW TO PLAY', 415, 50);
        
        c.font = "18px 'Press Start 2P', cursive";
        c.fillText('PLAYER 1', 165, 100);
        c.fillText('PLAYER 2', 735, 100);
        
        c.font = "14px 'Press Start 2P', cursive";
        c.fillText('MOVEMENT'       , 210, 190);
        c.fillText('ATTACK 1'       , 210, 295);
        c.fillText('ATTACK 2'       , 210, 338);
        c.fillText('ATTACK 3'       , 210, 378);
        c.fillText('ATTACK 4 / BACK', 210, 418);
        c.fillText('CONFRIM / PAUSE', 210, 498);

        c.fillText('MOVEMENT'       , 780, 190);
        c.fillText('ATTACK 1'       , 780, 295);
        c.fillText('ATTACK 2'       , 780, 338);
        c.fillText('ATTACK 3'       , 780, 378);
        c.fillText('ATTACK 4 / BACK', 780, 418);
        c.fillText('CONFRIM / PAUSE', 780, 498);

        this.Player1Movement.update();
        this.Player1Actions.update();
        this.Player1Confirm.update();

        this.Player2Movement.update();
        this.Player2Actions.update();
        this.Player2Confirm.update();

        this.BlackOverlay.update();
    }

    playUiSound(sound) {
        sound.currentTime = 0;
        sound.play();
    }

    back = (event) => {
        switch (event.key) {
            case KeyMap.Player1.action4.key:
                this.BlackOverlay.fadeIn(0.09);

                setTimeout(() => {
                    this.shutDown();
                }, 1500);
                break;
        }    
    }

    removeKeys() {
        window.removeEventListener('keydown', this.back);
    }

    manageKeys() {
        window.addEventListener('keydown', this.back);
    }

    shutDown() {
        globalData.next = 'mainmenu';
        this.removeKeys();
    }

}