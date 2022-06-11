import Enemy from "./assets/Characters/Gonza.js"
import Player from "./assets/Characters/Thunder.js"
import Fight from "./events/Fight.js";
import StageSelect from "./events/StageSelect.js";

canvas.addEventListener('click', async () => {
    if (!canvas.interacted) {
        canvas.interacted = true;
        await animate();
    }
});

async function animate() {
    globalData.animFramId = window.requestAnimationFrame(animate);

    if (globalData.next) {
        if (globalData.ST == null || globalData.next == 'stageselect') {
            globalData.currentScene = new StageSelect();
        } else if (globalData.next === 'fight') {
            const Stage = await import(`./assets/Stages/${globalData.ST}.js`);
            globalData.currentScene = new Fight(Player, Enemy, Stage.default);
        }
        globalData.next = null;
    }
    
    globalData.currentScene.animate();

}