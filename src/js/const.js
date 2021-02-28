// 静态变量
/**************屏幕属性*****************/
export const SCREEN = {
    WIDTH: 512,
    HEIGHT: 448,
};
/**************图片资源*****************/
let image_src = "public/images/";
export const IMAGE = {
    MENU: getImg(`${image_src}menu.gif`),
    RESOURCE: getImg(`${image_src}tankAll.gif`)
};
/**
 * 获取图片
 * @param {String} href 路径
 */
function getImg(href) {
    let img = new Image();
    img.src = href;
    return img;
}
export const POS = {
    selectTank: [128, 96],
    stageLevel: [396, 96],
    num: [256, 96],
    map: [0, 96],
    home: [256, 0],
    score: [0, 112],
    player: [0, 0],
    protected: [160, 96],
    enemyBefore: [256, 32],
    enemy1: [0, 32],
    enemy2: [128, 32],
    enemy3: [0, 64],
    bullet: [80, 96],
    tankBomb: [0, 160],
    bulletBomb: [320, 0],
    over: [384, 64],
    prop: [256, 110],
};
/**************声音资源*****************/
let audio_src = "public/audio/";
export const AUDIO = {
    START: new Audio(audio_src + "start.mp3"),
    DESTROY: {
        BULLET: new Audio(audio_src + "bulletCrack.mp3"),
        TANK: new Audio(audio_src + "tankCrack.mp3"),
        PLAYER: new Audio(audio_src + "playerCrack.mp3")
    },
    MOVE: new Audio(audio_src + "move.mp3"),
    ATTACK: new Audio(audio_src + "attack.mp3"),
    PROP: new Audio(audio_src + "prop.mp3")
};
/**************游戏状态*****************/
export const GAME_STATE = {
    MENU: 0,
    INIT: 1,
    START: 2,
    OVER: 3,
    WIN: 4,
};
/**************地图块*****************/
export const MAP = {
    WALL: 1,
    GRID: 2,
    GRASS: 3,
    WATER: 4,
    ICE: 5,
    HOME: 9,
    ANOTHREHOME: 8,
};
/**************坦克及子弹的四个方向*****************/
export const DIR = {
    UP: 0,
    DOWN: 1,
    LEFT: 2,
    RIGHT: 3,
};
/**************坦克及子弹的四个方向*****************/
export const ENEMY_LOCATION = [192, 0, 384]; //相对与主游戏区
/**************子弹类型*****************/
export const BULLET_TYPE = {
    PLAYER: 1,
    ENEMY: 2
};
/**************爆炸类型****************/
export const CRACK_TYPE = {
    TANK: "tank",
    BULLET: "bullet"
};
