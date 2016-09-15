import React, { PropTypes } from 'react';

const Entry = ({
  entry
}) => {
  return (
    <div className="entry">
      {entry.content}
    </div>
  );
};

Entry.propTypes = {
  entry: PropTypes.object.isRequired
};

export default Entry;
