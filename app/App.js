import React, { Component } from 'react';
import * as notes from './servants/notes';

import Overlay from './components/Overlay';
import Editor from './components/Editor';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      noteInput: "",
      notes: {},
      edit: {
        on: false,
        content: {},
        edits: {},
      },
    };
  }

  componentDidMount() {
    this.getnotes();
  }

  getnotes() {
    this.setState({ loading: true });
    notes.get(notes => {
      this.setState({ notes, loading: false });
    });
  }

  capturenote(e) {
    this.setState({ noteInput: e.target.value });
  }

  storenote() {
    console.log('note stored');
  }

  commitnote() {
    console.log('note committed');
  }

  addnote() {
    notes.add({
      content: this.state.noteInput,
      prio: 2,
    }, () => this.getnotes());
    this.setState({ noteInput: "" });
  }

  deletenote(id) {
    this.setState({ loading: true });
    notes.delete(id, () => this.getnotes());
  }

  render() {
    const { notes, loading, noteInput, edit } = this.state;
    if (loading) return <Overlay type="spinner" />;

    if (edit.on) {
      let view = 'no-view-found';

      if (edit.content.type === 'note') {
        let note = notes.filter(note => note.id === edit.content.id)[0];
        if (!note) return;
        view = (
          <Editor
            type='note'
            {...note }
            onChange={this.storenote.bind(this)}
            onSubmit={this.commitnote.bind(this)}
            />
        );
      }

      if (view === 'no-view-found') return <Overlay type="error" />;

      return (
        <div className="aether">
          {view}
        </div>
      );
    }

    return (
      <div className="aether">

        <header>
          <h1>Aether</h1>
        </header>

        <div className="main">
          <h2>notes <span>({notes.length})</span></h2>
          <ul className="notes-list">
            {notes.map(note => {
              let { id, content } = note;
              return (
                <li key={id}>
                  <button onClick={this.deletenote.bind(this, id)}>x</button>
                  <span className="content">{content}</span>
                  <button onClick={() => this.setState({ edit: {
                    on: true,
                    content: {
                      type: 'note',
                      id,
                    },
                  }})}>EDIT</button>
                </li>
              );
            })}
          </ul>
          <div className="add-note">
            <label htmlFor="note">Awaiting note... </label>
            <input
              id="note"
              type="text"
              value={noteInput}
              onChange={this.capturenote.bind(this)}
              />
            <button onClick={this.addnote.bind(this)}>+</button>
          </div>
        </div>

      </div>
    );
  }
}
