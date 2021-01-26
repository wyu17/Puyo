import Cell from './components/Cell';
import { randomBlock } from './block';
import { emptyBlock } from './block';

export const STAGE_WIDTH = 6;
export const STAGE_HEIGHT = 13;

export const PUYO_COL = 3;
export const PUYO_ROW = 0;

export var put
export const createStage = () => Array.from(Array(STAGE_HEIGHT), () => new Array(STAGE_WIDTH).fill(<Cell type = {emptyBlock().color}/>));

