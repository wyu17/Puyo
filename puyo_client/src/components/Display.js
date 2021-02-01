import React from 'react';
import "./Display.css";

const Display = (props) => (
  <div className = "Display"> {props.text} {props.display} </div>
)

export default Display;