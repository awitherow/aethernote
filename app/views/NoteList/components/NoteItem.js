import React, { PropTypes } from 'react';

const NoteItem = ({
  note, removeNote, editNote,
}) => {
  const { id, title, prio } = note;
  return (
      <li>
        <button onClick={() => removeNote(id)}>x</button>
        <span className="priority">{ prio ? '!' : null}</span>
        <span className="title">{title}</span>
        <button onClick={() => editNote(id)}>EDIT</button>
      </li>

  );
};

NoteItem.propTypes = {
  note: PropTypes.object.isRequired,
  removeNote: PropTypes.func.isRequired,
  editNote: PropTypes.func.isRequired,
};

export default NoteItem;
