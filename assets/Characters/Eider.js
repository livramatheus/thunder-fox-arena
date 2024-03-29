import Fighter from '../Fighter.js';
import Attack from '../Attack.js';
import Projectile from '../Projectile.js';

const Eider = new Fighter({
    position: { x: 0, y: 0 },
    imgSrc: './img/fighters/eider/eider_idle.png',
    sprites: {
        idle: {
            id: 'idle',
            imgSrc: './img/fighters/eider/eider_idle.png',
            frames: 1
        },
        walking: {
            id: 'walking',
            imgSrc: './img/fighters/eider/eider_walking.png',
            frames: 4,
            frameSkip: 15
        },
        jumping: {
            id: 'jumping',
            imgSrc: './img/fighters/eider/eider_jumping.png',
            frames: 2,
            frameSkip: 18
        },
        falling: {
            id: 'falling',
            imgSrc: './img/fighters/eider/eider_falling.png',
            frames: 3,
            frameSkip: 28
        },
        attack_1: {
            id: 'attack_1',
            imgSrc: './img/fighters/eider/eider_attack_1.png',
            frames: 5,
            sound: './sound/sound_10.mp3',
            frameSkip: 7
        },
        attack_2: {
            id: 'attack_2',
            imgSrc: './img/fighters/eider/eider_attack_2.png',
            frames: 4,
            sound: './sound/sound_10.mp3',
            frameSkip: 15
        },
        attack_3: {
            id: 'attack_3',
            imgSrc: './img/fighters/eider/eider_attack_3.png',
            frames: 6,
            sound: './sound/sound_43.mp3',
            frameSkip: 10
        },
        attack_4: {
            id: 'attack_4',
            imgSrc: './img/fighters/eider/eider_attack_4.png',
            frames: 4,
            sound: './sound/sound_45.mp3',
            frameSkip: 6
        },
        hit: {
            id: 'hit',
            imgSrc: './img/fighters/eider/eider_hit.png',
            frames: 4,
            frameSkip: 10
        },
        defeat: {
            id: 'defeat',
            imgSrc: './img/fighters/eider/eider_defeat.png',
            frames: 5,
            sound: './sound/sound_56.mp3',
            frameSkip: 10
        }
    },
    name: 'EIDER'
});

Eider.folderName = 'eider';

Eider.width  = 50;
Eider.height = 180;

Eider.boxOffset = {
    x: 120,
    y: 50
};

Eider.offset = {
    x: 0,
    y: -5
};

Eider.walkFrontSpeed = 2.4;
Eider.walkBackSpeed = -2.4;
Eider.jumpForce = - 14.5;

const Attack1 = new Attack('attack_1', 'action1', 2, 2, { x: 50, y: 20 } , 120, 60);
Attack1.knockBack = { x: 2.5, y: -1.6 };
Attack1.color = 'white';

const Attack2 = new Attack('attack_2', 'action2', 6, 1, { x: 50, y: 100 }, 70, 50);
Attack2.knockBack = { x: 2, y: -1.4 };
Attack2.color = 'black';
Attack2.condition = (Fighter) => !Fighter.isInAir();
Attack2.callback = (Fighter) => {
    if (Attack2.condition(Fighter)) {
        Fighter.linearMovement({ x: Fighter.isReversed ? -4 : 4, y: -10 });
    }
}

const Attack3 = new Attack('attack_3', 'action3', 6, 2, { x: 20, y: 20 }, 80, 160);
Attack3.knockBack = { x: 5, y: -7 };
Attack3.color = 'brown';
Attack3.condition = (Fighter) => !Fighter.isInAir();
Attack3.callback = (Fighter) => {
    if (Attack3.condition(Fighter)) {
        Fighter.velocity.y -= 16;
    }
} 

const Attack4 = new Attack('attack_4', 'action4', 0, 1, { x: 50, y: 20 } , 0, 0);
Attack4.knockBack = null;
Attack4.condition = (Fighter) => !Fighter.projectiles.find(Proj => Proj.active === true);

const Projectile1 = new Projectile({
    imgSrc: './img/projectiles/laser_projectile.png',
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
Projectile1.knockBack = { x: 1.8, y: -3 };
Projectile1.condition = (Fighter, Proj) => !Proj.active;

Eider.attacks     = [Attack1, Attack2, Attack3, Attack4];
Eider.projectiles = [Projectile1];

export default Eider;