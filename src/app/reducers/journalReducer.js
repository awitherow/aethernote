import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function(state = initialState.journal, action) {
  switch(action.type) {
    case types.CREATE_ENTRY:
      return [
        ...state,
        Object.assign({}, action.entry)
      ];
    case types.LOAD_ENTRIES_SUCCESS:
      return action.entries;
    default:
      return state;
  }
}
