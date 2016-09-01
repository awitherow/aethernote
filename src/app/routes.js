import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './App';
import NoteList from './views/NoteList';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={NoteList}/>
  </Route>
);
