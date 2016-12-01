import './styles/note-list.scss'
import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'

import * as noteService from '../../api/notes'
import { categories } from './config'

import Dropdown from '../../components/atoms/Dropdown'
import ThingsList from '../../components/molecules/ThingsList'

import EditNote from './components/EditNote'


class NoteList extends Component {
  static propTypes = {
    notes: PropTypes.array.isRequired,
    type: PropTypes.string.isRequired,
  }

  static contextTypes = {
    update: PropTypes.func.isRequired,
    getNotes: PropTypes.func.isRequired,
  }

  static defaultProps = {
    type: 'note',
  }

  state = {
    editor: {
      hidden: true,
      note: {},
    },
    category: 'inbox',
    activeNotes: 0,
  }

  removeItem = (id) => {
    this.context.update('loading', true)
    noteService.remove(id, () => this.context.getNotes())
  }

  editItem = (id) => {
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
      case 'category': this.setState({ category: change }); break
      default: return
    }
  }

  filter(notes) {
    let filteredNotes =
      notes.filter(note => note.category === this.state.category)
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
          onRemove={this.removeItem}
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
              id="category-types"
              label="Category"
              options={categories}
              defaultValue={this.state.category}
              handleChange={e => this.handleChange('category', e.target.value)}
              />
          </div>

          <ThingsList
            type={this.props.type}
            things={this.filter(notes)}
            classModifier="note-list__list"
            edit={this.editItem}
            remove={this.removeItem}
            />

        </div>
      </div>
    )
  }
}

export default NoteList
