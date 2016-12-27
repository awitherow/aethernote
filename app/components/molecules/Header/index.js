import React, { PropTypes } from 'react'
import { categories } from '../../../lib/schema'
import { toTitleCase } from '../../../lib/helpers'

import {
  Navbar, Nav, NavItem, NavDropdown, Glyphicon, MenuItem,
} from 'react-bootstrap'

const Header = ({ currentType, routeTo, toggleSearch }) => {
  return (
    <Navbar collapseOnSelect>
      <Navbar.Header>
        <Navbar.Brand>Aether</Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav>
          <NavDropdown
            eventKey={1}
            title={toTitleCase(currentType)}
            id="change-view"
          >
            {Object.keys(categories).map((type, i) =>
              <MenuItem
                active={currentType === type}
                eventKey={`1${i}`}
                key={i}
                onSelect={() => routeTo(type)}
              >
                {toTitleCase(type)}
              </MenuItem>
            )}
          </NavDropdown>
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
  routeTo: PropTypes.func.isRequired,
  toggleSearch: PropTypes.func.isRequired,
}

export default Header
