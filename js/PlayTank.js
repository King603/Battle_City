import { Tank } from "./Tank.js";
import { IMAGE, POS, AUDIO, CRACK_TYPE, DIR } from "./const.js";
import { crackArray, map } from "./main.js";
import { CrackAnimation } from "./CrackAnimation.js";
/**
 * 玩家坦克
 * @param context 画坦克的画布
 * @returns
 */
export class PlayTank extends Tank {
  constructor(context) {
    super();
    this.ctx = context;
  }
  lives = 3; //生命值
  isProtected = !0; //是否受保护
  protectedTime = 500; //保护时间
  offsetX = 0; //坦克2与坦克1的距离
  speed = 2; //坦克的速度
  draw() {
    this.hit = !1;
    this.ctx.drawImage(
      IMAGE.RESOURCE,
      POS.player[0] + this.offsetX + this.dir * this.size,
      POS.player[1],
      this.size,
      this.size,
      this.x,
      this.y,
      this.size,
      this.size
    );
    if (this.isProtected) {
      let temp = parseInt((500 - this.protectedTime) / 5) % 2;
      this.ctx.drawImage(
        IMAGE.RESOURCE,
        POS.protected[0],
        POS.protected[1] + this.size * temp,
        this.size,
        this.size,
        this.x,
        this.y,
        this.size,
        this.size
      );
      --this.protectedTime == 0 && (this.isProtected = !1);
    }
  }
  distroy() {
    this.isDestroyed = !0;
    crackArray.push(new CrackAnimation(CRACK_TYPE.TANK, this.ctx, this));
    AUDIO.DESTROY.PLAYER.play();
  }
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
