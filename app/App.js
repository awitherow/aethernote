import './common/styles.scss';
import React, { Component, PropTypes } from 'react';

import Overlay from './elements/Overlay';
import Header from './elements/Header';

import NoteList from './views/NoteList';
import Login from './views/Login';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      authenticated: false,
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
      case 'auth': payload = { authenticated: data }; break;
    }
    this.setState(payload);
  }

  render() {
    const { loading, authenticated } = this.state;

    if (!authenticated) {
      return <Login />;
    }

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
