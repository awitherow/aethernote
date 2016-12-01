import React, { Component, PropTypes } from 'react'

import FlexibleInput from '../../atoms/FlexibleInput'
import CheckboxInput from '../../atoms/CheckboxInput'
import Dropdown from '../../atoms/Dropdown'

import * as thingService from '../../../api/notes'

const journalCategories = [
  'progress',
  'dream',
  'gratitude',
  'other',
]

const initialState = {
  content: '',
}

export default class AddThing extends Component {
  state = { ...initialState }

  static propTypes = {
    type: PropTypes.string.isRequired,
  }

  static contextTypes = {
    update: PropTypes.func.isRequired,
    getThings: PropTypes.func.isRequired,
  }

  resetState = () => {
    for (let thing in this.state) {
      if (thing) {
        delete this.state[thing]
      }
    }
    this.setState(...this.state, initialState)
  }

  addNote = (e) => {
    e.preventDefault()
    this.context.update('loading', true)
    thingService.add({
      ...this.state,
      type: this.props.type,
    }, () => {
      this.resetState()
      this.context.getThings()
    })
  }

  handleChange = (type, val) => this.setState({ [type]: val })

  render() {
    return (
      <form className="note-list__add-note" onSubmit={this.addNote}>
        <FlexibleInput
          id="note"
          label="Awaiting changes..."
          type="text"
          value={this.state.content}
          onChange={(e) => this.handleChange('content', e.target.value)}
          />

          {this.props.type === 'note' ? (
            <CheckboxInput
              id="prio"
              label="Important task?"
              defaultChecked={false}
              onClick={(e) => this.handleChange('prio', e.target.checked)}
              />
          ) : null}

          {this.props.type === 'journal' ? (
            <Dropdown
              id="journal-type"
              label="Journal Entry Type"
              options={journalCategories}
              defaultValue={journalCategories[0]}
              handleChange={(e) =>
                this.handleChange('category', e.target.value)
              }
              />
          ) : null}

        <button>&#43;</button>
      </form>
    )
  }
}
