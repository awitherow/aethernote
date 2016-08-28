import React, { Component, PropTypes } from 'react';

import Overlay from './views/Overlay';
import Editor from './views/Editor';
import NoteList from './views/NoteList';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      edit: {
        on: false,
        content: {},
        edits: {},
      },
      view: 'notelist',
    };
  }

  getChildContext() {
    return {
      update: this.update.bind(this),
    };
  }

  update(action, data) {
    let payload;
    switch(action) {
      case 'loading': payload = { loading: data }; break;
    }
    this.setState(payload);
  }

  storeNote() {
    console.log('note stored');
  }

  commitNote() {
    console.log('note committed');
  }

  render() {
    const { notes, loading, edit, view } = this.state;

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
        { loading ? <Overlay type="spinner" /> : null }

        <header>
          <h1>Aether</h1>
        </header>

        { MAINVIEW }

      </div>
    );
  }
}

App.childContextTypes = {
  update: PropTypes.func,
};
