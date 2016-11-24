import React, { PropTypes } from 'react'

export default function FlexibleInput({
  id,
  label,
  defaultValue,
  type,
  onChange,
}){
  let fieldClass = `${id}-field`
  return (
    <fieldset className={fieldClass}>
      <label htmlFor={id}>{label}</label>
      <input
        key={id}
        id={id}
        type={type}
        defaultValue={defaultValue}
        onChange={onChange}
        />
    </fieldset>
  )
}

FlexibleInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  defaultValue: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired, // accepts "text", "password" atm.
  onChange: PropTypes.func.isRequired,
}
