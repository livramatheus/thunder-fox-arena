import Enemy from "./assets/Characters/Gonza.js"
import Player from "./assets/Characters/Thunder.js"
import Fight from "./events/Fight.js";
import FirstScreen from "./events/FirstScreen.js";
import Introduction from "./events/Introduction.js";
import StageSelect from "./events/StageSelect.js";

async function animate() {
    globalData.animFramId = window.requestAnimationFrame(animate);

    if (globalData.next) {
        if (globalData.next === 'firstscreen') {
            globalData.currentScene = new FirstScreen();
        } else if (globalData.next === 'introduction') {
            globalData.currentScene = new Introduction();
        } else if (globalData.ST == null || globalData.next == 'stageselect') {
            globalData.currentScene = new StageSelect();
        } else if (globalData.next === 'fight') {
            const Stage = await import(`./assets/Stages/${globalData.ST}.js`);
            globalData.currentScene = new Fight(Player, Enemy, Stage.default);
        }
        globalData.next = null;
    }
    
    globalData.currentScene.animate();

}

await animate();