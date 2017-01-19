import './lib/styles.css'
import React from 'react'
import { Provider } from 'react-redux'
import { render } from 'react-dom'
import { createStore } from 'redux'
import store from './redux/store'

import Aether from './containers/Aether'

let reducer = createStore(store,
  process.env.NODE_ENV === 'dev' ? (
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__()
  ) : null
)

const rootEl = document.getElementById('app')

if (process.env.NODE_ENV === 'dev') {
  const { AppContainer } = require('react-hot-loader')
  const hotRender = (Component) => {
    render(
      <AppContainer>
        <Provider store={reducer}>
          <Component />
        </Provider>
      </AppContainer>,
      rootEl,
    )
  }

  hotRender(Aether)

  if (module.hot) {
    module.hot.accept('./containers/Aether', () => {
      module.hot.accept('./redux/store', () => reducer.replaceReducer(store))
      hotRender(require('./containers/Aether').default)
    })
  }

} else {
  render(Aether, rootEl)
}
