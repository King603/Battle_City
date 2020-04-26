// const.js
/**
 * 静态变量
 */
/**************屏幕属性*****************/
export const SCREEN = {
  WIDTH: 512,
  HEIGHT: 448,
};
/**************图片资源*****************/
export const IMAGE = {
  MENU: getImg("images/menu.gif"),
  RESOURCE: getImg("images/tankAll.gif")
};
function getImg(href) {
  let img = new Image();
  img.src = href;
  return img;
}
/**************各个图块在图片中的位置*****************/
export const POS = [];
POS.selectTank = [128, 96];
POS.stageLevel = [396, 96];
POS.num = [256, 96];
POS.map = [0, 96];
POS.home = [256, 0];
POS.score = [0, 112];
POS.player = [0, 0];
POS.protected = [160, 96];
POS.enemyBefore = [256, 32];
POS.enemy1 = [0, 32];
POS.enemy2 = [128, 32];
POS.enemy3 = [0, 64];
POS.bullet = [80, 96];
POS.tankBomb = [0, 160];
POS.bulletBomb = [320, 0];
POS.over = [384, 64];
POS.prop = [256, 110];
/**************声音资源*****************/
export const AUDIO = {
  START: new Audio("audio/start.mp3"),
  DESTROY: {
    BULLET: new Audio("audio/bulletCrack.mp3"),
    TANK: new Audio("audio/tankCrack.mp3"),
    PLAYER: new Audio("audio/playerCrack.mp3")
  },
  MOVE: new Audio("audio/move.mp3"),
  ATTACK: new Audio("audio/attack.mp3"),
  PROP: new Audio("audio/prop.mp3")
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
export const WALL = 1;
export const GRID = 2;
export const GRASS = 3;
export const WATER = 4;
export const ICE = 5;
export const HOME = 9;
export const ANOTHREHOME = 8;
/**************坦克及子弹的四个方向*****************/
export const UP = 0;
export const DOWN = 1;
export const LEFT = 2;
export const RIGHT = 3;
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
