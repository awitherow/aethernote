import './styles/note-list.scss';
import React, { Component, PropTypes } from 'react';
import * as noteService from '../../api/notes';
import { statusTypes } from './config';

import FlexibleInput from '../../elements/FlexibleInput';
import CheckboxInput from '../../elements/CheckboxInput';
import Dropdown from '../../elements/Dropdown';

import NoteItem from './components/NoteItem';
import EditNote from './components/EditNote';

export default class NoteList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      noteInput: "",
      priority: false,
      notes: [],
      editor: {
        hidden: true,
        note: {},
      },
      status: 'inbox',
      notesWithStatusType: 0,
    };
  }

  componentDidMount() {
    this.getNotes();
  }

  getNotes() {
    this.context.update('loading', true);
    noteService.get(notes => {
      this.setState({ notes });
      this.context.update('loading', false);
    });
  }

  removeNote(id) {
    this.context.update('loading', true);
    noteService.remove(id, () => this.getNotes());
  }

  addNote(e) {
    e.preventDefault();
    const { noteInput, priority } = this.state;
    noteService.add({
      content: noteInput,
      prio: priority,
    }, () => {
      this.setState({ noteInput: "", priority: false });
      this.getNotes();
    });
  }

  editNote(id) {
    const { notes } = this.state;
    let note = notes.filter(note => note.id === id)[0];
    if (!note) return;
    this.setState({
      editor: {
        hidden: false,
        note,
      },
    });
  }

  submitEdit(edits) {
    noteService.update(this.state.editor.note, edits, () => {
      this.closeEditor();
      this.getNotes();
    });
  }

  closeEditor(){
    this.setState({
      editor: {
        hidden: true,
        note: {},
      },
    });
  }

  filter(notes) {
    let filteredNotes = notes.filter(note => note.status === this.state.status);
    if (this.state.notesWithStatusType !== filteredNotes.length) {
      this.setState({ notesWithStatusType: filteredNotes.length });
    }
    return filteredNotes;
  }

  render() {
    const { editor, notes, notesWithStatusType } = this.state;

    return (
      <div className="note-list">

      <EditNote
        hidden={editor.hidden}
        note={editor.note}
        onSubmit={this.submitEdit.bind(this)}
        onClose={this.closeEditor.bind(this)}
        onRemove={this.removeNote.bind(this)}
        />

        <h2 className="note-list__page-title">
          Notes <span>({notesWithStatusType})</span>
        </h2>

        <div className="note-list__sort">
          <Dropdown
            id="status-types"
            label="Status"
            options={statusTypes}
            handleChange={e => this.setState({ status: e.target.value })}
            />
        </div>

        <ul className="note-list__list">
          {this.filter(notes).map(note =>
            <NoteItem
              key={note.id}
              note={note}
              removeNote={this.removeNote.bind(this)}
              editNote={this.editNote.bind(this)}
              />
          )}
        </ul>

        <form className="note-list__add-note" onSubmit={this.addNote.bind(this)}>
          <FlexibleInput
            id="note"
            label="Awaiting changes..."
            type="text"
            defaultValue=""
            onChange={(e) => this.setState({ noteInput: e.target.value })}
            />
          <CheckboxInput
            id="priority"
            label="Important task?"
            defaultChecked={false}
            onClick={(e) => {
              this.setState({ priority: e.target.checked });
            }}
            />
          <input type="submit" />
        </form>

      </div>
    );
  }
}

NoteList.contextTypes = {
  update: PropTypes.func.isRequired,
};
