import React, { PropTypes} from 'react'

import ThingsList from '../ThingsList'

export default function ListGroup({
  category,
  things,
  editItem,
  removeItem,
}) {
  return (
    <div>
      <div>{category}</div>
      <ThingsList
        things={things}
        edit={editItem}
        remove={removeItem}
        />
    </div>
  )
}

ListGroup.propTypes = {
  category: PropTypes.string.isRequired,
  things: PropTypes.array.isRequired,
  editItem: PropTypes.func.isRequired,
  removeItem: PropTypes.func.isRequired,
}
