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
            frames: 3,
            frameSkip: 40
        },
        attack_2: {
            id: 'attack_2',
            imgSrc: './img/fighters/gonza/gonza_attack_2.png',
            frames: 15,
            frameSkip: 7
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

const Attack1 = new Attack('attack_1', 'u', 20, 1, {x: 80, y: 50}, 130, 80);
Attack1.knockBack = { x: 30, y: 0 };
Attack1.color = 'green';

const Attack2 = new Attack('attack_2', 'i', 30, Array.from({length: 10}, (_, i) => i + 2), {x: 80, y: -60}, 140, 220);
Attack2.knockBack = { x: 30, y: -5 };
Attack2.color = 'white';
Attack2.callback = (Fighter) => {
    if (Fighter.facing === 'right') {
        Fighter.velocity.x = Fighter.walkFrontSpeed / 2;
    } else {
        Fighter.velocity.x = Fighter.walkFrontSpeed / 2 * -1;
    }
};

Gonza.attacks.push(Attack1);
Gonza.attacks.push(Attack2);

export default Gonza;