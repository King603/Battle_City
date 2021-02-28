import { AUDIO, CRACK_TYPE, DIR, IMAGE, POS } from "./const.js";
import { CrackAnimation } from "./CrackAnimation.js";
import { crackArray, map } from "./main.js";
import { Tank } from "./Tank.js";

export class PlayTank extends Tank {
	/**
	 * 玩家坦克
	 * @param {CanvasRenderingContext2D} ctx 画坦克的画布
	 * @returns
	 */
	constructor(public ctx: CanvasRenderingContext2D) {
		super();
	}
	lives = 3; // 生命值
	isProtected = !0; // 是否受保护
	protectedTime = 500; // 保护时间
	offsetX = 0; // 坦克2与坦克1的距离
	speed = 2; // 坦克的速度
	draw() {
		this.hit = !1;
		let dx = (POS.player[0] as number) + this.offsetX + this.dir * this.size;
		let dy = POS.player[1] as number;
		this.ctx.drawImage(IMAGE.RESOURCE, dx, dy, this.size, this.size, this.x, this.y, this.size, this.size);
		if (this.isProtected) {
			let temp = parseInt((500 - this.protectedTime) / 5 as unknown as string) % 2;
			let dx = POS.protected[0] as number;
			let dy = (POS.protected[1] as number) + this.size * temp;
			this.ctx.drawImage(IMAGE.RESOURCE, dx, dy, this.size, this.size, this.x, this.y, this.size, this.size);
			--this.protectedTime == 0 && (this.isProtected = !1);
		}
	}
	distroy() {
		this.isDestroyed = !0;
		crackArray.push(new CrackAnimation(CRACK_TYPE.TANK, this.ctx, this));
		AUDIO.DESTROY.PLAYER.play();
	}
	/**
	 * 
	 * @param {Number} player 
	 */
	renascenc(player: number) {
		this.lives--;
		this.dir = DIR.UP;
		this.isProtected = !0;
		this.protectedTime = 500;
		this.isDestroyed = !1;
		this.x = player == 1 ? 129 : 256 + map.offsetX;
		this.y = 385 + map.offsetY;
	}
}
