import { DIR, MAP } from "./const.js";
import { bool, map } from "./main.js";
let { UP, DOWN, LEFT, RIGHT } = DIR;
let { WALL, GRID, WATER, HOME, ANOTHREHOME } = MAP;
/**
 * 检测2个物体是否碰撞
 * @param {Obj} object1 物体1
 * @param {Obj} object2 物体2
 * @param {Number} overlap 允许重叠的大小
 * @returns {Boolean} 如果碰撞了，返回!0
 */
export function CheckIntersect(object1, object2, overlap) {
    //    x-轴                      x-轴
    //  A1------>B1 C1              A2------>B2 C2
    //  +--------+   ^              +--------+   ^
    //  | object1|   | y-轴         | object2|   | y-轴
    //  |        |   |              |        |   |
    //  +--------+  D1              +--------+  D2
    //
    //overlap是重叠的区域值
    let A1 = object1.x + overlap;
    let B1 = object1.x - overlap + object1.size;
    let C1 = object1.y + overlap;
    let D1 = object1.y - overlap + object1.size;
    let A2 = object2.x + overlap;
    let B2 = object2.x - overlap + object2.size;
    let C2 = object2.y + overlap;
    let D2 = object2.y - overlap + object2.size;
    // 假如他们在x-轴重叠
    return ((A1 >= A2 && A1 <= B2 || B1 >= A2 && B1 <= B2)
        // 判断y-轴重叠
        && (C1 >= C2 && C1 <= D2 || D1 >= C2 && D1 <= D2));
}
/**
 * 坦克与地图块碰撞
 * @param {Tank} tank 坦克对象
 * @param {Map} mapObj 地图对象
 * @returns {Boolean} 如果碰撞，返回!0
 */
export function tankMapCollision(tank, mapObj) {
    // 移动检测，记录最后一次的移动方向，根据方向判断+-overlap,
    let overlap = 3; // 允许重叠的大小
    // 根据tank的x、y计算出map中的row和col
    let x = tank.tempX - mapObj.offsetX;
    let y = tank.tempY - mapObj.offsetY;
    let { rowIndex, /* map中的行索引 */ colIndex /* map中的列索引 */ } = (() => {
        switch (tank.dir) {
            case UP: return {
                rowIndex: parseInt((y + overlap) / mapObj.tileSize),
                colIndex: parseInt((x + overlap) / mapObj.tileSize),
            };
            case DOWN: return {
                rowIndex: parseInt((y - overlap + tank.size) / mapObj.tileSize),
                colIndex: parseInt((x + overlap) / mapObj.tileSize),
            };
            case LEFT: return {
                rowIndex: parseInt((y + overlap) / mapObj.tileSize),
                colIndex: parseInt((x + overlap) / mapObj.tileSize),
            };
            case RIGHT: return {
                rowIndex: parseInt((y + overlap) / mapObj.tileSize),
                colIndex: parseInt((x - overlap + tank.size) / mapObj.tileSize),
            };
            default: return { rowIndex: 0, colIndex: 0 };
        }
    })();
    if (rowIndex >= mapObj.hTileCount || rowIndex < 0 || colIndex >= mapObj.wTileCount || colIndex < 0)
        return !0;
    switch (tank.dir) {
        case UP:
        case DOWN:
            {
                let tempWidth = parseInt(tank.tempX - map.offsetX - colIndex * mapObj.tileSize + tank.size - overlap); // 去除重叠部分
                /**需要检测的tile数 */
                let tileNum = parseInt(tempWidth / mapObj.tileSize) + (tempWidth % mapObj.tileSize == 0 ? 0 : 1);
                for (let i = 0; i < tileNum && colIndex + i < mapObj.wTileCount; i++) {
                    switch (mapObj.mapLevel[rowIndex][colIndex + i]) {
                        case WALL:
                        case GRID:
                        case WATER:
                        case HOME:
                        case ANOTHREHOME:
                            let y = mapObj.offsetY + rowIndex * mapObj.tileSize;
                            switch (tank.dir) {
                                case UP:
                                    tank.y = y + mapObj.tileSize - overlap;
                                    break;
                                case DOWN:
                                    tank.y = y - tank.size + overlap;
                                    break;
                            }
                            return !0;
                    }
                }
            }
            break;
        case LEFT:
        case RIGHT:
            {
                let tempHeight = parseInt(tank.tempY - map.offsetY - rowIndex * mapObj.tileSize + tank.size - overlap); // 去除重叠部分
                /**需要检测的tile数 */
                let tileNum = parseInt(tempHeight / mapObj.tileSize) + (tempHeight % mapObj.tileSize == 0 ? 0 : 1);
                for (let i = 0; i < tileNum && rowIndex + i < mapObj.hTileCount; i++) {
                    switch (mapObj.mapLevel[rowIndex + i][colIndex]) {
                        case WALL:
                        case GRID:
                        case WATER:
                        case HOME:
                        case ANOTHREHOME:
                            let x = mapObj.offsetX + colIndex * mapObj.tileSize;
                            switch (tank.dir) {
                                case LEFT:
                                    tank.x = x + mapObj.tileSize - overlap;
                                    break;
                                case RIGHT:
                                    tank.x = x - tank.size + overlap;
                                    break;
                            }
                            return !0;
                    }
                }
            }
            break;
    }
    return !1;
}
/**
 * 子弹与地图块的碰撞
 * @param {Bullet} bullet 子弹对象
 * @param {Map} mapobj 地图对象
 * @param {Boolean}
 */
