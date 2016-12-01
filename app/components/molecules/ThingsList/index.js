import React, { PropTypes } from 'react'
import ListItem from '../../atoms/ListItem'


export default function ThingsList({
  classModifier,
  things,
  edit,
  remove,
}) {
  const ThingsListClass = `thingslist ${classModifier}`
  return (
    <ul className={ThingsListClass}>
      {things.map(note =>
        <ListItem
          key={note.id}
          note={note}
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
  classModifier: PropTypes.string.isRequired,
}
