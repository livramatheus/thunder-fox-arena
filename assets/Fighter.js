import Sprite from './Sprite.js';

export default class Fighter extends Sprite {
    
    gravity = 0.4;
    lastKey = null;

    constructor({
        position,
        velocity,
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
        this.attackBox = {
            position: {
                x: position.x,
                y: position.y,
            },
            width: attackBox.width,
            height: attackBox.height,
            offset: attackBox.offset
        },
        this.isAttacking;
        this.health = 100;
        this.curFrame = 0;
        this.sprites = sprites;
        this.isReversed = false;
        this.lastSprite = 'idle';
        this.alive = true;
        this.defeatKnock = {
            x: 0,
            y: 0
        };

        for (const sprite in this.sprites) {
            sprites[sprite].image  = new Image();
            sprites[sprite].imageR = new Image();

            sprites[sprite].frameSkip  = sprites[sprite].frameSkip ? sprites[sprite].frameSkip : 5;
            sprites[sprite].image.src  = sprites[sprite].imgSrc;
            sprites[sprite].imageR.src = sprites[sprite].imgSrc.split('.png')[0] + '_r.png';
        }
    }

    changePosition(position) {
        if (!['left', 'right'].includes(position)) return;
        
        if (this.facing != position) {
            this.facing = position;
            this.isReversed = !this.isReversed;
            this.attackBox.offset.x = (this.attackBox.offset.x * -1);
        }
    }

    attack() {
        if (this.lastKey === 's') {
            this.switchSprite('attack_ducking');
        } else {
            this.switchSprite('attack_1');
        }

        this.isAttacking = true;
    }

    hit() {
        this.health -= 20;

        if (this.health <= 0) {
            this.knockBack(this.defeatKnock);
            this.switchSprite('defeat');
        } else {
            this.switchSprite('hit');
        }
    }

    switchSprite(sprite) {
        if (this.lastSprite == 'defeat') {
            if (this.curFrame === this.sprites.defeat.frames - 1) {
                this.alive = false;
            }
            return;
        }

        if (this.lastSprite == 'attack_1' && this.curFrame < this.sprites.attack_1.frames - 1) return;
        if (this.lastSprite == 'attack_ducking' && this.curFrame < this.sprites.attack_ducking.frames - 1) return;
        if (this.lastSprite == 'hit' && this.curFrame < this.sprites.hit.frames - 1) return;

        if (this.sprites[sprite].sound) {
            let snd = new Audio(this.sprites[sprite].sound);
            snd.play();  
        }
        
        if (this.lastSprite !== this.sprites[sprite].id) {
            this.frameSkip   = this.sprites[sprite].frameSkip;
            this.frames      = this.sprites[sprite].frames; 
            this.lastSprite  = this.sprites[sprite].id;
            this.image       = this.isReversed ? this.sprites[sprite].imageR : this.sprites[sprite].image;
            this.curFrame    = 0;
        }
    }

    isJumping() {
        return this.velocity.y < 0;
    }

    isFalling() {
        return this.velocity.y > 0;
    }

    isInAir() {
        return this.isJumping() || this.isFalling();
    }

    knockBack(force) {
        if (this.facing == 'right') force.x = force.x * -1;
        this.velocity.x += force.x;
        this.velocity.y += force.y;
    }

    update() {
        this.draw();
        if (this.alive) this.animateFrame();

        this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
        this.attackBox.position.y = this.position.y + this.attackBox.offset.y;

        // c.globalAlpha = 0.5;
        // c.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height);
        // c.globalAlpha = 1.0;

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