import React from 'react';

import { createStage } from '../gameHelpers';
import Stage from './Stage';
import Display from './Display';
import StartButton from './StartButton';

const Puyo = () => {
  return (
    <div>
      <Stage stage = {createStage()} />
      <aside>
        <div>
          <Display text="Score" />
        </div>
        <StartButton />
      </aside>
    </div>
  );
};

export default Puyo;
