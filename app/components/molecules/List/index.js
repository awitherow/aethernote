import React, { PropTypes } from 'react'
import ListItem from '../../atoms/ListItem'

function selectContentType(note) {
  switch (note.type) {
    case 'journal': return note.content
    case 'note': return note.title
  }
}

export default function List({
  entries,
  edit,
  remove,
}) {
  return (
    <ul className="List">
      {entries.map(note =>
        <ListItem
          key={note.id}
          id={note.id}
          content={selectContentType(note)}
          prio={note.type && note.prio}
          edit={edit}
          remove={remove}
          />
      )}
    </ul>
  )
}

List.propTypes = {
  entries: PropTypes.array.isRequired,
  edit: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
}
