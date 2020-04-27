import CrackAnimation from "./CrackAnimation.js";
import { IMAGE, POS, DIR, CRACK_TYPE, BULLET_TYPE, AUDIO } from "./const.js";
import { bulletArray, enemyArray, player, map, crackArray } from "./main.js";
import { CheckIntersect, bulletMapCollision } from "./Collision.js";

export default class {
  constructor(context, owner, type, dir) {
    this.ctx = context;
    this.owner = owner; // 子弹的所属者
    this.type = type; // 1、玩家  2、敌方
    this.dir = dir;
  }
  x = 0;
  y = 0;
  hit = !1;
  isDestroyed = !1;
  speed = 3;
  size = 6;
  draw() {
    this.ctx.drawImage(
      IMAGE.RESOURCE,
      POS.bullet[0] + this.dir * this.size,
      POS.bullet[1],
      this.size,
      this.size,
      this.x,
      this.y,
      this.size,
      this.size
    );
    this.move();
  }
  move() {
    let { UP, DOWN, LEFT, RIGHT } = DIR;
    switch (this.dir) {
      case UP: this.y -= this.speed; break;
      case DOWN: this.y += this.speed; break;
      case LEFT: this.x -= this.speed; break;
      case RIGHT: this.x += this.speed; break;
    }
    this.isHit();
  }
  // 碰撞检测
  isHit() {
    if (this.isDestroyed) return;
    // 临界检测
    if (this.x < map.offsetX) {
      this.x = map.offsetX;
      this.hit = !0;
    }
    else if (this.x > map.offsetX + map.mapWidth - this.size) {
      this.x = map.offsetX + map.mapWidth - this.size;
      this.hit = !0;
    }
    if (this.y < map.offsetY) {
      this.y = map.offsetY;
      this.hit = !0;
    }
    else if (this.y > map.offsetY + map.mapHeight - this.size) {
      this.y = map.offsetY + map.mapHeight - this.size;
      this.hit = !0;
    }
    // 子弹是否碰撞了其他子弹
    if (!this.hit)
      if (bulletArray != null && bulletArray.length > 0)
        for (let bulletObj of bulletArray)
          if (bulletObj != this && this.owner.isAI != bulletObj.owner.isAI && bulletObj.hit == !1 && CheckIntersect(bulletObj, this, 0)) {
            this.hit = !0;
            bulletObj.hit = !0;
            break;
          }
    if (!this.hit) {
      // 地图检测
      if (bulletMapCollision(this, map)) this.hit = !0;
      let { PLAYER, ENEMY } = BULLET_TYPE;
      // 是否击中坦克
      switch (this.type) {
        case PLAYER:
          if (enemyArray != null || enemyArray.length > 0) {
            for (let enemyObj of enemyArray) {
              if (!enemyObj.isDestroyed && CheckIntersect(this, enemyObj, 0)) {
                CheckIntersect(this, enemyObj, 0);
                enemyObj.lives > 1 ? enemyObj.lives-- : enemyObj.distroy();
                this.hit = !0;
                break;
              }
            }
          }
          break;
        case ENEMY:
          if (player[0].lives > 0 && CheckIntersect(this, player[0], 0)) {
            player[0].isProtected || player[0].isDestroyed || player[0].distroy();
            this.hit = !0;
          }
          else if (player[1].lives > 0 && CheckIntersect(this, player[1], 0)) {
            player[1].isProtected || player[1].isDestroyed || player[1].distroy();
            this.hit = !0;
          }
          break;
      }
    }
    this.hit && this.distroy();
  }
  // 销毁
  distroy() {
    this.isDestroyed = !0;
    crackArray.push(new CrackAnimation(CRACK_TYPE.BULLET, this.ctx, this));
    this.owner.isAI || AUDIO.DESTROY.BULLET.play();
  }
}
