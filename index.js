import Background from "./assets/Background.js";
import Fighter from "./assets/Fighter.js"

const canvas = document.querySelector('canvas');
const c      = canvas.getContext('2d');

canvas.width  = 1024;
canvas.height = 576;

c.fillRect(0, 0, canvas.width, canvas.height);

const Bg = new Background({
    position: {x: 0, y: 0},
    imgSrc: './img/background.png',
    c
});

const Player = new Fighter({
    position: { x: 100, y: 0 },
    velocity: { x: 0, y: 0 },
    c: c,
    imgSrc: './img/fighters/thunder/thunder_idle.png',
    scale: 3,
    sprites: {
        idle: {
            id: 'idle',
            imgSrc: './img/fighters/thunder/thunder_idle.png',
            frames: 1
        },
        walking: {
            id: 'walking',
            imgSrc: './img/fighters/thunder/thunder_walking.png',
            frames: 5
        },
        jumping: {
            id: 'jumping',
            imgSrc: './img/fighters/thunder/thunder_jumping.png',
            frames: 3
        },
        falling: {
            id: 'falling',
            imgSrc: './img/fighters/thunder/thunder_falling.png',
            frames: 2
        },
        attack_1: {
            id: 'attack_1',
            imgSrc: './img/fighters/thunder/thunder_attack_1.png',
            frames: 5
        },
        hit: {
            id: 'hit',
            imgSrc: './img/fighters/thunder/thunder_hit.png',
            frames: 8
        }
    },
    attackBox: {
        offset: {x: 70, y: 30},
        width: 100,
        height: 50
    }
});
Player.frameSkip = 15;
const Enemy = new Fighter({
    position: { x: 700, y: 150 },
    velocity: { x: 0, y: 0 },
    c: c,
    offset: {
        x: 100,
        y: 142
    },
    imgSrc: './img/fighters/gonza/gonza_idle.png',
    scale: 3,
    sprites: {
        idle: {
            id: 'idle',
            imgSrc: './img/fighters/gonza/gonza_idle.png',
            frames: 1
        },
        walking: {
            id: 'walking',
            imgSrc: './img/fighters/gonza/gonza_walking.png',
            frames: 5
        },
        jumping: {
            id: 'jumping',
            imgSrc: './img/fighters/gonza/gonza_jumping.png',
            frames: 2
        },
        falling: {
            id: 'falling',
            imgSrc: './img/fighters/gonza/gonza_falling.png',
            frames: 3
        },
        attack_1: {
            id: 'attack_1',
            imgSrc: './img/fighters/gonza/gonza_attack_1.png',
            frames: 3
        },
        hit: {
            id: 'hit',
            imgSrc: './img/fighters/gonza/gonza_hit.png',
            frames: 6
        }
    },
    attackBox: {
        offset: {x: 140, y: 50},
        width: 120,
        height: 80
    }
});

Player.changePosition('left');

const keys = {
    a         : { pressed: false },
    d         : { pressed: false },
    w         : { pressed: false },
    ArrowRight: { pressed: false },
    ArrowLeft : { pressed: false },
    ArrowUp   : { pressed: false }
}

function attackCollision({ rectangle1, rectangle2 }) {
    return (
        rectangle1.attackBox.position.x + rectangle1.attackBox.width >= rectangle2.position.x &&
        rectangle1.attackBox.position.x <= rectangle2.position.x + rectangle2.width &&
        rectangle1.attackBox.position.y + rectangle1.attackBox.height >= rectangle2.position.y &&
        rectangle1.attackBox.position.y < rectangle2.position.y + rectangle2.height
    );
}

function checkWinner({ Player, Enemy, timerId }) {
    clearTimeout(timerId);
    const displayText = document.querySelector("#display-text");
    displayText.style.display = 'flex';

    if (Player.health > Enemy.health) return displayText.innerHTML = 'Player 1 Wins';
    if (Player.health < Enemy.health) return displayText.innerHTML = 'Player 2 Wins';
    return displayText.innerHTML = 'Draw';
}

let timerId = null;
let timer   = 10;

