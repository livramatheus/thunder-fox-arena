import Background from '../assets/Background.js';
import SolidColor from '../assets/SolidColor.js';
import KeyMap from '../misc/KeyMap.js';

export default class StageSelect {

    constructor() {
        this.stageList = [
            { id: 'barriers'    , name: 'BARRIERS'    , class: 'Barriers'    },
            { id: 'hangar'      , name: 'HANGAR'      , class: 'Hangar'      },
            { id: 'carrier'     , name: 'CARRIER'     , class: 'Carrier'     },
            { id: 'mining_site' , name: 'MINING SITE' , class: 'MiningSite'  },
            { id: 'cold_fields' , name: 'COLD FIELDS' , class: 'ColdFields'  },
            { id: 'control_room', name: 'CONTROL ROOM', class: 'ControlRoom' },
            { id: 'ginarzas_hq' , name: `GINARZA'S HQ`, class: 'GinarzasHq'  },
        ];
        this.Background = new Background({
            position: {x: 0, y: 0},
            imgSrc: './img/stages/barriers.png'
        });
        this.Overlay = new Background({
            position: {x: 0, y: 0},
            imgSrc: './img/stage_select.png',
            music: './sound/music_11.mp3'
        });
        this.BlackOverlay         = new SolidColor({ position: { x:0, y: 0 }, color: 'black'});
        this.BlackOverlay.width   = CANVAS_WIDTH;
        this.BlackOverlay.height  = CANVAS_HEIGHT;
        this.BlackOverlay.opacity = 1;

        this.cursorSound = new Audio('./sound/sound_21h.mp3');
        this.selectSound = new Audio('./sound/sound_22h.mp3');

        this.cursorPos = 0;

        this.initMusic();
        this.manageKeys();
        this.BlackOverlay.fadeOut(0.027);
    }

    initMusic() {
        this.Overlay.sound.currentTime = globalData.musicTransitionTime;
        this.Overlay.sound.volume = 0.15;
        this.Overlay.sound.loop = true;
        this.Overlay.sound.play();
    }

    playUiSound(sound) {
        sound.currentTime = 0;
        sound.play();
    }

    animate = () => {
        this.Background.image.src = `./img/stages/${this.stageList[this.cursorPos].id}.png`;
        this.Background.update();
        this.Overlay.update();

        let y          = 220;
        let lineHeight = 30;
        
        c.fillStyle = 'white'
        c.font = "20px 'Press Start 2P', cursive";
        
        this.stageList.forEach((str) => {
            c.fillText(str.name, 70, y);
            y += lineHeight;
        });

        c.fillText('►', 30, 216 + (lineHeight * this.cursorPos));

        this.BlackOverlay.update();
    }

    moveCursor = (event) => {
        switch (event.key) {
            case KeyMap.Player1.up.key:
                if (this.cursorPos <= 0) return;
                this.playUiSound(this.cursorSound);
                this.cursorPos --;
                break;
            case KeyMap.Player1.down.key:
                if (this.cursorPos >= this.stageList.length - 1) return;
                this.playUiSound(this.cursorSound);
                this.cursorPos ++;
                break;
            case KeyMap.Player1.start.key:
                this.playUiSound(this.selectSound);
                globalData.ST = this.stageList[this.cursorPos].class;
                this.shutDown();
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
        this.removeKeys();
        globalData.next = 'fight';
        this.Overlay.sound.pause();
        this.Overlay.sound.currentTime = 0;
    }
}