import React, { PropTypes } from 'react'
import ListItem from '../ListItem'

export default function List({
  entries,
  edit,
  submitEdit,
}) {
  return (
    <ul className="List">
      {entries.map(entry =>
        <ListItem
          key={entry.id}
          item={entry}
          edit={edit}
          submitEdit={submitEdit}
          />
      )}
    </ul>
  )
}

List.propTypes = {
  entries: PropTypes.array.isRequired,
  edit: PropTypes.func.isRequired,
  submitEdit: PropTypes.func,
}
