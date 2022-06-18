import Fighter from '../Fighter.js';
import Attack from '../Attack.js';

const Gonza = new Fighter({
    position: { x: 600, y: 0 },
    imgSrc: './img/fighters/gonza/gonza_idle.png',
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
            frames: 6,
            sound: './sound/sound_50.wav'
        },
        defeat: {
            id: 'defeat',
            imgSrc: './img/fighters/gonza/gonza_defeat.png',
            frames: 15,
            sound: './sound/sound_52.wav'
        }
    },
    attackBox: {
        offset: {x: 80, y: 50},
        width: 130,
        height: 80
    },
    name: 'GONZA'
});

Gonza.height = 230;
Gonza.width  = 80;

Gonza.boxOffset = {
    x: 140,
    y: 55
};

Gonza.offset = {
    x: 0,
    y: 70
};

Gonza.attacks.push(new Attack('attack_1', 'ArrowDown', 20, 0));

export default Gonza;