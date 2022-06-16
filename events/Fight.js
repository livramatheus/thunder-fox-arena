export default class Fight {

    constructor(Player1, Player2, Stage) {
        this.Player1 = Player1;
        this.Player2 = Player2;
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

        Player1.changePosition('left');
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

    attackCollision() {
        return (
            this.Player1.attackBox.position.x + this.Player1.attackBox.width >= this.Player2.position.x &&
            this.Player1.attackBox.position.x <= this.Player2.position.x + this.Player2.width &&
            this.Player1.attackBox.position.y + this.Player1.attackBox.height >= this.Player2.position.y &&
            this.Player1.attackBox.position.y < this.Player2.position.y + this.Player2.height
        );
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

        // Collision detection
        if (
            this.attackCollision() &&
            this.Player1.isAttacking &&
            this.Player1.curFrame === 1
        ) {
            this.Player1.isAttacking = false;
            this.Player2.knockBack({ x: 20, y: 0 });
            this.Player2.hit();
            document.querySelector("#enemy-health").style.width = this.Player2.health + "%";
        }

        // If this.Player1 misses
        if (this.Player1.isAttacking && this.Player1.curFrame === 1) {
            this.Player1.isAttacking = false;
        }
        
        if (
            this.attackCollision() &&
            this.Player2.isAttacking &&
            this.Player2.curFrame === 1
        ) {
            this.Player2.isAttacking = false;
            this.Player1.knockBack({ x: 40, y: 0 });
            this.Player1.hit();
            document.querySelector("#player-health").style.width = this.Player1.health + "%";
        }

        // If this.Player2 misses
        if (this.Player2.isAttacking && this.Player2.curFrame === 1) {
            this.Player2.isAttacking = false;
        }

        if (this.Player1.health <= 0 || this.Player2.health <= 0) {
            this.checkWinner();
        }

        this.checkPositions();
    }

    initPlayer1Actions() {
        if (this.keys.a.pressed && this.Player1.lastKey === 'a') {
            this.Player1.walkBack();
        } else if (this.keys.d.pressed && this.Player1.lastKey === 'd') {
            this.Player1.walkFront();
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
            this.Player2.walkFront();
        } else if (this.keys.ArrowLeft.pressed && this.Player2.lastKey === 'ArrowLeft') {
            this.Player2.walkBack();
        } else {
            this.Player2.switchSprite('idle');
        }

        this.Player2.manageJumpingSprites();
    }

    checkPositions() {
        if (!(this.Player1.position.x + this.Player1.width > this.Player2.position.x + this.Player2.width)) {
            this.Player1.changePosition('right');
            this.Player2.changePosition('left');
        } else {
            this.Player1.changePosition('left');
            this.Player2.changePosition('right');
        }
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
                    case ' ':
                        this.Player1.attack();
                        break;
                }
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
                    case 'ArrowDown':
                        this.Player2.attack();
                        break;
                }
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