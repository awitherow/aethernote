import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as journalActions from '../../../actions/journalActions';
import EntriesList from './components/EntriesList';

class Journal extends Component {
  constructor(props, context) {
    super(props, context);
    this.loadEntries = this.props.actions.loadJournalEntries;
  }

  componentDidMount() {
    this.loadEntries();
  }

  render() {
    const { journal } = this.props;

    return (
      <div className="journal">

        <h1>Journal Entries</h1>

        <EntriesList entries={journal} />

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
