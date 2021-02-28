interface MyArray extends Array<any> {
	remove(arg: number): void;
	removeByIndex(index: number): void;
	contain(arg: number): boolean;
}

interface MyCtxArr { type: string; id: string; }
interface MyCtxOBJ { [key: string]: CanvasRenderingContext2D }