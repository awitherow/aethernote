import React, { Component, PropTypes } from 'react'

import { isMobile, sortByCategoryAndModified } from '../../lib/helpers'
import { categories } from '../../lib/schema'

import {
  Table, Label, Button, Glyphicon, DropdownButton, MenuItem,
} from 'react-bootstrap'

const mapCategoryToStyle = (cat) => {
  switch (cat) {
    case 'purchase': return 'danger'
    case 'income': return 'success'
    case 'investment': return 'info'
  }
}

export default class Habit extends Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
    entries: PropTypes.array.isRequired,
    // redux functions
    editItem: PropTypes.func.isRequired,
  }

  state = {
    category: null,
    filter: false,
  }

  handleChange = (whatToChange, change) =>
    this.setState({ [whatToChange]: change })

  render() {
    const { category, filter } = this.state
    const { entries, type, editItem } = this.props
    let sortedEntries = sortByCategoryAndModified(entries)
    const filteredEntries = filter ? sortedEntries.filter(entry =>
      entry.category === category
    ) : sortedEntries

    return (
      <div>
        <style type="text/css">{`
          .note-list-modifer {
            margin-bottom: 10px;
          }
          .input-with-button {
            display: flex;
          }
          .table>thead>tr>td,
          .table>tbody>tr>td {
            text-align: center;
            vertical-align: middle;
          }
          .minput {
            min-width: 100px;
          }
          `}</style>
          <div className="note-list-modifer">
            <DropdownButton
              id={`${type}-selector`}
              title={
                this.state.category ? this.state.category
                : 'Financial Type'
              }
              >
                {categories[type].map((category, i) =>
                  <MenuItem
                    key={i}
                    onSelect={() => {
                      const state = { category }
                      if (!filter) state.filter = true
                      this.setState(state)
                    }}>
                    {category}
                  </MenuItem>
                )}
              </DropdownButton>
              {filter ? (
                <Button
                  bsStyle="primary"
                  onClick={() => this.setState({ filter: !filter, category: null })}>
                  <Glyphicon glyph="remove" />
                </Button>
              ) : null}
            </div>
            <Table striped hover responsive={isMobile} condensed={isMobile}>
              <thead>
                <tr>
                  <td>Category</td>
                  <td>Title</td>
                  <td>Amount</td>
                  <td>Edit</td>
                </tr>
              </thead>
              <tbody>
                {filteredEntries.map((entry, i) => {
                  const content = typeof entry.content === "string"
                    ? JSON.parse(entry.content)
                    : entry.content
                  return (
                    <tr key={i}>
                      <td>
                        <Label bsStyle={mapCategoryToStyle(entry.category)}>
                          {entry.category}
                        </Label>
                      </td>
                      <td>{content.description}</td>
                      <td>
                        {`${content.value} ${content.currency.toUpperCase()}`}
                      </td>
                      <td>
                        <Button
                          block={isMobile}
                          onClick={() => editItem(entry.id)}>
                          <Glyphicon glyph="edit" />
                        </Button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </Table>
          </div>
        )
      }
    }
