import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'
import moment from 'moment'

import {
  Panel, Form, FormControl, Button, Glyphicon, DropdownButton, MenuItem,
  ButtonGroup,
} from 'react-bootstrap'

import { convertToMarkdown, isMobile } from '../../lib/helpers'
import { categories, contexts } from '../../lib/schema'

const initialState = {
  formUpdated: false,
  deleteWizardOpen: false,
}

const responsiveButtonGroup = {
  block: isMobile,
  vertical: isMobile,
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
    const {
      id, created, prio, category, type, context, modified,
    } = this.props.note

    const deleteNoteRequestClasses = classnames('deleteNote__request', {
      'hidden': deleteWizardOpen,
    })

    const confirmDeleteClasses = !deleteWizardOpen && 'hidden'

    return (
      <Panel header={
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
            <span>Edit #{id} | {title}</span>
            <Button className="float-btn" bsSize="small" onClick={this.closeEditor}>
              <Glyphicon glyph="remove" />
            </Button>
          </div>
        </div>
      }>
        <style type="text/css">{`
          .editor-title-bar {
            position: relative;
          }
          .content-container {
            display: flex;
            flex-direction: column;
            justify-content: space-around;
          }
          .content-view,
          .content-field {
            padding-left: 5px;
            width: 100%;
          }
          .content-field {
            min-height: 50vh;
          }
          @media(min-width: 768px) {
            .content-container {
              flex-direction: row;
            }
          }
          .extra-margin {
            margin: 10px auto;
          }
        `}</style>

        <div className="editor-subheader">
           <ul>
             <li>created {moment(created).fromNow()}</li>
             <li>last modified {moment(modified).fromNow()}</li>
           </ul>
        </div>

        <Form>

          <FormControl
            type="text"
            value={title}
            onChange={(e) => this.handleChange('title', e.target.value)}
          />

          <div className="extra-margin">
            <ButtonGroup {...responsiveButtonGroup}>
              <DropdownButton
                id={`prio-selector`}
                title={this.state.prio ? this.state.prio : prio}
              >
                {[1, 2, 3].map(prio =>
                  <MenuItem
                    key={prio}
                    onSelect={() => this.handleChange('prio', prio)}>
                    {prio}
                  </MenuItem>
                )}
              </DropdownButton>

              <DropdownButton
                id={`type-selector`}
                title={this.state.type ? this.state.type : type}
              >
                {Object.keys(categories).map((type, i) =>
                  <MenuItem
                    key={i}
                    onSelect={() => this.handleChange('type', type)}>
                    {type}
                  </MenuItem>
                )}
              </DropdownButton>

              <DropdownButton
                id={`category-selector`}
                title={this.state.category ? this.state.category : category}
              >
                {categories[this.state.type ? this.state.type : type].map((cat, i) =>
                  <MenuItem
                    key={i}
                    onSelect={() => this.handleChange('category', cat)}>
                    {cat}
                  </MenuItem>
                )}
              </DropdownButton>

              <DropdownButton
                id={`context-selector`}
                title={this.state.context ? this.state.context : context}
              >
                {contexts.map((con, i) =>
                  <MenuItem
                    key={i}
                    onSelect={() => this.handleChange('context', con)}>
                    {con}
                  </MenuItem>
                )}
              </DropdownButton>

              <Button bsStyle="success" onClick={this.onSubmit} disabled={!formUpdated}>
                <Glyphicon glyph="cloud-upload" />
              </Button>

              <Button
                className={deleteNoteRequestClasses}
                onClick={this.toggleWizard}>
                <Glyphicon glyph="trash" />
              </Button>

              <Button
                className={confirmDeleteClasses}
                bsStyle="danger"
                onClick={this.deleteNote}>
                <Glyphicon glyph="ok" />
              </Button>

              <Button
                className={confirmDeleteClasses}
                onClick={this.toggleWizard}>
                <Glyphicon glyph="remove" />
              </Button>
            </ButtonGroup>
          </div>

          <div className="content-container extra-margin">
            <div // eslint-disable-next-line
              dangerouslySetInnerHTML={convertToMarkdown(content)}
              className="content-view"/>

            <FormControl
              componentClass="textarea"
              className="content-field"
              type="text"
              value={content}
              onChange={(e) => this.handleChange('content', e.target.value)}
            />

          </div>

        </Form>

      </Panel>
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
