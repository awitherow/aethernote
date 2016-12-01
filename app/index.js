import React, { Component, PropTypes } from 'react'
import { render } from 'react-dom'

import './common/styles.scss'

import * as noteService from './api/notes'

import Overlay from './components/molecules/Overlay'
import Header from './components/molecules/Header'
import AddThing from './components/molecules/AddThing'

import Editor from './components/organisms/Editor'

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

const initialEditorState = {
  hidden: true,
  note: {},
}

class App extends Component {
  static childContextTypes = {
    update: PropTypes.func,
    getNotes: PropTypes.func,
  }

  state = {
    loading: false,
    authenticated: checkAuthentication(),
    currentType: 'note',
    notes: [],
    editor: initialEditorState,
  }

  componentDidMount = () =>
    this.getNotes()

  getNotes = () => {
    !this.state.loading && this.update('loading', true)
    noteService.get(notes => {
      this.setState({ notes })
      this.update('loading', false)
    })
  }

  removeItem = (id) => {
    this.update('loading', true)
    noteService.remove(id, () => this.getNotes())
  }

  submitEdit = (edits) => {
    noteService.update(this.state.editor.note, edits, () => {
      this.getNotes()
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
      case 'newRoute': payload = { currentType: data }; break
      case 'closeEditor':
        payload = { editor: { hidden: true, note: {} }}; break
      case 'openEditor':
        payload = { editor: { hidden: false, note: data }}; break
    }
    this.setState(payload)
  }

  route = () => {
    const { currentType, notes } = this.state
    const sharedProps = {
      type: currentType,
      things: notes.filter(n => n.type === currentType),
      removeItem: this.removeItem,

    }
    
    switch(currentType) {
      case 'note': return <NoteList {...sharedProps} />
      case 'journal': return <Journal {...sharedProps} />
    }
  }

  render() {
    const { loading, authenticated, currentType, editor } = this.state

    return !authenticated ? <Login /> : (
      <div className="aether">

        { loading ? <Overlay type="loading" /> : null }

        <Header
          currentType={currentType}
          update={this.update}
          />

        <div className="inner">

          <AddThing type={currentType} />

          {this.route()}

          <Editor
            hidden={editor.hidden}
            note={editor.note}
            onSubmit={this.submitEdit}
            onClose={() => this.update('closeEditor')}
            onRemove={this.removeItem}
            />

        </div>

      </div>
    )
  }
}

render(<App />, document.getElementById('app'))
