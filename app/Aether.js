import React, { Component, PropTypes } from 'react'
import { BrowserRouter, Match, Redirect } from 'react-router'
import { connect } from 'react-redux'

import { isUserAuthenticated } from './api/security'

import CMS from './containers/CMS'
import Portal from './containers/Portal'

class Aether extends Component {
  render() {
    return (
      <BrowserRouter>
        <div id="aether">
          <MatchWhenAuthorized pattern="/" component={CMS} />
          <Match exactly pattern="/portal" component={Portal} />
        </div>
      </BrowserRouter>
    )
  }
}

const MatchWhenAuthorized = ({ component: Component, ...rest }) => (
  <Match exactly {...rest} render={props => {
    return (
      isUserAuthenticated() ? (
        <Component />
      ) : (
        <Redirect to={{
          pathname: '/portal',
          state: { from: props.location },
        }}
        />
      )
    )}}/>
)

MatchWhenAuthorized.propTypes = {
  location: PropTypes.object,
  component: PropTypes.func.isRequired,
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