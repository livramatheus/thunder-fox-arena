export default class Background {
    
    constructor({ position, imgSrc, music }) {
        this.position  = position;
        this.height    = 150;
        this.width     = 50;
        this.image     = new Image();
        this.image.src = imgSrc;
        this.music     = music

        if (this.music) {
            let snd = new Audio(this.music);
            snd.volume = 0.1;
            snd.play();  
        }
    }

    draw() {
        c.drawImage(this.image, this.position.x, this.position.y);
    }

    update() {
        this.draw();
    }
}