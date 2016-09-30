import React, { Component, PropTypes } from 'react';

import checkAuthentication from './common/auth';

export default class Login extends Component {
  constructor(props) {
    super(props);
  }

  authenticateLoginAttempt() {
  }

  render() {
    return (
      <form onSubmit={this.authenticateLoginAttempt}>

      </form>
    );
  }
}

Login.propTypes = {
  test: PropTypes.string.isRequired,
};

export default Login;
