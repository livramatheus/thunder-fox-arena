import Sprite from "./assets/Sprite.js"

const canvas = document.querySelector('canvas');
const c      = canvas.getContext('2d');

canvas.width  = 1024;
canvas.height = 576;

c.fillRect(0, 0, canvas.width, canvas.height);

const Player = new Sprite({
    position: { x: 0, y: 0 },
    velocity: { x: 0, y: 0 }
}, c);

const Enemy = new Sprite({
    position: { x: 400, y: 150 },
    velocity: { x: 0, y: 0 }
}, c);

const keys = {
    a         : { pressed: false },
    d         : { pressed: false },
    w         : { pressed: false },
    ArrowRight: { pressed: false },
    ArrowLeft : { pressed: false },
    ArrowUp   : { pressed: false }
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
    }
});
        
window.addEventListener('keyup', (event) => {
    console.log(event.key)
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