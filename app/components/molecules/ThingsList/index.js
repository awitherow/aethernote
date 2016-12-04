import React, { PropTypes } from 'react'
import ListItem from '../../atoms/ListItem'

function selectContentType(note) {
  switch (note.type) {
    case 'journal': return note.content
    case 'note': return note.title
  }
}

export default function ThingsList({
  things,
  edit,
  remove,
}) {
  return (
    <ul className="list">
      {things.map(note =>
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

ThingsList.propTypes = {
  things: PropTypes.array.isRequired,
  edit: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
}
