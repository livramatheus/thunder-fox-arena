import Background from '../assets/Background.js';
import Sprite from '../assets/Sprite.js';

export default class CharacterSelect {

    constructor() {
        this.characterList = [
            [
                { id: 'thunder' , name: 'THUNDER' , class: 'Thunder', country: {name: 'germany' , x: 490, y: 32  } },
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
        this.P1CursorPos = { x: 0, y: 0 };
        this.P2CursorPos = { x: 2, y: 0 };
        this.P1Selected  = this.characterList[this.P1CursorPos.y][this.P1CursorPos.x];
        this.P2Selected  = this.characterList[this.P2CursorPos.y][this.P2CursorPos.x];

        this.Background = new Background({
            position: {x: 0, y: 0},
            imgSrc: './img/character_select.png',
            music: './sound/music_11.mp3'
        });
        this.P1Selector = new Sprite({
            position: { x: 385, y: 239 },
            imgSrc: './img/p1_selector.png',
            frames: 1
        });
        this.P2Selector = new Sprite({
            position: { x: 385, y: 239 },
            imgSrc: './img/p2_selector.png',
            frames: 1
        });
        this.P1Thumb = new Sprite({
            position: { x: 89, y: 290 },
            imgSrc: `./img/fighters/${this.P1Selected.id}/${this.P1Selected.id}_thumb.png`,
            frames: 1
        });
        this.P2Thumb = new Sprite({
            position: { x: 730, y: 290 },
            imgSrc: `./img/fighters/${this.P2Selected.id}/${this.P2Selected.id}_thumb.png`,
            frames: 1
        });
        this.P1Flag = new Sprite({
            position: {
                x: this.P1Selected.country.x,
                y: this.P1Selected.country.y
            },
            imgSrc: `./img/flags/${this.P1Selected.country.name}.png`,
            frames: 5
        });
        this.P1Flag.frameSkip = 10;

        this.P2Flag = new Sprite({
            position: {
                x: this.P2Selected.country.x,
                y: this.P2Selected.country.y
            },
            imgSrc: `./img/flags/${this.P2Selected.country.name}.png`,
            frames: 5
        });
        this.P2Flag.frameSkip = 10;
        
        this.initMusic();
        this.manageKeys();
    }

    initMusic() {
        this.Background.sound.volume = 0.4;
        this.Background.sound.loop = true;
        this.Background.sound.play();
    }

    animate = () => {
        this.Background.update();
        this.animatePlayer1();
        this.animatePlayer2();
    }

    animatePlayer1() {
        // Portrait
        c.fillStyle = 'white'
        c.font = "20px 'Press Start 2P', cursive";
        this.P1Thumb.update();
        this.P1Flag.update();
        c.fillText(this.P1Selected.name, 93  + (10 - this.P1Selected.name.length) * 10, 543);

        // Flag
        c.font = "14px 'Press Start 2P', cursive";
        c.fillStyle = 'black';
        c.fillText(this.P1Selected.country.name.slice(0, 3).toUpperCase(), this.P1Selected.country.x + 7, this.P1Selected.country.y + 2);
        c.fillStyle = '#1e3a8a'
        c.fillText('P1', this.P1Selected.country.x - 25, this.P1Selected.country.y + 25);

        // Selector
        this.P1Selector.position.x = 385 + ((this.P1Selector.image.width)  * (this.P1CursorPos.x)) + this.P1CursorPos.x;
        this.P1Selector.position.y = 292 + ((this.P1Selector.image.height) * (this.P1CursorPos.y)) + this.P1CursorPos.y;
        this.P1Selector.update();
    }

    animatePlayer2() {
        // Portrait
        c.fillStyle = 'white'
        c.font = "20px 'Press Start 2P', cursive";
        this.P2Thumb.update();
        this.P2Flag.update();
        c.fillText(this.P2Selected.name, 732 + (10 - this.P2Selected.name.length) * 10, 543);

        // Flag
        c.font = "14px 'Press Start 2P', cursive";
        c.fillStyle = 'black';
        c.fillText(this.P2Selected.country.name.slice(0, 3).toUpperCase(), this.P2Selected.country.x + 7, this.P2Selected.country.y + 2);
        c.fillStyle = '#14532d'
        c.fillText('P2', this.P2Selected.country.x + 55, this.P2Selected.country.y + 25);

        // Selector
        this.P2Selector.position.x = 385 + ((this.P2Selector.image.width)  * (this.P2CursorPos.x)) + this.P2CursorPos.x;
        this.P2Selector.position.y = 292 + ((this.P2Selector.image.height) * (this.P2CursorPos.y)) + this.P2CursorPos.y;
        this.P2Selector.update();
    }

    moveCursor = (event) => {
        switch (event.key) {
            // Player 1 Selector
            case 'w':
                if (this.P1CursorPos.y <= 0) return;
                this.P1CursorPos.y --;
                break;
            case 's':
                if (this.P1CursorPos.y >= 2 || (this.P1CursorPos.y === 1 && [0, 2].includes(this.P1CursorPos.x))) return;
                this.P1CursorPos.y ++;
                break;
            case 'a':
                if (this.P1CursorPos.x <= 0 || (this.P1CursorPos.y === 2)) return;
                this.P1CursorPos.x --;
                break;
            case 'd':
                if (this.P1CursorPos.x >= 2 || (this.P1CursorPos.y === 2)) return;
                this.P1CursorPos.x ++;
                break;

            // Player 2 Selector
            case 'ArrowUp':
                if (this.P2CursorPos.y <= 0) return;
                this.P2CursorPos.y --;
                break;
            case 'ArrowDown':
                if (this.P2CursorPos.y >= 2 || (this.P2CursorPos.y === 1 && [0, 2].includes(this.P2CursorPos.x))) return;
                this.P2CursorPos.y ++;
                break;
            case 'ArrowLeft':
                if (this.P2CursorPos.x <= 0 || (this.P2CursorPos.y === 2)) return;
                this.P2CursorPos.x --;
                break;
            case 'ArrowRight':
                if (this.P2CursorPos.x >= 2 || (this.P2CursorPos.y === 2)) return;
                this.P2CursorPos.x ++;
                break;
            case ' ':
                this.shutDown();
                break;
        }
        
        // Player 1 Thumb and flag update
        this.P1Selected = this.characterList[this.P1CursorPos.y][this.P1CursorPos.x];
        this.P1Thumb.image.src = `./img/fighters/${this.P1Selected.id}/${this.P1Selected.id}_thumb.png`;
        this.P1Flag.image.src  = `./img/flags/${this.P1Selected.country.name}.png`;
        this.P1Flag.position.x = this.P1Selected.country.x;
        this.P1Flag.position.y = this.P1Selected.country.y;
        
        // Player 2 Thumb and flag update
        this.P2Selected = this.characterList[this.P2CursorPos.y][this.P2CursorPos.x];
        this.P2Thumb.image.src = `./img/fighters/${this.P2Selected.id}/${this.P2Selected.id}_thumb.png`;
        this.P2Flag.image.src  = `./img/flags/${this.P2Selected.country.name}.png`;
        this.P2Flag.position.x = this.P2Selected.country.x;
        this.P2Flag.position.y = this.P2Selected.country.y;
    }

    removeKeys() {
        
    }

    manageKeys() {
        window.addEventListener('keydown', this.moveCursor);
    }

    shutDown() {

    }
}