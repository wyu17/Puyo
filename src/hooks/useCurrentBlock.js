import { useState, useCallback } from 'react';
import {randomBlock } from '../block';
import { PUYO_COL, PUYO_ROW } from '../gameHelpers';

export const useCurrentBlock = () => {
    // Initial state
    const [currentBlock, setCurBlock] = useState({
        position: { x: PUYO_COL, y: PUYO_ROW },
        shape: [
            ['I'],
            ['I']
          ],
        color: randomBlock().color,
        collided: false
    });
    
    const updateCurPos = (prev, x, y) => {
        return {
            position: {x : (prev.position.x += x), y: (prev.position.y += y)},
            shape: prev.shape,
            color: prev.color,
            collided: prev.collided,
        };
    };

    const resetCurPos = () => {
        return {
            position: { x: PUYO_COL, y: PUYO_ROW },
            shape: [
                ['I'],
                ['I']
              ],
            color: randomBlock().color,
            collided: false,
        };
    };

    return [currentBlock, setCurBlock, updateCurPos, resetCurPos];
}