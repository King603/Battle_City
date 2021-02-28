import { enemyArray, player, time, map } from "./main.js";
import { IMAGE, POS, AUDIO, MAP } from "./const.js";
import { CheckIntersect } from "./Collision.js";
import { Obj } from "./Obj.js";
export class Prop extends Obj {
    /**
     *
     * @param {CanvasRenderingContext2D} ctx
     */
    constructor(ctx) {
        super(28, 0);
        this.ctx = ctx;
        this.hit = !1;
        this.width = 30;
        this.height = 28;
        this.duration = 0;
        this.type = 0;
        this.isDestroyed = !1;
    }
    init() {
        this.ctx.clearRect(this.x, this.y, this.width, this.height);
        this.duration = 600;
        this.type = parseInt(Math.random() * 6);
        this.x = parseInt(Math.random() * 384) + map.offsetX;
        this.y = parseInt(Math.random() * 384) + map.offsetY;
        this.isDestroyed = !1;
    }
    draw() {
        if (this.duration > 0 && !this.isDestroyed) {
            let dx = POS.prop[0] + this.type * this.width;
            let dy = POS.prop[1];
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
    livesUp(player) {
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
                    if (enemyArray != null || enemyArray.length > 0)
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
