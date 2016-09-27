import './common/styles.scss';
import React, { Component, PropTypes } from 'react';

import Overlay from './views/Overlay';
import NoteList from './views/NoteList';
import Header from './elements/Header';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
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
    const { loading } = this.state;

    return (
      <div className="aether">

        { loading ? <Overlay type="loading" /> : null }

        <Header />

        <NoteList />

      </div>
    );
  }
}

App.childContextTypes = {
  update: PropTypes.func,
};
