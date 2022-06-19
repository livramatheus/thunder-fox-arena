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

        /*
         * Callback - Is a callback function that should be used to manipulate
         * the attacker's sprite during the attack.
         */
        this.callback = null;
        
        /**
         * Condition - Is a callback function that should return boolean. It tells
         * the conditions whether the attack should trigger
         */
        this.condition;
    }
}