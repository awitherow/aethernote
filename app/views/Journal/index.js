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
    // redux
    editItem: PropTypes.func.isRequired,
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
              editItem={this.props.editItem}
              />
          )
        })}

      </div>
    )
  }
}
