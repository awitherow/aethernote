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

export function updateEntrySucess(entries) {
  return {
    type: types.UPDATE_ENTRIES_SUCCESS,
    entries
  };
}

export function saveJournalEntry(entry) {
  return function(dispatch, getState) {
    return journalApi.saveEntry(savedEntry => {
      dispatch(updateEntrySucess(savedEntry));
    });
  };
}
