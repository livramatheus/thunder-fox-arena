import SolidColor from '../assets/SolidColor.js';
import KeyMap from '../misc/KeyMap.js';

export default class Fight {

    constructor(Player1, Player2, Stage) {
        this.Player1 = Player1;
        this.Player2 = Player2;
        this.Player1.lifebarId = '#player-health';
        this.Player2.lifebarId = '#enemy-health';
        this.Stage   = Stage;
        this.timerId = null;
        this.timer   = 99;

        // Black Solid Color Overlay
        this.BlackOverlay         = new SolidColor({ position: { x:0, y: 0 }, color: 'black'});
        this.BlackOverlay.width   = CANVAS_WIDTH;
        this.BlackOverlay.height  = CANVAS_HEIGHT;
        this.BlackOverlay.opacity = 1;
        this.BlackOverlay.fadeOut(0.005);

        this.Player1.changePosition('left');
        this.Player2.isReversed = true;
        this.Player1.position = {
            x: 200 - this.Player1.boxOffset.x - this.Player1.width,
            y: CANVAS_HEIGHT - 110 - Player1.height - 20
        };
        this.Player2.position = {
            x: CANVAS_WIDTH - 200 - this.Player2.boxOffset.x - this.Player2.width,
            y: CANVAS_HEIGHT - 110 - Player2.height - 20
        };

        this.initStageMusic();
        this.decreaseTimer();
        this.enableTopBar();
        this.manageKeys();
    }
    
    enableTopBar() {
        document.querySelector("#top-bar").style.display = 'flex';
        document.querySelector("#player-name").innerText = this.Player1.name;
        document.querySelector("#enemy-name").innerText  = this.Player2.name;
    }

    initStageMusic() {
        this.Stage.sound.volume = 0.4;
        this.Stage.sound.loop = true;
        this.Stage.sound.play();
    }

    checkWinner() {
        clearTimeout(this.timerId);
        const displayText = document.querySelector("#display-text");
        displayText.style.display = 'flex';
    
        if (this.Player1.health > this.Player2.health) return displayText.innerHTML = 'PLAYER 1 WINS';
        if (this.Player1.health < this.Player2.health) return displayText.innerHTML = 'PLAYER 2 WINS';
        return displayText.innerHTML = 'DRAW';
    }

    decreaseTimer() {
        if (!this.isRoundOver()) {
            this.timer -= 1;
            document.querySelector("#timer").innerHTML = this.timer;
    
            this.timerId = setTimeout(() => {
                this.decreaseTimer();
            }, 1000);
        } else {
            this.checkWinner();
        }
    }

    /**
     * This function gets called recursively every frame, 
     * in order that every component gets re-rendered continuously
     */
    animate = () => {
        c.fillStyle = 'black';
        c.fillRect(0, 0, canvas.width, canvas.height);
        this.Stage.update();
        this.Player1.update();
        this.Player2.update();

        this.Player1.velocity.x = 0;
        this.Player2.velocity.x = 0;

        this.initPlayer1Actions();
        this.initPlayer2Actions();

        let atkp1 = this.Player1.attacks.find((atk) => atk.sprite === this.Player1.lastSprite);
        let atkp2 = this.Player2.attacks.find((atk) => atk.sprite === this.Player2.lastSprite);

        if (atkp1) this.Player1.manageAttack(atkp1, this.Player2);
        if (atkp2) this.Player2.manageAttack(atkp2, this.Player1);
        
        if (this.Player1.health <= 0 || this.Player2.health <= 0) {
            this.checkWinner();
        }

        this.checkPositions();
        this.BlackOverlay.update();
    }

    initPlayer1Actions() {
        if (KeyMap.Player1.left.pressed && this.Player1.lastKey === KeyMap.Player1.left.key) {
            if (this.Player1.canWalkLeft(this.Player2)) {
                this.Player1.walkBack();
            } else {
                KeyMap.Player1.left.pressed = false;
            }
        } else if (KeyMap.Player1.right.pressed && this.Player1.lastKey === KeyMap.Player1.right.key) {
            if (this.Player1.canWalkRight(this.Player2)) {
                this.Player1.walkFront();
            } else {
                KeyMap.Player1.right.pressed = false;
            }
        } else {
            this.Player1.switchSprite('idle');
        }
        
        this.Player1.manageJumpingSprites();
    }

    initPlayer2Actions() {
        if (KeyMap.Player2.right.pressed && this.Player2.lastKey === KeyMap.Player2.right.key) {
            if (this.Player2.canWalkRight(this.Player1)) {
                this.Player2.walkFront();
            } else {
                KeyMap.Player2.right.pressed = false;
            }
        } else if (KeyMap.Player2.left.pressed && this.Player2.lastKey === KeyMap.Player2.left.key) {
            if (this.Player2.canWalkLeft(this.Player1)) {
                this.Player2.walkBack();
            } else {
                KeyMap.Player2.left.pressed = false;
            }
        } else {
            this.Player2.switchSprite('idle');
        }

        this.Player2.manageJumpingSprites();
    }

    checkPositions() {
        if (!(
            this.Player1.position.x + this.Player1.boxOffset.x + this.Player1.width >
            this.Player2.position.x + this.Player2.boxOffset.x + this.Player2.width
        )) {
            this.Player1.changePosition('right');
            this.Player2.changePosition('left');
        } else {
            this.Player1.changePosition('left');
            this.Player2.changePosition('right');
        }
        this.Player2.switchSprite(this.Player2.lastSprite);
    }

    isTimeOver() {
        return this.timer <= 0;
    }

    isRoundOver() {
        return this.isTimeOver() || (!this.Player1.alive || !this.Player2.alive);
    }

    manageKeyUp = (event) => {
        const allowedKeys = ['right', 'left', 'up', 'down', 'action1', 'action2', 'action3', 'action4', 'start'];
        let P1orP2        = null;

        if (KeyMap.isP1Key(event.key)) {
            P1orP2 = 'Player1';
        } else if (KeyMap.isP2Key(event.key)) {
            P1orP2 = 'Player2';
        } else {
            return;
        }

        let translatedKey = KeyMap.translate(event.key);
        if (!allowedKeys.includes(translatedKey)) return;

        KeyMap[P1orP2][translatedKey].pressed = false;
    }

    manageKeyDown = (event) => {
        if (this.isRoundOver()) return;

        const allowedKeys = ['right', 'left', 'up', 'down', 'action1', 'action2', 'action3', 'action4', 'start'];
        let P1orP2        = null;

        if (KeyMap.isP1Key(event.key)) {
            P1orP2 = 'Player1';
        } else if (KeyMap.isP2Key(event.key)) {
            P1orP2 = 'Player2';
        } else {
            return;
        }
        
        let translatedKey = KeyMap.translate(event.key);
        if (!allowedKeys.includes(translatedKey)) return;

        if (this[P1orP2].alive) {
            KeyMap[P1orP2][translatedKey].pressed = true;
            this[P1orP2].lastKey = KeyMap[P1orP2][translatedKey].key;

            // @todo - This should be refactored:
            if (KeyMap[P1orP2].up.key == event.key) this[P1orP2].jump();

            this[P1orP2].attacks.forEach((Attack) => {
                if (Attack.key === translatedKey) this[P1orP2].attack(Attack, this.Player2);
            });
        }
    }

    manageKeys() {
        window.addEventListener('keydown', this.manageKeyDown);
        window.addEventListener('keyup'  , this.manageKeyUp  );
    }

    shutDown() {}
}