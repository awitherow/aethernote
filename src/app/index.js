import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import configureStore from './store/configureStore';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import routes from './routes';
import * as journalActions from './actions/journalActions';
import { IntlProvider } from 'react-intl';

import App from './App';

const store = configureStore();
store.dispatch(journalActions.loadJournalEntries());

render(
  <Provider store={store}>
    <IntlProvider locale="en">
      <Router history={browserHistory} routes={routes} />
    </IntlProvider>
  </Provider>, document.getElementById('app'));
