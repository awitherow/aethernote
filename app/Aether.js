import React, { Component, PropTypes } from 'react'
import { BrowserRouter, Match, Redirect } from 'react-router'
import { connect } from 'react-redux'

import { isUserAuthenticated } from './api/security'

import CMS from './containers/CMS'
import Portal from './containers/CMS'

class Aether extends Component {

  render() {
    return (
      <BrowserRouter>
        <div id="aether">
          <MatchWhenAuthorized pattern="/" component={CMS} />
          <Match pattern="/portal" component={Portal} />
        </div>
      </BrowserRouter>
    )
  }
}

const MatchWhenAuthorized = ({ component, ...rest }) => {
  console.log(rest)
  return (
    <Match {...rest} render={props => {
      console.log(props, rest)
      return (
        isUserAuthenticated() ? (
          <component {...props} />
        ) : (
          <Redirect to={{
            pathname: '/#/portal',
            state: { from: props.location },
          }}
          />
        )
      )}}/>
  )
}

Aether.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  user: PropTypes.string.isRequired,
}

const mapStateToProps = ({
  authenticated, user,
}) => ({
  authenticated,
  user,
})

const ConnectedAether = connect(mapStateToProps, null)(Aether)

export default ConnectedAether