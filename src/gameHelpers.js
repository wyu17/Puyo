import Cell from './components/Cell';
import { randomBlock } from './block';
import { emptyBlock } from './block';

export var STAGE_WIDTH = 6;
export var STAGE_HEIGHT = 13;

export var PUYO_COL = 3;
export var PUYO_ROW = 0;

export const createStage = () => Array.from(Array(STAGE_HEIGHT), () => new Array(STAGE_WIDTH).fill(<Cell type = {emptyBlock().color}/>));

