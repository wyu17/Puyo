import { useState } from 'react';
import { PUYO_COL, PUYO_ROW, rotationPosition } from '../gameHelpers';

export const useCurrentBlock = () => {
    // dir = 0 is up, dir = 1 is right, dir = 2 is down, dir = 3 is pointing left
    // Initial state, never used anyway
    const [currentBlock, setCurBlock] = useState({
        position: { x: PUYO_COL, y: PUYO_ROW },
        position2: {x: PUYO_COL, y: PUYO_ROW + 1},
        color: 'EMPTY',
        color1: 'EMPTY',
        dir: 0
    });
    
    const updateCurPos = (prev, x, y) => {
        return {
            position: {x : (prev.position.x += x), y: (prev.position.y += y)},
            position2: {x : (prev.position2.x += x), y: (prev.position2.y += y)},
            color: prev.color,
            color1: prev.color1,
            dir: prev.dir
        };
    };

    const resetCurPos = (upperColor, lowerColor) => {
        return {
            position: { x: PUYO_COL, y: PUYO_ROW },
            position2: {x: PUYO_COL, y: PUYO_ROW + 1},
            color: upperColor,
            color1: lowerColor,
            dir: 0
        };
    };

    const rotateCurBlock = (prev) => {
        let newDir = (prev.dir + 1 ) % 4;
        let newPositions = rotationPosition(prev, newDir);
        return {
            position: newPositions.position,
            position2: newPositions.position2,
            color: prev.color,
            color1: prev.color1,
            dir: newDir
        };
    };

    return [currentBlock, setCurBlock, updateCurPos, resetCurPos, rotateCurBlock];
}