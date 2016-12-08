import './index.scss'
import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'

import { convertToMarkdown } from '../../../lib/helpers'

import TextAreaInput from '../../../components/atoms/TextAreaInput'
import FlexibleInput from '../../../components/atoms/FlexibleInput'
import Dropdown from '../../../components/atoms/Dropdown'
import CheckboxInput from '../../../components/atoms/CheckboxInput'

const initialState = {
  formUpdated: false,
  deleteWizardOpen: false,
}

export default class Editor extends Component {
  static propTypes = {
    toggleLoading: PropTypes.func.isRequired,
  }

  state = {
    ...initialState,
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.note.content) {
      this.setState({
        content: nextProps.note.content,
        title: nextProps.note.title,
      })
    }
  }

  onSubmit = (e) => {
    e.preventDefault()
    this.props.toggleLoading(true)
    let update = this.state
    delete update.formUpdated
    delete update.deleteWizardOpen
    this.props.onSubmit(update)
    this.closeEditor()
  }

  closeEditor = () => {
    this.resetState()
    this.props.onClose()
  }

  resetState = () => {
    for (let thing in this.state) {
      if (thing) {
        delete this.state[thing]
      }
    }
    this.setState(...this.state, initialState)
  }

  handleChange = (whatToChange, change) => {
    let stateUpdate = {}

    switch(whatToChange) {
      default: stateUpdate[whatToChange] = change; break
    }

    if (!this.state.formUpdated) stateUpdate.formUpdated = true
    this.setState(stateUpdate)
  }

  deleteNote = () => {
    this.props.onRemove(this.props.note.id)
    this.toggleWizard()
    this.closeEditor()
  }

  toggleWizard = () => {
    this.setState({ deleteWizardOpen: !this.state.deleteWizardOpen })
  }

  render() {
    if (this.props.hidden) return null
    const { formUpdated, deleteWizardOpen, content, title } = this.state
    const { id, created, prio, category } = this.props.note

    const deleteNoteRequestClasses = classnames('deleteNote__request', {
      'hidden': deleteWizardOpen,
    })

    const deleteNotePanelClasses = classnames('deleteNote__panel', {
      'hidden': !deleteWizardOpen,
    })

    return (
      <div className="editor">
        <header>
          <h1>{title} | #{id}</h1>
          <span>
            {created}
          </span>
          <button className="close" onClick={this.closeEditor}>
            &times;
          </button>
        </header>

        <form onSubmit={this.onSubmit}>

          <FlexibleInput
            id="title"
            label="Title"
            type="text"
            value={title}
            onChange={(e) => this.handleChange('title', e.target.value)}
            />

          <div className="row note-options">
            <CheckboxInput
              id="prio"
              label="Prio"
              defaultChecked={prio}
              onClick={(e) => this.handleChange('prio', e.target.checked)}
              />

            <Dropdown
              id="category-types"
              label="Category"
              options={[
                'inbox',
                'backlog',
                'todo',
                'doing',
                'done',
                'reference',
              ]}
              defaultValue={category}
              handleChange={e => this.handleChange('category', e.target.value)}
              />

            <button disabled={!formUpdated}>
              SAVE
            </button>
          </div>

          <div className="content-container">
            <div // eslint-disable-next-line
              dangerouslySetInnerHTML={convertToMarkdown(content)}
              className="content-view"/>

            <TextAreaInput
              id="content"
              label="Contents"
              value={content}
              onChange={(e) => this.handleChange('content', e.target.value)}
              />
          </div>

        </form>

        <div className="deleteNote">
          <button className={deleteNoteRequestClasses}
            onClick={this.toggleWizard}>
            &#9842;
          </button>

          <div className={deleteNotePanelClasses}>

            <button className="deleteNote__panel-yes"
              onClick={this.deleteNote}>
              &#9786;
            </button>
            <button className="deleteNote__panel-no"
              onClick={this.toggleWizard}>
              &#9785;
            </button>

          </div>
        </div>

      </div>
    )
  }
}

Editor.propTypes = {
  note: PropTypes.object.isRequired,
  hidden: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
}
