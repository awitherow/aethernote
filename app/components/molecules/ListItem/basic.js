import React, { PropTypes } from 'react'
import './list-item.scss'
import classnames from 'classnames'

const Basic = ({
  item, edit,
}) =>
  <li>
    <span className={classnames('title', {
      'high-prio': item.prio === 3,
      'med-prio': item.prio === 2,
      'low-prio': item.prio === 1,
    })}>
      {item.content}
    </span>
    <button onClick={() => edit(item.id)}>&#9998;</button>
  </li>

Basic.propTypes = {
  item: PropTypes.object.isRequired,
  edit: PropTypes.func.isRequired,
}

export default Basic
