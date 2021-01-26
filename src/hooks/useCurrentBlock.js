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
        color: 'EMPTY',
        color1: 'EMPTY',
        collided: false
    });
    
    const updateCurPos = (prev, x, y) => {
        return {
            position: {x : (prev.position.x += x), y: (prev.position.y += y)},
            shape: prev.shape,
            color: prev.color,
            color1: prev.color1,
            collided: prev.collided,
        };
    };

    const resetCurPos = (bb, dd) => {
        return {
            position: { x: PUYO_COL, y: PUYO_ROW },
            shape: [
                ['I'],
                ['I']
              ],
            color: bb,
            color1: dd,
            collided: false,
        };
    };

    return [currentBlock, setCurBlock, updateCurPos, resetCurPos];
}