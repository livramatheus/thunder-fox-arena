import Background from '../assets/Background.js';

export default class StageSelect {

    constructor() {
        this.stageList = [
            { id: 'barriers'    , name: 'BARRIERS', class: 'Barriers' },
            { id: 'hangar'      , name: 'HANGAR', class: 'Hangar' },
            { id: 'carrier'     , name: 'CARRIER', class: 'Carrier' },
            { id: 'mining_site' , name: 'MINING SITE', class: 'MiningSite' },
            { id: 'cold_fields' , name: 'COLD FIELDS', class: 'ColdFields' },
            { id: 'control_room', name: 'CONTROL ROOM', class: 'ControlRoom' },
            { id: 'ginarzas_hq' , name: `GINARZA'S HQ`, class: 'GinarzasHq' },
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
        this.cursorPos = 0;

        this.initMusic();
        this.manageKeys();
    }

    initMusic() {
        this.Overlay.sound.volume = 0.4;
        this.Overlay.sound.loop = true;
        this.Overlay.sound.play();
    }

    animate = () => {
        this.Background.image.src = `./img/stages/${this.stageList[this.cursorPos].id}.png`;
        this.Background.update();
        this.Overlay.update();
        this.update();
    }

    draw() {
        let y          = 220;
        let lineHeight = 30;
        
        c.fillStyle = 'white'
        c.font = "20px 'Press Start 2P', cursive";
        
        this.stageList.forEach((str) => {
            c.fillText(str.name, 70, y);
            y += lineHeight;
        });

        c.fillText('►', 30, 216 + (lineHeight * this.cursorPos));
    }

    update() {
        this.draw();
    }

    moveCursor = (event) => {
        switch (event.key) {
            case 'ArrowUp':
                if (this.cursorPos <= 0) return;
                this.cursorPos --;
                break;
            case 'ArrowDown':
                if (this.cursorPos >= this.stageList.length - 1) return;
                this.cursorPos ++;
                break;
            case ' ':
                this.removeKeys();
                globalData.ST = this.stageList[this.cursorPos].class;
                globalData.next = 'fight';
                this.Overlay.sound.pause();
                this.Overlay.sound.currentTime = 0;
                break;
        }    
    }

    removeKeys() {
        window.removeEventListener('keydown', this.moveCursor);
    }

    manageKeys() {
        window.addEventListener('keydown', this.moveCursor);
    }
}