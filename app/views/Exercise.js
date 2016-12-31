import React, { Component, PropTypes } from 'react'

import { isMobile } from '../lib/helpers'
import { categories, measurements } from '../lib/schema'

import {
  Table, Label, Button, Glyphicon, FormControl, DropdownButton, MenuItem,
} from 'react-bootstrap'

const getInitialState = entries =>
  entries.reduce((initialState, entry) => {
    return {
      ...initialState,
      [entry.id]: {
        repetitions: 1,
        value: 1,
        measurement: measurements[entry.type][entry.category],
      },
    }
  }, {})

export default class Habit extends Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
    entries: PropTypes.array.isRequired,
    submitEdit: PropTypes.func.isRequired,
    // redux functions
    editItem: PropTypes.func.isRequired,
  }

  state = {
    ...getInitialState(this.props.entries),
    category: null,
    filter: false,
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.entries.length > this.props.entries.length) {
      this.updateEntryIdMap(nextProps.entries)
    }
  }

  updateEntryIdMap = (entries = this.props.entries) =>
    this.setState({ ...getInitialState(entries)})

  recordHabit = (entry) => {
    this.props.submitEdit({
      content: parseInt(entry.content) + parseInt(this.state[entry.id]),
      tally: true,
      value: this.state[entry.id],
    }, entry)
    this.updateEntryIdMap()
  }

  handleChange = (whatToChange, change) =>
    this.setState({ [whatToChange]: change })

  render() {
    const { filter } = this.state
    const { entries, type, editItem } = this.props
    return (
      <div>
        <style type="text/css">{`
          .note-list-modifer {
            margin-bottom: 10px;
          }
          .input-with-button {
            display: flex;
          }
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
                : 'Impact'
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
          <Button
            disabled={!filter}
            bsStyle="primary"
            onClick={() => this.setState({ filter: !filter, category: null })}>
            <Glyphicon glyph="remove" />
          </Button>
        </div>
        <Table striped hover responsive={isMobile} condensed={isMobile}>
          <thead>
            <tr>
              <td>Title</td>
              <td>Category</td>
              <td>Current</td>
              <td>Track</td>
              <td>Edit</td>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry, i) =>
              <tr key={i}>
                <td>{entry.title}</td>
                <td>
                  <Label>
                    {entry.category}
                  </Label>
                </td>
                <td>{entry.content}</td>
                <td className="input-with-button">
                  <FormControl
                    className="minput"
                    type="number"
                    value={this.state[entry.id]}
                    onChange={(e) => this.setState({ [entry.id] : e.target.value})}
                  />
                  <Button
                    block={isMobile}
                    bsSize="xsmall" onClick={() => this.recordHabit(entry)}>
                    <Glyphicon glyph="plus"/>
                  </Button>
                </td>
                <td>
                  <Button
                    block={isMobile}
                    onClick={() => editItem(entry.id)}>
                    <Glyphicon glyph="edit" />
                  </Button>
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    )
  }
}
