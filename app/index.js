import './lib/styles.css'
import React from 'react'
import { render } from 'react-dom'

import { Provider } from 'react-redux'
import { createStore } from 'redux'
import store from './redux/store'

import { Router, hashHistory } from 'react-router'
import routes from './routes'

const rootEl = document.getElementById('app')

let s = createStore(store,
  process.env.NODE_ENV === 'development' ? (
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__()
  ) : null
)

const App = <Router history={hashHistory} routes={routes} />

if (process.env.NODE_ENV === 'development') {
  const { AppContainer } = require('react-hot-loader')
  const hotRender = (Component) => {
    render(
      <AppContainer>
        <Provider store={s}>
          {Component}
        </Provider>
      </AppContainer>,
      rootEl,
    )
  }

  hotRender(App)

  if (module.hot) {
    module.hot.accept('./Aether', () => {
      module.hot.accept('./redux/store', () => s.replaceReducer(store))
      hotRender(App)
    })
  }

} else {
  render(App, rootEl)
}