import React, { PropTypes } from 'react'
import ListItem from '../../atoms/ListItem'

function selectContentType(note) {
  switch (note.type) {
    case 'journal': return note.content
    case 'note': return note.title
    default: return note.title
  }
}

export default function List({
  entries,
  edit,
}) {
  return (
    <ul className="List">
      {entries.map(entry =>
        <ListItem
          key={entry.id}
          id={entry.id}
          content={selectContentType(entry)}
          prio={entry.type && entry.prio}
          edit={edit}
          />
      )}
    </ul>
  )
}

List.propTypes = {
  entries: PropTypes.array.isRequired,
  edit: PropTypes.func.isRequired,
}
