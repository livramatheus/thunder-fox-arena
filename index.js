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
    position: { x: 0, y: 0 },
    velocity: { x: 0, y: 0 },
    c: c,
    imgSrc: './img/fighters/thunder/thunder_idle.png',
    scale: 3,
    sprites: {
        idle: {
            imgSrc: './img/fighters/thunder/thunder_idle.png',
            frames: 1
        },
        walking: {
            imgSrc: './img/fighters/thunder/thunder_walking.png',
            frames: 5
        },
        jumping: {
            imgSrc: './img/fighters/thunder/thunder_jumping.png',
            frames: 3
        },
        falling: {
            imgSrc: './img/fighters/thunder/thunder_falling.png',
            frames: 2
        },
        attack_1: {
            imgSrc: './img/fighters/thunder/thunder_attack_1.png',
            frames: 5
        }
    }
});
Player.frameSkip = 15;
const Enemy = new Fighter({
    position: { x: 0, y: 150 },
    velocity: { x: 0, y: 0 },
    c: c,
    offset: {
        x: 0,
        y: 142
    },
    imgSrc: './img/fighters/gonza/gonza_idle.png',
    scale: 3,
    sprites: {
        idle: {
            imgSrc: './img/fighters/gonza/gonza_idle.png',
            frames: 1
        },
        walking: {
            imgSrc: './img/fighters/gonza/gonza_walking.png',
            frames: 5
        },
        jumping: {
            imgSrc: './img/fighters/gonza/gonza_jumping.png',
            frames: 2
        },
        falling: {
            imgSrc: './img/fighters/gonza/gonza_falling.png',
            frames: 3
        },
        attack_1: {
            imgSrc: './img/fighters/gonza/gonza_attack_1.png',
            frames: 3
        }
    }
});

const keys = {
    a         : { pressed: false },
    d         : { pressed: false },
    w         : { pressed: false },
    ArrowRight: { pressed: false },
    ArrowLeft : { pressed: false },
    ArrowUp   : { pressed: false }
}

function rectangularCollision({ rectangle1, rectangle2 }) {
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

    if (Player.velocity.y < 0) {
        Player.switchSprite('jumping');
    } else if (Player.velocity.y > 0) {
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

    if (Enemy.velocity.y < 0) {
        Enemy.switchSprite('jumping');
    } else if (Enemy.velocity.y > 0) {
        Enemy.switchSprite('falling');
    }

    // Collision detection
    if (rectangularCollision({ rectangle1: Player, rectangle2: Enemy }) && Player.isAttacking) {
        Player.isAttacking = false;
        Enemy.health -= 20;
        document.querySelector("#enemy-health").style.width = Enemy.health + "%";
    }
    
    if (rectangularCollision({ rectangle1: Enemy, rectangle2: Player }) && Enemy.isAttacking) {
        Enemy.isAttacking = false;
        Player.health -= 20;
        document.querySelector("#player-health").style.width = Player.health + "%";
    }

    if (Player.health <= 0 || Enemy.health <= 0) {
        checkWinner({Player, Enemy, timerId});
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