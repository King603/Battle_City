import { enemyArray, player, time, map } from "./main.js";
import { IMAGE, POS, AUDIO, MAP } from "./const.js";
import { CheckIntersect } from "./Collision.js";
import { Obj } from "./Obj.js";
import { Enemy1 } from "./Enemy1.js";
import { Enemy2 } from "./Enemy2.js";
import { Enemy3 } from "./Enemy3.js";
import { PlayTank } from "./PlayTank.js"

export class Prop extends Obj {
	/**
	 * 
	 * @param {CanvasRenderingContext2D} ctx 
	 */
	constructor(public ctx: CanvasRenderingContext2D) {
		super(28, 0);
	}
	hit = !1;
	width = 30;
	height = 28;
	duration = 0;
	type = 0;
	isDestroyed = !1;
	init() {
		this.ctx.clearRect(this.x, this.y, this.width, this.height);
		this.duration = 600;
		this.type = parseInt(Math.random() * 6 as unknown as string);
		this.x = parseInt(Math.random() * 384 as unknown as string) + map.offsetX;
		this.y = parseInt(Math.random() * 384 as unknown as string) + map.offsetY;
		this.isDestroyed = !1;
	}
	draw() {
		if (this.duration > 0 && !this.isDestroyed) {
			let dx = (POS.prop[0] as number) + this.type * this.width;
			let dy = POS.prop[1] as number;
			this.ctx.drawImage(IMAGE.RESOURCE, dx, dy, this.width, this.height, this.x, this.y, this.width, this.height);
			this.duration--;
			this.isHit();
		}
		else {
			this.ctx.clearRect(this.x, this.y, this.width, this.height);
			this.isDestroyed = !0;
		}
	}
	isHit() {
		if (player[0].lives > 0 && CheckIntersect(this, player[0], 0)) {
			this.hit = !0;
			this.livesUp(player[0]);
		}
		else if (player[1].lives > 0 && CheckIntersect(this, player[1], 0)) {
			this.hit = !0;
			this.livesUp(player[1]);
		}
	}
	private livesUp(player: PlayTank): void {
		if (this.hit) {
			AUDIO.PROP.play();
			this.isDestroyed = !0;
			this.ctx.clearRect(this.x, this.y, this.width, this.height);
			switch (this.type) {
				case 0:
					player.lives++;
					break;
				case 1:
					time.emenyStop = 500;
					break;
				case 2:
					map.updateMap([[23, 11], [23, 12], [23, 13], [23, 14], [24, 11], [24, 14], [25, 11], [25, 14]], MAP.GRID);
					time.homeProtected = 500;
					break;
				case 3:
					if (enemyArray != null || (enemyArray as (Enemy1 | Enemy2 | Enemy3)[]).length > 0)
						enemyArray.forEach(enemy => enemy.distroy());
					break;
				case 4:
					break;
				case 5:
					player.isProtected = !0;
					player.protectedTime = 500;
					break;
			}
		}
	}
}
