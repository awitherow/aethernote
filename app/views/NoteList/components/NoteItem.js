import React, { PropTypes } from 'react';

const NoteItem = ({
  note, editNote,
}) => {
  const { id, title, prio } = note;
  let prioElement = <span className="priority">&#9888;</span>;
  return (
      <li>
        { prio ?  prioElement : null }
        <span className="title">{title}</span>
        <button onClick={() => editNote(id)}>&#9998;</button>
      </li>

  );
};

NoteItem.propTypes = {
  note: PropTypes.object.isRequired,
  editNote: PropTypes.func.isRequired,
};

export default NoteItem;
