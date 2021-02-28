import { CRACK_TYPE, IMAGE, POS } from "./const.js";
import { Obj } from "./Obj.js";

export class CrackAnimation extends Obj {
	times = 0;
	isOver = !1;
	tempDir = 1;
	posName;
	frame;
	/**
	 * 裂纹动画
	 * @param {String} type 
	 * @param {CanvasRenderingContext2D} ctx 
	 * @param {Obj} owner 
	 */
	constructor(type: string, public ctx: CanvasRenderingContext2D, public owner: Obj) {
		super(type == CRACK_TYPE.TANK ? 66 : 32, 0);
		this.posName = type == CRACK_TYPE.TANK ? "tankBomb" : "bulletBomb";
		this.frame = type == CRACK_TYPE.TANK ? 4 : 3;
		let size = parseInt(owner.size - this.size as unknown as string) / 2;
		this.x = owner.x + size;
		this.y = owner.y + size;
	}
	// 画图
	draw(): void {
		let gaptime = 3;
		let sx = (POS[this.posName][0] as number) + parseInt(this.times / gaptime as unknown as string) * this.size;
		let sy = POS[this.posName][1] as number;
		this.ctx.drawImage(IMAGE.RESOURCE, sx, sy, this.size, this.size, this.x, this.y, this.size, this.size);
		this.times += this.tempDir;
		if (this.times > this.frame * gaptime - parseInt(gaptime / 2 as unknown as string))
			this.tempDir = -1;
		else if (this.times <= 0)
			this.isOver = !0;
	}
}
