import React, { PropTypes } from 'react'
import './list-item.css'

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
  item, edit, submitEdit,
}) => {
  const basicProps = {
    item: {
      id: item.id,
      type: item.type,
      content: selectContentType(item),
      prio: item.type && item.prio,
    },
    edit,
  }

  switch(item.type) {
    case 'journal': return <Basic {...basicProps}/>
    case 'note': return <Basic {...basicProps}/>
    case 'habit':
      return <Habit item={item} edit={edit} submitEdit={submitEdit} />
    default: return <Basic {...basicProps}/>
  }
}

ListItemHandler.propTypes = {
  item: PropTypes.object.isRequired,
  edit: PropTypes.func.isRequired,
  submitEdit: PropTypes.func,
}

export default ListItemHandler
