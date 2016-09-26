import React, { Component, PropTypes } from 'react';
import * as noteService from '../../api/notes';

import TextInput from '../../elements/TextInput';
import CheckboxInput from '../../elements/CheckboxInput';

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
      filters: {
        archived: false,
      },
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
    noteService.update(this.state.editor.note, edits, () => this.closeEditor());
  }

  closeEditor(){
    this.setState({
      editor: {
        hidden: true,
        note: {},
      },
    });
    this.getNotes();
  }

  filter(notes) {
    const { filters } = this.state;
    for (var filter in filters) {
      notes = notes.filter(note => note[filter] === filters[filter]);
    }
    return notes;
  }

  render() {
    const { editor, notes, filters } = this.state;

    return (
      <div className="main">

      <EditNote
        type="note"
        hidden={editor.hidden}
        note={editor.note}
        onSubmit={this.submitEdit.bind(this)}
        onClose={this.closeEditor.bind(this)}
        />

        <h2>notes <span>({notes.length})</span></h2>

        <div className="note-list__sort">
          <CheckboxInput
            id="filter-archived"
            label="View Archived"
            defaultChecked={filters.archived}
            onClick={() => this.setState({ filters: { archived: !filters.archived }})}
            />
        </div>

        <ul className="notes-list">
          {this.filter(notes).map(note =>
            <NoteItem
              key={note.id}
              note={note}
              removeNote={this.removeNote.bind(this)}
              editNote={this.editNote.bind(this)}
              />
          )}
        </ul>

        <form className="add-note" onSubmit={this.addNote.bind(this)}>
          <TextInput
            id="note"
            label="Awaiting changes..."
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
