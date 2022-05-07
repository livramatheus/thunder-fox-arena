export default class Sprite {
    
    /**
     * Sprite constructor
     * 
     * @param {object} param0 Sprite data (Position and Velocity)
     * @param {object} c Canvas context 
     */
    constructor({ position, velocity }, c) {
        this.position = position;
        this.velocity = velocity;
        this.c        = c;
    }

    draw() {
        this.c.fillStyle = 'red';
        this.c.fillRect(this.position.x, this.position.y, 50, 150);
    }

    update() {
        this.draw();
        this.position.y += 10;
    }
}