import Tank from "./Tank.js";

// 菜单选择坦克
export default class extends Tank {
  constructor() {
    super();
  }
  ys = [250, 281]; //两个Y坐标，分别对应1p和2p
  x = 140;
  size = 27;
}
