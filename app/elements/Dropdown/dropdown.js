import React, { PropTypes } from 'react';

const Dropdown = ({
  id,
  label,
  options,
  handleChange,
}) => {
  const fieldsetClasses = `${id}-field`;
  return (
    <fieldset className={fieldsetClasses}>
      <label htmlFor={id}>{label}</label>
      <select id={id} name="select" onChange={handleChange}>
        {options.map(option => {
          let key = options.indexOf(option);
          return <option key={key} value={option}>{option}</option>;
        })}
      </select>
    </fieldset>
  );
};

Dropdown.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default Dropdown;
