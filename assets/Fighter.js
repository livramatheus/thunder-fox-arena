import Sprite from './Sprite.js';

export default class Fighter extends Sprite {
    
    gravity = 0.2;
    lastKey = null;

    constructor({ position, velocity, c, color, offset, imgSrc, scale = 2, frames = 1, sprites }) {
        super({ position, imgSrc, scale, frames });

        this.velocity  = velocity;
        this.height    = 150;
        this.width     = 50;
        this.c         = c;
        this.attackBox = {
            position: {
                x: position.x,
                y: position.y,
            },
            width: 100,
            height: 50,
            offset
        },
        this.color = color;
        this.isAttacking;
        this.health = 100;
        this.curFrame = 0;
        this.framesElapsed = 0;
        // this.frameSkip = 5;
        this.sprites = sprites;

        for (const sprite in this.sprites) {
            sprites[sprite].image = new Image();
            sprites[sprite].image.src = sprites[sprite].imgSrc;
        }
    }

    attack() {
        this.isAttacking = true;

        setTimeout(() => {
            this.isAttacking = false;
        }, 100);
    }

    update() {
        this.draw();
        this.animateFrame();

        this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
        this.attackBox.position.y = this.position.y;

        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        // Checks wether the sprite touches the bottom of the screen
        if (this.position.y + this.height + this.velocity.y >= 576 - 110) {
            this.velocity.y = 0;
        } else {
            // Applies gravity to velocity as long if the Sprite is in the air
            // The velocity increases every frame
            this.velocity.y += this.gravity;
        }
    }
}