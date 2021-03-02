import { useState, useCallback } from 'react';
import { createStage, STAGE_HEIGHT, STAGE_WIDTH, PUYO_COL, PUYO_ROW } from '../gameHelpers';
import Cell from '../components/Cell';
import { emptyBlock } from '../block';

export const useStage = (currentBlock, resetCurrentBlock) => {
    // Initial State
    const [stage, setStage] = useState(Array.from(Array(STAGE_HEIGHT), () => new Array(STAGE_WIDTH).fill(<Cell type = {emptyBlock().color}/>)));

    const updateStage = useCallback ((currentBlock, prevStage, prevPosition, prevPosition2) => {
        let newStage = createStage();
        for (let i = 0; i < STAGE_HEIGHT; i++) {
            for (let j = 0; j < STAGE_WIDTH; j++) {
                newStage[i][j] = prevStage[i][j];
            }
        };
        if (prevPosition && prevPosition2) {
            newStage[prevPosition.y][prevPosition.x] = <Cell type = {emptyBlock().color}/>;
            newStage[prevPosition2.y][prevPosition2.x] = <Cell type = {emptyBlock().color}/>;
        }
        // Will need to implement some form of keeping blocks saved
        // to:do guarantee different colours between the top and bottom
        let temp = (currentBlock.dir > 1) ? currentBlock.color1 : currentBlock.color;
        let tempcolor1 =  (currentBlock.dir > 1) ? currentBlock.color : currentBlock.color1;
        newStage[currentBlock.position.y][currentBlock.position.x] = <Cell type = {temp}/>;
        newStage[currentBlock.position2.y][currentBlock.position2.x] = <Cell type = {tempcolor1}/>;
        return newStage;
    }, []);

    const resetStage = useCallback((color, color1) => {
        let newStage = createStage();
        newStage[PUYO_ROW][PUYO_COL] = <Cell type = {color}/>;
        newStage[PUYO_ROW + 1][PUYO_COL] = <Cell type = {color1}/>;
        return newStage;
    }, []);

    const registerCollision = (block, stage, color, color1) => {
        let newStage = createStage();
        for (let i = 0; i < STAGE_HEIGHT; i++) {
            for (let j = 0; j < STAGE_WIDTH; j++) {
                newStage[i][j] = stage[i][j];
            }
        }
        newStage[PUYO_ROW][PUYO_COL] = <Cell type = {color}/>;
        newStage[PUYO_ROW + 1][PUYO_COL] = <Cell type = {color1}/>;
        return newStage;
    }

    const emptyHeights = (heights) => {
        for (let i = 0; i < heights.length; i++) {
            if (heights[i].number !== 0) {
                return false;
            }
        }
        return true;
    }

    const handleRemoval = (stage, removables) => {
        let newStage = createStage();
        for (let i = 0; i < STAGE_HEIGHT; i++) {
            for (let j = 0; j < STAGE_WIDTH; j++) {
                newStage[i][j] = stage[i][j];
            }
        }
        let heights = new Array(6);
        for (let i = 0; i < 6; i++) {
            heights[i] = {number: 0, minHeight: 0};
        }
        for (let i = 0; i < removables.length; i++) {
            if (removables[i].length >= 4) {
                for (let j = 0; j < removables[i].length; j++) {
                    let removeX = removables[i][j].x;
                    let removeY = removables[i][j].y;
                    newStage[removeY][removeX] =  <Cell type = {emptyBlock().color}/>;
                    heights[removeX].number++;
                    if (heights[removeX].minHeight < removeY) {
                        heights[removeX].minHeight = removeY;
                    }
                }
            }
        }
        while (!emptyHeights(heights)) {
            for (let i = 0; i < heights.length; i++) {
                if (heights[i].number !== 0) {
                    for (let j = heights[i].minHeight; j > 0; j--) {
                        newStage[j][i] = <Cell type = {newStage[j - 1][i].props.type}/>;
                    }
                    newStage[0][i] = <Cell type = {emptyBlock().color}/>;
                    heights[i].number--;
                }
            }
        }
        return newStage;
    }

    return [stage, setStage, resetStage, updateStage, registerCollision, handleRemoval];
}