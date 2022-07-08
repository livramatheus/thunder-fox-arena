import Fight from "./events/Fight.js";
import FirstScreen from "./events/FirstScreen.js";
import Introduction from "./events/Introduction.js";
import StageSelect from "./events/StageSelect.js";
import CharacterSelect from "./events/CharacterSelect.js";
import PressStart from "./events/PressStart.js";

async function animate() {
    globalData.animFramId = window.requestAnimationFrame(animate);

    if (globalData.next) {
        switch (globalData.next) {
            case 'pressstart':
                globalData.currentScene = new PressStart();
                break;
            case 'firstscreen':
                globalData.currentScene = new FirstScreen();
                break;
            case 'introduction':
                globalData.currentScene = new Introduction();
                break;
            case 'stageselect':
                globalData.currentScene = new StageSelect();
                break;
            case 'characterselect':
                globalData.currentScene = new CharacterSelect();
                break;
            case 'fight':
                const Player = await import(`./assets/Characters/${globalData.P1.class}.js`);
                const Enemy  = await import(`./assets/Characters/${globalData.P2.class}.js`);
                const Stage  = await import(`./assets/Stages/${globalData.ST}.js`);

                globalData.currentScene = new Fight(Player.default, Enemy.default, Stage.default);
                break;
            default:
                break;
        }

        globalData.next = null;
    }
    
    globalData.currentScene.animate();

}

await animate();