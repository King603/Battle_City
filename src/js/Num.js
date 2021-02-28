import { IMAGE, POS } from "./const.js";
export class Num {
    /**
     * 数量类
     * @param {CanvasRenderingContext2D} ctx
     */
    constructor(ctx) {
        this.ctx = ctx;
        this.size = 14;
    }
    /**
     * 绘制
     * @param {Number} num
     * @param {Number} x
     * @param {Number} y
     */
    draw(num, x, y) {
        let tempX = x;
        let tempY = y;
        let tempNumArray = [];
        if (num == 0) {
            tempNumArray.push(0);
        }
        else {
            while (num > 0) {
                tempNumArray.push(num % 10);
                num = parseInt(num / 10);
            }
        }
        for (let i = tempNumArray.length - 1; i >= 0; i--) {
            tempX += (tempNumArray.length - i - 1) * this.size;
            let sx = POS.num[0] + tempNumArray[i] * 14;
            let sy = POS.num[1];
            this.ctx.drawImage(IMAGE.RESOURCE, sx, sy, this.size, this.size, tempX, tempY, this.size, this.size);
        }
    }
}
