import Fighter from '../Fighter.js';
import Attack from '../Attack.js';

const GyroMan = new Fighter({
    position: { x: 0, y: 0 },
    imgSrc: './img/fighters/gyro_man/gyro_man_idle.png',
    sprites: {
        idle: {
            id: 'idle',
            imgSrc: './img/fighters/gyro_man/gyro_man_idle.png',
            frames: 1
        },
        walking: {
            id: 'walking',
            imgSrc: './img/fighters/gyro_man/gyro_man_walking.png',
            frames: 4
        },
        jumping: {
            id: 'jumping',
            imgSrc: './img/fighters/gyro_man/gyro_man_jumping.png',
            frames: 2
        },
        falling: {
            id: 'falling',
            imgSrc: './img/fighters/gyro_man/gyro_man_falling.png',
            frames: 3
        },
        attack_1: {
            id: 'attack_1',
            imgSrc: './img/fighters/gyro_man/gyro_man_attack_1.png',
            frames: 7,
            frameSkip: 10
        },
        attack_2: {
            id: 'attack_2',
            imgSrc: './img/fighters/gyro_man/gyro_man_attack_2.png',
            frames: 6,
            frameSkip: 10
        },
        attack_3: {
            id: 'attack_3',
            imgSrc: './img/fighters/gyro_man/gyro_man_attack_3.png',
            frames: 5,
            frameSkip: 15
        },
        attack_4: {
            id: 'attack_4',
            imgSrc: './img/fighters/gyro_man/gyro_man_attack_4.png',
            frames: 6,
            frameSkip: 16
        },
        hit: {
            id: 'hit',
            imgSrc: './img/fighters/gyro_man/gyro_man_hit.png',
            frames: 4,
            sound: './sound/sound_50.mp3',
            frameSkip: 10
        },
        defeat: {
            id: 'defeat',
            imgSrc: './img/fighters/gyro_man/gyro_man_defeat.png',
            frames: 3,
            sound: './sound/sound_52.mp3',
            frameSkip: 35
        }
    },
    name: 'GYRO-MAN'
});

GyroMan.folderName = 'gyro_man';

GyroMan.walkFrontSpeed   = 3;
GyroMan.walkBackSpeed    = -3;
GyroMan.jumpForce        = - 17;
GyroMan.knockIntensifier = { x: 2, y: -5.5 };

GyroMan.height = 170;
GyroMan.width  = 55;

GyroMan.boxOffset = {
    x: 110,
    y: 55
};

GyroMan.offset = {
    x: 0,
    y: 25
};

const Attack1 = new Attack('attack_1', 'action1', 5, 3, {x: 60, y: 50}, 65, 70);
Attack1.knockBack = { x: 1.8, y: -2.3 };
Attack1.color = 'blue';
Attack1.condition = (Fighter) => !Fighter.isInAir();

const Attack2 = new Attack('attack_2', 'action2', 8, 3, {x: 55, y: 20}, 70, 70);
Attack2.knockBack = { x: 2.3, y: -3 };
Attack2.color = 'white';

const Attack3 = new Attack('attack_3', 'action3', 10, [2, 3, 4], {x: 40, y: 30}, 85, 150);
Attack3.knockBack = { x: 3, y: -3.2 };
Attack3.color = 'black';
Attack3.condition = (Fighter) => !Fighter.isInAir();
Attack3.callback = (Fighter) => {
    if (Attack3.condition(Fighter)) {
        Fighter.linearMovement({ x: Fighter.isReversed ? -7 : 7, y: -13 });
    }
};

const Attack4 = new Attack('attack_4', 'action4', 8, [3, 4], {x: 30, y: 50}, 135, 90);
Attack4.knockBack = { x: 4, y: -3.5 };
Attack4.color = 'yellow';
Attack4.condition = (Fighter) => !Fighter.isInAir();
Attack4.callback = (Fighter) => {
    if (Attack4.condition(Fighter)) {
        Fighter.linearMovement({ x: Fighter.isReversed ? -8 : 8, y: -16 });
    }
};

GyroMan.attacks = [Attack1, Attack2, Attack3, Attack4]

export default GyroMan;