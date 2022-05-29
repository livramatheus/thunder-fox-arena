export default class Background {
    
    constructor({ position, imgSrc, c, music }) {
        this.position  = position;
        this.height    = 150;
        this.width     = 50;
        this.c         = c;
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
        this.c.drawImage(this.image, this.position.x, this.position.y);
        

    }

    update() {
        this.draw();
    }
}