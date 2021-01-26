import React from 'react';

import { createStage , STAGE_HEIGHT, STAGE_WIDTH } from '../gameHelpers';
import Stage from './Stage';
import Display from './Display';
import Button from './Button';

import { useState } from 'react';
import { useCurrentBlock } from '../hooks/useCurrentBlock';
import { useStage } from '../hooks/useStage';
import { randomBlock } from '../block';

import "./Puyo.css";


const Puyo = () => {
  // GameOver is initially false
  const [gameOver, setGameOver] = useState(false);
  const [currentBlock, setCurBlock, updateCurPos, resetCurPos, rotateCurBlock] = useCurrentBlock();
  const [stage, setStage, resetStage, updateStage] = useStage(currentBlock);

  console.log("rerender");

  const checkBoundaries = (currentBlock, xdir, ydir) => {
    let xPos = currentBlock.position.x;
    let yPos = currentBlock.position.y;
    // STAGE_HEIGHT - 2 because 0 based indexing on coordinates, and position counts the top block so must end one earlier
    if ((xPos === 0 && xdir === -1) || (xPos === STAGE_WIDTH - 1 && xdir === 1) || (yPos === STAGE_HEIGHT - 2 && ydir === 1)) {
      return false;
    } else {
      return true;
    }
  }

  const rotateBlock = () => {
    if (true){
      let block = rotateCurBlock(currentBlock);
      setCurBlock(block);
      setStage(updateStage(block, stage));
    }
  }

  const moveBlock = (xdir, ydir) => {
    if (checkBoundaries(currentBlock, xdir, ydir)) {
      let block = updateCurPos(currentBlock, xdir, ydir)
      setCurBlock(block);
      setStage(updateStage(block, stage));
  }
  }
  
  const startGame = () => {
    // Providing the colours in this file maintains colour state across the current block and the stage
    let upperColor = randomBlock().color;
    let lowerColor = randomBlock().color;
    setCurBlock(resetCurPos(upperColor, lowerColor));
    setStage(resetStage(upperColor, lowerColor));
  }
  
  const move = ({ keyCode }) => {
    if (!gameOver) {
      if (keyCode === 37) {
          moveBlock(-1, 0);
      } else if (keyCode === 39) {
          moveBlock(1, 0);
      } else if (keyCode === 40) {
          moveBlock(0, 1)
      } else if (keyCode === 38) {
         rotateBlock();
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
  )
  } else {
    return (
      <div>
      <h2> Game Over! Do you want to play again? </h2>
      <div className = "startButton">
      <Button callBack = { startGame } text = "New Game"/>
      </div>
      </div>
    )
  }
};

export default Puyo;
