import { POS } from "./const.js";
import { Enemy } from "./Enemy.js";
export class Enemy1 extends Enemy {
    /**
     * 敌方坦克1
     * @param {CanvasRenderingContext2D} context 画坦克的画布
     * @returns
     */
    constructor(context) {
        super(context);
        this.lives = 1;
        this.speed = 1.5;
    }
    draw() {
        this.allDraw(34, POS.enemy1[0] + this.dir * this.size, POS.enemy1[1]);
    }
}
