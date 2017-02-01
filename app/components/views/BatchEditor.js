import './BatchEditor.css'
import React, { PropTypes, Component } from 'react'
import classnames from 'classnames'

class BatchEditor extends Component {
  renderProperBatchEditor = () => {
    switch(this.props.type) {
      case 'VIP_TASKS': return (
        <p>{this.props.type}</p>
      )
    }
  }

  render() {
    return (
      <div className={classnames('batch-editor overlay', {
        'open': this.props.open,
      })}>
        {this.renderProperBatchEditor()}
      </div>
    )
  }
}

BatchEditor.propTypes = {
  type: PropTypes.string.isRequired,
  open: PropTypes.string.isRequired,
}

export default BatchEditor
