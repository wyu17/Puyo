import { useState, useEffect, useCallback } from 'react';
import { createStage, STAGE_HEIGHT, STAGE_WIDTH } from '../gameHelpers';
import Cell from '../components/Cell';
import { randomBlock } from '../block';
import { emptyBlock } from '../block';
import { BLOCK } from '../block';

export const useStage = (currentBlock, resetCurrentBlock) => {
    // Initial State
    const [stage, setStage] = useState(Array.from(Array(STAGE_HEIGHT), () => new Array(STAGE_WIDTH).fill(<Cell type = {emptyBlock().color}/>)));

    const updateStage = useCallback ((currentBlock, prevStage) => {
        let newStage = createStage();
        // Will need to implement some form of keeping blocks saved
        currentBlock.shape.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value !== 0) {
                    // to:do guarantee different colours between the top and bottom
                    // add some conditions to prevent out of bounds
                    newStage[y + currentBlock.position.y][x + currentBlock.position.x] = <Cell type = {currentBlock.color}/>;
                }
            });
        });
        return newStage;
    }, []);

    const resetStage = useCallback((currentBlock) => {
        let newStage = createStage();
        newStage = updateStage(currentBlock, newStage);
        return newStage;
    }, [updateStage]);

    return [stage, setStage, resetStage, updateStage];
}