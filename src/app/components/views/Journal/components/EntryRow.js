import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const Entry = ({
  entry
}) => {
  return (
    <div className="entry">
      <span>{entry.content}</span>
      <Link to={`/journal-entry/${entry.id}`}>View Entry</Link>
    </div>
  );
};

Entry.propTypes = {
  entry: PropTypes.object.isRequired
};

export default Entry;
