import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import * as entryService from './api/entries'

import { toTitleCase } from './lib/helpers'
import { categories } from './lib/schema'

import Overlay from './components/molecules/Overlay'
import Header from './components/molecules/Header'
import AddEntry from './components/molecules/AddEntry'

import Editor from './components/organisms/Editor'

import Notes from './views/Notes'
import Journal from './views/Journal'
import Login from './views/Login'
import Search from './views/Search'
import Habit from './views/Habit'
import Exercise from './views/Exercise'

import { Panel, Glyphicon, Button, DropdownButton, MenuItem } from 'react-bootstrap'

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
    entryService.get(entries => {
      this.setState({ entries })
      this.props.loading && this.props.toggleLoading(false)
    })
  }

  removeItem = (id) => {
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
      case 'exercise': return (
        <Exercise {...sharedProps} submitEdit={this.submitEdit} />
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

          <div>
            <style type="text/css">{`
              #quick-input {
                margin-bottom: 25px;
              }
            `}</style>
            <div id="quick-input">
              <AddEntry
                type={currentType}
                toggleLoading={this.props.toggleLoading}
                getEntries={this.getEntries}
                />
            </div>
          </div>

          <Editor
            hidden={editor.hidden}
            note={editor.note}
            onSubmit={this.submitEdit}
            onClose={this.props.closeEditor}
            onRemove={this.removeItem}
            toggleLoading={this.props.toggleLoading}
            />

          <Panel style={{display: !editor.hidden && 'none'}} header={
            <div>
              <style type="text/css">{`
                .spread-icon-right {
                  display: flex;
                }
                .float-btn {
                  margin-left: auto;
                }
              `}</style>
              <div className="spread-icon-right">
                <DropdownButton
                  title={toTitleCase(currentType)}
                  id="change-view"
                >
                  {Object.keys(categories).map((type, i) =>
                    <MenuItem
                      key={i}
                      active={currentType === type}
                      onSelect={() => this.props.routeTo(type)}
                    >
                      {toTitleCase(type)}
                    </MenuItem>
                  )}
                </DropdownButton>
                <Button
                  className="float-btn"
                  bsSize="xsmall"
                  onClick={this.getEntries}
                >
                  <Glyphicon glyph="refresh" />
                </Button>
              </div>
            </div>
            }>
            {editor.hidden ? this.route() : null}
          </Panel>

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
