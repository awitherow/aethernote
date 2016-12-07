import './lib/styles.scss'
import React from 'react'
import { render } from 'react-dom'

import { Provider } from 'react-redux'
import { createStore } from 'redux'
import store from './redux/store'

let s = createStore(store,
  window.__REDUX_DEVTOOLS_EXTENSION__ &&
  window.__REDUX_DEVTOOLS_EXTENSION__()
)

import Aether from './Aether'

render(
  <Provider store={s}>
    <Aether />
  </Provider>,
  document.getElementById('app')
)
