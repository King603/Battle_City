import Enemy from "./Enemy.js";
import { POS } from "./const.js";

/**
 * 敌方坦克1
 * @param context 画坦克的画布
 * @returns
 */
export default class extends Enemy {
  constructor(context) {
    super(context);
  }
  lives = 1;
  speed = 1.5;
  draw() {
    this.allDraw(34, POS.enemy1[0] + this.dir * this.size, POS.enemy1[1]);
  }
}
