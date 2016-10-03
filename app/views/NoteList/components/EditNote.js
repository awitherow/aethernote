import '../styles/edit.scss';
import React, { Component, PropTypes } from 'react';
import { FormattedDate } from 'react-intl';
import classnames from 'classnames';

import { convertToMarkdown } from '../../../common/helpers';

import CheckboxInput from '../../../elements/CheckboxInput';
import FlexibleInput from '../../../elements/FlexibleInput';
import TextAreaInput from '../../../elements/TextAreaInput';

import TagList from './TagList';

export default class EditNote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formUpdated: false,
      deleteWizardOpen: false,
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.closeEditor = this.closeEditor.bind(this);
    this.deleteNote = this.deleteNote.bind(this);
    this.toggleWizard = this.toggleWizard.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.onSubmit(this.state);
    this.closeEditor();
  }

  closeEditor() {
    this.setState({ formUpdated: false });
    this.props.onClose();
  }

  handleChange(whatToChange, change) {
    let stateUpdate = { details: { tags: [] } };

    switch(whatToChange) {
      case 'addTag': stateUpdate.details.tags.push(change); break;
      case 'removeTag': {
        let tagList = stateUpdate.details.tags;
        tagList.splice(tagList.indexOf(change), 1);
        break;
      }
      default: stateUpdate[whatToChange] = change; break;
    }

    if (!this.state.formUpdated) stateUpdate.formUpdated = true;
    this.setState(stateUpdate);
  }

  deleteNote() {
    this.props.onRemove(this.props.note.id);
    this.toggleWizard();
    this.closeEditor();
  }

  toggleWizard() {
    this.setState({ deleteWizardOpen: !this.state.deleteWizardOpen });
  }

  render() {
    if (this.props.hidden) return null;
    const { formUpdated, deleteWizardOpen } = this.state;
    const { id, title, content, details, created, prio, archived } = this.props.note;

    const deleteNoteRequestClasses = classnames('deleteNote__request', {
      'hidden': deleteWizardOpen,
    });

    const deleteNotePanelClasses = classnames('deleteNote__panel', {
      'hidden': !deleteWizardOpen,
    });

    return (
      <div className="editor">
        <header>
          <h1>{title} | #{id}</h1>
          <span>
            Date Created: <FormattedDate value={created} />
          </span>
          <button className="close" onClick={this.closeEditor}>X</button>
        </header>

        <form onSubmit={this.onSubmit}>

          <FlexibleInput
            id="title"
            label="Title"
            value={title}
            onChange={(e) => this.handleChange('title', e.target.value)}
            />

          <div className="row note-options">
            <CheckboxInput
              id="prio"
              label="Priority Item?"
              defaultChecked={prio}
              onClick={(e) => this.handleChange('prio', e.target.checked)}
              />

            <CheckboxInput
              id="archived"
              label="Archived"
              defaultChecked={archived}
              onClick={(e) => this.handleChange('archived', e.target.checked)}
              />

            <button disabled={!formUpdated}>Save Changes</button>
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
            Delete Note
          </button>

          <div className={deleteNotePanelClasses}>
            <span className="deleteNote__panel-ask">
              Are you sure you want to delete this?
            </span>

            <button className="deleteNote__panel-yes"
              onClick={this.deleteNote}>
              Yes
            </button>
            <button className="deleteNote__panel-no"
              onClick={this.toggleWizard}>
              No
            </button>
          </div>
        </div>

      </div>
    );
  }
}

EditNote.propTypes = {
  note: PropTypes.object.isRequired,
  hidden: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
};
