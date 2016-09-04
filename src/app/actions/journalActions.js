import * as types from './actionTypes';

export function createEntry(entry) {
  return {
    type: types.CREATE_ENTRY,
    entry
  };
}
