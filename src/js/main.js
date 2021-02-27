import "../../node_modules/jquery/dist/jquery.js";
import "../../public/js/Helper.js";

import Menu from "./Menu.js";
import Stage from "./Stage.js";
import Map from "./Map.js";
import PlayTank from "./PlayTank.js";
import Enemy1 from "./Enemy1.js";
import Enemy2 from "./Enemy2.js";
import Enemy3 from "./Enemy3.js";
import Prop from "./Prop.js";
import { GAME_STATE, SCREEN, ENEMY_LOCATION, MAP, DIR, BULLET_TYPE } from "./const.js";
import keyboard from "./Keyboard.js";

export let ctx = {};
export let menu = null;// 菜单
export let stage = null;// 舞台
export let map = null;// 地图
export let player = [null, null];
export let prop = null;
export let enemyArray = [];// 敌方坦克
export let bulletArray = [];// 子弹数组
let keys = [];// 记录按下的按键
export let crackArray = [];// 爆炸数组

let gameState = GAME_STATE.MENU;// 默认菜单状态
let level = 1;
export let maxEnemy = 20;// 敌方坦克总数
let maxAppearEnemy = 5;// 屏幕上一起出现的最大数
let appearEnemy = 0; // 已出现的敌方坦克
let mainframe = 0;
export let isGameOver = !1;
let overX = 176;
let overY = 384;
export let emenyStopTime = 0;
export let homeProtectedTime = -1;
let propTime = 300;

function initScreen() {
  let ctxs = [
    { type: "stage", id: "#stageCanvas" },// 2d画布
    { type: "wall", id: "#wallCanvas" },// 地图画布
    { type: "grass", id: "#grassCanvas" },// 草地画布
    { type: "tank", id: "#tankCanvas" },// 坦克画布
    { type: "over", id: "#overCanvas" }// 结束画布
  ];
  for (let i = 0; i < ctxs.length; i++)
    ctx[ctxs[i].type] = (id => {
      let canvas = $(id);
      let ctx = canvas[0].getContext("2d");
      canvas.attr({ "width": SCREEN.WIDTH });
      canvas.attr({ "height": SCREEN.HEIGHT });
      return ctx;
    })(ctxs[i].id);
  let canvasDiv = $("#canvasDiv");
  canvasDiv.css({ "width": SCREEN.WIDTH });
  canvasDiv.css({ "height": SCREEN.HEIGHT });
  canvasDiv.css({ "background-color": "#000000" });
}

function initObject() {
  menu = new Menu(ctx.stage);
  stage = new Stage(ctx.stage, level);
  map = new Map(ctx.wall, ctx.grass);
  player[0] = new PlayTank(ctx.tank);
  player[0].x = 129 + map.offsetX;
  player[0].y = 385 + map.offsetY;
  player[1] = new PlayTank(ctx.tank);
  player[1].offsetX = 128; // player2的图片x与图片1相距128
  player[1].x = 256 + map.offsetX;
  player[1].y = 385 + map.offsetY;
  appearEnemy = 0; // 已出现的敌方坦克
  enemyArray = [];// 敌方坦克
  bulletArray = [];// 子弹数组
  keys = [];// 记录按下的按键
  crackArray = [];// 爆炸数组
  isGameOver = !1;
  overX = 176;
  overY = 384;
  ctx.over.clearRect(0, 0, SCREEN.WIDTH, SCREEN.HEIGHT);
  emenyStopTime = 0;
  homeProtectedTime = -1;
  propTime = 1000;
}

function gameLoop() {
  switch (gameState) {
    case GAME_STATE.MENU: menu.draw(); break;
    case GAME_STATE.INIT:
      stage.draw();
      stage.isReady && (gameState = GAME_STATE.START);
      break;
    case GAME_STATE.START:
      drawAll();
      if (isGameOver || (player[0].lives <= 0 && player[1].lives <= 0)) {
        gameState = GAME_STATE.OVER;
        map.homeHit();
        AUDIO.DESTROY.PLAYER.play();
      }
      appearEnemy == maxEnemy && enemyArray.length == 0 && (gameState = GAME_STATE.WIN);
      break;
    case GAME_STATE.WIN: nextLevel(); break;
    case GAME_STATE.OVER: gameOver(); break;
  }
}

let body = $(document);
body.ready(() => {
  initScreen();
  initObject();
  setInterval(gameLoop, 20);
});
body.keydown(({ keyCode }) => {
  switch (gameState) {
    case GAME_STATE.MENU:
      if (keyCode == keyboard.ENTER) {
        gameState = GAME_STATE.INIT;
        // 只有一个玩家
        menu.playNum == 1 && (player[1].lives = 0);
      } else
        menu.next(keyCode == keyboard.DOWN ? 1 : keyCode == keyboard.UP ? -1 : 0);
      break;
    case GAME_STATE.START:
      keys.contain(keyCode) || keys.push(keyCode);
      // 射击
      switch (keyCode) {
        case keyboard.SPACE: player[0].lives > 0 && player[0].shoot(BULLET_TYPE.PLAYER); break;
        case keyboard.ENTER: player[1].lives > 0 && player[1].shoot(BULLET_TYPE.ENEMY); break;
        case keyboard.N: nextLevel(); break;
        case keyboard.P: preLevel(); break;
      }
      break;
  }
});
body.keyup(({ keyCode }) => keys.remove(keyCode));

