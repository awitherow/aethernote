import React, { Component, PropTypes } from 'react'
import AddNote from '../../elements/AddNote'

export default class Journal extends Component {
  static propTypes = {
    notes: PropTypes.array.isRequired,
  }

  static contextTypes = {
    update: PropTypes.func.isRequired,
    getNotes: PropTypes.func.isRequired,
  }

  render () {
    return (
      <div>
        <ul>
          {this.props.notes.map(journalEntry =>
            <li>{journalEntry.content}</li>
          )}
        </ul>

        <AddNote
          getNotes={this.context.getNotes}
          type="journal"
          />
      </div>
    )
  }
}
