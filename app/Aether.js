import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import * as entryService from './api/entries'

import Overlay from './components/molecules/Overlay'
import Header from './components/molecules/Header'
import AddEntry from './components/molecules/AddEntry'

import Editor from './components/organisms/Editor'

import Notes from './views/Notes'
import Journal from './views/Journal'
import Login from './views/Login'
import Search from './views/Search'
import Habit from './views/Habit'

import {
  toggleLoading,
  grantAuthority,
  routeTo,
  openEditor,
  closeEditor,
  toggleSearch,
} from './redux/actions'

class Aether extends Component {
  static childContextTypes = {
    getEntries: PropTypes.func,
  }

  static propTypes = {
    // redux dispatchers
    grantAuthority: PropTypes.func.isRequired,
    toggleLoading: PropTypes.func.isRequired,
    toggleSearch: PropTypes.func.isRequired,
    closeEditor: PropTypes.func.isRequired,
    routeTo: PropTypes.func.isRequired,
    openEditor: PropTypes.func.isRequired,
    // redux state
    currentType: PropTypes.string.isRequired,
    authenticated: PropTypes.bool.isRequired,
    editor: PropTypes.shape({
      hidden: PropTypes.bool.isRequired,
      note: PropTypes.object.isRequired,
    }).isRequired,
    loading: PropTypes.bool.isRequired,
    searching: PropTypes.bool.isRequired,
  }

  state = {
    entries: [],
  }

  componentDidMount = () =>
    this.getEntries()

  getEntries = () => {
    !this.state.loading && this.props.toggleLoading(true)
    entryService.get(entries => {
      this.setState({ entries })
      this.props.toggleLoading(false)
    })
  }

  removeItem = (id) => {
    this.props.toggleLoading(true)
    entryService.remove(id, () => this.getEntries())
  }

  editItem = (id) => {
    const { entries } = this.state
    let note = entries.filter(note => note.id === id)[0]
    if (!note) return
    this.props.openEditor(note)
  }

  submitEdit = (edits, orig = this.props.editor.note) => {
    entryService.update(orig, edits, () => {
      this.getEntries()
    })
  }

  getChildContext = () => ({
    getEntries: this.getEntries,
  })

  route = () => {
    const { entries } = this.state
    const { currentType } = this.props
    const sharedProps = {
      type: currentType,
      entries: entries.filter(entry => entry.type === currentType),
      editItem: this.editItem,
    }

    switch(currentType) {
      case 'note': return <Notes {...sharedProps} />
      case 'journal': return <Journal {...sharedProps} />
      case 'habit': return (
        <Habit {...sharedProps} submitEdit={this.submitEdit} />
      )
    }
  }

  render() {
    const { loading, editor, authenticated, currentType, searching } = this.props

    return !authenticated ? (
      <Login grantAuthority={this.props.grantAuthority} />
      ) : (
      <div className="aether">

        { loading ? <Overlay type="loading" /> : null }
        { searching ? (
          <Search
            entries={this.state.entries}
            editItem={this.editItem}
            toggleSearch={this.props.toggleSearch}
            submitEdit={this.submitEdit}
          />
        ) : null }

        <Header
          currentType={currentType}
          routeTo={this.props.routeTo}
          toggleSearch={this.props.toggleSearch}
          />

        <div className="inner">

          <AddEntry
            type={currentType}
            toggleLoading={this.props.toggleLoading}
            />

          {editor.hidden ? this.route() : null}

          <Editor
            hidden={editor.hidden}
            note={editor.note}
            onSubmit={this.submitEdit}
            onClose={this.props.closeEditor}
            onRemove={this.removeItem}
            toggleLoading={this.props.toggleLoading}
            />

        </div>

      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  toggleLoading: (v) => dispatch(toggleLoading(v)),
  toggleSearch: (v) => dispatch(toggleSearch(v)),
  grantAuthority: (v) => dispatch(grantAuthority(v)),
  routeTo: (v) => dispatch(routeTo(v)),
  openEditor: (v) => dispatch(openEditor(v)),
  closeEditor: (v) => dispatch(closeEditor(v)),
})

const mapStateToProps = ({
  currentType, authenticated, editor, loading, searching,
}) => ({
  currentType,
  authenticated,
  editor,
  loading,
  searching,
})

const ConnectedAether = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Aether)

export default ConnectedAether
