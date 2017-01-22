import React, { Component, PropTypes, cloneElement } from 'react'

class Aether extends Component{
  render() {
    return (
      <div className="aether">
        {cloneElement(this.props.children, null)}
      </div>
    )
  }
}

Aether.propTypes = {
  children: PropTypes.element.isRequired,
}

export default Aether