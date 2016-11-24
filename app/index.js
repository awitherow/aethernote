import { render } from 'react-dom'

import './common/styles.scss'
import React, { Component, PropTypes } from 'react'

import Overlay from './elements/Overlay'
import Header from './elements/Header'

import NoteList from './views/NoteList'
import Login from './views/Login'

class App extends Component {
  static childContextTypes = {
    update: PropTypes.func,
  }

  state = {
    loading: false,
    authenticated: false,
  }

  getChildContext() {
    return {
      update: this.update.bind(this),
    }
  }

  update(action, data) {
    let payload
    switch(action) {
      case 'loading': payload = { loading: data }; break
      case 'auth': payload = { authenticated: data }; break
    }
    this.setState(payload)
  }

  render() {
    const { loading, authenticated } = this.state

    return !authenticated ? <Login /> : (
      <div className="aether">

        { loading ? <Overlay type="loading" /> : null }

        <Header />

        <NoteList />

      </div>
    )
  }
}

render(<App />, document.getElementById('app'))
