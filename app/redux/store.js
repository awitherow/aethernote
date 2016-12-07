import { createStore } from 'redux'
import {
  LOADING, GRANT_AUTHORITY, HANDLE_ROUTE, OPEN_EDITOR, CLOSE_EDITOR,
} from './constants'

function checkAuthentication() {
  return process.env.NODE_ENV === 'development' ? true : false
}

const initialState = {
  loading: false,
  authenticated: checkAuthentication(),
  currentType: 'note',
  editor: {
    hidden: true,
    note: {},
  },
}

export default createStore((intialState, action) => {
  switch(action.type) {
    case LOADING: return {
      ...initialState,
      loading: action.data,
    }
    case GRANT_AUTHORITY: return {
      ...initialState,
      authenticated: action.data,
    }
    case HANDLE_ROUTE: return {
      ...initialState,
      currentType: action.data,
    }
    case OPEN_EDITOR: return {
      ...initialState,
      editor: {
        hidden: false,
        note: action.data,
      },
    }
    case CLOSE_EDITOR: return {
      ...initialState,
    }
  }
})
