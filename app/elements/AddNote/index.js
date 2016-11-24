import React, { Component, PropTypes } from 'react'

import FlexibleInput from '../FlexibleInput'
import CheckboxInput from '../CheckboxInput'

import * as noteService from '../../api/notes'

export default class AddNote extends Component {
  static propTypes = {
    getNotes: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      content: '',
      prio: false,
    }
  }

  addNote = (e) => {
    e.preventDefault()
    const { content, prio } = this.state
    const { type } = this.props
    noteService.add({ content, prio, type }, () => {
      this.setState({ content: "", prio: false })
      this.props.getNotes()
    })
  }

  render() {
    return (
      <form className="note-list__add-note" onSubmit={this.addNote}>
        <FlexibleInput
          id="note"
          label="Awaiting changes..."
          type="text"
          defaultValue=""
          onChange={(e) => this.setState({ content: e.target.value })}
          />
        <CheckboxInput
          id="prio"
          label="Important task?"
          defaultChecked={false}
          onClick={(e) => {
            this.setState({ prio: e.target.checked })
          }}
          />
        <button>&#43;</button>
      </form>
    )
  }
}
