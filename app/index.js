import './lib/styles.css'
import React from 'react'
import { render } from 'react-dom'

import { Provider } from 'react-redux'
import { createStore } from 'redux'
import store from './redux/store'

import Aether from './Aether'

const rootEl = document.getElementById('app')

let s = createStore(store,
  process.env.NODE_ENV === 'development' ? (
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__()
  ) : null
)

if (process.env.NODE_ENV === 'development') {
  const { AppContainer } = require('react-hot-loader')
  const hotRender = (Component) => {
    render(
      <AppContainer>
        <Provider store={s}>
          <Component />
        </Provider>
      </AppContainer>,
      rootEl,
    )
  }

  hotRender(Aether)

  if (module.hot) {
    module.hot.accept('./Aether', () => {
      module.hot.accept('./redux/store', () => s.replaceReducer(store))
      hotRender(Aether)
    })
  }

} else {
  render(Aether, rootEl)
}