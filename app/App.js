import React, { Component, PropTypes } from 'react';

import Overlay from './views/Overlay';
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

  render() {
    const { loading, view } = this.state;

    let MAINVIEW;
    switch(view) {
      case 'notelist': {
        MAINVIEW = <NoteList />;
      }
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
