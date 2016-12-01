import React, { Component, PropTypes } from 'react'
import { render } from 'react-dom'

import './common/styles.scss'

import * as noteService from './api/notes'

import Overlay from './components/molecules/Overlay'
import Header from './components/molecules/Header'
import AddNote from './components/molecules/AddNote'

import NoteList from './views/NoteList'
import Journal from './views/Journal'
import Login from './views/Login'

function checkAuthentication() {
  if (process.env.NODE_ENV === 'development') {
    return true
  } else {
    // TODO: check cookies
    return false
  }
}

class App extends Component {
  static childContextTypes = {
    update: PropTypes.func,
    getNotes: PropTypes.func,
  }

  state = {
    loading: false,
    authenticated: checkAuthentication(),
    currentRoute: 'note',
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
      case 'note': return (
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

        <div className="inner">
          <AddNote type={currentRoute} />
          {this.route()}
        </div>

      </div>
    )
  }
}

render(<App />, document.getElementById('app'))
