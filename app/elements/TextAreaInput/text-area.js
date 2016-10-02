import React, { PropTypes } from 'react';

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
        defaultValue={value}
        />
    </fieldset>
  );
}

TextAreaInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
