import './journal.scss'
import React, { Component, PropTypes } from 'react'
import moment from 'moment'

import ListGroup from '../../components/molecules/ListGroup'

import { getToday, getYestereday } from '../../lib/helpers'
import categories from '../../lib/schema/categories'

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
    day: getToday(),
  }

  filterEntries = (category) => {
    const date = category === 'goals' ? getYestereday() : this.state.day
    return this.props.things.filter(thing =>
      (new Date(thing.created).setHours(0, 0, 0, 0) === date) &&
      (thing.category === category)
    )
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

        <h2>{moment(this.state.day).format('MMM Do YY')}</h2>

        {categories.journal.map(category => {
          return (
            <ListGroup
              key={category}
              category={category}
              things={this.filterEntries(category)}
              editItem={this.editItem}
              removeItem={this.props.removeItem}
              />
          )
        })}

      </div>
    )
  }
}
