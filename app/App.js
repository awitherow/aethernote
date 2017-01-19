import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import store from './redux/store'

import { Router, hashHistory } from 'react-router'
import routes from './routes'

let s = createStore(store,
  process.env.NODE_ENV === 'development' ? (
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__()
  ) : null
)

export default class App extends Component {
  render() {
    return (
      <Provider store={s}>
        <Router history={hashHistory} routes={routes} />
      </Provider>
    )
  }
}
