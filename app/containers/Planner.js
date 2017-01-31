import 'flatpickr/dist/flatpickr.min.css'
import './Planner.css'
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import Flatpickr from 'react-flatpickr'

import {
  setDay,
  toggleLoading,
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
    return (
        <div id="planner-page">
          <div className="add-button-container">
            <button>Add Item</button>
          </div>

          <div className="date-picker">
            <Flatpickr options={{
              defaultDate: this.props.planner.day,
              altFormat: 'F j, Y',
            }} onChange={(v) => this.props.setDay(v)}/>
          </div>

          <div className="card">
            <p>Most Important Tasks</p>
            {this.state.VIPTasks.length > 0 ? (
              <ul>
                {this.state.VIPTasks.map((task, i) => (
                  <li>{task.title}</li>
                ))}
              </ul>
            ) : <p>No tasks in doing! Time to prioritize!</p>}
          </div>
        </div>
    )
  }
}

Planner.propTypes = {
  // redux actions
  setDay: PropTypes.func.isRequired,
  toggleLoading: PropTypes.func.isRequired,
  // redux state
  loading: PropTypes.bool.isRequired,
  authenticated: PropTypes.bool.isRequired,
  user: PropTypes.string.isRequired,
  planner: PropTypes.object.isRequired,
}

const mapStateToProps = ({ loading, authenticated, user, planner }) => ({
  loading,
  authenticated,
  user,
  planner,
})

const mapDispatchToProps = dispatch => ({
  setDay: (v) => dispatch(setDay(v)),
  toggleLoading: (v) => dispatch(toggleLoading(v)),
})

const ConnectedPlanner = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Planner)

export default ConnectedPlanner