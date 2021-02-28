import { CRACK_TYPE, IMAGE, POS } from "./const.js";
import { Obj } from "./Obj.js";
export class CrackAnimation extends Obj {
    /**
     * 裂纹动画
     * @param {String} type
     * @param {CanvasRenderingContext2D} ctx
     * @param {Obj} owner
     */
    constructor(type, ctx, owner) {
        super(type == CRACK_TYPE.TANK ? 66 : 32, 0);
        this.ctx = ctx;
        this.owner = owner;
        this.times = 0;
        this.isOver = !1;
        this.tempDir = 1;
        this.posName = type == CRACK_TYPE.TANK ? "tankBomb" : "bulletBomb";
        this.frame = type == CRACK_TYPE.TANK ? 4 : 3;
        let size = parseInt(owner.size - this.size) / 2;
        this.x = owner.x + size;
        this.y = owner.y + size;
    }
    // 画图
    draw() {
        let gaptime = 3;
        let sx = POS[this.posName][0] + parseInt(this.times / gaptime) * this.size;
        let sy = POS[this.posName][1];
        this.ctx.drawImage(IMAGE.RESOURCE, sx, sy, this.size, this.size, this.x, this.y, this.size, this.size);
        this.times += this.tempDir;
        if (this.times > this.frame * gaptime - parseInt(gaptime / 2))
            this.tempDir = -1;
        else if (this.times <= 0)
            this.isOver = !0;
    }
}
