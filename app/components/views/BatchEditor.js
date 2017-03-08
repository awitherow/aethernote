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
      this.setState({
        loading: false,
        optimalChoices: data,
      })
    })

  setItemAsDue = (id) => {
    // TODO: optimistic update this.setState set this choice id's due to props.due

    plannerService.setItemAsDue(id, this.props.due)
  }

  renderProperBatchEditor = () => {
    switch(this.props.type) {
      case 'VIP_TASKS': return (
        <ul className="vip-tasks">
          {this.state.optimalChoices.map((choice, i) => (
            <li key={i}>
              <Button onClick={() => this.setItemAsDue(choice.id)} className="select">
                {choice.due === this.props.due && <Glyphicon glyph="ok" />}
              </Button>
              <span className="title">{choice.title}</span>
            </li>
          ))}
        </ul>
      )
    }
  }

  render() {
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
  due: PropTypes.number.isRequired,
}

const mapDispatchToProps = dispatch => ({
  closeBatchEditor: (v) => dispatch(closeBatchEditor(v)),
})

const ConnectedBatchEditor = connect(
  null,
  mapDispatchToProps,
)(BatchEditor)

export default ConnectedBatchEditor
