import React, { Component, PropTypes } from 'react'
import { render } from 'react-dom'

import './common/styles.scss'

import Overlay from './elements/Overlay'
import Header from './elements/Header'

import NoteList from './views/NoteList'
import Journal from './views/Journal'
import Login from './views/Login'

class App extends Component {
  static childContextTypes = {
    update: PropTypes.func,
  }

  state = {
    loading: false,
    authenticated: true,
    currentRoute: 'note-list',
  }

  getChildContext() {
    return {
      update: this.update.bind(this),
    }
  }

  update= (action, data) => {
    let payload
    switch(action) {
      case 'loading': payload = { loading: data }; break
      case 'auth': payload = { authenticated: data }; break
      case 'newRoute': payload = { currentRoute: data }; break
    }
    this.setState(payload)
  }

  route = () => {
    switch(this.state.currentRoute) {
      case 'note-list': return <NoteList />
      case 'journal': return <Journal />
    }
  }

  render() {
    const { loading, authenticated, currentRoute } = this.state

    return !authenticated ? <Login /> : (
      <div className="aether">

        { loading ? <Overlay type="loading" /> : null }

        <Header
          currentRoute={currentRoute}
          update={this.update}
          />

        {this.route()}

      </div>
    )
  }
}

render(<App />, document.getElementById('app'))
