import React, { Component, PropTypes } from 'react'

class Aether extends Component{
  render() {
    return (
      <div className="aether">
        {this.props.children}
      </div>
    )
  }
}

Aether.propTypes = {
  children: PropTypes.element.isRequired,
}

export default Aether