import { combineReducers } from 'redux';
import journal from './journalReducer';

const rootReducer =  combineReducers({
  journal
});

export default rootReducer;
