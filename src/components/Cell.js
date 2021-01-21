import React from 'react';
import { BLOCK } from '../block';
import './Cell.css';

const Cell = ({ type }) => (
  <div type = {type} className={BLOCK[type].color}>
    celldoom
    </div>
)

export default Cell;