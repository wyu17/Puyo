import React from 'react';

import { STAGE_HEIGHT, STAGE_WIDTH, PUYO_COL, PUYO_ROW, rotationPosition } from '../gameHelpers';
import Stage from './Stage';
import Display from './Display';
import Button from './Button';

import { useState } from 'react';
import { useCurrentBlock } from '../hooks/useCurrentBlock';
import { useStage } from '../hooks/useStage';
import { useInterval } from '../hooks/useInterval';
import { randomBlock } from '../block';

import "./Puyo.css";


const Puyo = () => {
  // GameOver is initially false
  const [gameStart, setGameStart] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [currentBlock, setCurBlock, updateCurPos, resetCurPos, rotateCurBlock] = useCurrentBlock();
  const [stage, setStage, resetStage, updateStage, registerCollision, handleRemoval] = useStage(currentBlock);

  console.log("rerender");

  const checkBoundaries = (currentBlock, xdir, ydir) => {
    let xPos = currentBlock.position.x;
    let xPos2 = currentBlock.position2.x;
    let yPos = currentBlock.position.y;
    let yPos2 = currentBlock.position2.y;
    // Prevent overlapping blocks moving left
    if (xPos > 0) {
      if ((stage[yPos2][xPos2 - 1].props.type !== "EMPTY" && xdir === -1) || 
      ((currentBlock.dir === 0 || currentBlock.dir === 2) && stage[yPos][xPos - 1].props.type !== "EMPTY" && xdir === 1)) {
        return false;
      }
    }
    // PRevent overlapping blocks moving right
    if (xPos < STAGE_WIDTH - 1) {
      if ((stage[yPos2][xPos2 + 1].props.type !== "EMPTY" && xdir === 1)
      || ((currentBlock.dir === 0 || currentBlock.dir === 2) && stage[yPos][xPos + 1].props.type !== "EMPTY" && xdir === 1)) {
        return false;
      }
    }
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
    // Prevents rotation from upright to right on the right edge, rotating down on the bottom and rotating to the left on the left edge
    if ((dir === 0 && xPos === STAGE_WIDTH - 1) || (dir === 1 && yPos === STAGE_HEIGHT - 1) || (dir === 2 && xPos === 0) ||
    ((dir === 0 || dir === 3) && stage[futurePosition.position.y][futurePosition.position.x].props.type !== "EMPTY") || 
    ((dir === 1 || dir === 2) && stage[futurePosition.position2.y][futurePosition.position2.x].props.type !== "EMPTY")) { // Prevents rotating into existing block
      return false;
    } else {
      return true;
    }
  } 

  const checkCollision = (block, stage) => {
    if ((block.position2.y === STAGE_HEIGHT - 1) || (stage[block.position2.y + 1][block.position2.x].props.type !== "EMPTY") || 
    ((block.dir === 1 || block.dir === 3) && stage[block.position.y + 1][block.position.x].props.type !== "EMPTY")) {
      return true;
    } else {
      return false;
    }
  }

  const removablesContains = (array, x, y) => {
    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < array[i].length; j++) {
      if (array[i][j].x === x && array[i][j].y === y) {
        return true;
      }
    }
  }
    return false
  }

  const positionArrayContains = (array, x, y) => {
    for (let i = 0; i < array.length; i++) {
      if (array[i].x === x && array[i].y === y) {
        return true;
      }
    }
    return false;
  }

  // Recursive depth first search to find all connected blocks with the same colour
  const removalHelper = (removables, position, type, stage, x, y) => {
    if (removablesContains(removables, x, y) || positionArrayContains(position, x, y)) {
      return null;
    }
    let newPosition = {x: x, y: y};
    position.push(newPosition);

    // Right
    if (x + 1 < STAGE_WIDTH) {
      if (stage[y][x + 1].props.type === type) {
        let anotherBlock = removalHelper(removables, position, type, stage, x + 1, y);
        if (anotherBlock !== null) {
          position = anotherBlock;
        }
     }
    }
    
    // Under
    if (y + 1 < STAGE_HEIGHT) {
      if (stage[y + 1][x].props.type === type) {
        let anotherBlock = removalHelper(removables, position, type, stage, x, y + 1);
        if (anotherBlock !== null) {
          position = anotherBlock;
        }
      }
    }
    
    // Left
    if (x !== 0) {
      if (stage[y][x - 1].props.type === type) {
        let anotherBlock = removalHelper(removables, position, type, stage, x - 1, y);
        if (anotherBlock !== null) {
          position = anotherBlock;
        }
      }
    }
    
    
    // Over
    if (y !== 0) {
     if (stage[y - 1][x].props.type === type) {
        let anotherBlock = removalHelper(removables, position, type, stage, x, y - 1);
        if (anotherBlock !== null) {
          position = anotherBlock;
        }
      }
    }
    return position;
  }

  const removeBlocks = (stage) => {
    let removables = [];
    let heights = new Array(6);
    heights.fill(0);
    // i = y, j  = x
    for (let y = 0; y < STAGE_HEIGHT; y++) {
      for (let x = 0; x < STAGE_WIDTH; x++) {
          let type = stage[y][x].props.type;
          if (type !== "EMPTY" && !removablesContains(removables, x, y)) {
            let newPosition = [];
            let newRemovables = removalHelper(removables, newPosition, type, stage, x, y);
            if (newRemovables.length > 0) {
              for (let k = 0; k < newRemovables.length; k++) {
                heights[newRemovables[k].x]++;
              }
            }
            removables.push(newRemovables);
          }
      }
    }
    let extraScore = 0;
    for (let i = 0; i < removables.length; i++) {
      if (removables[i].length >= 4) {
          for (let j = 0; j < removables[i].length; j++) {
            extraScore = extraScore + 10;
          }
      }
    }
    let newStage = handleRemoval(stage, removables);
    setStage(newStage);
    return [newStage, extraScore]
  }

  const handleCollision = (block, prevStage) => {
    let upperColor = randomBlock().color;
    let lowerColor = randomBlock().color;
    let scoreMultiplier = 1;
    let allBlocksRemoved = false;
    let newStage = prevStage;
    while (!allBlocksRemoved) {
      let removalResult = removeBlocks(newStage);
      newStage = removalResult[0];
      let newScore = removalResult[1];
      if (newScore === 0) {
        allBlocksRemoved = true;
      } else {
        setScore(score + newScore * scoreMultiplier);
      }
      scoreMultiplier++;
    }
    // The player loses if the space where new blocks are spawned is occupied (i.e not EMPTY)
    if (newStage[PUYO_ROW][PUYO_COL].props.type !== "EMPTY" || newStage[PUYO_ROW + 1][PUYO_COL].props.type !== "EMPTY") {
      setGameStart(false);
      setTimeout(function() {setScore(0)}, 1000);
      setTimeout(function() {setGameOver(true)}, 1000);
      setTimeout(function() {window.location.reload()}, 3500);
    } else {
      newStage = registerCollision(block, newStage, upperColor, lowerColor);
      setStage(newStage);
      let newBlock = resetCurPos(upperColor, lowerColor)
      setCurBlock(newBlock);
    }
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
    setGameOver(false);
    setGameStart(true);
    setScore(0);
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

  const moveWrapper = () => {
    if (gameStart) {
      let prevPosition = Object.assign({}, currentBlock.position);
      let prevPosition2 = Object.assign({}, currentBlock.position2);
      moveBlock(0, 1, prevPosition, prevPosition2, false);
    }
  }

  // Moves the player's block down every 300 milliseconds
  useInterval(() => {
    moveWrapper();
  }, 300);

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
      <h2 className = "gameOver"> Game Over! Better luck next time! </h2>
      </div>
    )
  }
};

export default Puyo;