function decreaseTimer() {
    
    if (timer > 0) {
        timer -= 1;
        document.querySelector("#timer").innerHTML = timer;

        timerId = setTimeout(() => {
            decreaseTimer();
        }, 1000);
    } else {
        checkWinner({Player, Enemy, timerId});
    }
}

decreaseTimer();

/**
 * This function gets called recursively every frame, 
 * in order that every component gets re-rendered continuously
 */
function animate() {
    window.requestAnimationFrame(animate);

    c.fillStyle = 'black';
    c.fillRect(0, 0, canvas.width, canvas.height);
    Bg.update();
    Player.update();
    Enemy.update();

    Player.velocity.x = 0;
    Enemy.velocity.x  = 0;

    if (keys.a.pressed && Player.lastKey === 'a') {
        Player.switchSprite('walking');
        Player.velocity.x = -1.2;
    } else if (keys.d.pressed && Player.lastKey === 'd') {
        Player.switchSprite('walking');
        Player.velocity.x = 2.2;
    } else {
        Player.switchSprite('idle');
    }

    if (Player.isJumping()) {
        Player.switchSprite('jumping');
    } else if (Player.isFalling()) {
        Player.switchSprite('falling');
    }

    if (keys.ArrowRight.pressed && Enemy.lastKey === 'ArrowRight') {
        Enemy.switchSprite('walking');
        Enemy.velocity.x = 2.2;
    } else if (keys.ArrowLeft.pressed && Enemy.lastKey === 'ArrowLeft') {
        Enemy.switchSprite('walking');
        Enemy.velocity.x = -1.2;
    } else {
        Enemy.switchSprite('idle');
    }

    if (Enemy.isJumping()) {
        Enemy.switchSprite('jumping');
    } else if (Enemy.isFalling()) {
        Enemy.switchSprite('falling');
    }

    // Collision detection
    if (
        attackCollision({ rectangle1: Player, rectangle2: Enemy }) &&
        Player.isAttacking &&
        Player.curFrame === 3
    ) {
        Player.isAttacking = false;
        Enemy.hit();
        document.querySelector("#enemy-health").style.width = Enemy.health + "%";
    }

    // If player misses
    if (Player.isAttacking && Player.curFrame === 3) {
        Player.isAttacking = false;
    }
    
    if (
        attackCollision({ rectangle1: Enemy, rectangle2: Player }) &&
        Enemy.isAttacking &&
        Enemy.curFrame === 1
    ) {
        Enemy.isAttacking = false;
        Player.hit();
        document.querySelector("#player-health").style.width = Player.health + "%";
    }

    // If enemy misses
    if (Enemy.isAttacking && Enemy.curFrame === 1) {
        Enemy.isAttacking = false;
    }

    if (Player.health <= 0 || Enemy.health <= 0) {
        checkWinner({Player, Enemy, timerId});
    }

    if (!(Player.position.x + Player.width > Enemy.position.x + Enemy.width)) {
        Player.changePosition('right');
        Enemy.changePosition('left');
    } else {
        Player.changePosition('left');
        Enemy.changePosition('right');
    }
    
}

animate();

window.addEventListener('keydown', (event) => {
    switch (event.key) {
        // Player
        case 'd':
            keys.d.pressed = true;
            Player.lastKey = 'd';
            break;
        case 'a':
            keys.a.pressed = true;
            Player.lastKey = 'a';
            break;
        case 'w':
            Player.velocity.y = -13;
            break;
        case ' ':
            Player.attack();
            break;

        // Enemy
        case 'ArrowRight':
            keys.ArrowRight.pressed = true;
            Enemy.lastKey = 'ArrowRight';
            break;
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true;
            Enemy.lastKey = 'ArrowLeft';
            break;
        case 'ArrowUp':
            Enemy.velocity.y = -10;
            break;
        case 'ArrowDown':
            Enemy.attack();
            break;
    }
});
        
window.addEventListener('keyup', (event) => {
    switch (event.key) {
        // Player
        case 'd':
            keys.d.pressed = false;
            break;
        case 'a':
            keys.a.pressed = false;
            break;

        // Player
        case 'ArrowRight':
            keys.ArrowRight.pressed = false;
            break;
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false;
            break;
    }
});