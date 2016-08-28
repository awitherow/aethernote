import React, { Component, PropTypes } from 'react';
import { FormattedDate } from 'react-intl';

import CheckboxInput from '../../elements/CheckboxInput';

export default class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  save = () => {}
  close = () => {
    this.props.onClose();
  }
  rePrioritize = () => {}
  updateContent = () => {}

  render() {
    if (this.props.hidden) return null;

    const { id, content, created, prio, archived } = this.props.note;
    const { type } = this.props;

    return (
      <form className="editor" onSubmit={this.save.bind(this)}>

        <header>
          <h1>Edit {type} #{id}</h1>
          <FormattedDate value={created} />
          <button onClick={this.close.bind(this)}>X</button>
        </header>

        <fieldset>
          <label htmlFor="prio">Prio:</label>
          <select onChange={this.rePrioritize.bind(this)} id="prio" value={prio}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </fieldset>

        <CheckboxInput
          id="archived"
          label="Archived"
          checked={archived ? "checked" : null}
          onClick={() => this.setState({ archived: !archived })}
          />

        <fieldset>
          <label htmlFor="content">Contents</label>
          <textarea
            id="content"
            value={content}
            onChange={this.updateContent.bind(this)}
            ></textarea>
        </fieldset>

        <button>Submit</button>

      </form>
    );
  }
}

Editor.propTypes = {
  type: PropTypes.string.isRequired,
  note: PropTypes.object.isRequired,
  hidden: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};
