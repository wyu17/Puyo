import { useState, useCallback } from 'react';
import {randomBlock } from '../block';
import { PUYO_COL, PUYO_ROW } from '../gameHelpers';

export const useCurrentBlock = () => {
    // dir = 0 is up, dir = 1 is right, dir = 2 is down, dir = 3 is pointing left
    // Initial state, never used anyway
    const [currentBlock, setCurBlock] = useState({
        position: { x: PUYO_COL, y: PUYO_ROW },
        color: 'EMPTY',
        color1: 'EMPTY',
        dir: 0
    });
    
    const updateCurPos = (prev, x, y) => {
        return {
            position: {x : (prev.position.x += x), y: (prev.position.y += y)},
            color: prev.color,
            color1: prev.color1,
            dir: prev.dir
        };
    };

    const resetCurPos = (bb, dd) => {
        return {
            position: { x: PUYO_COL, y: PUYO_ROW },
            color: bb,
            color1: dd,
            dir: 0
        };
    };

    const rotateCurBlock = (prev) => {
        let curX = prev.position.x;
        let curY = prev.position.y;
        let newDir = (prev.dir + 1 ) % 4;
        let newPos;
        if (newDir === 0) {
            newPos = {x: curX, y: curY - 1};
        } else if (newDir === 1) {
            newPos = {x: curX + 1, y: curY + 1};
        } else if (newDir === 2) {
            newPos = {x: curX - 1, y: curY};
        } else if (newDir === 3) {
            newPos = {x: curX, y: curY};
        }
        return {
            position: newPos,
            color: prev.color,
            color1: prev.color1,
            dir: newDir
        };
    };

    return [currentBlock, setCurBlock, updateCurPos, resetCurPos, rotateCurBlock];
}