import {
  LOADING, GRANT_AUTHORITY, HANDLE_ROUTE, OPEN_EDITOR, CLOSE_EDITOR, TOGGLE_SEARCH,
} from './constants'

// app
export const toggleLoading = (data) => ({ type: LOADING, data })
export const grantAuthority = (data) => ({ type: GRANT_AUTHORITY, data })
export const routeTo = (data) => ({ type: HANDLE_ROUTE, data })

// editor
export const openEditor = (data) => ({ type: OPEN_EDITOR, data })
export const closeEditor = () => ({ type: CLOSE_EDITOR })

// search
export const toggleSearch = (data) => ({ type: TOGGLE_SEARCH, data })
