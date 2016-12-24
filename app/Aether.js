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

import {
  toggleLoading,
  grantAuthority,
  routeTo,
  openEditor,
  closeEditor,
} from './redux/actions'

class Aether extends Component {
  static childContextTypes = {
    getEntries: PropTypes.func,
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
    authenticated: PropTypes.bool.isRequired,
    editor: PropTypes.shape({
      hidden: PropTypes.bool.isRequired,
      note: PropTypes.object.isRequired,
    }).isRequired,
    loading: PropTypes.bool.isRequired,
  }

  state = {
    entires: [],
  }

  componentDidMount = () =>
    this.getEntries()

  getEntries = () => {
    !this.state.loading && this.props.toggleLoading(true)
    entryService.get(entires => {
      this.setState({ entires })
      this.props.toggleLoading(false)
    })
  }

  removeItem = (id) => {
    this.props.toggleLoading(true)
    entryService.remove(id, () => this.getEntries())
  }

  submitEdit = (edits) => {
    entryService.update(this.props.editor.note, edits, () => {
      this.getEntries()
    })
  }

  getChildContext = () => ({
    getEntries: this.getEntries,
  })

  route = () => {
    const { entires } = this.state
    const { currentType } = this.props
    const sharedProps = {
      type: currentType,
      entries: entires.filter(entry => entry.type === currentType),
      removeItem: this.removeItem,
      openEditor: this.props.openEditor,
    }

    switch(currentType) {
      case 'note': return <Notes {...sharedProps} />
      case 'journal': return <Journal {...sharedProps} />
    }
  }

  render() {
    const { loading, editor, authenticated, currentType } = this.props

    return !authenticated ? (
      <Login
        grantAuthority={this.props.grantAuthority}
        />
    ) : (
      <div className="aether">

        { loading ? <Overlay type="loading" /> : null }

        <Header
          currentType={currentType}
          routeTo={this.props.routeTo}
          />

        <div className="inner">

          <AddEntry
            type={currentType}
            toggleLoading={this.props.toggleLoading}
            />

          {this.route()}

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
  grantAuthority: (v) => dispatch(grantAuthority(v)),
  routeTo: (v) => dispatch(routeTo(v)),
  openEditor: (v) => dispatch(openEditor(v)),
  closeEditor: (v) => dispatch(closeEditor(v)),
})

const mapStateToProps = ({
  currentType, authenticated, editor, loading,
}) => ({
  currentType,
  authenticated,
  editor,
  loading,
})

const ConnectedAether = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Aether)

export default ConnectedAether
