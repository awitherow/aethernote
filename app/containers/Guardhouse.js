import React from 'react'

export default function Guardhouse({ children }) {
  return (
        <div>
            {children}
        </div>
  )
}

Guardhouse.propTypes = {
  children: React.PropTypes.element.isRequired,
}