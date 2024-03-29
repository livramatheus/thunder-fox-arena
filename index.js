import Fight from "./events/Fight.js";
import FirstScreen from "./events/FirstScreen.js";
import Introduction from "./events/Introduction.js";
import StageSelect from "./events/StageSelect.js";
import CharacterSelect from "./events/CharacterSelect.js";
import PressStart from "./events/PressStart.js";
import MainMenu from "./events/MainMenu.js";
import HowToPlay from "./events/HowToPlay.js";

// Characters
import Thunder from './assets/Characters/Thunder.js';
import Fox from './assets/Characters/Fox.js';
import Gonza from './assets/Characters/Gonza.js';
import GyroMan from './assets/Characters/GyroMan.js';
import Grazan from './assets/Characters/Grazan.js';
import Eider from './assets/Characters/Eider.js';
import Ginarza from './assets/Characters/Ginarza.js';

// Stages
import Barriers from './assets/Stages/Barriers.js';
import Carrier from './assets/Stages/Carrier.js';
import ColdFields from './assets/Stages/ColdFields.js';
import ControlRoom from './assets/Stages/ControlRoom.js';
import GinarzasHq from './assets/Stages/GinarzasHq.js';
import Hangar from './assets/Stages/Hangar.js';
import MiningSite from './assets/Stages/MiningSite.js';

const characters = {
    Thunder,
    Fox,
    Gonza,
    GyroMan,
    Grazan,
    Eider,
    Ginarza
};

const stages = {
    Barriers,
    Carrier,
    ColdFields,
    ControlRoom,
    GinarzasHq,
    Hangar,
    MiningSite
}

function animate() {
    globalData.animFramId = window.requestAnimationFrame(animate);

    if (globalData.next) {
        switch (globalData.next) {
            case 'pressstart':
                globalData.currentScene = new PressStart();
                break;
            case 'mainmenu':
                globalData.currentScene = new MainMenu();
                break;
            case 'howtoplay':
                globalData.currentScene = new HowToPlay();
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
                globalData.currentScene = new Fight(
                    characters[globalData.P1.class],
                    characters[globalData.P2.class],
                    stages[globalData.ST]
                );
                globalData.currentScene.reset();
                break;
            default:
                break;
        }

        globalData.next = null;
    }

    // Delay handler - delay only works if a limit number is set
    if (typeof globalData.delay === 'number') globalData.delay ++;
    globalData.currentScene.animate();

}

await animate();