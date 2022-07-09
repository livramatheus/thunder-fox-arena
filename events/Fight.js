import SolidColor from '../assets/SolidColor.js';

export default class Fight {

    constructor(Player1, Player2, Stage) {
        this.Player1 = Player1;
        this.Player2 = Player2;
        this.Player1.lifebarId = '#player-health';
        this.Player2.lifebarId = '#enemy-health';
        this.Stage   = Stage;
        this.timerId = null;
        this.timer   = 99;

        this.keys = {
            a         : { pressed: false },
            d         : { pressed: false },
            w         : { pressed: false },
            s         : { pressed: false },
            ArrowRight: { pressed: false },
            ArrowLeft : { pressed: false },
            ArrowUp   : { pressed: false }
        }

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
        if (this.keys.a.pressed && this.Player1.lastKey === 'a') {
            if (this.Player1.canWalkLeft(this.Player2)) {
                this.Player1.walkBack();
            } else {
                this.keys.a.pressed = false;
            }
        } else if (this.keys.d.pressed && this.Player1.lastKey === 'd') {
            if (this.Player1.canWalkRight(this.Player2)) {
                this.Player1.walkFront();
            } else {
                this.keys.d.pressed = false;
            }
        } else
        if (this.keys.s.pressed && this.Player1.lastKey === 's') {
            this.Player1.switchSprite('ducking');
        } else {
            this.Player1.switchSprite('idle');
        }

        this.Player1.manageJumpingSprites();
    }

    initPlayer2Actions() {
        if (this.keys.ArrowRight.pressed && this.Player2.lastKey === 'ArrowRight') {
            if (this.Player2.canWalkRight(this.Player1)) {
                this.Player2.walkFront();
            } else {
                this.keys.ArrowRight.pressed = false;
            }
        } else if (this.keys.ArrowLeft.pressed && this.Player2.lastKey === 'ArrowLeft') {
            if (this.Player2.canWalkLeft(this.Player1)) {
                this.Player2.walkBack();
            } else {
                this.keys.ArrowLeft.pressed = false;
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

    manageKeys() {
        window.addEventListener('keydown', (event) => {
            if (this.isRoundOver()) return;

            if (this.Player1.alive) {
                switch (event.key) {
                    case 'd':
                        this.keys.d.pressed = true;
                        this.Player1.lastKey = 'd';
                        break;
                    case 'a':
                        this.keys.a.pressed = true;
                        this.Player1.lastKey = 'a';
                        break;
                    case 'w':
                        this.Player1.jump();
                        break;
                    case 's':
                        this.keys.s.pressed = true;
                        this.Player1.lastKey = 's';
                        break;
                }

                this.Player1.attacks.forEach((Attack) => {
                    if (Attack.key === event.key) this.Player1.attack(Attack, this.Player2);
                });
            }
        
            if (this.Player2.alive) {
                switch (event.key) {
                    case 'ArrowRight':
                        this.keys.ArrowRight.pressed = true;
                        this.Player2.lastKey = 'ArrowRight';
                        break;
                    case 'ArrowLeft':
                        this.keys.ArrowLeft.pressed = true;
                        this.Player2.lastKey = 'ArrowLeft';
                        break;
                    case 'ArrowUp':
                        this.Player2.jump();
                        break;
                }
                
                this.Player2.attacks.forEach((Attack) => {
                    if (Attack.key === event.key) this.Player2.attack(Attack, this.Player1);
                });
            }
        });
                
        window.addEventListener('keyup', (event) => {
            switch (event.key) {
                // Player
                case 'd':
                    this.keys.d.pressed = false;
                    break;
                case 'a':
                    this.keys.a.pressed = false;
                    break;
                case 's':
                    this.keys.s.pressed = false;
                    break;
        
                // Enemy
                case 'ArrowRight':
                    this.keys.ArrowRight.pressed = false;
                    break;
                case 'ArrowLeft':
                    this.keys.ArrowLeft.pressed = false;
                    break;
            }
        });
    }

    shutDown() {}
}