export function initMap() {
  map.setMapLevel(level);;
  map.draw();
  drawLives();
}

function drawLives() {
  map.drawLives(player[0].lives, 1);
  map.drawLives(player[1].lives, 2);
}

function drawBullet() {
  if (bulletArray != null && bulletArray.length > 0) {
    for (let i = 0; i < bulletArray.length; i++) {
      let bulletObj = bulletArray[i];
      if (bulletObj.isDestroyed) {
        bulletObj.owner.isShooting = !1;
        bulletArray.removeByIndex(i--);
      } else bulletObj.draw();
    }
  }
}

function keyEvent() {
  let { W: w, S: s, A: a, D: d, UP: up, DOWN: down, LEFT: left, RIGHT: right } = keyboard;
  setEvent(player[0], w, s, a, d);
  setEvent(player[1], up, down, left, right);
  function setEvent(player, up, down, left, right) {
    let { UP, DOWN, LEFT, RIGHT } = DIR;
    switch (!0) {
      case keys.contain(up): setMove(UP); break;
      case keys.contain(down): setMove(DOWN); break;
      case keys.contain(left): setMove(LEFT); break;
      case keys.contain(right): setMove(RIGHT); break;
    }
    function setMove(dir) {
      player.dir = dir;
      player.hit = !1;
      player.move();
    }
  }
}

function addEnemyTank() {
  if (enemyArray == null || enemyArray.length >= maxAppearEnemy || maxEnemy == 0)
    return;
  appearEnemy++;
  let obj = null;
  switch (parseInt(Math.random() * 3)) {
    case 0: obj = new Enemy1(ctx.tank); break;
    case 1: obj = new Enemy2(ctx.tank); break;
    case 2: obj = new Enemy3(ctx.tank); break;
  }
  obj.x = ENEMY_LOCATION[parseInt(Math.random() * 3)] + map.offsetX;
  obj.y = map.offsetY;
  obj.dir = DIR.DOWN;
  enemyArray[enemyArray.length] = obj;
  // 更新地图右侧坦克数
  map.clearEnemyNum(maxEnemy, appearEnemy);
}

function drawEnemyTanks() {
  if (enemyArray != null || enemyArray.length > 0) {
    for (let i = 0; i < enemyArray.length; i++) {
      let enemyObj = enemyArray[i];
      enemyObj.isDestroyed ? enemyArray.removeByIndex(i--) : enemyObj.draw();
    }
  }
  emenyStopTime > 0 && emenyStopTime--;
}

function drawAll() {
  ctx.tank.clearRect(0, 0, SCREEN.WIDTH, SCREEN.HEIGHT);
  player[0].lives > 0 && player[0].draw();
  player[1].lives > 0 && player[1].draw();
  drawLives();
  if (appearEnemy < maxEnemy) {
    if (mainframe % 100 == 0) {
      addEnemyTank();
      mainframe = 0;
    }
    mainframe++;
  }
  drawEnemyTanks();
  drawBullet();
  drawCrack();
  keyEvent();
  propTime <= 0 ? drawProp() : propTime--;
  if (homeProtectedTime > 0)
    homeProtectedTime--;
  else if (homeProtectedTime == 0) {
    homeProtectedTime = -1;
    homeNoProtected();
  }
}

function drawCrack() {
  if (crackArray != null && crackArray.length > 0) {
    for (let i = 0; i < crackArray.length; i++) {
      let crackObj = crackArray[i];
      if (crackObj.isOver) {
        crackArray.removeByIndex(i--);
        switch (crackObj.owner) {
          case player[0]: player[0].renascenc(1); break;
          case player[1]: player[1].renascenc(2); break;
        }
      } else crackObj.draw();
    }
  }
}

function gameOver() {
  ctx.over.clearRect(0, 0, SCREEN.WIDTH, SCREEN.HEIGHT);
  ctx.over.drawImage(IMAGE.RESOURCE, POS.over[0], POS.over[1], 64, 32, overX + map.offsetX, overY + map.offsetY, 64, 32);
  overY -= 2;
  if (overY <= parseInt(map.mapHeight / 2)) {
    initObject();
    //只有一个玩家
    menu.playNum == 1 && (player[1].lives = 0);
    gameState = GAME_STATE.MENU;
  }
}

function nextLevel() {
  level = ++level % 21;
  initObject();
  //只有一个玩家
  menu.playNum == 1 && (player[1].lives = 0);
  stage.init(level);
  gameState = GAME_STATE.INIT;
}

function preLevel() {
  --level == 0 && (level = 21);
  initObject();
  //只有一个玩家
  menu.playNum == 1 && (player[1].lives = 0);
  stage.init(level);
  gameState = GAME_STATE.INIT;
}

function drawProp() {
  if (Math.random() < 0.4 && prop == null) {
    prop = new Prop(ctx.over);
    prop.init();
  }
  if (prop != null) {
    prop.draw();
    if (prop.isDestroyed) {
      prop = null;
      propTime = 1000;
    }
  }
}

function homeNoProtected() {
  map.updateMap([[23, 11], [23, 12], [23, 13], [23, 14], [24, 11], [24, 14], [25, 11], [25, 14]], MAP.WALL);
};
