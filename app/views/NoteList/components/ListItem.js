import React, { PropTypes } from 'react'

const ListItem = ({
  note, editItem,
}) => {
  const { id, title, prio } = note
  let prioElement = <span className="priority">&#9888;</span>
  return (
      <li>
        { prio ?  prioElement : null }
        <span className="title">{title}</span>
        <button onClick={() => editItem(id)}>&#9998;</button>
      </li>

  )
}

ListItem.propTypes = {
  note: PropTypes.object.isRequired,
  editItem: PropTypes.func.isRequired,
}

export default ListItem
