import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './App';
import NoteList from './components/views/NoteList';
import Journal from './components/views/Journal';
import JournalEntry from './components/views/Journal/Entry';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={NoteList}/>
    <Route path="/journal" component={Journal}/>
    <Route path="/journal-entry" component={JournalEntry}/>
    <Route path="/journal-entry/:id" component={JournalEntry}/>
  </Route>
);
