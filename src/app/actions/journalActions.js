import * as types from './actionTypes';
import * as journalApi from '../api/journal';

export function createEntry(entry) {
  return {
    type: types.CREATE_ENTRY,
    entry
  };
}

export function loadEntriesSuccess(entries) {
  return {
    type: types.LOAD_ENTRIES_SUCCESS,
    entries
  };
}

export function loadJournalEntries() {
  return function(dispatch) {
    return journalApi.getEntries(entries => {
      dispatch(loadEntriesSuccess(entries));
    });
  };
}
