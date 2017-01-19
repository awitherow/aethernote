import './lib/styles.css'
import React from 'react'
import { render } from 'react-dom'

import App from './App'

const rootEl = document.getElementById('app')

if (process.env.NODE_ENV === 'dev') {
  const { AppContainer } = require('react-hot-loader')
  const hotRender = (Component) => {
    render(
      <AppContainer>
        <Component/>
      </AppContainer>,
      rootEl,
    )
  }

  hotRender(App)

  if (module.hot) {
    module.hot.accept('./App', () => {
      hotRender(
        <AppContainer>
           <App />
        </AppContainer>,
        rootEl
      )
    })
  }

} else {
  render(App, rootEl)
}
