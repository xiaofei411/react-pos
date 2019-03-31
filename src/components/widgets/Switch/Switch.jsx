import React from 'react';
import { Field } from 'redux-form';

let Switch = props => {
  const { wrapperClass, label, title1, title2, name, disabled } = props;
  
  return (
    <div className={wrapperClass}>
      <span>{label}</span>
      <span>{title1}</span>
      <label className="switch switch-3d switch-primary">
        <Field
          name={name}
          component="input"
          type="checkbox"
          value="male"
          className="switch-input"
          disabled={disabled} />
        <span className="switch-label"></span>
        <span className="switch-handle"></span>
      </label>
      <span>{title2}</span>
    </div>
  )
}

export default Switch;