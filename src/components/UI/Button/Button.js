import React from 'react';
import classes from './Button.module.css';

// multiple classes for buttons .Danger .Success so we use a list/array
const button = (props) => (
    <button
      disabled={props.disabled}
      className={[classes.Button, classes[props.btnType]].join(' ')}
      onClick={props.clicked}>{props.children}
    </button>
);

export default button;
