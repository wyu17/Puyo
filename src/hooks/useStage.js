import { useState, useEffect, useCallback } from 'react';
import { createStage, STAGE_HEIGHT, STAGE_WIDTH } from '../gameHelpers';
import Cell from '../components/Cell';
import { randomBlock } from '../block';
import { emptyBlock } from '../block';
import { BLOCK } from '../block';
import { PUYO_COL, PUYO_ROW } from '../gameHelpers';

export const useStage = (currentBlock, resetCurrentBlock) => {
    // Initial State
    const [stage, setStage] = useState(Array.from(Array(STAGE_HEIGHT), () => new Array(STAGE_WIDTH).fill(<Cell type = {emptyBlock().color}/>)));

    const updateStage = useCallback ((currentBlock, prevStage) => {
        let newStage = createStage();
        // Will need to implement some form of keeping blocks saved
        // to:do guarantee different colours between the top and bottom
        // add some conditions to prevent out of bounds
        newStage[currentBlock.position.y][currentBlock.position.x] = <Cell type = {currentBlock.color}/>;
        newStage[currentBlock.position.y + 1][currentBlock.position.x] = <Cell type = {currentBlock.color1}/>;
        return newStage;
    }, []);

    const resetStage = useCallback((color, color1) => {
        let newStage = createStage();
        newStage[PUYO_ROW][PUYO_COL] = <Cell type = {color}/>;
        newStage[PUYO_ROW + 1][PUYO_COL] = <Cell type = {color1}/>;
        return newStage;
    }, []);

    return [stage, setStage, resetStage, updateStage];
}