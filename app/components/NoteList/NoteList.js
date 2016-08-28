import React, { Component } from 'react';
import * as notes from './servants/notes';

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
    notes.get(notes => this.setState({ notes }));
  }

  captureNote(e) {
    this.setState({ noteInput: e.target.value });
  }

  removeNote(id) {
    notes.remove(id, () => this.getNotes());
  }

  addNote() {
    notes.add({
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
          {notes.map(note => {
            return (
              <Note
                key={note.id}
                note={note}
                removeNote={this.removeNote.bind(this)}
                />
            );
          })}
        </ul>
        <div className="add-note">
          <label htmlFor="note">Awaiting note... </label>
          <input
            id="note"
            type="text"
            value={noteInput}
            onChange={this.captureNote.bind(this)}
            />
          <button onClick={this.addNote.bind(this)}>+</button>
        </div>
      </div>
    );
  }
}
