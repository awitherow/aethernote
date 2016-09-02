import React, { Component, PropTypes } from 'react';
import * as noteService from '../../servants/notes';

import TextInput from '../../elements/TextInput';
import CheckboxInput from '../../elements/CheckboxInput';

import Note from './components/note';
import Editor from '../Editor';

export default class NoteList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      noteInput: "",
      priority: false,
      notes: [],
      editor: {
        hidden: true,
        note: {}
      },
      filters: {
        archived: false
      }
    };

    this.submit = this.submitEdit.bind(this);
    this.closeEditor = this.closeEditor.bind(this);
    this.removeNote = this.removeNote.bind(this);
    this.editNote = this.editNote.bind(this);
    this.addNote = this.addNote.bind(this);
    this.captureInput = this.captureInput.bind(this);
    this.prioritizeInput = this.prioritizeInput.bind(this);
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
      prio: priority
    }, () => this.getNotes());
    this.setState({ noteInput: "", priority: false });
  }

  editNote(id) {
    const { notes } = this.state;
    let note = notes.filter(note => note.id === id)[0];
    if (!note) return;
    this.setState({
      editor: {
        hidden: false,
        note
      }
    });
  }

  submitEdit(edits) {
    noteService.update(this.state.editor.note, edits, () => this.closeEditor());
  }

  toggleArchive() {
    const { filters } = this.state.filters;
    this.setState({ filters: { archived: !filters.archived }});
  }

  captureInput(e) {
    this.setState({ noteInput: e.target.value });
  }

  prioritizeInput(e) {
    this.setState({ priority: e.target.checked });
  }

  closeEditor(){
    this.setState({
      editor: {
        hidden: true,
        note: {}
      }
    });
    this.getNotes();
  }

  filter(notes) {
    const { filters } = this.state;
    for (let filter in filters) {
      notes = notes.filter(note => note[filter] === filters[filter]);
    }
    return notes;
  }

  render() {
    const { editor, notes, noteInput, priority, filters } = this.state;

    return (
      <div className="main">

      <Editor
        type="note"
        hidden={editor.hidden}
        note={editor.note}
        onSubmit={this.submitEdit}
        onClose={this.closeEditor}
        />

        <h2>notes <span>({notes.length})</span></h2>

        <div className="note-list__sort">
          <CheckboxInput
            id="filter-archived"
            label="View Archived"
            defaultChecked={filters.archived}
            onClick={this.toggleArchive}
            />
        </div>

        <ul className="notes-list">
          {this.filter(notes).map(note =>
            <Note
              key={note.id}
              note={note}
              removeNote={this.removeNote}
              editNote={this.editNote}
              />
          )}
        </ul>
        <form className="add-note" onSubmit={this.addNote}>
          <TextInput
            id="note"
            label="Awaiting changes..."
            defaultValue={noteInput}
            onChange={this.captureInput}
            />
          <CheckboxInput
            id="priority"
            label="Important task?"
            defaultChecked={priority}
            onClick={this.prioritizeInput}
            />
          <input type="submit" />
        </form>
      </div>
    );
  }
}

NoteList.contextTypes = {
  update: PropTypes.func.isRequired
};
