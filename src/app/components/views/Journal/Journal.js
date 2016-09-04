import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as journalActions from '../../../actions/journalActions';

import TextInput from '../../elements/TextInput';

class Journal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      entry: {
        title: '',
        type: 'journal'
      }
    };

    this.onTitleChange = this.onTitleChange.bind(this);
    this.onClickSave = this.onClickSave.bind(this);
  }

  onTitleChange(e) {
    const entry = this.state.entry;
    entry.title = e.target.value;
    this.setState({ entry });
  }

  onClickSave() {
    this.props.dispatch(journalActions.createEntry(this.state.entry));
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

Journal.propTypes = {
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    journal: state.journal
  };
}

export default connect(
  mapStateToProps
)(Journal);
