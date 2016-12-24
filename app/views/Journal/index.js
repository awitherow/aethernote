import './journal.scss'
import React, { Component, PropTypes } from 'react'
import moment from 'moment'

import { getToday, getYestereday } from '../../lib/helpers'
import { categories } from '../../lib/schema'

import ListGroup from '../../components/molecules/ListGroup'

export default class Journal extends Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
    entries: PropTypes.array.isRequired,
    removeItem: PropTypes.func.isRequired,
    // redux
    openEditor: PropTypes.func.isRequired,
  }

  static contextTypes = {
    getEntries: PropTypes.func.isRequired,
  }

  state = {
    day: getToday(),
  }

  filterEntries = (category) => {
    const date = category === 'aspirations' ? getYestereday() : this.state.day
    return this.props.entries.filter(thing =>
      (new Date(thing.created).setHours(0, 0, 0, 0) === date) &&
      (thing.category === category)
    )
  }

  editItem = (id) => {
    const { entries } = this.props
    let note = entries.filter(note => note.id === id)[0]
    if (!note) return
    this.props.openEditor(note)
  }

  render () {
    return (
      <div className="journal" key="journal-page">

        <h2>{moment(this.state.day).format('MMM Do YY')}</h2>

        {categories.journal.map(category => {
          return (
            <ListGroup
              key={category}
              category={category}
              entries={this.filterEntries(category)}
              editItem={this.editItem}
              removeItem={this.props.removeItem}
              />
          )
        })}

      </div>
    )
  }
}
