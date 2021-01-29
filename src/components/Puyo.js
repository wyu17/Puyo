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
  const [stage, setStage, resetStage, updateStage, registerCollision] = useStage(currentBlock);

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

  const checkRotationBoundaries = (currentBlock) => {
    let xPos = currentBlock.position.x;
    let yPos = currentBlock.position.y;
    let dir = currentBlock.dir;
    // Prevents rotation from upright to right on the right edge, rotating down on the bottom and rotating to the left on the left edge
    if ((dir === 0 && xPos === STAGE_WIDTH - 1) || (dir === 1 && yPos === STAGE_HEIGHT - 1) || (dir === 2 && xPos === 0)) {
      return false;
    } else {
      return true;
    }
  } 

  const checkCollision = (block, stage) => {
    console.log(block.position.y);
    if (block.position.y === STAGE_HEIGHT - 2) {
      return true;
    } else {
      return false;
    }
  }

  const handleCollision = (block, stage) => {
    console.log("collision!");
    let upperColor = randomBlock().color;
    let lowerColor = randomBlock().color;
    let newStage = registerCollision(block, stage, upperColor, lowerColor);
    setStage(newStage);
    setCurBlock(resetCurPos(upperColor, lowerColor));
  }

  const rotateBlock = (prevPosition, prevPosition2) => {
    if (checkRotationBoundaries(currentBlock)){
      let block = rotateCurBlock(currentBlock);
      setCurBlock(block);
      setStage(updateStage(block, stage, prevPosition, prevPosition2));
    }
  }

  const moveBlock = (xdir, ydir, prevPosition, prevPosition2) => {
    if (checkBoundaries(currentBlock, xdir, ydir)) {
      let block = updateCurPos(currentBlock, xdir, ydir);
      setStage(updateStage(block, stage, prevPosition, prevPosition2));
      if (checkCollision(block, stage)) {
        handleCollision(block, stage);
      }
      setCurBlock(block);
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
      let prevPosition = Object.assign({}, currentBlock.position);
      let prevPosition2 = Object.assign({}, currentBlock.position2);
      if (keyCode === 37) {
          moveBlock(-1, 0, prevPosition, prevPosition2);
      } else if (keyCode === 39) {
          moveBlock(1, 0, prevPosition, prevPosition2);
      } else if (keyCode === 40) {
          moveBlock(0, 1, prevPosition, prevPosition2)
      } else if (keyCode === 38) {
         rotateBlock(prevPosition, prevPosition2);
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
