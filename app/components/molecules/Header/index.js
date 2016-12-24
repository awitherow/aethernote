import './header.scss'
import React, { PropTypes } from 'react'
import Dropdown from '../../atoms/Dropdown'

const routes = [
  'note',
  'journal',
]

const Header = ({ currentType, routeTo, toggleSearch }) => {
  return (
    <header className="main-header">
      <h1>Aether</h1>
      <Dropdown
        id="routes"
        label="Routes"
        options={routes}
        defaultValue={currentType}
        handleChange={e => routeTo(e.target.value)}
        />
      <button onClick={() => toggleSearch(true)}>SEARCH</button>
    </header>
  )
}

Header.propTypes = {
  currentType: PropTypes.string.isRequired,
  routeTo: PropTypes.func.isRequired,
  toggleSearch: PropTypes.func.isRequired,
}

export default Header
