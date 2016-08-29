import React, { Component, PropTypes } from 'react';
import { FormattedDate } from 'react-intl';

import CheckboxInput from '../../elements/CheckboxInput';
import TextInput from '../../elements/TextInput';

export default class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    if (this.props.hidden) return null;

    const { id, content, created, prio, archived } = this.props.note;
    const { type } = this.props;

    return (
      <form className="editor" onSubmit={() => console.log('saved!')}>

        <header>
          <h1>Edit {type} #{id}</h1>
          <FormattedDate value={created} />
          <button onClick={() => console.log('closed!')}>X</button>
        </header>

        <form onSubmit={this.onSubmit.bind(this)}>

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
          onClick={() => this.setState({ archived: !archived })}
          />

        <TextInput
          id="content"
          label="Contents"
          defaultValue={content}
          onChange={(e) => this.setState({ content: e.target.value })}
          />

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
