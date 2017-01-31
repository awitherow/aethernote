import 'flatpickr/dist/flatpickr.min.css'
import './Planner.css'
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import Flatpickr from 'react-flatpickr'

import {
  Panel,
  Button,
} from 'react-bootstrap'

import BatchEditor from '../components/views/BatchEditor'

import {
  setDay,
  toggleLoading,
  openBatchEditor,
} from '../redux/actions'

import * as plannerService from '../api/planner'

class Planner extends Component {
  constructor() {
    super()
    this.state = {
      VIPTasks: [],
    }
  }

  componentDidMount() {
    const { authenticated, user } = this.props
    if (authenticated && user) {
      this.preparePlanner()
    }
  }

  preparePlanner = () => {
    !this.props.loading && this.props.toggleLoading(true)
    plannerService.getPrioTasks({
      due: this.props.planner.day,
      username: this.props.user,
    }, ({ data }) => {
      this.setState({ VIPTasks: data })
      this.props.loading && this.props.toggleLoading(false)
    })
  }

  render() {
    return this.props.batchEditor.hidden ? (
      <div id="planner-page">
        <div className="inner">
            <div className="add-button-container">
              <button>Add Item</button>
            </div>

            <div className="date-picker">
              <Flatpickr options={{
                defaultDate: this.props.planner.day,
                altFormat: 'F j, Y',
              }} onChange={(v) => this.props.setDay(v)}/>
            </div>

            <Panel header="Most Important Tasks">
              {this.state.VIPTasks.length > 0 ? (
                <ul>
                  {this.state.VIPTasks.map((task, i) => (
                    <li>{task.title}</li>
                  ))}
                </ul>
              ) : (
                <div>
                  <p>No tasks in doing!</p>
                  <Button
                    onClick={() => this.props.openBatchEditor('VIP_TASKS')}
                    bsStyle="success">Prioritize yo shit!</Button>
                </div>
              )}
            </Panel>
          </div>
      </div>
    ) : (
      <BatchEditor type={this.props.batchEditor.type} />
    )
  }
}

Planner.propTypes = {
  // redux actions
  setDay: PropTypes.func.isRequired,
  toggleLoading: PropTypes.func.isRequired,
  openBatchEditor: PropTypes.func.isRequired,
  // redux state
  loading: PropTypes.bool.isRequired,
  authenticated: PropTypes.bool.isRequired,
  user: PropTypes.string.isRequired,
  planner: PropTypes.object.isRequired,
  batchEditor: PropTypes.object.isRequired,
}

const mapStateToProps = ({ loading, authenticated, user, planner, batchEditor }) => ({
  loading,
  authenticated,
  user,
  planner,
  batchEditor, 
})

const mapDispatchToProps = dispatch => ({
  setDay: (v) => dispatch(setDay(v)),
  toggleLoading: (v) => dispatch(toggleLoading(v)),
  openBatchEditor: (v) => dispatch(openBatchEditor(v)),
})

const ConnectedPlanner = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Planner)

export default ConnectedPlanner