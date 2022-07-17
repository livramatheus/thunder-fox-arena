import Fighter from '../Fighter.js';
import Attack from '../Attack.js';
import KeyMap from '../../misc/KeyMap.js';

const Gonza = new Fighter({
    position: { x: 0, y: 0 },
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
        attack_3: {
            id: 'attack_3',
            imgSrc: './img/fighters/gonza/gonza_attack_3.png',
            frames: 2,
            frameSkip: 50
        },
        hit: {
            id: 'hit',
            imgSrc: './img/fighters/gonza/gonza_hit.png',
            frames: 6,
            sound: './sound/sound_50.mp3'
        },
        defeat: {
            id: 'defeat',
            imgSrc: './img/fighters/gonza/gonza_defeat.png',
            frames: 15,
            sound: './sound/sound_52.mp3'
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

const Attack1 = new Attack('attack_1', 'action1', 20, 1, {x: 80, y: 50}, 130, 80);
Attack1.knockBack = { x: 30, y: 0 };
Attack1.color = 'blue';

const Attack2 = new Attack('attack_2', 'action2', 30, Array.from({length: 10}, (_, i) => i + 2), {x: 80, y: -60}, 140, 220);
Attack2.knockBack = { x: 30, y: -5 };
Attack2.color = 'white';
Attack2.callback = (Fighter) => {
    if (Fighter.facing === 'right') {
        Fighter.velocity.x = Fighter.walkFrontSpeed / 2;
    } else {
        Fighter.velocity.x = Fighter.walkFrontSpeed / 2 * -1;
    }
};

const Attack3 = new Attack('attack_3', 'action3', 20, 0, {x: -30, y: 50}, 180, 50);
Attack3.knockBack = { x: 30, y: 0 };
Attack3.color = 'yellow';

Gonza.attacks.push(Attack1);
Gonza.attacks.push(Attack2);
Gonza.attacks.push(Attack3);

export default Gonza;