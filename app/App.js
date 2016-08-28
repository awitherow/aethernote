import React, { Component } from 'react';

import Overlay from './components/Overlay';
import Editor from './components/Editor';
import NoteList from './components/NoteList';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      edit: {
        on: false,
        content: {},
        edits: {},
      },
      view: 'notelist',
    };
  }

  storeNote() {
    console.log('note stored');
  }

  commitNote() {
    console.log('note committed');
  }

  render() {
    const { notes, loading, edit, view } = this.state;
    //if (loading) return <Overlay type="spinner" />;

    let MAINVIEW;
    switch(view) {
      case 'notelist': {
        MAINVIEW = <NoteList />;
      }
    }

    if (edit.on) {
      let view = 'no-view-found';

      if (edit.content.type === 'note') {
        let note = notes.filter(note => note.id === edit.content.id)[0];
        if (!note) return;
        view = (
          <Editor
            type='note'
            {...note }
            onChange={this.storeNote.bind(this)}
            onSubmit={this.commitNote.bind(this)}
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

        { MAINVIEW }

      </div>
    );
  }
}
