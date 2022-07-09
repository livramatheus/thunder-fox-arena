const KeyMap = {
    Player1: {
        right  : { id: 'right'  , name: 'Right'   , key: 'd', pressed: false },
        left   : { id: 'left'   , name: 'Left'    , key: 'a', pressed: false },
        up     : { id: 'up'     , name: 'Up'      , key: 'w', pressed: false },
        down   : { id: 'down'   , name: 'Down'    , key: 's', pressed: false },
        action1: { id: 'action1', name: 'Action 1', key: 'f', pressed: false },
        action2: { id: 'action2', name: 'Action 2', key: 'g', pressed: false },
        action3: { id: 'action3', name: 'Action 3', key: 'h', pressed: false },
        action4: { id: 'action4', name: 'Action 4', key: 'j', pressed: false },
        start  : { id: 'start'  , name: 'Start'   , key: ' ', pressed: false }
    },
    Player2: {
        right  : { id: 'right'  , name: 'Right'   , key: 'ArrowRight', pressed: false },
        left   : { id: 'left'   , name: 'Left'    , key: 'ArrowLeft' , pressed: false },
        up     : { id: 'up'     , name: 'Up'      , key: 'ArrowUp'   , pressed: false },
        down   : { id: 'down'   , name: 'Down'    , key: 'ArrowDown' , pressed: false },
        action1: { id: 'action1', name: 'Action 1', key: 'u'         , pressed: false },
        action2: { id: 'action2', name: 'Action 2', key: 'i'         , pressed: false },
        action3: { id: 'action3', name: 'Action 3', key: 'o'         , pressed: false },
        action4: { id: 'action4', name: 'Action 4', key: 'p'         , pressed: false },
        start  : { id: 'start'  , name: 'Start'   , key: 'Enter'     , pressed: false }
    },
    getP1Keys() {
        let keys = [];

        Object.values(this.Player1).forEach((e) => {
            keys.push(e.key);
        });

        return keys;
    },
    getP2Keys() {
        let keys = [];

        Object.values(this.Player2).forEach((e) => {
            keys.push(e.key);
        });

        return keys;
    },
    isP1Key(key) {
        return this.getP1Keys().includes(key);
    },
    isP2Key(key) {
        return this.getP2Keys().includes(key);
    },
    translate(key) {
        let data = null;

        if (this.isP1Key(key)) {
            data = Object.values(this.Player1).find((e) => e.key === key);
        } else if (this.isP2Key(key)) {
            data = Object.values(this.Player2).find((e) => e.key === key);
        }
        
        return data.id;
    }
};

export default KeyMap;