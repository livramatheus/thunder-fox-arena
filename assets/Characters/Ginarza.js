import Fighter from '../Fighter.js';
import Attack from '../Attack.js';
import Projectile from '../Projectile.js';

const Ginarza = new Fighter({
    position: { x: 0, y: 0 },
    imgSrc: './img/fighters/ginarza/ginarza_idle.png',
    sprites: {
        idle: {
            id: 'idle',
            imgSrc: './img/fighters/ginarza/ginarza_idle.png',
            frames: 1
        },
        walking: {
            id: 'walking',
            imgSrc: './img/fighters/ginarza/ginarza_walking.png',
            frames: 4,
            frameSkip: 15
        },
        jumping: {
            id: 'jumping',
            imgSrc: './img/fighters/ginarza/ginarza_jumping.png',
            frames: 3,
            frameSkip: 15
        },
        falling: {
            id: 'falling',
            imgSrc: './img/fighters/ginarza/ginarza_falling.png',
            frames: 3,
            frameSkip: 42
        },
        attack_1: {
            id: 'attack_1',
            imgSrc: './img/fighters/ginarza/ginarza_attack_1.png',
            frames: 7,
            frameSkip: 8
        },
        attack_2: {
            id: 'attack_2',
            imgSrc: './img/fighters/ginarza/ginarza_attack_2.png',
            frames: 7
        },
        attack_3: {
            id: 'attack_3',
            imgSrc: './img/fighters/ginarza/ginarza_attack_3.png',
            frames: 4,
            sound: './sound/sound_17.mp3',
            frameSkip: 5
        },
        attack_4: {
            id: 'attack_4',
            imgSrc: './img/fighters/ginarza/ginarza_attack_4.png',
            frames: 16,
            sound: './sound/sound_51.mp3',
            frameSkip: 3
        },
        hit: {
            id: 'hit',
            imgSrc: './img/fighters/ginarza/ginarza_hit.png',
            frames: 5,
            sound: './sound/sound_50.mp3'
        },
        defeat: {
            id: 'defeat',
            imgSrc: './img/fighters/ginarza/ginarza_defeat.png',
            frames: 4,
            sound: './sound/sound_52.mp3',
            frameSkip: 10
        }
    },
    name: 'GINARZA'
});

Ginarza.folderName = 'ginarza';

Ginarza.knockIntensifier = { x: 1.3, y: -1.5 };

Ginarza.width  = 80;
Ginarza.height = 215;

Ginarza.walkFrontSpeed = 2;
Ginarza.walkBackSpeed = -2;

Ginarza.boxOffset = {
    x: 75,
    y: 55
};

Ginarza.offset = {
    x: 0,
    y: 27
};

const Attack1 = new Attack('attack_1', 'action1', 10, 5, { x: 50, y: 20 } , 100, 55);
Attack1.knockBack = { x: 2, y: -1.6 };
Attack1.color = 'white';

const Attack2 = new Attack('attack_2', 'action2', 8, [2, 3], { x: 50, y: 0 }, 50, 190);
Attack2.knockBack = { x: 2.7, y: -2.1 };
Attack2.color = 'red';
Attack2.condition = (Fighter) => !Fighter.isInAir();

const Attack3 = new Attack('attack_3', 'action3', 0, 2, { x: 0, y: 0 }, 0, 0);
Attack3.knockBack = null;
Attack3.condition = (Fighter) => !Fighter.projectiles.find(Proj => Proj.active === true);

const Projectile1 = new Projectile({
    imgSrc: './img/projectiles/tubao_projectile.png',
    frames: 1,
    damage: 6,
    key: 'action3',
    speed: 7,
    impactSound: './sound/sound_32.mp3',
    impactImg: './img/explosion_1.png',
    berrelOffset: {
        left:  { x: 40, y: 120 },
        right: { x: 40, y: 120 }
    },
    width: 12,
    height: 20
});
Projectile1.knockBack = { x: 2.3, y: -4 };
Projectile1.condition = (Fighter, Proj) => !Proj.active;

const Attack4 = new Attack('attack_4', 'action4', 4, [6, 7, 8], { x: 50, y: 20 } , 250, 50);
Attack4.knockBack = { x: 2.3, y: -1.6 };
Attack.color = 'blue'

Ginarza.attacks     = [Attack1, Attack2, Attack3, Attack4];
Ginarza.projectiles = [Projectile1];

export default Ginarza;