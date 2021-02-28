import { POS } from "./const.js";
import { Enemy } from "./Enemy.js";

export class Enemy2 extends Enemy {
  /**
   * 敌方坦克2
   * @param {CanvasRenderingContext2D} context 画坦克的画布
   * @returns
   */
  constructor(context: CanvasRenderingContext2D) {
    super(context);
  }
  lives = 2;
  speed = 1;
  draw() {
    this.allDraw(35, (POS.enemy2[0] as number) + this.dir * this.size, POS.enemy2[1] as number);
  }
}
