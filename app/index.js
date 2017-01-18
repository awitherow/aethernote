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

  if (module.hot) {
    module.hot.accept('./App', () => {
      const NewApp = require('./App').default
      hotRender(NewApp)
    })
  }
} else {
  render(App, document.getElementById('app'))
}
