import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import NoteList from './components/views/NoteList';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={NoteList}/>
  </Route>
);
