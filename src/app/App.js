import React, { Component, PropTypes } from 'react';

import Overlay from './components/views/Overlay';
import Header from './components/elements/Header';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
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

        <Header />

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
