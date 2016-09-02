import React, { Component } from 'react';
import TextInput from '../../elements/TextInput';

export default class Journal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      entry: {
        title: null,
        type: 'journal'
      }
    };
  }

  render() {
    return (
      <div className="journal">
        <h1>Journal Entries</h1>
        <h2>Add Journal Entry</h2>
        <form className="add-journal__form">
          <TextInput
            id="note"
            label="Awaiting changes..."
            defaultValue={this.state.entry.title}
            onChange={this.onTitleChange}
            />

            <input
              type="submit"
              value="save"
              onClick={this.onClickSave}
              />
        </form>
      </div>
    );
  }
}