import Enemy from "./Enemy.js";
import { POS } from "./const.js";

export default class extends Enemy {
  /**
   * 敌方坦克2
   * @param {Object} context 画坦克的画布
   * @returns
   */
  constructor(context) {
    super(context);
  }
  lives = 2;
  speed = 1;
  draw() {
    this.allDraw(35, POS.enemy2[0] + this.dir * this.size, POS.enemy2[1]);
  }
}
