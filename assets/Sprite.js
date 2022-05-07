export default class Sprite {
    
    /**
     * Sprite constructor
     * 
     * @param {object} param0 Sprite data (Position and Velocity)
     * @param {object} c Canvas context 
     */
    gravity = 0.2;

    constructor({ position, velocity }, c) {
        this.position = position;
        this.velocity = velocity;
        this.height   = 150;
        this.c        = c;
    }

    draw() {
        this.c.fillStyle = 'red';
        this.c.fillRect(this.position.x, this.position.y, 50, this.height);
    }

    update() {
        this.draw();
        this.position.y += this.velocity.y;
        
        // Checks wether the sprite touches the bottom of the screen
        if (this.position.y + this.height + this.velocity.y >= 576) {
            this.velocity.y = 0;
        } else {
            // Applies gravity to velocity as long if the Sprite is in the air
            // The velocity increases every frame
            this.velocity.y += this.gravity;
        }
    }
}