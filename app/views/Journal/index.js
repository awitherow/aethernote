import './styles/index.scss'
import React, { Component, PropTypes } from 'react'
import moment from 'moment'

import ThingsList from '../../components/molecules/ThingsList'

export default class Journal extends Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
    things: PropTypes.array.isRequired,
    removeItem: PropTypes.func.isRequired,
  }

  static contextTypes = {
    update: PropTypes.func.isRequired,
    getThings: PropTypes.func.isRequired,
  }

  state = {
    selectedDay: new Date().setHours(0, 0, 0, 0),
  }

  getEntriesFromSelectedDay = (dateCreated) => {
    const entryDay = new Date(dateCreated).setHours(0, 0, 0, 0)
    return this.state.selectedDay === entryDay
  }

  editItem = (id) => {
    const { things } = this.props
    let note = things.filter(note => note.id === id)[0]
    if (!note) return
    this.context.update('openEditor', note)
  }

  render () {
    return (
      <div className="journal" key="journal-page">

        <h2>{moment(this.state.selectedDay).format('MMM Do YY')}</h2>

        <ThingsList
          type="journal"
          things={this.props.things
            .filter(e => this.getEntriesFromSelectedDay(e.created))
          }
          classModifier="journal"
          edit={this.editItem}
          remove={this.props.removeItem}
          />

      </div>
    )
  }
}
