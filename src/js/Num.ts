import { IMAGE, POS } from "./const.js";

export class Num {
	size = 14;
	/**
	 * 数量类
	 * @param {CanvasRenderingContext2D} ctx 
	 */
	constructor(public ctx: CanvasRenderingContext2D) { }
	/**
	 * 绘制
	 * @param {Number} num 
	 * @param {Number} x 
	 * @param {Number} y 
	 */
	draw(num: number, x: number, y: number) {
		let tempX = x;
		let tempY = y;
		let tempNumArray = [];
		if (num == 0) {
			tempNumArray.push(0);
		}
		else {
			while (num > 0) {
				tempNumArray.push(num % 10);
				num = parseInt(num / 10 as unknown as string);
			}
		}
		for (let i = tempNumArray.length - 1; i >= 0; i--) {
			tempX += (tempNumArray.length - i - 1) * this.size;
			let sx = (POS.num[0] as number) + tempNumArray[i] * 14;
			let sy = POS.num[1] as number;
			this.ctx.drawImage(IMAGE.RESOURCE, sx, sy, this.size, this.size, tempX, tempY, this.size, this.size);
		}
	}
}
