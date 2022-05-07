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
}

animate();