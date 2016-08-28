import React, { PropTypes } from 'react';

export default function CheckboxInput({
  id,
  label,
  checked,
  onClick,
}){
  return (
    <fieldset>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onClick={onClick}
        />
    </fieldset>
  );
}

CheckboxInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};
