import React, { Component, PropTypes } from 'react'

import FlexibleInput from '../../atoms/FlexibleInput'
import Dropdown from '../../atoms/Dropdown'

import * as entryService from '../../../api/entries'
import { categories } from '../../../lib/schema'

const initialState = {
  content: '',
}

export default class AddThing extends Component {
  state = { ...initialState }

  static propTypes = {
    type: PropTypes.string.isRequired,
    // redux functions
    toggleLoading: PropTypes.func.isRequired,
  }

  static contextTypes = {
    getEntries: PropTypes.func.isRequired,
  }

  componentWillReceiveProps(nextProps) {
    this.resetState(nextProps.type)
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
    this.props.toggleLoading(true)
    entryService.add({
      ...this.state,
      type: this.props.type,
    }, () => {
      this.resetState()
      this.context.getEntries()
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
            <Dropdown
              id="prio"
              label="How important is this?"
              options={[1, 2, 3]}
              defaultValue={1}
              handleChange={(e) =>
                this.handleChange('prio', e.target.value)
              }
              />
          ) : null}

          {this.props.type === 'journal' ? (
            <Dropdown
              id="journal-type"
              label="Journal Entry Type"
              options={categories.journal}
              defaultValue={categories.journal[0]}
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
