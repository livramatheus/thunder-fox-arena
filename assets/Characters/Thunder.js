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
        attack_2: {
            id: 'attack_2',
            imgSrc: './img/fighters/thunder/thunder_attack_2.png',
            frames: 3,
            sound: './sound/sound_10.mp3',
            frameSkip: 20
        },
        attack_3: {
            id: 'attack_3',
            imgSrc: './img/fighters/thunder/thunder_attack_3.png',
            frames: 6,
            sound: './sound/sound_43.mp3',
            frameSkip: 10
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

const Attack1 = new Attack('attack_1', ' ', 20, 1, { x: 50, y: 20 } , 90, 50);
Attack1.knockBack = { x: 20, y: 0 };

const Attack2 = new Attack('attack_2', 'b', 30, 1, { x: 50, y: 100 }, 70, 50);
Attack2.knockBack = { x: 30, y: -3 };
Attack2.color = 'black';
Attack2.condition = (Fighter) => !Fighter.isInAir();
Attack2.callback = (Fighter) => {
    if (Attack2.condition(Fighter)) {
        Fighter.velocity.y -= 10;
        Fighter.position.x += 50;
    }
}

const Attack3 = new Attack('attack_3', 'n', 30, 2, { x: 20, y: 20 }, 80, 160);
Attack3.knockBack = { x: 40, y: -7 };
Attack3.color = 'brown';
Attack3.condition = (Fighter) => !Fighter.isInAir();
Attack3.callback = (Fighter) => {
    if (Attack3.condition(Fighter)) {
        Fighter.velocity.y -= 15;
    }
} 

Thunder.attacks.push(Attack1);
Thunder.attacks.push(Attack2);
Thunder.attacks.push(Attack3);

export default Thunder;