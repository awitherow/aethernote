import 'flatpickr/dist/flatpickr.min.css'
import './Planner.css'
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import Flatpickr from 'react-flatpickr'

import {
  setDay,
} from '../redux/actions'

const Planner = ({ setDay, planner }) => (
  <div id="planner-page">
    <div className="add-button-container">
      <button>Add Item</button>
    </div>

    <div className="date-picker">
      <Flatpickr options={{
        defaultDate: planner.day,
        altFormat: 'F j, Y',
      }} onChange={(v) => setDay(v)}/>
    </div>

    <div className="card">
      <p>Most Important Tasks</p>
      
    </div>
  </div>
)

Planner.propTypes = {
  setDay: PropTypes.func.isRequired,
  planner: PropTypes.object.isRequired,
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