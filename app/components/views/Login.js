import React, { Component, PropTypes } from 'react'

import { attemptLogin } from '../../api/security'

import { Form, Button, FormControl, FormGroup, ControlLabel } from 'react-bootstrap'

export default class Login extends Component {
  static propTypes = {
    grantAuthority: PropTypes.func.isRequired,
  }

  state = {
    failureAttempts: 0,
    userId: '',
    userKey: '',
  }

  authenticateLoginAttempt = (e) => {
    e.preventDefault()
    const { userId, userKey, failureAttempts } = this.state

    attemptLogin(userId, userKey, check => {
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
        this.props.grantAuthority(true)
      }
    })
  }

  render() {
    const { userId, userKey } = this.state
    return (
      <div style={{height: '100%'}}>
        <style type="text/css">{`
          .login-container {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            height: 100vh;
            max-width: 500px;
            margin: 0 auto;
          }
        `}</style>
        <Form className="login-container">
          <FormGroup>
            <ControlLabel>Username: </ControlLabel>
            <FormControl
              id="userId"
              value={userId}
              onChange={(e) => this.setState({ userId: e.target.value })}
              />
          </FormGroup>
          <FormGroup>
            <ControlLabel>Password: </ControlLabel>
            <FormControl
              id="userKey"
              value={userKey}
              type="password"
              onChange={(e) => this.setState({ userKey: e.target.value })}
            />
          </FormGroup>

          <Button
            onClick={this.authenticateLoginAttempt}
            bsStyle="primary">
            Login
          </Button>
        </Form>
      </div>
    )
  }
}
