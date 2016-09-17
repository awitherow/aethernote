import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function(state = initialState.journal, action) {
  switch(action.type) {
    case types.LOAD_ENTRIES_SUCCESS:
      return action.entries;
    case types.SAVE_ENTRIES_SUCCESS:
      return [
        ...state,
        Object.assign({}, action.entry)
      ];
    default:
      return state;
  }
}
