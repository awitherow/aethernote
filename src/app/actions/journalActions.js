import * as types from './actionTypes';
import * as journalApi from '../api/journal';

export function loadEntriesSuccess(entries) {
  return { type: types.LOAD_ENTRIES_SUCCESS, entries };
}

export function loadJournalEntries() {
  return function(dispatch) {
    return journalApi.getEntries(entries => {
      dispatch(loadEntriesSuccess(entries));
    });
  };
}

export function saveJournalSucess(entry) {
  return { type: types.SAVE_ENTRIES_SUCCESS, entry };
}

export function saveJournalEntry(entry) {
  return function(dispatch, getState) {
    return journalApi.saveEntry(entry, () => {
      dispatch(saveJournalSucess(entry));
    });
  };
}
