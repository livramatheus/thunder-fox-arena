let stageList = [
    'Barriers',
    'Hangar',
    'Carrier',
    'MiningSite',
    'ColdFields',
    'ControlRoom',
    'GinarzasHq',
];

// Temporary stage randomizer
let stgName = stageList[parseInt(Math.random() * stageList.length)];

const Stage = await import(`./assets/Stages/${stgName}.js`);

import Enemy from "./assets/Characters/Gonza.js"
import Player from "./assets/Characters/Thunder.js"
import Fight from "./events/Fight.js";

const Fight1 = new Fight(Player, Enemy, Stage.default);
Fight1.animate();