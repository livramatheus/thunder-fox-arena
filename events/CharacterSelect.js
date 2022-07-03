import Background from '../assets/Background.js';
import Sprite from '../assets/Sprite.js';

export default class CharacterSelect {

    constructor() {
        this.characterList = [
            [
                { id: 'thunder' , name: 'THUNDER' , class: 'Thunder', country: {name: 'germany' , x: 490, y: 28  } },
                { id: 'fox'     , name: 'FOX'     , class: 'Fox'    , country: {name: 'belgium' , x: 470, y: 40  } },
                { id: 'gonza'   , name: 'GONZA'   , class: 'Gonza'  , country: {name: 'colombia', x: 340, y: 110 } }
            ],
            [
                { id: 'gyro_man', name: 'GYRO MAN', class: 'GyroMan', country: {name: 'peru'   , x: 330, y: 128 } },
                { id: 'grazan'  , name: 'GRAZAN'  , class: 'Grazan' , country: {name: 'japan'  , x: 680, y: 62  } },
                { id: 'eider'   , name: 'EIDER'   , class: 'Eider'  , country: {name: 'unknown', x: 710, y: 92  } }
            ], [
                null,
                { id: 'ginarza' , name: 'GINARZA' , class: 'Ginarza', country: {name: 'hungary', x: 500, y: 42}},
                null,
            ]
        ];
        this.cursorPos = { x: 0, y: 0 };
        this.Background = new Background({
            position: {x: 0, y: 0},
            imgSrc: './img/character_select.png',
            music: './sound/music_11.mp3'
        });
        this.Selector = new Sprite({
            position: { x: 384, y: 239 },
            imgSrc: './img/selector.png',
            frames: 1
        });
        this.P1Thumb = new Sprite({
            position: { x: 89, y: 290 },
            imgSrc: `./img/fighters/${this.characterList[this.cursorPos.y][this.cursorPos.x].id}/${this.characterList[this.cursorPos.y][this.cursorPos.x].id}_thumb.png`,
            frames: 1
        });
        this.P2Thumb = new Sprite({
            position: { x: 730, y: 290 },
            imgSrc: './img/fighters/fox/fox_thumb.png',
            frames: 1
        });
        this.P1Flag = new Sprite({
            position: {
                x: this.characterList[this.cursorPos.y][this.cursorPos.x].country.x,
                y: this.characterList[this.cursorPos.y][this.cursorPos.x].country.y
            },
            imgSrc: `./img/flags/${this.characterList[this.cursorPos.y][this.cursorPos.x].country.name}.png`,
            frames: 5
        });
        this.P1Flag.frameSkip = 10;
        
        this.initMusic();
        this.manageKeys();
    }

    initMusic() {
        this.Background.sound.volume = 0.4;
        this.Background.sound.loop = true;
        this.Background.sound.play();
    }

    animate = () => {
        c.fillStyle = 'white'
        c.font = "20px 'Press Start 2P', cursive";

        this.Background.update();
        this.P1Thumb.update();
        this.P2Thumb.update();

        this.P1Flag.update();

        this.Selector.position.x = 383 + (this.Selector.image.width  * (this.cursorPos.x));
        this.Selector.position.y = 291 + (this.Selector.image.height * (this.cursorPos.y));

        this.Selector.update();
        c.fillText(this.characterList[this.cursorPos.y][this.cursorPos.x].name, 113, 543);
        c.fillText('FOX', 800, 543);
    }

    moveCursor = (event) => {
        switch (event.key) {
            case 'ArrowUp':
                if (this.cursorPos.y <= 0) return;
                this.cursorPos.y --;
                break;
            case 'ArrowDown':
                if (this.cursorPos.y >= 2 || (this.cursorPos.y === 1 && [0, 2].includes(this.cursorPos.x))) return;
                this.cursorPos.y ++;
                break;
            case 'ArrowLeft':
                if (this.cursorPos.x <= 0 || (this.cursorPos.y === 2)) return;
                this.cursorPos.x --;
                break;
            case 'ArrowRight':
                if (this.cursorPos.x >= 2 || (this.cursorPos.y === 2)) return;
                this.cursorPos.x ++;
                break;
            case ' ':
                this.shutDown();
                break;
        }
        this.P1Thumb.image.src = `./img/fighters/${this.characterList[this.cursorPos.y][this.cursorPos.x].id}/${this.characterList[this.cursorPos.y][this.cursorPos.x].id}_thumb.png`;
        this.P1Flag.image.src  = `./img/flags/${this.characterList[this.cursorPos.y][this.cursorPos.x].country.name}.png`;
        this.P1Flag.position.x = this.characterList[this.cursorPos.y][this.cursorPos.x].country.x;
        this.P1Flag.position.y = this.characterList[this.cursorPos.y][this.cursorPos.x].country.y;
    }

    removeKeys() {
        
    }

    manageKeys() {
        window.addEventListener('keydown', this.moveCursor);
    }

    shutDown() {

    }
}