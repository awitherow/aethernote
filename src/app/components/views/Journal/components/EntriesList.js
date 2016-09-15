import React, { PropTypes } from 'react';
import Entry from './Entry';

const EntriesList = ({
  entries
}) => {
  return (
    <div className="">
      {entries.map(entry => {
        return <Entry key={entry.id} entry={entry} />;
      })}
    </div>
  );
};

EntriesList.propTypes = {
  entries: PropTypes.array.isRequired
};

export default EntriesList;
