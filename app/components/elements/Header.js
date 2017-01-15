import React, { PropTypes } from 'react'

import {
  Navbar, Nav, NavItem, Glyphicon,
} from 'react-bootstrap'

const Header = ({ toggleSearch, logout }) => {
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
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

Header.propTypes = {
  currentType: PropTypes.string.isRequired,
  setType: PropTypes.func.isRequired,
  toggleSearch: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
}

export default Header
