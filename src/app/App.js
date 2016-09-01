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
        edits: {}
      }
    };
  }

  getChildContext() {
    return {
      update: this.update.bind(this)
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
    const { loading } = this.state;

    return (
      <div className="aether">

        {loading ? <Overlay type="loading" /> : null}

        <header>
          <h1>Aether</h1>
        </header>

        {this.props.children}

      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired
};

App.childContextTypes = {
  update: PropTypes.func
};
