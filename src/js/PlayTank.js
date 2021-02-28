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
    constructor(ctx) {
        super();
        this.ctx = ctx;
        this.lives = 3; // 生命值
        this.isProtected = !0; // 是否受保护
        this.protectedTime = 500; // 保护时间
        this.offsetX = 0; // 坦克2与坦克1的距离
        this.speed = 2; // 坦克的速度
    }
    draw() {
        this.hit = !1;
        let dx = POS.player[0] + this.offsetX + this.dir * this.size;
        let dy = POS.player[1];
        this.ctx.drawImage(IMAGE.RESOURCE, dx, dy, this.size, this.size, this.x, this.y, this.size, this.size);
        if (this.isProtected) {
            let temp = parseInt((500 - this.protectedTime) / 5) % 2;
            let dx = POS.protected[0];
            let dy = POS.protected[1] + this.size * temp;
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
    renascenc(player) {
        this.lives--;
        this.dir = DIR.UP;
        this.isProtected = !0;
        this.protectedTime = 500;
        this.isDestroyed = !1;
        this.x = player == 1 ? 129 : 256 + map.offsetX;
        this.y = 385 + map.offsetY;
    }
}
