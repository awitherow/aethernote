import React, { PropTypes } from 'react';
import { IndexLink, Link } from 'react-router';

export default function Header(props) {
  return (
    <header>
      <h1>Aether</h1>
      <ul>
        <IndexLink to="/" activeClassName="active">Notes</IndexLink>
      </ul>
    </header>
  );
}
