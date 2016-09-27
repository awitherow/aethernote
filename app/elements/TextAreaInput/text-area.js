import React, { PropTypes } from 'react';
import './styles/text-area.scss';

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
        onChange={onChange}
        >{value}</textarea>
    </fieldset>
  );
}

TextAreaInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
