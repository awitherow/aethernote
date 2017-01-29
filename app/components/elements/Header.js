import React, { Component, PropTypes } from 'react'

import { Link } from 'react-router'

import {
  Navbar, Nav, NavItem, Glyphicon,
} from 'react-bootstrap'

class Header extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired,
  }
  
  render() {
    const { toggleSearch, logout } = this.props

    return (
      <Navbar collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>Aether</Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem eventKey={1} onClick={() => toggleSearch(true)}>
              <Glyphicon glyph="search" />
            </NavItem>
            <NavItem eventKey={2} onClick={() => logout()}>
              <Glyphicon glyph="log-out" />
            </NavItem>
            <NavItem eventKey={3}>
              <Link to="/planner"> <Glyphicon glyph="calendar" /></Link>
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

Header.propTypes = {
  currentType: PropTypes.string.isRequired,
  setType: PropTypes.func.isRequired,
  toggleSearch: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
}

export default Header
