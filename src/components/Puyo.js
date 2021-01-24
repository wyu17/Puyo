import React from 'react';

import { createStage as createNewStage } from '../gameHelpers';
import Stage from './Stage';
import Display from './Display';
import Button from './Button';

import { useState } from 'react';
import { usePlayer } from '../hooks/usePlayer';
import { useStage } from '../hooks/useStage';

import "./Puyo.css";


const Puyo = () => {
  // GameOver is initially false
  const [gameOver, setGameOver] = useState(false);

  const [player, updatePlayerPos, resetPlayer] = usePlayer();
  const [stage, setStage] = useStage(player);

  console.log("rerender");

  const moveBlock = dir => {
    updatePlayerPos ({x: dir, y: 0});
  }
  
  const startGame = () => {
    console.log('true');
    setStage(createNewStage());
    resetPlayer();
  }
  
  const drop = () => {
    updatePlayerPos({ x: 0, y : 1, collided: false })
  }
  
  const dropPlayer = () => {
    drop();
  }
  
  const move = ({ keyCode }) => {
    if (!gameOver) {
      if (keyCode === 37) {
          moveBlock(-1);
      } else if (keyCode === 39) {
          moveBlock(1);
      } else if (keyCode === 40) {
          dropPlayer()
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
      <Stage stage = {stage} />
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
