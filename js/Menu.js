import { SCREEN, IMAGE, POS } from "./const.js";
import { SelectTank } from "./SelectTank.js";
// menu.js
/**
 * 游戏开始菜单
 */
export class Menu {
  constructor(context) {
    this.ctx = context;
  }
  x = 0;
  y = SCREEN.HEIGHT;
  selectTank = new SelectTank();
  playNum = 1;
  times = 0;
  /**
   * 画菜单
   */
  draw() {
    this.times++;
    let temp = parseInt(this.times / 6) % 2 == 0 ? 0 : this.selectTank.size;
    this.y = this.y <= 0 ? 0 : this.y - 5;
    this.ctx.clearRect(0, 0, SCREEN.WIDTH, SCREEN.HEIGHT);
    this.ctx.save();
    // 画背景
    this.ctx.drawImage(IMAGE.MENU, this.x, this.y);
    // 画选择坦克
    this.ctx.drawImage(IMAGE.RESOURCE, POS.selectTank[0], POS.selectTank[1] + temp, this.selectTank.size, this.selectTank.size, this.selectTank.x, this.y + this.selectTank.ys[this.playNum - 1], this.selectTank.size, this.selectTank.size);
    this.ctx.restore();
  }
  /**
   * 选择坦克上下移动
   */
  next(n) {
    if ((this.playNum += n) > 2) this.playNum = 1;
    else if (this.playNum < 1) this.playNum = 2;
  }
}
