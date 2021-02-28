import { Tank } from "./Tank.js";
import { IMAGE, POS } from "./const.js";

export class Enemy extends Tank {
	/**
	 * 敌方坦克父类
	 * @param {CanvasRenderingContext2D} ctx
	 */
	constructor(public ctx: CanvasRenderingContext2D) {
		super();
	}
	isAppear = !1;
	times = 0;
	isAI = !0;
	/**
	 * 画图
	 * @param {Number} times 时间
	 * @param {Number} sx 敌军数据
	 * @param {Number} sy 敌军数据
	 */
	allDraw(times: number, sx: number, sy: number) {
		this.times++;
		if (!this.isAppear) {
			let sx = (POS.enemyBefore[0] as number) + parseInt(this.times / 5 as unknown as string) % 7 * this.size;
			let sy = POS.enemyBefore[1] as number;
			this.ctx.drawImage(IMAGE.RESOURCE, sx, sy, this.size, this.size, this.x, this.y, this.size, this.size);
			if (this.times == times) {
				this.isAppear = !0;
				this.times = 0;
				this.shoot(2);
			}
		} else {
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
