import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as journalActions from '../../../actions/journalActions';

class Entry extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (

    );
  }
}

Entry.propTypes = {
  example: PropTypes.string.isRequired
}

function mapStateToProps(state, ownProps) {
  return {
    state
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(journalActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Entry);
