import Background from "./assets/Background.js";
import Enemy from "./assets/Characters/Gonza.js"
import Player from "./assets/Characters/Thunder.js"
import Fight from "./events/Fight.js";

const Bg = new Background({
    position: {x: 0, y: 0},
    imgSrc: './img/background.png',
    // music: './sound/music_03.wav'
});

const Fight1 = new Fight(Player, Enemy, Bg);
Fight1.animate();