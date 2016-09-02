import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './App';
import NoteList from './components/views/NoteList';
import Journal from './components/views/Journal';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={NoteList}/>
    <Route path="/journal" component={Journal}/>
  </Route>
);
