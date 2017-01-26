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

const App = (
  <Provider store={s}>
    <Router history={hashHistory} routes={routes} />
  </Provider>
)

if (process.env.NODE_ENV === 'dev') {
  const { AppContainer } = require('react-hot-loader')
  const hotRender = (Component) => {
    render(
      <AppContainer>
        <Component />
      </AppContainer>,
      rootEl,
    )
  }

  hotRender(App)

  if (module.hot) {
    module.hot.accept('./containers/Aether', () => {
      module.hot.accept('./redux/store', () => s.replaceReducer(store))
      hotRender(App)
    })
  }

} else {
  render(App, rootEl)
}