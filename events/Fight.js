import SolidColor from '../assets/SolidColor.js';
import KeyMap from '../misc/KeyMap.js';

export default class Fight {

    constructor(Player1, Player2, Stage) {
        this.Player1 = Player1;
        this.Player2 = Player2;
        this.Player1.lifebarId = '#player-health';
        this.Player2.lifebarId = '#enemy-health';
        this.Player1.portraitId = '#fight-p1-portrait';
        this.Player2.portraitId = '#fight-p2-portrait';
        this.Stage   = Stage;
        this.timerId = null;
        this.timer   = 99;
        this.roundOverTransition = false;
        this.FileList = [];
        this.loaded   = false;

        // Black Solid Color Overlay
        this.BlackOverlay         = new SolidColor({ position: { x:0, y: 0 }, color: 'black'});
        this.BlackOverlay.width   = CANVAS_WIDTH;
        this.BlackOverlay.height  = CANVAS_HEIGHT;
        this.BlackOverlay.opacity = 1;
    }
    
    loadAssets() {
        const Queue   = new createjs.LoadQueue();
        this.FileList = [];
        this.loaded   = false

        // Loading Fighter's assets
        this.FileList = this.FileList.concat(this.Player1.getAssetList());
        this.FileList = this.FileList.concat(this.Player2.getAssetList());

        this.FileList.forEach(file => Queue.loadFile(file));

        Queue.addEventListener("complete", (event) => {
            this.loaded = true;
        });
    }
    
    reset() {
        this.loadAssets();

        this.timerId = null;
        this.timer   = 99;
        this.roundOverTransition = false;

        this.Player1.reset();
        this.Player2.reset();

        this.Player1.changePosition('left');
        this.Player2.isReversed = false;
        
        document.querySelector(this.Player1.lifebarId).style.width = "100%";
        document.querySelector(this.Player2.lifebarId).style.width = "100%";

        document.querySelector(this.Player1.portraitId).src = `img/fighters/${this.Player1.folderName}/${this.Player1.folderName}_thumb.png`;
        document.querySelector(this.Player2.portraitId).src = `img/fighters/${this.Player2.folderName}/${this.Player2.folderName}_thumb_r.png`;

        this.Player1.position = {
            x: 100,
            y: CANVAS_HEIGHT - 110 - this.Player1.height - 20
        };
        this.Player2.position = {
            x: CANVAS_WIDTH - 100 - this.Player2.sprites.idle.image.width,
            y: CANVAS_HEIGHT - 110 - this.Player2.height - 20
        };
    }
    
    enableTopBar() {
        document.querySelector("#top-bar").style.display = 'flex';
        document.querySelector("#player-name").innerText = this.Player1.name;
        document.querySelector("#enemy-name").innerText  = this.Player2.name;
    }

    initStageMusic() {
        this.Stage.sound.volume = 0.15;
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
        if (!this.isRoundOver()) {
            this.fightStartTransition();
        } else {
            this.fightEndTransition();
        }

        c.fillStyle = 'black';
        c.fillRect(0, 0, canvas.width, canvas.height);
        this.Stage.update();
        this.Player1.update();
        this.Player2.update();

        this.Player1.velocity.x = 0;
        this.Player2.velocity.x = 0;

        this.initPlayersActions('Player1');
        this.initPlayersActions('Player2');

        let atkp1 = this.Player1.attacks.find((atk) => atk.sprite === this.Player1.lastSprite);
        let atkp2 = this.Player2.attacks.find((atk) => atk.sprite === this.Player2.lastSprite);

        if (atkp1) this.Player1.manageAttack(atkp1, this.Player2);
        if (atkp2) this.Player2.manageAttack(atkp2, this.Player1);
        
        this.Player1.projectiles.forEach((p) => {
            if (p.active) this.Player1.manageProjectile(p, this.Player2);
        });

        this.Player2.projectiles.forEach((p) => {
            if (p.active) this.Player2.manageProjectile(p, this.Player1);
        });

        this.BlackOverlay.update();
        
        if (this.roundOverTransition) return;

        if (this.Player1.health <= 0 || this.Player2.health <= 0) {
            this.checkWinner();
        }
        
        this.Player1.projectiles.forEach((p) => {
            p.update();
        });

        this.Player2.projectiles.forEach((p) => {
            p.update();
        });
        
        this.checkPositions();
    }

    fightStartTransition() {
        // Starts a delay
        if (globalData.delay == null && !this.loaded) globalData.delay = 0;

        // As soon as everything gets loaded + 120 frames, Black Overlay is removed and round starts
        if (globalData.delay >= 120 && this.loaded) {
            this.BlackOverlay.fadeOut(0.03);
            
            if (this.BlackOverlay.opacity == 1) {
                this.initStageMusic();
                this.decreaseTimer();
                this.enableTopBar();
                this.manageKeys();
                globalData.delay = null;
            }
        }
    }

    fightEndTransition() {
        this.removeKeys();
        this.roundOverTransition = true;
        
        // Starts a delay
        if (globalData.delay == null) globalData.delay = 0;

        if (globalData.delay >= 500) {
            this.BlackOverlay.fadeIn(0.03);
            
            if (this.BlackOverlay.opacity == 1) {
                globalData.delay = null;
                this.shutDown();
            }
        }
    }

    initPlayersActions(Player) {
        let Enemy = Player === 'Player1' ? 'Player2' : 'Player1';

        if (this[Player].isInAir()) {
            this[Player].manageJumpingSprites();
        }

        if (KeyMap[Player].left.pressed) {
            if (this[Player].canWalkLeft(this[Enemy])) {
                this[Player].walkBack();
            } else {
                KeyMap[Player].left.pressed = false;
            }
        } else if (KeyMap[Player].right.pressed) {
            if (this[Player].canWalkRight(this[Enemy])) {
                this[Player].walkFront();
            } else {
                KeyMap[Player].right.pressed = false;
            }
        } else {
            if (!this[Player].isInAir()) this[Player].switchSprite('idle');
        }   
    }

    checkPositions() {
        let P1Info = this.Player1.getHitBoxCoordinates();
        let P2Info = this.Player2.getHitBoxCoordinates();

        if (!(P1Info.x > P2Info.x + P2Info.w)) {
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
        let Enemy         = null;

        if (KeyMap.isP1Key(event.key)) {
            P1orP2 = 'Player1';
            Enemy  = 'Player2';
        } else if (KeyMap.isP2Key(event.key)) {
            P1orP2 = 'Player2';
            Enemy  = 'Player1';
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
                if (Attack.key === translatedKey) this[P1orP2].attack(Attack, this[Enemy]);
            });

            this[P1orP2].projectiles.forEach((Projectile) => {
                if (Projectile.key === translatedKey) Projectile.fire(this[P1orP2]);
            });
        }
    }

    manageKeys() {
        window.addEventListener('keydown', this.manageKeyDown);
        window.addEventListener('keyup'  , this.manageKeyUp  );
    }

    removeKeys() {
        window.removeEventListener('keydown', this.manageKeyDown);
        window.removeEventListener('keyup'  , this.manageKeyUp  );
    }
    
    shutDown() {
        document.querySelector("#display-text").style.display = 'none';
        document.querySelector("#top-bar").style.display      = 'none';
        this.Stage.sound.pause();
        this.Stage.sound.currentTime = 0;
        globalData.P1 = null;
        globalData.P2 = null;
        globalData.ST = null;
        globalData.next = 'characterselect'
    }
}