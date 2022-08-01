import Fighter from '../Fighter.js';
import Attack from '../Attack.js';

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
            frames: 5,
            frameSkip: 12
        },
        jumping: {
            id: 'jumping',
            imgSrc: './img/fighters/gonza/gonza_jumping.png',
            frames: 2,
            frameSkip: 30
        },
        falling: {
            id: 'falling',
            imgSrc: './img/fighters/gonza/gonza_falling.png',
            frames: 3,
            frameSkip: 18
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
        attack_4: {
            id: 'attack_4',
            imgSrc: './img/fighters/gonza/gonza_attack_4.png',
            frames: 2,
            frameSkip: 100
        },
        hit: {
            id: 'hit',
            imgSrc: './img/fighters/gonza/gonza_hit.png',
            frames: 3,
            sound: './sound/sound_50.mp3',
            frameSkip: 10
        },
        defeat: {
            id: 'defeat',
            imgSrc: './img/fighters/gonza/gonza_defeat.png',
            frames: 5,
            sound: './sound/sound_52.mp3',
            frameSkip: 10
        }
    },
    name: 'GONZA'
});

Gonza.folderName = 'gonza';

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

Gonza.walkFrontSpeed = 2;
Gonza.walkBackSpeed  = -2;

const Attack1 = new Attack('attack_1', 'action1', 10, 1, {x: 80, y: 50}, 130, 80);
Attack1.knockBack = { x: 1.3, y: -4 };
Attack1.color = 'blue';

const Attack2 = new Attack('attack_2', 'action2', 6, Array.from({length: 10}, (_, i) => i + 2), {x: 80, y: -60}, 140, 220);
Attack2.knockBack = { x: 3, y: -5 };
Attack2.color = 'white';
Attack2.callback = (Fighter) => {
    Fighter.linearMovement({ x: Fighter.isReversed ? -1.2 : 1.2, y: 0 });
};

const Attack3 = new Attack('attack_3', 'action3', 8, 0, {x: 75, y: 50}, 180, 50);
Attack3.knockBack = { x: 2, y: -3 };
Attack3.color = 'yellow';

const Attack4 = new Attack('attack_4', 'action4', 0, 1, {x: 80, y: 50}, 0, 0);
Attack4.knockBack = null;
Attack4.callback = (Fighter) => {
    Fighter.isBlocking = true;
};

Gonza.attacks = [Attack1, Attack2, Attack3, Attack4];

export default Gonza;