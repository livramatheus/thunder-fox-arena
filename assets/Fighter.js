import Sprite from './Sprite.js';

export default class Fighter extends Sprite {
    
    constructor({
        position,
        imgSrc,
        frames = 1,
        sprites,
        name
    }) {
        super({ position, imgSrc, frames });

        this.velocity = { x: 0, y: 0 };
        this.height    = 0;
        this.width     = 0;
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
        this.name = name;
        this.jumpForce = -13;
        this.walkFrontSpeed = 2;
        this.walkBackSpeed  = -2;
        this.boxOffset = {x: 0, y: 0};
        this.attacks = [];
        this.lifebarId;

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
        }
    }

    attackCollision(Attack, Victim) {
        let attackerBox = this.getAttackBoxCoordinates(Attack.sprite);
        let victimBox   = Victim.getHitBoxCoordinates();
        let vertConds   = (
            attackerBox.y + attackerBox.h >= victimBox.y &&
            attackerBox.y < victimBox.y + victimBox.h
        )

        if (this.facing === 'right') {
            return (
                attackerBox.x + attackerBox.w >= victimBox.x + victimBox.w &&
                attackerBox.x <= victimBox.x + victimBox.w &&
                vertConds
            );
        }

        return (
            attackerBox.x > victimBox.x &&
            attackerBox.x + attackerBox.w < victimBox.x + victimBox.w &&
            vertConds
        );
    }
    
    manageAttack(Attack, Victim) {
        if (Attack.callback) {
            Attack.callback(this);
        }
        
        if (
            this.attackCollision(Attack, Victim) &&
            this.isAttacking &&
            this.curFrame === Attack.frameDmg
        ) {
            this.isAttacking = false;
            Victim.knockBack(Attack.knockBack);
            Victim.hit(Attack.damage);
            document.querySelector(Victim.lifebarId).style.width = Victim.health + "%";
        }

        if (this.isAttacking && this.curFrame === Attack.frameDmg) {
            this.isAttacking = false;
        }
    }

    attack(Attack, Victim) {
        if (Attack.condition && !Attack.condition(this)) return;
        
        this.switchSprite(Attack.sprite);
        this.isAttacking = true;
    }

    hit(damage) {
        this.health -= damage;

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
        if (this.lastSprite == 'attack_2' && this.curFrame < this.sprites.attack_2.frames - 1) return;
        if (this.lastSprite == 'attack_3' && this.curFrame < this.sprites.attack_3.frames - 1) return;
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
        this.velocity.x = force.x;
        this.velocity.y = force.y;
    }

    manageJumpingSprites() {
        if (this.isJumping()) {
            this.switchSprite('jumping');
        } else if (this.isFalling()) {
            this.switchSprite('falling');
        }
    }

    walkFront() {
        this.switchSprite('walking');
        this.velocity.x = this.walkFrontSpeed;
    }

    walkBack() {
        this.switchSprite('walking');
        this.velocity.x = this.walkBackSpeed;
    }

    getAttackBoxCoordinates(id) {
        let xPos, width;
        let Attack = this.attacks.find((atk) => atk.sprite === id);
        
        if (this.facing === 'right') {
            xPos  = this.position.x + Attack.offset.x + this.boxOffset.x;
            width = Attack.width;
        } else {
            xPos  = this.position.x - this.boxOffset.x + this.sprites['idle'].image.width - this.width;
            width = Attack.width * -1;
        }

        return {
            x: xPos,
            y: Attack.position.y + this.boxOffset.y,
            w: width,
            h: Attack.height
        }
    }

    getHitBoxCoordinates() {
        let xPos, width;
        
        if (this.facing === 'right') {
            xPos  = this.position.x + this.boxOffset.x;
            width = this.width;
        } else {
            xPos  = this.position.x - this.boxOffset.x + this.sprites['idle'].image.width;
            width = this.width * -1;
        }

        return {
            x: xPos,
            y: this.position.y + this.boxOffset.y,
            w: width,
            h: this.height,
        }
    }

    showCollBox() {
        c.globalAlpha = 0.5;
        let hitBox    = this.getHitBoxCoordinates();

        // Attack Box
        this.attacks.forEach((Attack) => {
            let attackBox = this.getAttackBoxCoordinates(Attack.sprite);
            c.fillStyle = Attack.color;
            c.fillRect(attackBox.x, attackBox.y, attackBox.w, attackBox.h);
        });

        // Hit Box
        c.fillStyle = "yellow";
        c.fillRect(hitBox.x, hitBox.y, hitBox.w, hitBox.h);
        
        c.globalAlpha = 1.0;
    }

    update() {
        this.draw();
        if (this.alive) this.animateFrame();
        
        this.attacks.forEach((Attack) => {
            Attack.position.x = this.position.x + Attack.offset.x;
            Attack.position.y = this.position.y + Attack.offset.y;
        });

        if (DEBUG_MODE) this.showCollBox();

        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        // Checks wether the sprite touches the bottom of the screen
        if (this.position.y + this.height + this.velocity.y >= CANVAS_HEIGHT - 110) {
            this.velocity.y = 0;
            this.position.y = CANVAS_HEIGHT - this.height - 110;
        } else {
            // Applies gravity to velocity as long if the Sprite is in the air
            // The velocity increases every frame
            this.velocity.y += this.gravity;
        }
    }

    // Actions
    jump() {
        if (this.isInAir()) return;
        this.velocity.y = this.jumpForce;
    }
}