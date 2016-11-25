import './styles/index.scss'
import React, { Component, PropTypes } from 'react'
import moment from 'moment'
import AddNote from '../../elements/AddNote'

export default class Journal extends Component {
  static propTypes = {
    notes: PropTypes.array.isRequired,
  }

  static contextTypes = {
    update: PropTypes.func.isRequired,
    getNotes: PropTypes.func.isRequired,
  }

  state = {
    selectedDay: new Date().setHours(0, 0, 0, 0),
  }

  getEntriesFromSelectedDay = (dateCreated) => {
    const entryDay = new Date(dateCreated).setHours(0, 0, 0, 0)
    return this.state.selectedDay === entryDay
  }

  render () {
    return (
      <div className="journal" key="journal-page">

        <h2>{moment(this.state.selectedDay).format('MMM Do YY')}</h2>

        <ul>
          {this.props.notes
            .filter(e => this.getEntriesFromSelectedDay(e.created))
            .map(e => <li key={e.created}>{e.content}</li>)}
        </ul>

        <AddNote type="journal" />

      </div>
    )
  }
}
