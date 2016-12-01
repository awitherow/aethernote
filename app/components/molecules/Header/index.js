import './styles/header.scss'
import React, { PropTypes } from 'react'
import Dropdown from '../../atoms/Dropdown'

const routes = [
  'note',
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
  update: PropTypes.func.isRequired,
}

export default Header
