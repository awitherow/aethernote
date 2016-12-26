import React, { PropTypes } from 'react'
import './list-item.scss'

import Basic from './basic'

const ListItemHandler = ({
  item, edit,
}) => {
  const defaultProps = { item, edit }
  switch(item.type) {
    case 'journal': return <Basic {...defaultProps}/>
    case 'note': return <Basic {...defaultProps}/>
  }
}

ListItemHandler.propTypes = {
  item: PropTypes.object.isRequired,
  edit: PropTypes.func.isRequired,
}

export default ListItemHandler
