import Enemy from "./Enemy.js";
import { POS } from "./const.js";

export default class extends Enemy {
  /**
   * 敌方坦克3
   * @param {Object} context 画坦克的画布
   * @returns
   */
  constructor(context) {
    super(context);
  }
  lives = 3;
  speed = 0.5;
  draw() {
    this.allDraw(35, POS.enemy3[0] + (this.dir + (3 - this.lives) * 4) * this.size, POS.enemy3[1]);
  }
}
