import Cell from './components/Cell';
import { randomBlock } from './block';
import { emptyBlock } from './block';

// Stage size constants
export const STAGE_WIDTH = 6;
export const STAGE_HEIGHT = 13;

// The starting point of puyo's
export const PUYO_COL = 3;
export const PUYO_ROW = 0;

export const createStage = () => Array.from(Array(STAGE_HEIGHT), () => new Array(STAGE_WIDTH).fill(<Cell type = {emptyBlock().color}/>));

export const rotationPosition = (block, dir) => {
    let rotLoc = {position: {x: 0, y: 0}, position2: {x: 0, y: 0}};
    let curXPos = block.position.x;
    let curYPos = block.position.y;
    let curX2Pos  = block.position2.x;
    let curY2Pos = block.position2.y;
    if (dir === 0) {
        rotLoc.position.x = curXPos;
        rotLoc.position.y = curYPos - 1;
        rotLoc.position2.x = curX2Pos + 1;
        rotLoc.position2.y = curY2Pos;
    } else if (dir === 1) {
        rotLoc.position.x = curXPos + 1;
        rotLoc.position.y = curYPos + 1;
        rotLoc.position2.x = curX2Pos;
        rotLoc.position2.y = curY2Pos;
    } else if (dir === 2) {
        rotLoc.position.x = curXPos -1 ;
        rotLoc.position.y = curYPos;
        rotLoc.position2.x = curX2Pos;
        rotLoc.position2.y = curY2Pos + 1;
    } else if (dir === 3) {
        rotLoc.position.x = curXPos;
        rotLoc.position.y = curYPos;
        rotLoc.position2.x = curX2Pos - 1;
        rotLoc.position2.y = curY2Pos - 1;
    }
    return rotLoc;
}
