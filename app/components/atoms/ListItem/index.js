import React, { PropTypes } from 'react'

const ListItem = ({
  id, content, prio, edit,
}) => {
  let prioElement = <span className="priority">&#9888;</span>
  return (
      <li>
        { prio ?  prioElement : null }
        <span className="title">{content}</span>
        <button onClick={() => edit(id)}>&#9998;</button>
      </li>

  )
}

ListItem.propTypes = {
  id: PropTypes.number.isRequired,
  content: PropTypes.string.isRequired,
  prio: PropTypes.bool.isRequired,
  edit: PropTypes.func.isRequired,
}

export default ListItem
