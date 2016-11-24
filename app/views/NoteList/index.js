import './styles/note-list.scss'
import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'

import * as noteService from '../../api/notes'
import { statusTypes } from './config'

import Dropdown from '../../elements/Dropdown'

import NoteItem from './components/NoteItem'
import EditNote from './components/EditNote'
import AddNote from '../../elements/AddNote'

class NoteList extends Component {
  static propTypes = {
    notes: PropTypes.array.isRequired,
  }

  static contextTypes = {
    update: PropTypes.func.isRequired,
    getNotes: PropTypes.func.isRequired,
  }

  state = {
    editor: {
      hidden: true,
      note: {},
    },
    status: 'inbox',
    activeNotes: 0,
  }

  removeNote = (id) => {
    this.context.update('loading', true)
    noteService.remove(id, () => this.context.getNotes())
  }

  editNote = (id) => {
    const { notes } = this.props
    let note = notes.filter(note => note.id === id)[0]
    if (!note) return
    this.setState({
      editor: {
        hidden: false,
        note,
      },
    })
  }

  submitEdit = (edits) => {
    noteService.update(this.state.editor.note, edits, () => {
      this.context.getNotes()
    })
  }

  closeEditor = () => {
    this.setState({
      editor: {
        hidden: true,
        note: {},
      },
    })
  }

  handleChange = (whatToChange, change) => {
    switch (whatToChange) {
      case 'status': this.setState({ status: change }); break
      default: return
    }
  }

  filter(notes) {
    let filteredNotes = notes.filter(note => note.status === this.state.status)
    if (this.state.activeNotes !== filteredNotes.length) {
      this.setState({ activeNotes: filteredNotes.length })
    }
    return filteredNotes
  }

  render() {
    const { editor, activeNotes } = this.state
    const { notes } = this.props
    const noteListClasses = classnames('note-list', {
      'hidden': !editor.hidden,
    })

    return (
      <div className="note-page" key="note-page">

        <EditNote
          hidden={editor.hidden}
          note={editor.note}
          onSubmit={this.submitEdit}
          onClose={this.closeEditor}
          onRemove={this.removeNote}
          />

        <div className={noteListClasses}>
          <div className="sub-header">
            <h2 className="note-list__page-title">
              Notes <span>({activeNotes})</span>
            </h2>
            <button
              className="refresh-notes"
              onClick={this.context.getNotes}>
              &#8635;
            </button>
          </div>

          <div className="note-list__sort">
            <Dropdown
              id="status-types"
              label="Status"
              options={statusTypes}
              defaultValue={this.state.status}
              handleChange={e => this.handleChange('status', e.target.value)}
              />
          </div>

          <ul className="note-list__list">
            {this.filter(notes).map(note =>
              <NoteItem
                key={note.id}
                note={note}
                removeNote={this.removeNote}
                editNote={this.editNote}
                />
            )}
          </ul>

          <AddNote
            getNotes={this.context.getNotes}
            type="note"
            />

        </div>
      </div>
    )
  }
}

export default NoteList
