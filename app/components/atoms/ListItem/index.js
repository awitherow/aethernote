import React, { PropTypes } from 'react'
import './list-item.scss'
import classnames from 'classnames'

const ListItem = ({
  id, content, prio, edit,
}) =>
  <li>
    <span className={classnames('title', {
      'high-prio': prio === 3,
      'med-prio': prio === 2,
      'low-prio': prio === 1,
    })}>
      {content}
    </span>
    <button onClick={() => edit(id)}>&#9998;</button>
  </li>

ListItem.propTypes = {
  id: PropTypes.number.isRequired,
  content: PropTypes.string.isRequired,
  prio: PropTypes.number.isRequired,
  edit: PropTypes.func.isRequired,
}

export default ListItem
