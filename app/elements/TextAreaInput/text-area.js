import React, { PropTypes } from 'react';

export default function TextAreaInput({
  id,
  label,
  defaultValue,
  onChange,
}){
  return (
    <fieldset>
      <label htmlFor={id}>{label}</label>
      <textarea
        id={id}
        type="text"
        defaultValue={defaultValue}
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
