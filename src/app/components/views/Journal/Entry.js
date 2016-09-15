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
  }

  render() {
    const { entry, errors } = this.state;
    return (
      <div className="entry">
        <h1>Manage Course</h1>
        <EntryForm
          entry={this.state.entry}
          errors={this.state.errors}
          />
      </div>
    );
  }
}

Entry.propTypes = {
  entry: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  let entry = {
    content: '',
    type: 'journal'
  };

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
