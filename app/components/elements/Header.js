import React, { PropTypes } from 'react'

import {
  Navbar, Nav, NavItem, Glyphicon,
} from 'react-bootstrap'

const Header = ({ toggleSearch }) => {
  return (
    <Navbar collapseOnSelect>
      <Navbar.Header>
        <Navbar.Brand>Aether</Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav>
          <NavItem eventKey={2} onClick={() => toggleSearch(true)}>
            <Glyphicon glyph="search" />
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
}

export default Header
