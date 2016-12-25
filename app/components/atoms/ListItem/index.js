import React, { PropTypes } from 'react'

const ListItem = ({
  id, content, prio, edit,
}) =>
  <li>
    <span className="priority">
      {prio}
    </span>
    <span className="title">{content}</span>
    <button onClick={() => edit(id)}>&#9998;</button>
  </li>

ListItem.propTypes = {
  id: PropTypes.number.isRequired,
  content: PropTypes.string.isRequired,
  prio: PropTypes.number.isRequired,
  edit: PropTypes.func.isRequired,
}

export default ListItem
