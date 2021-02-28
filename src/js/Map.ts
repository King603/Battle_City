import { IMAGE, MAP, POS, SCREEN } from "./const.js";
import LEVEL from "./LEVEL.js";
import { maxEnemy } from "./main.js";
import { Num } from "./Num.js";

export class Map {
	num;
	/**
	 * 地图
	 * @param {Object} wallCtx 
	 * @param {Object} grassCtx 
	 */
	constructor(public wallCtx: CanvasRenderingContext2D, public grassCtx: CanvasRenderingContext2D) {
		this.num = new Num(this.wallCtx);
	}
	level = 1;
	offsetX = 32; //主游戏区的X偏移量
	offsetY = 16; //主游戏区的Y偏移量
	wTileCount = 26; //主游戏区的宽度地图块数
	hTileCount = 26; //主游戏区的高度地图块数
	tileSize = 16; //地图块的大小
	homeSize = 32; //家图标的大小
	mapWidth = 416;
	mapHeight = 416;
	mapLevel: number[][] = [];
	/**
	 * 设置地图等级
	 * @param {Number} level 
	 */
	setMapLevel(level: number) {
		this.level = level;
		let tempMap = LEVEL[this.level - 1];
		this.mapLevel = [];
		for (let i = 0; i < tempMap.length; i++) {
			this.mapLevel[i] = [];
			for (let j = 0; j < tempMap[i].length; j++)
				this.mapLevel[i][j] = tempMap[i][j];
		}
	}
	// 绘制地图
	draw() {
		this.wallCtx.fillStyle = "#7f7f7f";
		this.wallCtx.fillRect(0, 0, SCREEN.WIDTH, SCREEN.HEIGHT);
		this.wallCtx.fillStyle = "#000";
		this.wallCtx.fillRect(this.offsetX, this.offsetY, this.mapWidth, this.mapHeight); // 主游戏区
		this.grassCtx.clearRect(0, 0, SCREEN.WIDTH, SCREEN.HEIGHT);
		let { WALL, GRID, WATER, ICE, GRASS, HOME } = MAP;
		for (let y = 0; y < this.hTileCount; y++) {
			for (let x = 0; x < this.wTileCount; x++) {
				let sx = (POS.map[0] as number) + this.tileSize * (this.mapLevel[y][x] - 1);
				let sy = POS.map[1] as number;
				switch (this.mapLevel[y][x]) {
					case WALL: case GRID: case WATER: case ICE:
						this.wallCtx.drawImage(IMAGE.RESOURCE, sx, sy, this.tileSize, this.tileSize, x * this.tileSize + this.offsetX, y * this.tileSize + this.offsetY, this.tileSize, this.tileSize);
						break;
					case GRASS:
						this.grassCtx.drawImage(IMAGE.RESOURCE, sx, sy, this.tileSize, this.tileSize, x * this.tileSize + this.offsetX, y * this.tileSize + this.offsetY, this.tileSize, this.tileSize);
						break;
					case HOME: {
						let [sx, sy] = POS.home as number[];
						this.wallCtx.drawImage(IMAGE.RESOURCE, sx, sy, this.homeSize, this.homeSize, x * this.tileSize + this.offsetX, y * this.tileSize + this.offsetY, this.homeSize, this.homeSize);
					} break;
				}
			}
		}
		this.drawNoChange();
		this.drawEnemyNum(maxEnemy);
		this.drawLevel();
		this.drawLives(0, 1);
		this.drawLives(0, 2);
	}
	// 画固定不变的部分
	drawNoChange() {
		this.wallCtx.drawImage(IMAGE.RESOURCE, POS.score[0] as number, POS.score[1] as number, 30, 32, 464, 256, 30, 32); // player1
		this.wallCtx.drawImage(IMAGE.RESOURCE, 30 + (POS.score[0] as number), POS.score[1] as number, 30, 32, 464, 304, 30, 32); // player2
		// 30,32旗帜的size, 464, 352旗帜在canvas中位置
		this.wallCtx.drawImage(IMAGE.RESOURCE, 60 + (POS.score[0] as number), POS.score[1] as number, 30, 32, 464, 352, 32, 30); // 画旗帜
	}
	// 画关卡数
	drawLevel() {
		this.num.draw(this.level, 468, 384);
	}
	/**
	 * 画右侧敌方坦克数
	 * @param {Number} enemyNum 地方坦克总数
	 */
	drawEnemyNum(enemyNum: number) {
		let x = 466;
		let y = 34;
		let enemySize = 16;
		for (let i = 1; i <= enemyNum; i++) {
			let tempX = x;
			let tempY = y + parseInt((i + 1) / 2 as unknown as string) * enemySize;
			if (i % 2 == 0) {
				tempX = x + enemySize;
			}
			this.wallCtx.drawImage(IMAGE.RESOURCE, 92 + (POS.score[0] as number), POS.score[1] as number, 14, 14, tempX, tempY, 14, 14);
		}
	}
	/**
	 * 清除右侧敌方坦克数，从最下面开始清楚
	 * @param {Number} totolEnemyNum 敌方坦克的总数
	 * @param {Number} enemyNum 已出现的敌方坦克数
	 */
	clearEnemyNum(totolEnemyNum: number, enemyNum: number) {
		if (enemyNum <= 0) return;
		let enemySize = 16;
		this.wallCtx.fillStyle = "#7f7f7f";
		let tempX = 466 + (enemyNum % 2) * enemySize;
		let tempY = 34 + this.offsetY + ((Math.ceil(totolEnemyNum / 2) - 1) - parseInt((enemyNum - 1) / 2 as unknown as string)) * enemySize;
		this.wallCtx.fillRect(tempX, tempY, 14, 14);
	}
	/**
	 * 画坦克的生命数
	 * @param {Number} lives 生命数
	 * @param {Number} which 坦克索引，1、代表玩家1  2、代表玩家2
	 */
	drawLives(lives: number, which: number) {
		let x = 482;
		let y = 272;
		if (which == 2) y = 320;
		this.wallCtx.fillStyle = "#7f7f7f";
		this.wallCtx.fillRect(x, y, this.num.size, this.num.size);
		this.num.draw(lives, x, y);
		// this.wallCtx.drawImage(RESOURCE_IMAGE, POS.num[0] + lives * 14, POS.num[1], 14, 14, x, y, 14, 14);
	}
	/**
	 * 更新地图
	 * @param {number[][]} indexArr 需要更新的地图索引数组，二维数组，如[[1,1],[2,2]]
	 * @param {Number} target 更新之后的数值
	 */
	updateMap(indexArr: number[][], target: number) {
		if (indexArr != null && indexArr.length > 0) {
			for (let [y, x] of indexArr) {
				this.mapLevel[y][x] = target;
				let sx = (POS.map[0] as number) + this.tileSize * (target - 1);
				let sy = POS.map[1] as number;
				let dx = x * this.tileSize + this.offsetX;
				let dy = y * this.tileSize + this.offsetY;
				if (target > 0) {
					this.wallCtx.drawImage(IMAGE.RESOURCE, sx, sy, this.tileSize, this.tileSize, dx, dy, this.tileSize, this.tileSize);
				} else {
					this.wallCtx.fillStyle = "#000";
					this.wallCtx.fillRect(dx, dy, this.tileSize, this.tileSize);
				}
			}
		}
	}
	// 大本营被毁
	homeHit() {
		let sx = (POS.home[0] as number) + this.homeSize;
		let sy = POS.home[1] as number;
		let dx = 12 * this.tileSize + this.offsetX;
		let dy = 24 * this.tileSize + this.offsetY;
		this.wallCtx.drawImage(IMAGE.RESOURCE, sx, sy, this.homeSize, this.homeSize, dx, dy, this.homeSize, this.homeSize);
	}
}
