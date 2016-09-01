import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import routes from './routes';
import { IntlProvider } from 'react-intl';

import App from './App';

render(
  <IntlProvider locale="en">
    <Router history={browserHistory} routes={routes} />
  </IntlProvider>
  , document.getElementById('app'));
