import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
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

  onClickSave(e) {
    e.preventDefault();
    this.props.actions.createEntry(this.state.entry);
  }

  journalEntryRow(entry, index) {
    return (
      <div key={index}>
        {entry.title}
      </div>
    );
  }

  render() {
    return (
      <div className="journal">
        <h1>Journal Entries</h1>

        {this.props.journal.map(this.journalEntryRow)}

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
  actions: PropTypes.object.isRequired,
  journal: PropTypes.array.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    journal: state.journal
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions : bindActionCreators(journalActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Journal);
