import React, { PropTypes } from 'react'
import ListItem from './ListItem'

import { isMobile } from '../../../lib/helpers'

export default function List({
  entries,
  edit,
  submitEdit,
}) {
  return (
    <ul className="list">
      {entries.map(entry =>
        <ListItem
          isMobile={isMobile}
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
