import './lib/styles.scss'
import React from 'react'
import { render } from 'react-dom'

import { Provider } from 'react-redux'
import { createStore } from 'redux'
import store from './redux/store'

import { Router, Route, hasHistory } from 'react-router'
import routes from './routes'
import Aether from './containers/Aether'

let s = createStore(store,
  process.env.NODE_ENV === 'development' ? (
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__()
  ) : null
)

render(
  <Provider store={s}>
    <Router history={hasHistory} routes={routes}>
    </Router>
  </Provider>,
  document.getElementById('app')
)
