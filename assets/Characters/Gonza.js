import Fighter from '../Fighter.js';

const Gonza = new Fighter({
    position: { x: 700, y: 150 },
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
        offset: {x: 100, y: 50},
        width: 140,
        height: 80
    },
    name: 'GONZA'
});

Gonza.offset = {
    x: 180,
    y: 165
};

export default Gonza;