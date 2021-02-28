import { SCREEN, IMAGE, POS } from "./const.js";
import { SelectTank } from "./SelectTank.js";
export class Menu {
    /**
     * 游戏开始菜单
     * @param {CanvasRenderingContext2D} ctx
     */
    constructor(ctx) {
        this.ctx = ctx;
        this.x = 0;
        this.y = SCREEN.HEIGHT;
        this.selectTank = new SelectTank();
        this.playNum = 1;
        this.times = 0;
    }
    // 画菜单
    draw() {
        this.times++;
        let temp = parseInt(this.times / 6) % 2 == 0 ? 0 : this.selectTank.size;
        this.y = this.y <= 0 ? 0 : this.y - 5;
        this.ctx.clearRect(0, 0, SCREEN.WIDTH, SCREEN.HEIGHT);
        this.ctx.save();
        // 画背景
        this.ctx.drawImage(IMAGE.MENU, this.x, this.y);
        // 画选择坦克
        let sx = POS.selectTank[0];
        let sy = POS.selectTank[1] + temp;
        let dx = this.selectTank.x;
        let dy = this.y + this.selectTank.ys[this.playNum - 1];
        this.ctx.drawImage(IMAGE.RESOURCE, sx, sy, this.selectTank.size, this.selectTank.size, dx, dy, this.selectTank.size, this.selectTank.size);
        this.ctx.restore();
    }
    /**
     * 选择坦克上下移动
     * @param {Number} n
     */
    next(n) {
        if ((this.playNum += n) > 2)
            this.playNum = 1;
        else if (this.playNum < 1)
            this.playNum = 2;
    }
}
