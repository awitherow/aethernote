import React, { PropTypes } from 'react';
import './styles/text-area.css';

export default function TextAreaInput({
  id,
  label,
  value,
  onChange,
}){
  return (
    <fieldset>
      <label htmlFor={id}>{label}</label>
      <textarea
        id={id}
        type="text"
        value={value}
        onChange={onChange}
        />
    </fieldset>
  );
}

TextAreaInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  defaultValue: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
