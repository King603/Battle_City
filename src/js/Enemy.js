import { Tank } from "./Tank.js";
import { IMAGE, POS } from "./const.js";
export class Enemy extends Tank {
    /**
     * 敌方坦克父类
     * @param {CanvasRenderingContext2D} ctx
     */
    constructor(ctx) {
        super();
        this.ctx = ctx;
        this.isAppear = !1;
        this.times = 0;
        this.isAI = !0;
    }
    /**
     * 画图
     * @param {Number} times 时间
     * @param {Number} sx 敌军数据
     * @param {Number} sy 敌军数据
     */
    allDraw(times, sx, sy) {
        this.times++;
        if (!this.isAppear) {
            let sx = POS.enemyBefore[0] + parseInt(this.times / 5) % 7 * this.size;
            let sy = POS.enemyBefore[1];
            this.ctx.drawImage(IMAGE.RESOURCE, sx, sy, this.size, this.size, this.x, this.y, this.size, this.size);
            if (this.times == times) {
                this.isAppear = !0;
                this.times = 0;
                this.shoot(2);
            }
        }
        else {
            this.ctx.drawImage(IMAGE.RESOURCE, sx, sy, this.size, this.size, this.x, this.y, this.size, this.size);
            // 以一定的概率射击
            if (this.times % 50 == 0) {
                Math.random() < this.shootRate && this.shoot(2);
                this.times = 0;
            }
            this.move();
        }
    }
}
