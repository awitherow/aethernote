import React, { PropTypes} from 'react'

import List from '../List'

export default function ListGroup({
  category,
  entries,
  editItem,
  removeItem,
}) {
  return (
    <div>
      <div>{category}</div>
      <List
        entries={entries}
        edit={editItem}
        remove={removeItem}
        />
    </div>
  )
}

ListGroup.propTypes = {
  category: PropTypes.string.isRequired,
  entries: PropTypes.array.isRequired,
  editItem: PropTypes.func.isRequired,
  removeItem: PropTypes.func.isRequired,
}
