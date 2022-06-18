export default class Attack {

    constructor(sprite, key, damage, frameDmg, offset, width, height) {
        this.sprite   = sprite;
        this.key      = key;
        this.damage   = damage;
        this.frameDmg = frameDmg;
        this.position = {
            x: 0,
            y: 0
        };
        this.offset = offset;
        this.width  = width;
        this.height = height;
        this.knockBack = { x: 0, y: 0 };
        this.color = 'blue';
    }
}