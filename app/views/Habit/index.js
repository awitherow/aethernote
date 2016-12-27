import React, { Component, PropTypes } from 'react'
import List from '../../components/molecules/List'

export default class Habit extends Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
    entries: PropTypes.array.isRequired,
    // redux functions
    openEditor: PropTypes.func.isRequired,
  }

  editItem = (id) => {
    const { entries } = this.props
    let note = entries.filter(note => note.id === id)[0]
    if (!note) return
    this.props.openEditor(note)
  }

  render() {
    return (
      <List
        type={this.props.type}
        entries={this.props.entries}
        classModifier="habit__list"
        edit={this.editItem}
        />
    )
  }
}
