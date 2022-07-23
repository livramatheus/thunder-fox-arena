import Fighter from '../Fighter.js';
import Attack from '../Attack.js';
import Projectile from '../Projectile.js';

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
            sound: './sound/sound_07.mp3'
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
        attack_4: {
            id: 'attack_4',
            imgSrc: './img/fighters/thunder/thunder_attack_4.png',
            frames: 3,
            sound: './sound/sound_17.mp3',
            frameSkip: 8
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
            sound: './sound/sound_56.mp3',
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
            sound: './sound/sound_07.mp3'
        }
    },
    name: 'THUNDER'
});

Thunder.width  = 50;
Thunder.height = 180;

Thunder.boxOffset = {
    x: 120,
    y: 50
};

Thunder.offset = {
    x: 0,
    y: -5
};

const Attack1 = new Attack('attack_1', 'action1', 20, 1, { x: 50, y: 20 } , 90, 50);
Attack1.knockBack = { x: 1.3, y: -1.2 };

const Attack2 = new Attack('attack_2', 'action2', 30, 1, { x: 50, y: 100 }, 70, 50);
Attack2.knockBack = { x: 2, y: -1.4 };
Attack2.color = 'black';
Attack2.condition = (Fighter) => !Fighter.isInAir();
Attack2.callback = (Fighter) => {
    if (Attack2.condition(Fighter)) {
        Fighter.linearMovement({ x: Fighter.isReversed ? -3 : 3, y: -8 });
    }
}

const Attack3 = new Attack('attack_3', 'action3', 30, 2, { x: 20, y: 20 }, 80, 160);
Attack3.knockBack = { x: 5, y: -7 };
Attack3.color = 'brown';
Attack3.condition = (Fighter) => !Fighter.isInAir();
Attack3.callback = (Fighter) => {
    if (Attack3.condition(Fighter)) {
        Fighter.velocity.y -= 15;
    }
} 

const Attack4 = new Attack('attack_4', 'action4', 0, 1, { x: 50, y: 20 } , 0, 0);
Attack4.knockBack = null;
Attack4.condition = (Fighter) => !Fighter.projectiles.find(Proj => Proj.active === true);

const Projectile1 = new Projectile({
    imgSrc: './img/projectiles/tubao_projectile.png',
    frames: 1,
    damage: 5,
    key: 'action4',
    speed: 10,
    impactSound: './sound/sound_32.mp3',
    impactImg: './img/explosion_1.png',
    berrelOffset: {
        left:  { x: -180, y: 85 },
        right: { x: 70, y: 85 }
    },
    width: 61,
    height: 19
});
Projectile1.knockBack = { x: 2.3, y: -4 };
Projectile1.condition = (Fighter, Proj) => !Proj.active;

Thunder.attacks     = [Attack1, Attack2, Attack3, Attack4];
Thunder.projectiles = [Projectile1];

export default Thunder;