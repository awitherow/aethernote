import React from 'react'
import './styles/overlay.scss'

const { string } = React.PropTypes

export default function Overlay({ type }) {
  let content
  switch (type) {
    case 'error': content = 'error'; break
    case 'loading': content = 'loading'; break
  }
  return <p className="overlay">{content}</p>
}

Overlay.propTypes = {
  type: string.isRequired,
}
