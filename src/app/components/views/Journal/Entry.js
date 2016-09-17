import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as journalActions from '../../../actions/journalActions';

import EntryForm from './components/EntryForm';

class Entry extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      entry: Object.assign({}, props.entry),
      errors: {}
    };

    this.updateState = this.updateState.bind(this);
    this.saveEntry = this.saveEntry.bind(this);
  }

  updateState(e) {
    const field = e.target.id;
    let entry = this.state.entry;
    entry[field] = e.target.value;
    return this.setState({ entry });
  }

  saveEntry(e) {
    e.preventDefault();
    this.props.actions.saveJournalEntry(this.state.entry);
    this.context.router.push('/journal');
  }

  render() {
    const { entry, errors } = this.state;
    return (
      <div className="entry">
        <h1>Manage Course</h1>
        <EntryForm
          entry={this.state.entry}
          errors={this.state.errors}
          onChange={this.updateState}
          onSave={this.saveEntry}
          />
      </div>
    );
  }
}

Entry.propTypes = {
  entry: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

Entry.contextTypes = {
  router: PropTypes.object
};

function getEntryById(entries, id) {
  const entry = entries.filter(entry => entry.id == id)[0];
  if (entry) return entry;
  return null;
}

function mapStateToProps(state, ownProps) {
  const entryId = ownProps.params.id;

  let entry;

  if (entryId && state.journal.length > 0) {
    entry = getEntryById(state.journal, entryId);
  } else {
    entry = { content: '' };
  }

  return {
    entry
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(journalActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Entry);
