import React, { Component, PropTypes } from 'react'

import { checkAuth } from '../../api/security'

import FlexibleInput from '../../elements/FlexibleInput'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      failureAttempts: 0,
      userId: '',
      userKey: '',
    }
  }

  authenticateLoginAttempt = (e) => {
    e.preventDefault()
    const { userId, userKey, failureAttempts } = this.state

    checkAuth(userId, userKey, check => {
      if (!check) {
        if (failureAttempts >= 3) {
          // set locked cookie.
          // redirect to some messed up website.
        } else {
          this.setState({
            failureAttempts: failureAttempts + 1,
          })
        }
      } else {
        this.context.update('auth', true)
      }
    })
  }

  render() {
    const { userId, userKey } = this.state
    return (
      <form onSubmit={this.authenticateLoginAttempt}>
        <FlexibleInput
          id="userId"
          label="Username"
          type="text"
          value={userId}
          onChange={(e) => this.setState({ userId: e.target.value })}
          />
        <FlexibleInput
          id="userKey"
          label="Password"
          type="password"
          value={userKey}
          onChange={(e) => this.setState({ userKey: e.target.value })}
          />
        <button>Submit</button>
      </form>
    )
  }
}

Login.contextTypes = {
  update: PropTypes.func.isRequired,
}

export default Login
