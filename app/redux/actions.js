import {
  LOADING, GRANT_AUTHORITY, HANDLE_ROUTE, OPEN_EDITOR, CLOSE_EDITOR,
} from './constants'

// app
export const toggleLoading = (bool) => ({ type: LOADING, bool })
export const grantAuthority = (authd) => ({ type: GRANT_AUTHORITY, authd })
export const routeTo = (route) => ({ type: HANDLE_ROUTE, route })

// editor
export const openEditor = (note) => ({ type: OPEN_EDITOR, note })
export const closeEditor = () => ({ type: CLOSE_EDITOR })
