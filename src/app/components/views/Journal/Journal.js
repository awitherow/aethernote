import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as journalActions from '../../../actions/journalActions';

import EntriesList from './components/EntriesList';

class Journal extends Component {
  componentDidMount() {
    this.props.actions.loadJournalEntries();
  }

  render() {
    const { journal } = this.props;

    return (
      <div className="journal">

        <h1>Journal Entries</h1>

        <EntriesList entries={journal} />

        <Link to="/journal-entry">Add Entry</Link>

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
