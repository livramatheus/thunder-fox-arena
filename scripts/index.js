// PopBox
const popbox        = document.querySelector("#popbox");
const popboxContent = document.querySelector("#popbox-content");
const infoAbout     = document.querySelector("#info-about");

// Loading Bar
const Queue         = new createjs.LoadQueue();
const barPercentage = document.querySelector("#bar_percentage");

const openInfo = (id) => {
    popbox.style.display    = 'flex';
    popboxContent.innerHTML = getPagesData()[id]
}

popbox.addEventListener('click', (event) => {
    if (event.target.id !== "popbox") return;
    popbox.style.display = 'none';
})

Queue.addEventListener("progress", (event) => {
    let progress_percentage = Math.floor(event.progress * 100);
    barPercentage.style.width = (Math.round(progress_percentage / 10) * 10) + "%";
});

Queue.addEventListener("complete", (event) => {
    document.querySelector("#progress").style.display = 'none';
    globalData.gameLoading = false;
});

const FileList = [
    // Base Sounds 
    './sound/music_01.mp3',
    './sound/sound_21h.mp3',
    './sound/sound_22h.mp3',

    // UI
    './img/fox_font.png',
    './img/introduction_bg.png',
    './img/thunder_font.png',
    './img/character_select.png',
    './img/stage_select.png',
    './img/p1_selector.png',
    './img/p2_selector.png',

    // KEYS
    './img/keys/p1_actions.png',  './img/keys/p1_confirm.png',
    './img/keys/p1_movement.png', './img/keys/p2_actions.png',
    './img/keys/p2_confirm.png',  './img/keys/p2_movement.png',

    // Portraits
    './img/fighters/eider/eider_thumb.png',
    './img/fighters/eider/eider_thumb_r.png',
    './img/fighters/fox/fox_thumb.png',
    './img/fighters/fox/fox_thumb_r.png',
    './img/fighters/ginarza/ginarza_thumb.png',
    './img/fighters/ginarza/ginarza_thumb_r.png',
    './img/fighters/gonza/gonza_thumb.png',
    './img/fighters/gonza/gonza_thumb_r.png',
    './img/fighters/grazan/grazan_thumb.png',
    './img/fighters/grazan/grazan_thumb_r.png',
    './img/fighters/gyro_man/gyro_man_thumb.png',
    './img/fighters/gyro_man/gyro_man_thumb_r.png',
    './img/fighters/thunder/thunder_thumb_r.png',
    './img/fighters/thunder/thunder_thumb_r.png',

    // Flags
    './img/flags/belgium.png', './img/flags/colombia.png',
    './img/flags/germany.png', './img/flags/hungary.png',
    './img/flags/japan.png',   './img/flags/peru.png',
    './img/flags/unknown.png',
]

FileList.forEach(file => Queue.loadFile(file));