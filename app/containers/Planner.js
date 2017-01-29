import 'flatpickr/dist/flatpickr.min.css'
import './Planner.css'
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import Flatpickr from 'react-flatpickr'

import {
  setDay,
} from '../redux/actions'

const Planner = ({ setDay }) => (
  <div id="planner-page">
    <div className="add-button-container">
      <button>Add Item</button>
    </div>

    <div className="date-picker">
      <Flatpickr onChange={(v) => setDay(v)}/>
    </div>
  </div>
)

Planner.propTypes = {
  setDay: PropTypes.func.isRequired,
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