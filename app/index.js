import './lib/styles.css'
import React from 'react'
import { render } from 'react-dom'

import App from './App'

if (process.env.NODE_ENV === 'development') {
  const { AppContainer } = require('react-hot-loader')
  const hotRender = (Component) => {
    render(
      <AppContainer>
        <Component/>
      </AppContainer>,
      document.getElementById('root')
    )
  }

  hotRender(App)
} else {
  render(App, document.getElementById('app'))
}
