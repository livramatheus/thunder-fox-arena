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
        this.isReversed = false;
        this.lastSprite = 'idle';
        this.alive = true;

        for (const sprite in this.sprites) {
            sprites[sprite].image  = new Image();
            sprites[sprite].imageR = new Image();

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
        console.log(this.lastKey)
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

        switch (sprite) {
            case 'idle':
                if (this.lastSprite !== 'idle') {
                    this.frames = this.sprites.idle.frames;
                    this.lastSprite  = 'idle';
                    this.image = this.isReversed ? this.sprites.idle.imageR : this.sprites.idle.image;
                    this.curFrame = 0;
                }
                break;
            case 'walking':
                if (this.lastSprite !== 'walking') {
                    this.frames = this.sprites.walking.frames; 
                    this.lastSprite  = 'walking';
                    this.image = this.isReversed ? this.sprites.walking.imageR : this.sprites.walking.image;
                    this.curFrame = 0;
                }
                break;
            case 'jumping':
                if (this.lastSprite !== 'jumping') {
                    this.frames = this.sprites.jumping.frames; 
                    this.lastSprite  = 'jumping';
                    this.image = this.isReversed ? this.sprites.jumping.imageR : this.sprites.jumping.image;
                    this.curFrame = 0;
                }
                break;
            case 'falling':
                if (this.lastSprite !== 'falling') {
                    this.frames = this.sprites.falling.frames; 
                    this.lastSprite  = 'falling';
                    this.image = this.isReversed ? this.sprites.falling.imageR : this.sprites.falling.image;
                    this.curFrame = 0;
                }
                break;
            case 'attack_1':
                if (this.lastSprite !== 'attack_1') {
                    this.frames = this.sprites.attack_1.frames; 
                    this.lastSprite  = 'attack_1';
                    this.image = this.isReversed ? this.sprites.attack_1.imageR : this.sprites.attack_1.image;
                    this.curFrame = 0;
                }
                break;
            case 'hit':
                if (this.lastSprite !== 'hit') {
                    this.frames = this.sprites.hit.frames; 
                    this.lastSprite  = 'hit';
                    this.image = this.isReversed ? this.sprites.hit.imageR : this.sprites.hit.image;
                    this.curFrame = 0;
                }
                break;
            case 'defeat':
                if (this.lastSprite !== 'defeat') {
                    this.frames = this.sprites.defeat.frames; 
                    this.lastSprite  = 'defeat';
                    this.image = this.isReversed ? this.sprites.defeat.imageR : this.sprites.defeat.image;
                    this.curFrame = 0;
                }
                break;
            case 'ducking':
                if (this.lastSprite !== 'ducking') {
                    this.frames = this.sprites.ducking.frames; 
                    this.lastSprite  = 'ducking';
                    this.image = this.isReversed ? this.sprites.ducking.imageR : this.sprites.ducking.image;
                    this.curFrame = 0;
                }
                break;
            case 'attack_ducking':
                if (this.lastSprite !== 'attack_ducking') {
                    this.frames = this.sprites.attack_ducking.frames; 
                    this.lastSprite  = 'attack_ducking';
                    this.image = this.isReversed ? this.sprites.attack_ducking.imageR : this.sprites.attack_ducking.image;
                    this.curFrame = 0;
                }
                break;
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
        if(this.facing == 'left') {
            // this.velocity.x += force;
        } else {
            // this.velocity.x -= force;
        }
    }

    update() {
        this.draw();
        if (this.alive) this.animateFrame();

        this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
        this.attackBox.position.y = this.position.y + this.attackBox.offset.y;

        // this.c.globalAlpha = 0.5;
        // this.c.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height);
        // this.c.globalAlpha = 1.0;

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