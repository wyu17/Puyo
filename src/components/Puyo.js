import React from 'react';

import { createStage , STAGE_HEIGHT, STAGE_WIDTH, rotationPosition } from '../gameHelpers';
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
  const [score, setScore] = useState(0);
  const [currentBlock, setCurBlock, updateCurPos, resetCurPos, rotateCurBlock] = useCurrentBlock();
  const [stage, setStage, resetStage, updateStage, registerCollision] = useStage(currentBlock);

  console.log("rerender");

  const checkBoundaries = (currentBlock, xdir, ydir) => {
    let xPos = currentBlock.position.x;
    let xPos2 = currentBlock.position2.x;
    let yPos2 = currentBlock.position2.y;
    // STAGE_HEIGHT - 2 because 0 based indexing on coordinates, and position counts the top block so must end one earlier
    if ((xPos2 === 0 && xdir === -1) || (xPos === STAGE_WIDTH - 1 && xdir === 1) || (yPos2 === STAGE_HEIGHT - 1 && ydir === 1)) {
      return false;
    } else {
      return true;
    }
  }

  const checkRotationBoundaries = (currentBlock) => {
    let xPos = currentBlock.position.x;
    let yPos = currentBlock.position.y;
    let dir = currentBlock.dir;
    let futurePosition = rotationPosition(currentBlock, (dir + 1 ) % 4);
    console.log(futurePosition.position);
    // Prevents rotation from upright to right on the right edge, rotating down on the bottom and rotating to the left on the left edge
    if ((dir === 0 && xPos === STAGE_WIDTH - 1) || (dir === 1 && yPos === STAGE_HEIGHT - 1) || (dir === 2 && xPos === 0) ||
    ((dir === 0 || dir === 3) && stage[futurePosition.position.y][futurePosition.position.x].props.type != "EMPTY") || 
    ((dir === 1 || dir === 2) && stage[futurePosition.position2.y][futurePosition.position2.x].props.type != "EMPTY")) { // Prevents rotating into existing block
      return false;
    } else {
      return true;
    }
  } 

  const checkCollision = (block, stage) => {
    console.log(block.position2.y);
    if ((block.position2.y === STAGE_HEIGHT - 1) || (stage[block.position2.y + 1][block.position2.x].props.type != "EMPTY") || 
    ((block.dir === 1 || block.dir === 3) && stage[block.position.y + 1][block.position.x].props.type != "EMPTY")) {
      return true;
    } else {
      return false;
    }
  }

  const handleCollision = (block, stage) => {
    let upperColor = randomBlock().color;
    let lowerColor = randomBlock().color;
    let newStage = registerCollision(block, stage, upperColor, lowerColor);
    setStage(newStage);
    let newBlock = resetCurPos(upperColor, lowerColor)
    setCurBlock(newBlock);
  }

  const moveBlock = (xdir, ydir, prevPosition, prevPosition2, rotate) => {
    let block;
    if (checkBoundaries(currentBlock, xdir, ydir) && !rotate) { 
      block = updateCurPos(currentBlock, xdir, ydir);
    } else if (checkRotationBoundaries(currentBlock) && rotate) {
      block = rotateCurBlock(currentBlock); 
    } else {
      return;
    }
    let curStage = updateStage(block, stage, prevPosition, prevPosition2)
    setStage(curStage);
    if (checkCollision(block, curStage)) {
      handleCollision(block, curStage);
    } else {
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
      // Copy by value to preserve previous position
      let prevPosition = Object.assign({}, currentBlock.position);
      let prevPosition2 = Object.assign({}, currentBlock.position2);
      if (keyCode === 37) {
          moveBlock(-1, 0, prevPosition, prevPosition2, false);
      } else if (keyCode === 39) {
          moveBlock(1, 0, prevPosition, prevPosition2, false);
      } else if (keyCode === 40) {
          moveBlock(0, 1, prevPosition, prevPosition2, false)
      } else if (keyCode === 38) {
         moveBlock(0, 0, prevPosition, prevPosition2, true);
      }
    }
  }

  // Different screen for game over
  if (!gameOver) {
  return (
    <div className = 'puyo' tabIndex = "0" onKeyDown={e => move(e)}>
      <aside>
        <Display text ="Score" display = {score}/>
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
