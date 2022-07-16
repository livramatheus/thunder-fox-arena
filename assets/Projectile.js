import Sprite from './Sprite.js';

export default class Projectile extends Sprite {
    constructor({
        imgSrc,
        frames = 1,
        damage,
        key,
        speed,
        impactSound,
        impactImg,
        width,
        height,
        berrelOffset
    }) {
        super({ position: { x: 0, y: 0 }, imgSrc, frames });
        
        this.imgSrc       = imgSrc;
        this.damage       = damage;
        this.key          = key;
        this.active       = false;
        this.speed        = speed;
        this.impactSound  = impactSound;
        this.impactImg    = impactImg;
        this.width        = width;
        this.height       = height;
        this.knockBack    = { x: 0, y: 0 };
        this.berrelOffset = berrelOffset;
        
        if (this.impactSound) {
            this.impactSfx = new Audio(this.impactSound);
        }

        if (this.impactImg) {
            this.impactGfx = new Sprite({
                position: { x: 0, y: 0 },
                imgSrc: this.impactImg,
                frames: 4
            });
            this.impactGfx.opacity = 0;
        }

        /**
         * Condition - Is a callback function that should return boolean. It tells
         * the conditions whether the attack should trigger
         */
        this.condition;
    }

    update() {
        if (this.impactGfx) {
            this.impactGfx.update();
            
            if (this.impactGfx.frames - 1 === this.impactGfx.curFrame) {
                this.impactGfx.opacity = 0;
            }
        }

        if (!this.active) return;

        this.draw();

        if (this.direction === 'right') {
            this.position.x += this.speed;
        } else {
            this.position.x -= this.speed;
        }


        if (this.position.x > CANVAS_WIDTH || this.position.x < 0) this.destroy();
    }

    fire(Shooter) {
        // Check if the projectile could be fired
        if (this.condition) {
            if (!this.condition(Shooter, this)) return;
        }

        this.direction = Shooter.facing;
        this.image.src = this.direction === 'right' ? this.imgSrc : this.imgSrc.split('.png')[0] + '_r.png';
        
        this.position.x = Shooter.position.x + Shooter.boxOffset.x + Shooter.width + this.berrelOffset[this.direction].x;
        this.position.y = Shooter.position.y + this.berrelOffset[this.direction].y;
        
        this.active = true;
    }

    hit(Victim) {
        this.destroy();

        // Trigger audio effect on collision
        if (this.impactSfx) {
            this.impactSfx.currentTime = 0;
            this.impactSfx.play();
        }

        // Trigger a sprite effect on collision
        if (this.impactGfx) {
            this.impactGfx.position = { x: this.position.x - this.impactGfx.width, y: (this.position.y - this.impactGfx.height) }
            this.impactGfx.opacity  = 1;
            this.impactGfx.curFrame = 0;
        }

        // Manipulate the Victim object on collision
        Victim.knockBack(this.knockBack);
        Victim.hit(this.damage);
        document.querySelector(Victim.lifebarId).style.width = Victim.health + "%";  
    }

    getProjectileBoxCoordinates() {
        let xPos, width;
        
        if (this.direction === 'right') {
            xPos  = this.position.x;
            width = this.width;
        } else {
            xPos  = this.position.x - this.width;
            width = this.width;
        }

        return {
            x: xPos,
            y: this.position.y, // + this.boxOffset.y,
            w: width,
            h: this.height
        }
    }

    destroy() {
        this.active = false;
    }
}