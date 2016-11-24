import './styles/header.scss'
import React, { PropTypes } from 'react'
import Dropdown from '../Dropdown'

const routes = [
  'note-list',
  'journal',
]

const Header = ({ currentRoute, update }) => {
  return (
    <header className="main-header">
      <h1>Aether</h1>
      <Dropdown
        id="routes"
        label="Routes"
        options={routes}
        defaultValue={currentRoute}
        handleChange={e => update('newRoute', e.target.value)}
        />
    </header>
  )
}

Header.propTypes = {
  currentRoute: PropTypes.string.isRequired,
}

Header.contextTypes = {
  update: PropTypes.func.isRequired,
}

export default Header
