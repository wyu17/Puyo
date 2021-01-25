import React from 'react';

import { createStage as createNewStage } from '../gameHelpers';
import Stage from './Stage';
import Display from './Display';
import Button from './Button';

import { useState } from 'react';
import { useCurrentBlock } from '../hooks/useCurrentBlock';
import { useStage } from '../hooks/useStage';

import "./Puyo.css";


const Puyo = () => {
  // GameOver is initially false
  const [gameOver, setGameOver] = useState(false);
  const [currentBlock, setCurBlock, updateCurPos, resetCurPos] = useCurrentBlock();
  const [stage, setStage, resetStage, updateStage] = useStage(currentBlock);

  console.log("rerender");

  const moveBlock = (xdir, ydir) => {
    setCurBlock(updateCurPos(currentBlock, xdir, ydir));
    setStage(updateStage(currentBlock, stage));
  }
  
  const startGame = () => {
    setCurBlock(resetCurPos());
    setStage(resetStage(currentBlock));
  }
  
  const move = ({ keyCode }) => {
    if (!gameOver) {
      if (keyCode === 37) {
          moveBlock(-1, 0);
      } else if (keyCode === 39) {
          moveBlock(1, 0);
      } else if (keyCode === 40) {
          moveBlock(0, 1)
      }
    }
  }

  // Different screen for game over
  if (!gameOver) {
  return (
    <div className = 'puyo' tabIndex = "0" onKeyDown={e => move(e)}>
      <aside>
        <Display text="Score" />
        <div className = "startButton">
          <Button callBack = { startGame } text = "New Game"/>
        </div>
      </aside>
      <Stage stage = { stage } />
    </div>
  );
  } else {
    return (
      <div className = "startButton">
      <Button callBack = { startGame } text = "New Game"/>
      </div>
    )
  }
};

export default Puyo;
