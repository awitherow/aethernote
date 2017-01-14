import {
  LOADING, GRANT_AUTHORITY, SET_TYPE, OPEN_EDITOR, CLOSE_EDITOR, TOGGLE_SEARCH, SET_USERNAME,
} from './constants'

function checkAuthentication() {
  if (process.env.NODE_ENV === 'development') {
    return true
  } else {
    // check cookies?
    return false
  }
}

const initialState = {
  user: null,
  loading: false,
  authenticated: checkAuthentication(),
  currentType: 'note',
  editor: {
    hidden: true,
    note: {},
  },
  searching: false,
}

const Store = (state, action) => {
  switch(action.type) {
    case LOADING: return {
      ...state,
      loading: action.data,
    }
    case GRANT_AUTHORITY: return {
      ...state,
      authenticated: action.data,
    }
    case SET_USERNAME: return {
      ...state,
      user: action.data,
    }
    case SET_TYPE: return {
      ...state,
      currentType: action.data,
    }
    case OPEN_EDITOR: return {
      ...state,
      searching: false,
      editor: {
        hidden: false,
        note: action.data,
      },
    }
    case CLOSE_EDITOR: return {
      ...state,
      editor: {
        hidden: true,
        note: {},
      },
    }
    case TOGGLE_SEARCH: return {
      ...state,
      searching: action.data,
    }
    default: return initialState
  }
}

export default Store
