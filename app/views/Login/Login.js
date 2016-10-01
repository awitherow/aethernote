import React, { Component, PropTypes } from 'react';

import { authenticateLogin } from '../../common/auth';

import TextInput from '../../elements/TextInput';

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

  authenticateLoginAttempt(e) {
    e.preventDefault();
    const { userId, userKey } = this.state;
    if (!authenticateLogin({ userId, userKey })) {
      const { failureAttempts } = this.state;

      if (failureAttempts >= 3) {
        // set locked cookie.
        // redirect to some messed up website.
      } else {
        this.setState({
          failureAttempts: failureAttempts + 1,
        });
      }
    } else {
      this.context.update('auth', true);
    }
  }

  render() {
    const { userId, userKey } = this.state;
    return (
      <form onSubmit={this.authenticateLoginAttempt}>
        <TextInput
          id="userId"
          label="Username"
          defaultValue={userId}
          onChange={(e) => this.setState({ userId: e.target.value })}
          />
        <fieldset>
          <label htmlFor="userKey">Password</label>
          <input
            id="userKey"
            type="password"
            defaultValue={userKey}
            onChange={(e) => this.setState({ userKey: e.target.value })}
            />
        </fieldset>
        <button>Submit</button>
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
