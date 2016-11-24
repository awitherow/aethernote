import React, { Component } from 'react'
import DayPicker, { DateUtils } from 'react-day-picker'

// http://react-day-picker.js.org/

export default class DatePicker extends Component {
  state = {
    selectedDay: new Date(),
  }

  handleDayClick(e, day, { selected, disabled }) {
    if (disabled) {
      return
    }
    if (selected) {
      this.setState({ selectedDay: null })
    } else {
      this.setState({ selectedDay: day })
    }
  }

  render() {
    return (
      <DayPicker
        initialMonth={ new Date(2016, 1) }
        selectedDays={ day => DateUtils.isSameDay(this.state.selectedDay, day) }
        onDayClick={ this.handleDayClick.bind(this) }
        />
    )
  }
}
