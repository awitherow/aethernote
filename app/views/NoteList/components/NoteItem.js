import React, { PropTypes } from 'react';

const NoteItem = ({
  note, editNote,
}) => {
  const { id, title, prio } = note;
  return (
      <li>
        <span className="priority">{ prio ? '!' : null}</span>
        <span className="title">{title}</span>
        <button onClick={() => editNote(id)}>EDIT</button>
      </li>

  );
};

NoteItem.propTypes = {
  note: PropTypes.object.isRequired,
  editNote: PropTypes.func.isRequired,
};

export default NoteItem;
