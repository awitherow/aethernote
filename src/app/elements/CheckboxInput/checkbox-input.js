import React, { PropTypes } from 'react';

export default function CheckboxInput({
  id,
  label,
  defaultChecked,
  onClick,
}){
  return (
    <fieldset>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type="checkbox"
        defaultChecked={defaultChecked}
        onClick={onClick}
        />
    </fieldset>
  );
}

CheckboxInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  defaultChecked: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};
