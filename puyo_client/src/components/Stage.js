import React from 'react';
import Cell from './Cell';
import { randomBlock } from '../block';
import { emptyBlock } from '../block';
import './Stage.css';

const Stage = (props) => (
  <div className = 'stage'>
    {props.stage}
  </div>
);

export default Stage;
