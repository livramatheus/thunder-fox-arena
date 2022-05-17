import Sprite from './Sprite.js';

export default class Fighter extends Sprite {
    
    gravity = 0.4;
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

    switchSprite(sprite) {
        switch (sprite) {
            case 'idle':
                if (this.image !== this.sprites.idle.image) {
                    this.image  = this.sprites.idle.image;
                    this.frames = this.sprites.idle.frames;
                    this.curFrame = 0;
                }
                break;
            case 'walking':
                if (this.image !== this.sprites.walking.image) {
                    this.frames = this.sprites.walking.frames; 
                    this.image  = this.sprites.walking.image;
                    this.curFrame = 0;
                }
                break;
            case 'jumping':
                if (this.image !== this.sprites.jumping.image) {
                    this.frames = this.sprites.jumping.frames; 
                    this.image  = this.sprites.jumping.image;
                    this.curFrame = 0;
                }
                break;
            case 'falling':
                if (this.image !== this.sprites.falling.image) {
                    this.frames = this.sprites.falling.frames; 
                    this.image  = this.sprites.falling.image;
                    this.curFrame = 0;
                }
                break;
        }
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
            this.position.y = 330;
        } else {
            // Applies gravity to velocity as long if the Sprite is in the air
            // The velocity increases every frame
            this.velocity.y += this.gravity;
        }
    }
}