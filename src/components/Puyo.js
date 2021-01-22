import React from 'react';

import { createStage as createNewStage } from '../gameHelpers';
import Stage from './Stage';
import Display from './Display';
import Button from './Button';

import "./Puyo.css";

const Puyo = () => {
  return (
    <div className = 'puyo'>
      <aside>
        <Display text="Score" />
        <Button />
      </aside>
      <Stage stage = {createNewStage()} />
    </div>
  );
};

export default Puyo;
