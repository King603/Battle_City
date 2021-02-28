import { Tank } from "./Tank.js";
// 菜单选择坦克
export class SelectTank extends Tank {
    constructor() {
        super();
        this.ys = [250, 281]; //两个Y坐标，分别对应1p和2p
        this.x = 140;
        this.size = 27;
    }
}
