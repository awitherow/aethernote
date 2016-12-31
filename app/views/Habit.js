import React, { Component, PropTypes } from 'react'

import { isMobile } from '../lib/helpers'
import { categories } from '../lib/schema'

import {
  Table, Label, Button, Glyphicon, FormControl, DropdownButton, MenuItem,
} from 'react-bootstrap'

const mapCategoryToStyle = (cat) => {
  switch (cat) {
    case 'godmode': return 'primary'
    case 'really good': return 'success'
    case 'good': return 'default'
    case 'bad': return 'info'
    case 'really bad': return 'warning'
    case 'ultimate sin': return 'danger'
  }
}

const getInitialState = entries =>
  entries.reduce((initialState, entry) => ({
    ...initialState,
    [entry.id]: 1,
  }), {})

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
    const { category, filter } = this.state
    const { entries, type, editItem } = this.props
    let sortedEntries = entries.sort(function(a, b){
      if (a.category < b.category) return 1
      if (a.category > b.category) return -1
      return 0
    })
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
            {filteredEntries.map((entry, i) =>
              <tr key={i}>
                <td>{entry.title}</td>
                <td>
                  <Label bsStyle={mapCategoryToStyle(entry.category)}>
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
