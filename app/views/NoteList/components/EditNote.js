import '../styles/edit.scss';
import React, { Component, PropTypes } from 'react';
import { FormattedDate } from 'react-intl';

import { convertToMarkdown } from '../../../common/helpers';

import CheckboxInput from '../../../elements/CheckboxInput';
import TextInput from '../../../elements/TextInput';
import TextAreaInput from '../../../elements/TextAreaInput';

import TagList from './TagList';

export default class EditNote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formUpdated: false,
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.closeEditor = this.closeEditor.bind(this);
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

  render() {
    if (this.props.hidden) return null;
    const { formUpdated } = this.state;
    const { id, title, content, details, created, prio, archived } = this.props.note;

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

          <TextInput
            id="title"
            label="Title"
            defaultValue={title}
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
          <button className="deleteNote__request">Delete Note</button>
          <div className="deleteNote__panel">
            <span className="deleteNote__panel--ask">
              Are you sure you want to delete this?
            </span>
            <button className="deleteNote__panel--yes">Yes</button>
            <button className="deleteNote__panel--no">No</button>
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
};
