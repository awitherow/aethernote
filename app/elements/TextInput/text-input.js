import React, { PropTypes } from 'react';

export default function TextInput({
  id,
  label,
  defaultValue,
  onChange,
}){
  let fieldClass = `${id}-field`;
  return (
    <fieldset className={fieldClass}>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type="text"
        defaultValue={defaultValue}
        onChange={onChange}
        />
    </fieldset>
  );
}

TextInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  defaultValue: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
