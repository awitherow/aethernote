import './BatchEditor.css'
import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames'

import {
  Glyphicon,
  Button,
} from 'react-bootstrap'

import {
  closeBatchEditor,
} from '../../redux/actions'

import * as plannerService from '../../api/planner'

class BatchEditor extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.open) {
      this.setState({ loading: true })
      this.getOptimalChoices(nextProps.type)
    }
  }

  getOptimalChoices = (type) =>
    plannerService.getOptimalChoicesFor(type, ({ data }) => {
      console.log('hello!')
      this.setState({
        loading: false,
        optimalChoices: data,
      })
    })

  renderProperBatchEditor = () => {
    switch(this.props.type) {
      case 'VIP_TASKS': return (
        <ul className="">
          {this.state.optimalChoices.map((choice, i) => {
            return <li key={i}>{choice.title}</li>
          })}
        </ul>
      )
    }
  }

  render() {
    console.log(this.state)
    return (
      <div className={classnames('batch-editor overlay', {
        'open': this.props.open,
      })}>
        <header>
          <Button onClick={this.props.closeBatchEditor}>
            <Glyphicon glyph="chevron-left" />
          </Button>
        </header>

        <content>
          {this.state.loading ? (
            <p>Loading</p>
          ) : this.renderProperBatchEditor()}
        </content>
      </div>
    )
  }
}

BatchEditor.defaultProps = {
  type: '',
}

BatchEditor.propTypes = {
  closeBatchEditor: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
}

const mapDispatchToProps = dispatch => ({
  closeBatchEditor: (v) => dispatch(closeBatchEditor(v)),
})

const ConnectedBatchEditor = connect(
  null,
  mapDispatchToProps,
)(BatchEditor)

export default ConnectedBatchEditor
