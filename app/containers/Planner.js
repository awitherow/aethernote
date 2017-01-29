import 'flatpickr/dist/flatpickr.min.css'
import './Planner.css'
import React, { Component } from 'react'
import { connect } from 'react-redux'

import Flatpickr from 'react-flatpickr'

import {
  setDay,
} from '../redux/actions'

class Planner extends Component {
  render() {
    return (
      <div id="planner-page">
        <div className="add-button-container">
          <button>Add Item</button>
        </div>

        <div className="date-picker">
          <Flatpickr onChange={(v) => this.props.setDay(v)}/>
        </div>

      </div>
    )
  }
}

const mapStateToProps = ({ planner }) => ({
  planner,
})

const mapDispatchToProps = dispatch => ({
  setDay: (v) => dispatch(setDay(v)),
})

const ConnectedPlanner = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Planner)

export default ConnectedPlanner