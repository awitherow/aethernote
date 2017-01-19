import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import store from './redux/store'

import Aether from './containers/Aether'

let s = createStore(store,
  process.env.NODE_ENV === 'dev' ? (
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__()
  ) : null
)

export default class App extends Component {
  render() {
    return (
      <Provider store={s}>
        <Aether />
      </Provider>
    )
  }
}
