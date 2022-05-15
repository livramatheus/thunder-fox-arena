export default class Fighter {
    
    /**
     * Fighter constructor
     * 
     * @param {object} param0 Fighter data 
     * @param {object} c Canvas context 
     */
    gravity = 0.2;
    lastKey = null;

    constructor({ position, velocity, c, color, offset }) {
        this.position  = position;
        this.velocity  = velocity;
        this.height    = 150;
        this.width     = 50;
        this.c         = c;
        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y,
            },
            width: 100,
            height: 50,
            offset
        },
        this.color = color;
        this.isAttacking;
        this.health = 100;
    }

    draw() {
        this.c.fillStyle = this.color;
        this.c.fillRect(this.position.x, this.position.y, this.width, this.height);
        
        if(this.isAttacking) {
            this.c.fillStyle = 'green';
            this.c.fillRect(
                this.attackBox.position.x,
                this.attackBox.position.y,
                this.attackBox.width,
                this.attackBox.height
            );
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
        this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
        this.attackBox.position.y = this.position.y;

        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        // Checks wether the sprite touches the bottom of the screen
        if (this.position.y + this.height + this.velocity.y >= 576 - 80) {
            this.velocity.y = 0;
        } else {
            // Applies gravity to velocity as long if the Sprite is in the air
            // The velocity increases every frame
            this.velocity.y += this.gravity;
        }
    }
}