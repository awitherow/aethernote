import * as types from '../actions/actionTypes';

export default function(state = [], action) {
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
