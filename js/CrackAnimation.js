import { CRACK_TYPE, IMAGE, POS } from "./const.js";
// crackAnimation.js
export default class {
  times = 0;
  isOver = !1;
  tempDir = 1;
  constructor(type, context, crackObj) {
    this.ctx = context;
    this.owner = crackObj;
    this.posName = type == CRACK_TYPE.TANK ? "tankBomb" : "bulletBomb";
    this.size = type == CRACK_TYPE.TANK ? 66 : 32;
    this.frame = type == CRACK_TYPE.TANK ? 4 : 3;
    let size = parseInt(crackObj.size - this.size) / 2;
    this.x = crackObj.x + size;
    this.y = crackObj.y + size;
  }
  draw() {
    let gaptime = 3;
    this.ctx.drawImage(
      IMAGE.RESOURCE,
      POS[this.posName][0] + parseInt(this.times / gaptime) * this.size,
      POS[this.posName][1],
      this.size,
      this.size,
      this.x,
      this.y,
      this.size,
      this.size
    );
    this.times += this.tempDir;
    this.times > this.frame * gaptime - parseInt(gaptime / 2) ? this.tempDir = -1 :
      this.times <= 0 && (this.isOver = !0);
  }
}
