import React, { PropTypes } from 'react'

export default function FlexibleInput({
  id,
  label,
  value,
  type,
  onChange,
  autofocus,
}){
  let fieldClass = `${id}-field`
  return (
    <fieldset className={fieldClass}>
      <label htmlFor={id}>{label}</label>
      <input
        key={id}
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        autoFocus={autofocus}
        />
    </fieldset>
  )
}

FlexibleInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired, // accepts "text", "password" atm.
  onChange: PropTypes.func.isRequired,
  autofocus: PropTypes.bool,
}