export function bulletMapCollision(bullet, mapobj) {
    let mapChangeIndex = []; // map中需要更新的索引数组
    let result = !1; // 是否碰撞
    // 根据bullet的x、y计算出map中的row和col
    let row = bullet.x - mapobj.offsetX;
    let col = bullet.y - mapobj.offsetY;
    let { rowIndex, /* map中的行索引 */ colIndex /* map中的列索引 */ } = (() => {
        switch (bullet.dir) {
            case UP: return {
                rowIndex: parseInt(col / mapobj.tileSize),
                colIndex: parseInt(row / mapobj.tileSize)
            };
            case DOWN: return {
                rowIndex: parseInt((col + bullet.size) / mapobj.tileSize),
                colIndex: parseInt(row / mapobj.tileSize)
            };
            case LEFT: return {
                rowIndex: parseInt(col / mapobj.tileSize),
                colIndex: parseInt(row / mapobj.tileSize)
            };
            case RIGHT: return {
                rowIndex: parseInt(col / mapobj.tileSize),
                colIndex: parseInt((row + bullet.size) / mapobj.tileSize) // 向右，即dir==3的时候，列索引的计算需要+bullet.Height
            };
            default: return { rowIndex: 0, colIndex: 0 };
        }
    })();
    if (rowIndex >= mapobj.hTileCount || rowIndex < 0 || colIndex >= mapobj.wTileCount || colIndex < 0)
        return !0;
    switch (bullet.dir) {
        case UP:
        case DOWN:
            {
                let tempWidth = parseInt(bullet.x - map.offsetX - colIndex * mapobj.tileSize + bullet.size);
                /**需要检测的tile数 */
                let tileNum = parseInt(tempWidth / mapobj.tileSize) + (tempWidth % mapobj.tileSize == 0 ? 0 : 1);
                ud: for (let i = 0; i < tileNum && colIndex + i < mapobj.wTileCount; i++) {
                    let mapContent = mapobj.mapLevel[rowIndex][colIndex + i];
                    switch (mapContent) {
                        case WALL:
                        case GRID:
                        case HOME:
                        case ANOTHREHOME:
                            // bullet.distroy();
                            result = !0;
                            switch (mapContent) {
                                case WALL:
                                    mapChangeIndex.push([rowIndex, colIndex + i]); // 墙被打掉
                                    break;
                                case GRID: break;
                                default:
                                    bool.isGameOver = !0;
                                    break ud;
                            }
                            break;
                    }
                }
            }
            break;
        case LEFT:
        case RIGHT:
            {
                let tempHeight = parseInt(bullet.y - map.offsetY - rowIndex * mapobj.tileSize + bullet.size);
                /**需要检测的tile数 */
                let tileNum = parseInt(tempHeight / mapobj.tileSize) + (tempHeight % mapobj.tileSize == 0 ? 0 : 1);
                lr: for (let i = 0; i < tileNum && rowIndex + i < mapobj.hTileCount; i++) {
                    let mapContent = mapobj.mapLevel[rowIndex + i][colIndex];
                    switch (mapContent) {
                        case WALL:
                        case GRID:
                        case HOME:
                        case ANOTHREHOME:
                            // bullet.distroy();
                            result = !0;
                            switch (mapContent) {
                                case WALL:
                                    mapChangeIndex.push([rowIndex + i, colIndex]); // 墙被打掉
                                    break;
                                case GRID: break;
                                default:
                                    bool.isGameOver = !0;
                                    break lr;
                            }
                    }
                }
            }
            break;
    }
    // 更新地图
    map.updateMap(mapChangeIndex, 0);
    return result;
}
