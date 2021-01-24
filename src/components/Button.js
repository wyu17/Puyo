import React from 'react';
import "./Button.css";

const Button = ({callBack, text}) => (
  <button className = "button" onclick = {callBack}>{text}</button>
)

export default Button;