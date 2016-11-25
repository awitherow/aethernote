import '../styles/edit.scss'
import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'

import { convertToMarkdown } from '../../../common/helpers'
import { statusTypes } from '../config'

import CheckboxInput from '../../../elements/CheckboxInput'
import FlexibleInput from '../../../elements/FlexibleInput'
import TextAreaInput from '../../../elements/TextAreaInput'
import Dropdown from '../../../elements/Dropdown'

import TagList from './TagList'

const initialState = {
  formUpdated: false,
  deleteWizardOpen: false,
}

export default class EditNote extends Component {
  constructor(props) {
    super(props)
    this.state = { ...initialState }
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
    this.context.update('loading', true)
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
    let stateUpdate = { details: { tags: [] } }

    switch(whatToChange) {
      case 'addTag': stateUpdate.details.tags.push(change); break
      case 'removeTag': {
        let tagList = stateUpdate.details.tags
        tagList.splice(tagList.indexOf(change), 1)
        break
      }
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
    const { formUpdated, deleteWizardOpen, content } = this.state
    const { id, title, details, created,
      prio, archived, status } = this.props.note

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

            <CheckboxInput
              id="archived"
              label="Archived"
              defaultChecked={archived}
              onClick={(e) => this.handleChange('archived', e.target.checked)}
              />

            <Dropdown
              id="status-types"
              label="Status"
              options={statusTypes}
              defaultValue={status}
              handleChange={e => this.handleChange('status', e.target.value)}
              />

            <button disabled={!formUpdated}>
              SAVE
            </button>
          </div>

          <TagList
            handleChange={this.handleChange}
            tags={details.tags}
            />

          <div // eslint-disable-next-line
            dangerouslySetInnerHTML={convertToMarkdown(content)}
            className="content-view"/>

          <TextAreaInput
            id="content"
            label="Contents"
            value={content}
            onChange={(e) => this.handleChange('content', e.target.value)}
            />

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

EditNote.propTypes = {
  note: PropTypes.object.isRequired,
  hidden: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
}

EditNote.contextTypes = {
  update: PropTypes.func.isRequired,
}
