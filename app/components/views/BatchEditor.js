import React, { PropTypes, Component } from 'react'

class BatchEditor extends Component {
  render() {
    return (
      <div>
        {this.props.type}
      </div>
    )
  }
}

BatchEditor.propTypes = {
  type: PropTypes.string.isRequired,
}

export default BatchEditor
