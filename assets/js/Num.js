import { IMAGE, POS } from "./const.js";

export default class {
  constructor(context) {
    this.ctx = context;
    this.size = 14;
  }
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
      this.ctx.drawImage(
        IMAGE.RESOURCE,
        POS.num[0] + tempNumArray[i] * 14,
        POS.num[1],
        this.size,
        this.size,
        tempX,
        tempY,
        this.size,
        this.size
      );
    }
  }
}
