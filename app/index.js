import React, { Component, PropTypes } from 'react'
import { render } from 'react-dom'

import './common/styles.scss'
import * as noteService from './api/notes'

import Overlay from './elements/Overlay'
import Header from './elements/Header'

import NoteList from './views/NoteList'
import Journal from './views/Journal'
import Login from './views/Login'

class App extends Component {
  static childContextTypes = {
    update: PropTypes.func,
    getNotes: PropTypes.func,
  }

  state = {
    loading: false,
    authenticated: false,
    currentRoute: 'journal',
    notes: [],
  }

  componentDidMount() {
    this.getNotes()
  }

  getNotes = () => {
    this.update('loading', true)
    noteService.get(notes => {
      this.setState({ notes })
      this.update('loading', false)
    })
  }

  getChildContext = () => ({
    update: this.update,
    getNotes: this.getNotes,
  })

  update = (action, data) => {
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
      case 'note-list': return (
        <NoteList
          notes={this.state.notes.filter(n => n.type === 'note')}
          />
      )
      case 'journal': return (
        <Journal
          notes={this.state.notes.filter(n => n.type === 'journal')}
          />
      )
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
