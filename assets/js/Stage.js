import Num from "./Num.js";
import { IMAGE, POS, AUDIO } from "./const.js";
import { initMap } from "./main.js";

export default class {
  constructor(context, level) {
    this.ctx = context;
    this.level = level;
    this.ctx.fillStyle = "#7f7f7f";
    this.levelNum = new Num(context);
  }
  drawHeigth = 15;
  temp = 0;
  dir = 1; //中间切换的方向，1：合上，2：展开
  isReady = !1; //标识地图是否已经画好
  init(level) {
    this.dir = 1;
    this.isReady = !1;
    this.level = level;
    this.temp = 0;
  }
  draw() {
    if (this.dir == 1) {
      switch (this.temp) {
        // temp = 15*15 灰色屏幕已经画完
        case 255:
          // 78,14为STAGE字样在图片资源中的宽和高，194,208为canvas中的位置
          this.ctx.drawImage(IMAGE.RESOURCE, POS.stageLevel[0], POS.stageLevel[1], 78, 14, 194, 208, 78, 14);
          // 14为数字的宽和高，308, 208为canvas中的位置
          this.levelNum.draw(this.level, 308, 208);
          // this.ctx.drawImage(RESOURCE_IMAGE,POS.num[0]+this.level*14,POS.num[1],14, 14,308, 208,14, 14);
          // 绘制地图,调用main里面的方法
          initMap();
          break;
        case 255 + 600:
          // 600即调用了600/15次，主要用来停顿
          this.temp = 225;
          this.dir = -1;
          AUDIO.START.play();
          break;
        default:
          this.ctx.fillRect(0, this.temp, 512, this.drawHeigth);
          this.ctx.fillRect(0, 448 - this.temp - this.drawHeigth, 512, this.drawHeigth);
      }
    }
    else {
      if (this.temp >= 0) {
        this.ctx.clearRect(0, this.temp, 512, this.drawHeigth);
        this.ctx.clearRect(0, 448 - this.temp - this.drawHeigth, 512, this.drawHeigth);
      }
      else
        this.isReady = !0;
    }
    this.temp += this.drawHeigth * this.dir;
  }
}
