import { enemyArray, player, emenyStopTime, map, homeProtectedTime } from "./main.js";
import { IMAGE, POS, AUDIO, MAP } from "./const.js";
import { CheckIntersect } from "./Collision.js";

export default class {
  constructor(context) {
    this.ctx = context;
  }
  x = 0;
  y = 0;
  hit = !1;
  width = 30;
  height = 28;
  size = 28;
  init() {
    this.ctx.clearRect(this.x, this.y, this.width, this.height);
    this.duration = 600;
    this.type = parseInt(Math.random() * 6);
    this.x = parseInt(Math.random() * 384) + map.offsetX;
    this.y = parseInt(Math.random() * 384) + map.offsetY;
    this.isDestroyed = !1;
  }
  draw() {
    if (this.duration > 0 && !this.isDestroyed) {
      this.ctx.drawImage(
        IMAGE.RESOURCE,
        POS.prop[0] + this.type * this.width,
        POS.prop[1], this.width, this.height,
        this.x,
        this.y,
        this.width,
        this.height
      );
      this.duration--;
      this.isHit();
    }
    else {
      this.ctx.clearRect(this.x, this.y, this.width, this.height);
      this.isDestroyed = !0;
    }
  }
  isHit() {
    let Player = null;
    if (player[0].lives > 0 && CheckIntersect(this, player[0], 0)) {
      this.hit = !0;
      Player = player[0];
    }
    else if (player[1].lives > 0 && CheckIntersect(this, player[1], 0)) {
      this.hit = !0;
      Player = player[1];
    }
    if (this.hit) {
      AUDIO.PROP.play();
      this.isDestroyed = !0;
      this.ctx.clearRect(this.x, this.y, this.width, this.height);
      switch (this.type) {
        case 0:
          player.lives++;
          break;
        case 1:
          emenyStopTime = 500;
          break;
        case 2:
          map.updateMap([[23, 11], [23, 12], [23, 13], [23, 14], [24, 11], [24, 14], [25, 11], [25, 14]], MAP.GRID);
          homeProtectedTime = 500;
          break;
        case 3:
          if (enemyArray != null || enemyArray.length > 0) 
            enemyArray.forEach(enemy => enemy.distroy());
          break;
        case 4:
          break;
        case 5:
          player.isProtected = !0;
          player.protectedTime = 500;
          break;
      }
    }
  }
}
