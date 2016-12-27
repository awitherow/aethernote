import React, { Component, PropTypes } from 'react'
import List from '../../components/molecules/List'

export default class Habit extends Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
    entries: PropTypes.array.isRequired,
    submitEdit: PropTypes.func.isRequired,
    // redux functions
    editItem: PropTypes.func.isRequired,
  }

  render() {
    return (
      <List
        type={this.props.type}
        entries={this.props.entries}
        classModifier="habit__list"
        edit={this.props.editItem}
        submitEdit={this.props.submitEdit}
        />
    )
  }
}
