import React, { PropTypes } from 'react'
import './list-item.scss'

import Basic from './basic'
import Habit from './habit'

function selectContentType(note) {
  switch (note.type) {
    case 'journal': return note.content
    case 'note': return note.title
    default: return note.title
  }
}

const ListItemHandler = ({
  item, edit,
}) => {
  const defaultProps = {
    item: {
      id: item.id,
      type: item.type,
      content: selectContentType(item),
      prio: item.type && item.prio,
    },
    edit,
  }

  switch(item.type) {
    case 'journal': return <Basic {...defaultProps}/>
    case 'note': return <Basic {...defaultProps}/>
    case 'habit':
      defaultProps.item.category = item.category
      delete defaultProps.item.prio
      return (
          <Habit {...defaultProps}/>
      )
    default: return <Basic {...defaultProps}/>
  }
}

ListItemHandler.propTypes = {
  item: PropTypes.object.isRequired,
  edit: PropTypes.func.isRequired,
}

export default ListItemHandler
