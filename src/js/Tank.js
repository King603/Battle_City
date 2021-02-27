import Bullet from "./Bullet.js";
import CrackAnimation from "./CrackAnimation.js";
import { DIR, AUDIO, CRACK_TYPE } from "./const.js";
import { crackArray, bulletArray, emenyStopTime, map } from "./main.js";
import { tankMapCollision } from "./Collision.js";
import Obj from "./Obj.js";

let { UP, DOWN, LEFT, RIGHT } = DIR;
// 坦克基类
export default class extends Obj {
  constructor() {
    super(32/* 坦克的大小 */, 1/* 坦克的速度 */);
  }
  hit = !1; // 是否碰到墙或者坦克
  isDestroyed = !1;
  dir = UP; // 方向0：上 1：下 2：左3：右
  frame = 0; // 控制敌方坦克切换方向的时间
  isAI = !1; // 是否自动
  isShooting = !1; // 子弹是否在运行中
  bullet = null; // 子弹
  shootRate = .6; // 射击的概率
  tempX = 0;
  tempY = 0;
  move() {
    // 如果是AI坦克，在一定时间或者碰撞之后切换方法
    if (this.isAI && emenyStopTime > 0)
      return;
    this.tempX = this.x;
    this.tempY = this.y;
    if (this.isAI) {
      this.frame++;
      if (this.frame % 100 == 0 || this.hit) {
        this.dir = parseInt(Math.random() * 4); // 随机一个方向
        this.hit = !1;
        this.frame = 0;
      }
    }
    switch (this.dir) {
      case UP: this.tempY -= this.speed; break;
      case DOWN: this.tempY += this.speed; break;
      case RIGHT: this.tempX += this.speed; break;
      case LEFT: this.tempX -= this.speed; break;
    }
    this.isHit();
    if (!this.hit) {
      this.x = this.tempX;
      this.y = this.tempY;
    }
  }
  // 碰撞检测
  isHit() {
    // 临界检测
    switch (this.dir) {
      case LEFT: if (this.x <= map.offsetX) {
        this.x = map.offsetX;
        this.hit = !0;
      } break;
      case RIGHT: if (this.x >= map.offsetX + map.mapWidth - this.size) {
        this.x = map.offsetX + map.mapWidth - this.size;
        this.hit = !0;
      } break;
      case UP: if (this.y <= map.offsetY) {
        this.y = map.offsetY;
        this.hit = !0;
      } break;
      case DOWN: if (this.y >= map.offsetY + map.mapHeight - this.size) {
        this.y = map.offsetY + map.mapHeight - this.size;
        this.hit = !0;
      } break;
    }
    if (!this.hit) {
      // 地图检测
      if (tankMapCollision(this, map)) {
        this.hit = !0;
      }
    }
    // 坦克检测
    /* if (enemyArray != null && enemyArray.length > 0) {
      let enemySize = enemyArray.length;
      for (let i = 0; i < enemySize; i++) {
        if (enemyArray[i] != this && CheckIntersect(enemyArray[i], this, 0)) {
          this.hit = !0;
          break;
        }
      }
    } */
  }
  // 是否被击中
  isShot() { }
  /**
   * 射击
   * @param {Number} type 
   */
  shoot(type) {
    if (this.isAI && emenyStopTime > 0 || this.isShooting)
      return;
    let tempX = this.x;
    let tempY = this.y;
    this.bullet = new Bullet(this.ctx, this, type, this.dir);
    let { size } = this.bullet;
    let difference = parseInt(this.size / 2) - parseInt(size / 2);
    switch (this.dir) {
      case UP: tempX += difference; tempY -= size; break;
      case DOWN: tempX += difference; tempY += this.size; break;
      case LEFT: tempX -= size; tempY += difference; break;
      case RIGHT: tempX += this.size; tempY += difference; break;
    }
    this.bullet.x = tempX;
    this.bullet.y = tempY;
    this.isAI || AUDIO.ATTACK.play();
    this.bullet.draw();
    // 将子弹加入的子弹数组中
    bulletArray.push(this.bullet);
    this.isShooting = !0;
  }
  // 坦克被击毁
  distroy() {
    this.isDestroyed = !0;
    crackArray.push(new CrackAnimation(CRACK_TYPE.TANK, this.ctx, this));
    AUDIO.DESTROY.TANK.play();
  }
}
