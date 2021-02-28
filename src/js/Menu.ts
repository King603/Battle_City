import { SCREEN, IMAGE, POS } from "./const.js";
import { SelectTank } from "./SelectTank.js";

export class Menu {
	/**
	 * 游戏开始菜单
	 * @param {CanvasRenderingContext2D} ctx 
	 */
	constructor(public ctx: CanvasRenderingContext2D) { }
	x = 0;
	y = SCREEN.HEIGHT;
	selectTank = new SelectTank();
	playNum = 1;
	times = 0;
	// 画菜单
	draw() {
		this.times++;
		let temp = parseInt(this.times / 6 as unknown as string) % 2 == 0 ? 0 : this.selectTank.size;
		this.y = this.y <= 0 ? 0 : this.y - 5;
		this.ctx.clearRect(0, 0, SCREEN.WIDTH, SCREEN.HEIGHT);
		this.ctx.save();
		// 画背景
		this.ctx.drawImage(IMAGE.MENU, this.x, this.y);
		// 画选择坦克
		let sx = POS.selectTank[0] as number;
		let sy = (POS.selectTank[1] as number) + temp;
		let dx = this.selectTank.x;
		let dy = this.y + this.selectTank.ys[this.playNum - 1];
		this.ctx.drawImage(IMAGE.RESOURCE, sx, sy, this.selectTank.size, this.selectTank.size, dx, dy, this.selectTank.size, this.selectTank.size);
		this.ctx.restore();
	}
	/**
	 * 选择坦克上下移动
	 * @param {Number} n 
	 */
	next(n: number) {
		if ((this.playNum += n) > 2) this.playNum = 1;
		else if (this.playNum < 1) this.playNum = 2;
	}
}
