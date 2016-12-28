import React, { Component, PropTypes } from 'react'

import {
  Table, Button, Glyphicon, DropdownButton, MenuItem,
} from 'react-bootstrap'

import Dropdown from '../../components/atoms/Dropdown'

import { categories } from '../../lib/schema'

class Notes extends Component {
  static propTypes = {
    entries: PropTypes.array.isRequired,
    type: PropTypes.string.isRequired,
    // redux functions
    editItem: PropTypes.func.isRequired,
  }

  static contextTypes = {
    getEntries: PropTypes.func.isRequired,
  }

  static defaultProps = {
    type: 'note',
  }

  state = {
    category: 'inbox',
    activeNotes: 0,
  }

  handleChange = (whatToChange, change) =>
    this.setState({ [whatToChange]: change })

  render = () => {
    const { type, entries, editItem } = this.props
    const { category } = this.state
    return (
      <div className="note-view" key="note-page">

        <div>
          <div className="note-view__sort">
            <DropdownButton
              id={`${type}-selector`}
              title={category ? category : categories[type][0]}
            >
              {categories[type].map((cat, i) =>
                <MenuItem
                  key={i}
                  onSelect={() => this.handleChange('category', cat)}>
                  {cat}
                </MenuItem>
              )}
            </DropdownButton>
          </div>

          <Table responsive striped hover condensed>
            <thead>
              <tr>
                <td>#</td>
                <td>Title</td>
                <td>Edit</td>
              </tr>
            </thead>
            <tbody>
              {entries.filter(note =>
                note.category === this.state.category
              ).map((entry, i) =>
                <tr key={i}>
                  <td>{entry.id}</td>
                  <td>{entry.title}</td>
                  <td>
                    <Button bsSize="small" onClick={() => editItem(entry.id)}>
                      <Glyphicon glyph="edit" />
                    </Button>
                  </td>
                </tr>
              )}
            </tbody>
          </Table>

        </div>
      </div>
    )
  }
}

export default Notes
