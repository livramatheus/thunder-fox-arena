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
    // MUSIC
    './sound/music_01.mp3', './sound/music_03.mp3',
    './sound/music_04.mp3', './sound/music_05.mp3',
    './sound/music_06.mp3', './sound/music_07.mp3',
    './sound/music_09.mp3', './sound/music_10.mp3',
    './sound/music_11.mp3',
    
    // SOUNDS
    './sound/sound_10.mp3', './sound/sound_43.mp3',

    // STAGES
    './img/stages/barriers.png', './img/stages/carrier.png',
    './img/stages/cold_fields.png', './img/stages/control_room.png',
    './img/stages/ginarzas_hq.png', './img/stages/hangar.png',
    './img/stages/mining_site.png',

    // IMAGES
    './img/fox_font.png',
    './img/introduction_bg.png',
    './img/stage_select.png',
    './img/thunder_font.png',

    // FIGHTERS
    // Thunder
    './img/fighters/thunder/thunder_attack_1.png',
    './img/fighters/thunder/thunder_attack_1_r.png',
    './img/fighters/thunder/thunder_attack_2.png',
    './img/fighters/thunder/thunder_attack_2_r.png',
    './img/fighters/thunder/thunder_attack_3.png',
    './img/fighters/thunder/thunder_attack_3_r.png',
    './img/fighters/thunder/thunder_attack_ducking.png',
    './img/fighters/thunder/thunder_attack_ducking_r.png',
    './img/fighters/thunder/thunder_defeat.png',
    './img/fighters/thunder/thunder_defeat_r.png',
    './img/fighters/thunder/thunder_ducking.png',
    './img/fighters/thunder/thunder_ducking_r.png',
    './img/fighters/thunder/thunder_falling.png',
    './img/fighters/thunder/thunder_falling_r.png',
    './img/fighters/thunder/thunder_hit.png',
    './img/fighters/thunder/thunder_hit_r.png',
    './img/fighters/thunder/thunder_idle.png',
    './img/fighters/thunder/thunder_idle_r.png',
    './img/fighters/thunder/thunder_jumping.png',
    './img/fighters/thunder/thunder_jumping_r.png',
    './img/fighters/thunder/thunder_walking.png',
    './img/fighters/thunder/thunder_walking_r.png',

    // Gonza
    './img/fighters/gonza/gonza_attack_1.png',
    './img/fighters/gonza/gonza_attack_1_r.png',
    './img/fighters/gonza/gonza_attack_2.png',
    './img/fighters/gonza/gonza_attack_2_r.png',
    './img/fighters/gonza/gonza_defeat.png',
    './img/fighters/gonza/gonza_defeat_r.png',
    './img/fighters/gonza/gonza_falling.png',
    './img/fighters/gonza/gonza_falling_r.png',
    './img/fighters/gonza/gonza_hit.png',
    './img/fighters/gonza/gonza_hit_r.png',
    './img/fighters/gonza/gonza_idle.png',
    './img/fighters/gonza/gonza_idle_r.png',
    './img/fighters/gonza/gonza_jumping.png',
    './img/fighters/gonza/gonza_jumping_r.png',
    './img/fighters/gonza/gonza_walking.png',
    './img/fighters/gonza/gonza_walking_r.png',
]

FileList.forEach(file => Queue.loadFile(file));