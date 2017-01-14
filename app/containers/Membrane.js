import React from 'react'

export default function Membrane({ children }) {
  return (
        <div className="membrane">
            {children}
        </div>
  )
}

Membrane.propTypes = {
  children: React.PropTypes.element.isRequired,
}