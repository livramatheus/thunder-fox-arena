import Fighter from '../Fighter.js';
import Attack from '../Attack.js';
import Projectile from '../Projectile.js';

const Fox = new Fighter({
    position: { x: 0, y: 0 },
    imgSrc: './img/fighters/fox/fox_idle.png',
    sprites: {
        idle: {
            id: 'idle',
            imgSrc: './img/fighters/fox/fox_idle.png',
            frames: 1
        },
        walking: {
            id: 'walking',
            imgSrc: './img/fighters/fox/fox_walking.png',
            frames: 4,
            frameSkip: 15
        },
        jumping: {
            id: 'jumping',
            imgSrc: './img/fighters/fox/fox_jumping.png',
            frames: 2,
            frameSkip: 18
        },
        falling: {
            id: 'falling',
            imgSrc: './img/fighters/fox/fox_falling.png',
            frames: 3,
            frameSkip: 28
        },
        attack_1: {
            id: 'attack_1',
            imgSrc: './img/fighters/fox/fox_attack_1.png',
            frames: 4,
            sound: './sound/sound_10.mp3'
        },
        attack_2: {
            id: 'attack_2',
            imgSrc: './img/fighters/fox/fox_attack_2.png',
            frames: 4,
            sound: './sound/sound_10.mp3',
            frameSkip: 15
        },
        attack_3: {
            id: 'attack_3',
            imgSrc: './img/fighters/fox/fox_attack_3.png',
            frames: 6,
            sound: './sound/sound_43.mp3',
            frameSkip: 10
        },
        attack_4: {
            id: 'attack_4',
            imgSrc: './img/fighters/fox/fox_attack_4.png',
            frames: 4,
            sound: './sound/sound_04.mp3',
            frameSkip: 6
        },
        hit: {
            id: 'hit',
            imgSrc: './img/fighters/fox/fox_hit.png',
            frames: 4,
            frameSkip: 10
        },
        defeat: {
            id: 'defeat',
            imgSrc: './img/fighters/fox/fox_defeat.png',
            frames: 5,
            sound: './sound/sound_56.mp3',
            frameSkip: 10
        }
    },
    name: 'FOX'
});

Fox.folderName = 'fox';

Fox.width  = 50;
Fox.height = 180;

Fox.boxOffset = {
    x: 120,
    y: 50
};

Fox.offset = {
    x: 0,
    y: -5
};

const Attack1 = new Attack('attack_1', 'action1', 4, 2, { x: 50, y: 20 } , 120, 60);
Attack1.knockBack = { x: 2, y: -1.6 };
Attack1.color = 'white';

const Attack2 = new Attack('attack_2', 'action2', 6, 1, { x: 50, y: 100 }, 70, 50);
Attack2.knockBack = { x: 2, y: -1.4 };
Attack2.color = 'black';
Attack2.condition = (Fighter) => !Fighter.isInAir();
Attack2.callback = (Fighter) => {
    if (Attack2.condition(Fighter)) {
        Fighter.linearMovement({ x: Fighter.isReversed ? -3 : 3, y: -9 });
    }
}

const Attack3 = new Attack('attack_3', 'action3', 8, 2, { x: 20, y: 20 }, 80, 160);
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
    imgSrc: './img/projectiles/ar_projectile.png',
    frames: 1,
    damage: 4,
    key: 'action4',
    speed: 8,
    berrelOffset: {
        left:  { x: -180, y: 100 },
        right: { x: 70  , y: 100 }
    },
    width: 9,
    height: 9
});
Projectile1.knockBack = { x: 1, y: -2.3 };
Projectile1.condition = (Fighter, Proj) => !Proj.active;

Fox.attacks     = [Attack1, Attack2, Attack3, Attack4];
Fox.projectiles = [Projectile1];

export default Fox;