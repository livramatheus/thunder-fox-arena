import Fighter from '../Fighter.js';
import Attack from '../Attack.js';
import Projectile from '../Projectile.js';

const Grazan = new Fighter({
    position: { x: 0, y: 0 },
    imgSrc: './img/fighters/grazan/grazan_idle.png',
    sprites: {
        idle: {
            id: 'idle',
            imgSrc: './img/fighters/grazan/grazan_idle.png',
            frames: 1
        },
        walking: {
            id: 'walking',
            imgSrc: './img/fighters/grazan/grazan_walking.png',
            frames: 4,
            frameSkip: 10
        },
        jumping: {
            id: 'jumping',
            imgSrc: './img/fighters/grazan/grazan_jumping.png',
            frames: 2,
            frameSkip: 20
        },
        falling: {
            id: 'falling',
            imgSrc: './img/fighters/grazan/grazan_falling.png',
            frames: 3,
            frameSkip: 40
        },
        attack_1: {
            id: 'attack_1',
            imgSrc: './img/fighters/grazan/grazan_attack_1.png',
            frames: 12,
            frameSkip: 7
        },
        attack_2: {
            id: 'attack_2',
            imgSrc: './img/fighters/grazan/grazan_attack_2.png',
            frames: 3,
            frameSkip: 40
        },
        attack_3: {
            id: 'attack_3',
            imgSrc: './img/fighters/grazan/grazan_attack_3.png',
            sound: './sound/sound_17.mp3',
            frames: 5,
            frameSkip: 4
        },
        attack_4: {
            id: 'attack_4',
            imgSrc: './img/fighters/grazan/grazan_attack_4.png',
            frames: 4,
            sound: './sound/sound_04.mp3',
        },
        hit: {
            id: 'hit',
            imgSrc: './img/fighters/grazan/grazan_hit.png',
            frames: 3,
            sound: './sound/sound_50.mp3',
            frameSkip: 10
        },
        defeat: {
            id: 'defeat',
            imgSrc: './img/fighters/grazan/grazan_defeat.png',
            frames: 3,
            sound: './sound/sound_52.mp3',
            frameSkip: 15
        }
    },
    name: 'GRAZAN'
});

Grazan.folderName = 'grazan';

Grazan.height = 235;
Grazan.width  = 80;

Grazan.boxOffset = {
    x: 70,
    y: 50
};

Grazan.offset = {
    x: 0,
    y: 67
};

const Attack1 = new Attack('attack_1', 'action1', 20, [5, 8], {x: 80, y: 65}, 80, 85);
Attack1.knockBack = { x: 1.3, y: -4 };
Attack1.color = 'blue';

const Attack2 = new Attack('attack_2', 'action2', 0, 1, {x: 0, y: 0}, 0, 0);
Attack2.knockBack = null;
Attack2.callback = (Fighter) => {
    Fighter.isBlocking = true;
};

const Attack3 = new Attack('attack_3', 'action3', 0, 1, {x: 0, y: 0}, 0, 0);
Attack3.knockBack = null;
Attack3.condition = (Fighter) => !Fighter.projectiles.find(Proj => Proj.active === true);

const Projectile1 = new Projectile({
    imgSrc: './img/projectiles/tubao_projectile.png',
    frames: 1,
    damage: 5,
    key: 'action3',
    speed: 10,
    impactSound: './sound/sound_32.mp3',
    impactImg: './img/explosion_1.png',
    berrelOffset: {
        left:  { x: -60 , y: 145 },
        right: { x: 0   , y: 145 }
    },
    width: 12,
    height: 20
});
Projectile1.knockBack = { x: 2.3, y: -4 };
Projectile1.condition = (Fighter, Proj) => !Fighter.projectiles.find(P => P.active === true);

const Attack4 = new Attack('attack_4', 'action4', 0, 1, {x: 0, y: 0}, 0, 0);
Attack4.knockBack = null;
Attack4.condition = (Fighter) => !Fighter.projectiles.find(Proj => Proj.active === true);

const Projectile2 = new Projectile({
    imgSrc: './img/projectiles/ar_projectile.png',
    frames: 1,
    damage: 3,
    key: 'action4',
    speed: 13,
    berrelOffset: {
        left:  { x: -100, y: 135 },
        right: { x: 50  , y: 135 }
    },
    width: 9,
    height: 9
});
Projectile2.knockBack = { x: 2.3, y: -4 };
Projectile2.condition = (Fighter, Proj) => !Fighter.projectiles.find(P => P.active === true);

Grazan.attacks     = [Attack1, Attack2, Attack3, Attack4];
Grazan.projectiles = [Projectile1, Projectile2];

export default Grazan;