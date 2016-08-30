import React, { PropTypes } from 'react';

export default function Note({
  note, removeNote, editNote,
}) {
  const { id, content, prio } = note;
  return (
      <li>
        <button onClick={() => removeNote(id)}>x</button>
        <span className="priority">{ prio ? '!' : null}</span>
        <span className="content">{content}</span>
        <button onClick={() => editNote(id)}>EDIT</button>
      </li>

  );
}

Note.propTypes = {
  note: PropTypes.object.isRequired,
  removeNote: PropTypes.func.isRequired,
  editNote: PropTypes.func.isRequired,
};
