import React, { Component, PropTypes } from 'react';

import checkAuthentication from '../../common/auth';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      failureAttempts: 0,
      userId: '',
      userKey: '',
    };
    this.authenticateLoginAttempt = this.authenticateLoginAttempt.bind(this);
  }

  authenticateLoginAttempt() {
    if (!checkAuthentication) {
      const { failureAttempts } = this.state;

      if (failureAttempts >= 3) {
        // set locked cookie.
        // redirect to some messed up website.
      } else {
        this.setState({
          failureAttempts: failureAttempts + 1,
        });
      }
    }
  }

  render() {
    return (
      <form onSubmit={this.authenticateLoginAttempt}>

      </form>
    );
  }
}

Login.propTypes = {
};

Login.contextTypes = {
  update: PropTypes.func.isRequired,
};

export default Login;
