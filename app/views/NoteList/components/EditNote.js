import '../styles/edit.scss';
import React, { Component, PropTypes } from 'react';
import { FormattedDate } from 'react-intl';

import { convertToMarkdown } from '../../../common/helpers';

import CheckboxInput from '../../../elements/CheckboxInput';
import TextInput from '../../../elements/TextInput';
import TextAreaInput from '../../../elements/TextAreaInput';

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
    let newState = {};
    if (whatToChange !== 'tag') {
      newState[whatToChange] = change;
    } else {
      newState.details.tags.push(change);
    }
    if (!this.state.formUpdated) newState.formUpdated = true;
    this.setState(newState);
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
