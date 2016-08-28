import React, { Component, PropTypes } from 'react';
import * as noteService from './servants/notes';

import TextInput from '../../elements/TextInput';
import Note from './components/note';

export default class NoteList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      noteInput: "",
      notes: [],
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

  captureNote(e) {
    this.setState({ noteInput: e.target.value });
  }

  removeNote(id) {
    this.context.update('loading', true);
    noteService.remove(id, () => this.getNotes());
  }

  addNote(e) {
    e.preventDefault();
    noteService.add({
      content: this.state.noteInput,
      prio: 2,
    }, () => this.getNotes());
    this.setState({ noteInput: "" });
  }

  render() {
    const { notes, noteInput } = this.state;

    return (
      <div className="main">
        <h2>notes <span>({notes.length})</span></h2>
        <ul className="notes-list">
          {notes.map(note =>
            <Note
              key={note.id}
              note={note}
              removeNote={this.removeNote.bind(this)}
              />
          )}
        </ul>
        <form className="add-note" onSubmit={this.addNote.bind(this)}>
          <TextInput
            id="note"
            label="Awaiting changes..."
            value={noteInput}
            onChange={this.captureNote.bind(this)}
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
