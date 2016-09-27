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
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.onSubmit(this.state);
    this.props.onClose();
  }

  render() {
    if (this.props.hidden) return null;

    const { id, title, content, created, prio, archived } = this.props.note;
    const { type, onClose } = this.props;

    return (
      <div className="editor">
        <header>
          <h1>Edit {type} #{id}</h1>
          <FormattedDate value={created} />
          <button className="close" onClick={onClose}>X</button>
        </header>

        <form onSubmit={this.onSubmit}>

          <CheckboxInput
            id="prio"
            label="Priority Item?"
            defaultChecked={prio}
            onClick={(e) => this.setState({ prio: e.target.checked })}
            />

          <CheckboxInput
            id="archived"
            label="Archived"
            defaultChecked={archived}
            onClick={(e) => this.setState({ archived: e.target.checked })}
            />

          <TextInput
            id="title"
            label="Title"
            defaultValue={title}
            onChange={(e) => this.setState({ title: e.target.value })}
            />

          <span // eslint-disable-next-line
            dangerouslySetInnerHTML={convertToMarkdown(content)} />

          <TextAreaInput
            id="content"
            label="Contents"
            value={content}
            onChange={(e) => this.setState({ content: e.target.value })}
            />

          <button>Submit</button>

        </form>
      </div>
    );
  }
}

EditNote.propTypes = {
  type: PropTypes.string.isRequired,
  note: PropTypes.object.isRequired,
  hidden: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};
