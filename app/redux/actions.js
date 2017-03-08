import {
  LOADING, GRANT_AUTHORITY, SET_TYPE, OPEN_EDITOR, CLOSE_EDITOR, TOGGLE_SEARCH, SET_DAY,
  OPEN_BATCH_EDITOR, CLOSE_BATCH_EDITOR,
} from './constants'

// app
export const toggleLoading = (data) => ({ type: LOADING, data })
export const setType = (data) => ({ type: SET_TYPE, data })

// editor
export const openEditor = (data) => ({ type: OPEN_EDITOR, data })
export const closeEditor = () => ({ type: CLOSE_EDITOR })

export const openBatchEditor = (data) => ({ type: OPEN_BATCH_EDITOR, data })
export const closeBatchEditor = () => ({ type: CLOSE_BATCH_EDITOR })

// search
export const toggleSearch = (data) => ({ type: TOGGLE_SEARCH, data })

// user
export const grantAuthority = (data) => ({ type: GRANT_AUTHORITY, data })

// planner
export const setDay = (data) => ({ type: SET_DAY, data })
