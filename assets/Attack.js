export default class Attack {

    constructor(sprite, key, damage, frameDmg) {
        this.sprite   = sprite;
        this.key      = key;
        this.damage   = damage;
        this.frameDmg = frameDmg;
        this.position = {
            x: 0,
            y: 0
        };
        this.attackBox = {
            offset: {x: 80, y: 50},
            width: 130,
            height: 80
        },
        this.knockBack = {
            x: 30,
            y: 0
        };
    }
}