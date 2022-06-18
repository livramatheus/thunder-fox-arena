import Fighter from '../Fighter.js';
import Attack from '../Attack.js';

const Thunder = new Fighter({
    position: { x: 0, y: 0 },
    imgSrc: './img/fighters/thunder/thunder_idle.png',
    sprites: {
        idle: {
            id: 'idle',
            imgSrc: './img/fighters/thunder/thunder_idle.png',
            frames: 1
        },
        walking: {
            id: 'walking',
            imgSrc: './img/fighters/thunder/thunder_walking.png',
            frames: 4,
            frameSkip: 15
        },
        jumping: {
            id: 'jumping',
            imgSrc: './img/fighters/thunder/thunder_jumping.png',
            frames: 2
        },
        falling: {
            id: 'falling',
            imgSrc: './img/fighters/thunder/thunder_falling.png',
            frames: 3
        },
        attack_1: {
            id: 'attack_1',
            imgSrc: './img/fighters/thunder/thunder_attack_1.png',
            frames: 3,
            sound: './sound/sound_07.wav'
        },
        hit: {
            id: 'hit',
            imgSrc: './img/fighters/thunder/thunder_hit.png',
            frames: 8
        },
        defeat: {
            id: 'defeat',
            imgSrc: './img/fighters/thunder/thunder_defeat.png',
            frames: 5,
            sound: './sound/sound_56.wav',
            frameSkip: 10
        },
        ducking: {
            id: 'ducking',
            imgSrc: './img/fighters/thunder/thunder_ducking.png',
            frames: 1
        },
        attack_ducking: {
            id: 'attack_ducking',
            imgSrc: './img/fighters/thunder/thunder_attack_ducking.png',
            frames: 3,
            sound: './sound/sound_07.wav'
        }
    },
    attackBox: {
        offset: { x: 50, y: 20 },
        width: 90,
        height: 50
    },
    name: 'THUNDER'
});

Thunder.defeatKnock = {
    x: 0,
    y: -10
};

Thunder.width  = 50;
Thunder.height = 180;

Thunder.boxOffset = {
    x: 120,
    y: 50
};

Thunder.offset = {
    x: 0,
    y: -45
};

Thunder.attacks.push(new Attack('attack_1', ' ', 20, 0));

export default Thunder;