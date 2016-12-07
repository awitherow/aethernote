import './lib/styles.scss'
import React, { Component, PropTypes } from 'react'
import { render } from 'react-dom'

import { Provider, connect } from 'react-redux'
import store from './redux/store'
import {
  toggleLoading,
  grantAuthority,
  routeTo,
  openEditor,
  closeEditor,
} from './redux/actions'

import * as thingService from './api/notes'

import Overlay from './components/molecules/Overlay'
import Header from './components/molecules/Header'
import AddThing from './components/molecules/AddThing'

import Editor from './components/organisms/Editor'

import Notes from './views/Notes'
import Journal from './views/Journal'
import Login from './views/Login'

class App extends Component {
  static childContextTypes = {
    update: PropTypes.func,
    getThings: PropTypes.func,
  }

  static propTypes = {
    // redux dispatchers
    grantAuthority: PropTypes.func.isRequired,
    toggleLoading: PropTypes.func.isRequired,
    closeEditor: PropTypes.func.isRequired,
    routeTo: PropTypes.func.isRequired,
    openEditor: PropTypes.func.isRequired,
    // redux state
    currentType: PropTypes.string.isRequired,
  }

  state = {
    loading: false,
    authenticated: checkAuthentication(),
    currentType: 'note',
    notes: [],
    editor: {
      hidden: true,
      note: {},
    },
  }

  componentDidMount = () =>
    this.getThings()

  getThings = () => {
    !this.state.loading && this.update('loading', true)
    thingService.get(notes => {
      this.setState({ notes })
      this.update('loading', false)
    })
  }

  removeItem = (id) => {
    this.update('loading', true)
    thingService.remove(id, () => this.getThings())
  }

  submitEdit = (edits) => {
    thingService.update(this.state.editor.note, edits, () => {
      this.getThings()
    })
  }

  getChildContext = () => ({
    update: this.update,
    getThings: this.getThings,
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
      case 'note': return <Notes {...sharedProps} />
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

const mapDispatchToProps = dispatch => ({
  toggleLoading: (v) => dispatch(toggleLoading(v)),
  grantAuthority: (v) => dispatch(grantAuthority(v)),
  routeTo: (v) => dispatch(routeTo(v)),
  openEditor: (v) => dispatch(openEditor(v)),
  closeEditor: (v) => dispatch(closeEditor(v)),
})

const mapStateToProps = state => ({ state })

const Aether = connect(
  mapDispatchToProps,
  mapStateToProps
)(<App />)

render(
  <Provider store={store}>
    <Aether />
  </Provider>, document.getElementById('app'))
