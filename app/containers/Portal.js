import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { login, signup, authenticateUser } from '../api/security'
import { Form, Button, FormControl, FormGroup, ControlLabel, ButtonGroup } from 'react-bootstrap'

import {
    grantAuthority,
    setUser,
} from '../redux/actions'

class Portal extends Component {
  constructor(props) {
    super(props)
    const storedMessage = localStorage.getItem('successMessage')
    let successMessage = ''

    if (storedMessage) {
      successMessage = storedMessage
      localStorage.removeItem('successMessage')
    }

    this.state = {
      errors: {},
      successMessage,
      username: '',
      password: '',
    }
  }

  static contextTypes = {
    router: PropTypes.object.isRequired,
  }

  authenticateLoginAttempt = (e) => {
    e.preventDefault()
    const { username, password, failureAttempts } = this.state

    login(encodeURIComponent(username), encodeURIComponent(password), ({ data }) => {
      if (!data) {
        if (failureAttempts >= 3) {
                    // set locked cookie.
                    // redirect to some messed up website.
        } else {
          this.setState({
            error: 'User not found',
            failureAttempts: failureAttempts + 1,
          })
        }
      } else {
        authenticateUser(data.token)
        this.context.router.replace('/')
        this.props.grantAuthority(true)
        this.props.setUser(username)
      }
    })
  }

  authenticateSignupAttempt = (e) => {
    e.preventDefault()
    const { username, password } = this.state

    signup(encodeURIComponent(username), encodeURIComponent(password), ({ data }) => {
      if (data) {
        authenticateUser(data.token)
        this.context.router.replace('/')
        this.props.grantAuthority(true)
        this.props.setUser(username)
      } // TODO: add else for failures
    })
  }

  render() {
    const { username, password } = this.state
    return (
            <div style={{ height: '100%' }}>
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
                            id="username"
                            value={username}
                            onChange={(e) => this.setState({ username: e.target.value })}
                            />
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>Password: </ControlLabel>
                        <FormControl
                            id="password"
                            value={password}
                            type="password"
                            onChange={(e) => this.setState({ password: e.target.value })}
                            />
                    </FormGroup>

                    <ButtonGroup>
                        <Button onClick={this.authenticateLoginAttempt} bsStyle="primary">
                            Login
                        </Button>
                        <Button onClick={this.authenticateSignupAttempt}>
                            Signup
                        </Button>
                    </ButtonGroup>
                </Form>
            </div>
    )
  }
}

Portal.propTypes = {
  grantAuthority: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired,
}

const mapStateToProps = ({
  authenticated,
}) => ({
  authenticated,
})

const mapDispatchToProps = dispatch => ({
  grantAuthority: (v) => dispatch(grantAuthority(v)),
  setUser: (v) => dispatch(setUser(v)),
})

const ConnectedPortal = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Portal)

export default ConnectedPortal