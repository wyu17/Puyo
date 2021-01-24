import { useState, useCallback } from 'react';
import {randomBlock } from '../block';

export const usePlayer = () => {
    const [player, setPlayer] = useState({
            pos: {x:0, y:0},
            shape: [
                [0, 'I', 0, 0],
                [0, 'I', 0, 0]
              ],
            color: randomBlock().color,
            collided: false
        }
    )

    const updatePlayerPos = ({x, y, collided}) => {
        setPlayer(prev => ({
            ...prev,
            pos: {x : (prev.pos.x += x), y: (prev.pos.y += y)},
            collided,
        }))
    }

    const resetPlayer = useCallback(() => {
        setPlayer({
            pos: { x: 10 / 2 - 2, y: 0 },
            shape: [
                [0, 'I', 0, 0],
                [0, 'I', 0, 0]
              ],
            color: randomBlock().color,
            collided: false
        })
    }, [])

    return [player, updatePlayerPos, resetPlayer];
}