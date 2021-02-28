import { POS } from "./const.js";
import { Enemy } from "./Enemy.js";
export class Enemy3 extends Enemy {
    /**
     * 敌方坦克3
     * @param {CanvasRenderingContext2D} context 画坦克的画布
     * @returns
     */
    constructor(context) {
        super(context);
        this.lives = 3;
        this.speed = 0.5;
    }
    draw() {
        this.allDraw(35, POS.enemy3[0] + (this.dir + (3 - this.lives) * 4) * this.size, POS.enemy3[1]);
    }
}
