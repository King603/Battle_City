import Tank from "./Tank.js";
import { IMAGE, POS } from "./const.js";

/**
 * 敌方坦克父类
 * @param context
 */
export default class extends Tank {
  constructor(context) {
    super();
    this.ctx = context;
  }
  isAppear = !1;
  times = 0;
  isAI = !0;
  allDraw(times, enemy_1, enemy_2) {
    this.times++;
    let data = [this.size, this.size, this.x, this.y, this.size, this.size];
    if (!this.isAppear) {
      this.ctx.drawImage(
        IMAGE.RESOURCE,
        POS.enemyBefore[0] + parseInt(this.times / 5) % 7 * this.size,
        POS.enemyBefore[1],
        ...data
      );
      if (this.times == times) {
        this.isAppear = !0;
        this.times = 0;
        this.shoot(2);
      }
    } else {
      this.ctx.drawImage(
        IMAGE.RESOURCE,
        enemy_1,
        enemy_2,
        ...data
      );
      // 以一定的概率射击
      if (this.times % 50 == 0) {
        Math.random() < this.shootRate && this.shoot(2);
        this.times = 0;
      }
      this.move();
    }
  }
}
