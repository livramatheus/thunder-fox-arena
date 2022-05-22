import Sprite from './Sprite.js';

export default class Fighter extends Sprite {
    
    gravity = 0.4;
    lastKey = null;

    constructor({
        position,
        velocity,
        c,
        color,
        offset = {x: 0, y: 0},
        imgSrc,
        scale = 2,
        frames = 1,
        sprites,
        attackBox = { offset: {}, width: undefined, height: undefined }
    }) {
        super({ position, imgSrc, scale, frames, offset });

        this.velocity  = velocity;
        this.height    = 150;
        this.width     = 50;
        this.c         = c;
        this.attackBox = {
            position: {
                x: position.x,
                y: position.y,
            },
            width: attackBox.width,
            height: attackBox.height,
            offset: attackBox.offset
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
        this.switchSprite('attack_1');
        this.isAttacking = true;
    }

    hit() {
        this.switchSprite('hit')
        this.health -= 20;
    }

    switchSprite(sprite) {
        if (this.image == this.sprites.attack_1.image && this.curFrame < this.sprites.attack_1.frames - 1) return;
        if (this.image == this.sprites.hit.image && this.curFrame < this.sprites.hit.frames - 1) return;

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
            case 'attack_1':
                if (this.image !== this.sprites.attack_1.image) {
                    this.frames = this.sprites.attack_1.frames; 
                    this.image  = this.sprites.attack_1.image;
                    this.curFrame = 0;
                }
                break;
            case 'hit':
                if (this.image !== this.sprites.hit.image) {
                    this.frames = this.sprites.hit.frames; 
                    this.image  = this.sprites.hit.image;
                    this.curFrame = 0;
                }
                break;
        }
    }

    update() {
        this.draw();
        this.animateFrame();

        this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
        this.attackBox.position.y = this.position.y + this.attackBox.offset.y;

        // this.c.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height);

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