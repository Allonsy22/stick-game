import React from 'react';
import './Button.css';

const Button = (props) => {
  const { type, text, onClickHandler } = props;
  return (
    <button onClick={onClickHandler} className={`Button ${type}`}>{text}</button>
  )
};

export default Button;