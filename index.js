import Background from "./assets/Background.js";
import Enemy from "./assets/Characters/Gonza.js"
import Player from "./assets/Characters/Thunder.js"

const Bg = new Background({
    position: {x: 0, y: 0},
    imgSrc: './img/background.png',
    c,
    music: './sound/music_03.wav'
});

Player.changePosition('left');

const keys = {
    a         : { pressed: false },
    d         : { pressed: false },
    w         : { pressed: false },
    s         : { pressed: false },
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
    } else if (keys.s.pressed && Player.lastKey === 's') {
        Player.switchSprite('ducking');
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
        Player.curFrame === 1
    ) {
        Player.isAttacking = false;
        Enemy.knockBack(20);
        Enemy.hit();
        document.querySelector("#enemy-health").style.width = Enemy.health + "%";
    }

    // If player misses
    if (Player.isAttacking && Player.curFrame === 1) {
        Player.isAttacking = false;
    }
    
    if (
        attackCollision({ rectangle1: Enemy, rectangle2: Player }) &&
        Enemy.isAttacking &&
        Enemy.curFrame === 1
    ) {
        Enemy.isAttacking = false;
        Player.knockBack(40);
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
    if (Player.alive) {
        switch (event.key) {
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
            case 's':
                keys.s.pressed = true;
                Player.lastKey = 's';
                break;
            case ' ':
                Player.attack();
                break;
        }
    }

    if (Enemy.alive) {
        switch (event.key) {
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
        case 's':
            keys.s.pressed = false;
            break;

        // Enemy
        case 'ArrowRight':
            keys.ArrowRight.pressed = false;
            break;
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false;
            break;
    }
});