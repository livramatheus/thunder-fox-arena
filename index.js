import Sprite from "./assets/Sprite.js"

const canvas = document.querySelector('canvas');
const c      = canvas.getContext('2d');

canvas.width  = 1024;
canvas.height = 576;

c.fillRect(0, 0, canvas.width, canvas.height);

const Player = new Sprite({
    position: { x: 0, y: 0 },
    velocity: { x: 0, y: 0 },
    c: c,
    color: 'red',
    offset: {
        x: 0,
        y: 0
    }
});

const Enemy = new Sprite({
    position: { x: 400, y: 150 },
    velocity: { x: 0, y: 0 },
    c: c,
    color: 'blue',
    offset: {
        x: -50,
        y: 0
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

/**
 * This function gets called recursively every frame, 
 * in order that every component gets re-rendered continuously
 */
function animate() {
    window.requestAnimationFrame(animate);

    c.fillStyle = 'black';
    c.fillRect(0, 0, canvas.width, canvas.height);
    Player.update();
    Enemy.update();

    Player.velocity.x = 0;
    Enemy.velocity.x  = 0;

    if (keys.a.pressed && Player.lastKey === 'a') {
        Player.velocity.x = -1;
    } else if (keys.d.pressed && Player.lastKey === 'd') {
        Player.velocity.x = 1;
    }

    if (keys.ArrowRight.pressed && Enemy.lastKey === 'ArrowRight') {
        Enemy.velocity.x = 1;
    } else if (keys.ArrowLeft.pressed && Enemy.lastKey === 'ArrowLeft') {
        Enemy.velocity.x = -1;
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
            Player.velocity.y = -10;
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