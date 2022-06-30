const DEBUG_MODE = false;

const CANVAS_WIDTH  = 1024;
const CANVAS_HEIGHT = 576;

const globalData = {
    animFramId: null,
    currentScene: null,
    next: 'firstscreen',
    ST: null,
    P1: null,
    P2: null,
    gameLoading: true
}

const canvas = document.querySelector('canvas');
const c      = canvas.getContext('2d');

canvas.width  = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

c.fillRect(0, 0, canvas.width, canvas.height);