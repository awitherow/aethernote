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

  renderContent(view) {
    switch(view) {
      case 'notelist': return <NoteList />;
      default: return <NoteList />;
    }
  }

  render() {
    const { loading, view } = this.state;

    return (
      <div className="aether">

        { loading ? <Overlay type="loading" /> : null }

        <header>
          <h1>Aether</h1>
        </header>

        { this.renderContent(view) }

      </div>
    );
  }
}

App.childContextTypes = {
  update: PropTypes.func,
};
