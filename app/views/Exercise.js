import React, { Component, PropTypes } from 'react'
import moment from 'moment'

import { isMobile } from '../lib/helpers'
import { categories, measurements } from '../lib/schema'

import {
  Table, Label, Button, Glyphicon, FormControl, DropdownButton, MenuItem,
  InputGroup,
} from 'react-bootstrap'

const getInitialState = entries =>
  entries.reduce((initialState, entry) => {
    return {
      ...initialState,
      [entry.id]: {
        'multiplier': 1,
        'value': 1,
        measurement: measurements[entry.type][entry.category],
      },
    }
  }, {})

const checkRecord = (entry, oldEntry) => ({
  value: entry.value > oldEntry.best.value ? entry.value : oldEntry.best.value,
  date: entry.value > oldEntry.best.value ? moment() : oldEntry.best.date,
})

export default class Habit extends Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
    entries: PropTypes.array.isRequired,
    submitEdit: PropTypes.func.isRequired,
    // redux functions
    editItem: PropTypes.func.isRequired,
  }

  static defaultProps = {
    entries: [],
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

  recordExercise = (entry) => {
    let content = JSON.parse(entry.content)
    this.props.submitEdit({
      tally: true,
      value: {
        multiplier: this.state[entry.id].multiplier,
        value: this.state[entry.id].value,
        total: this.state[entry.id].value * this.state[entry.id].multiplier,
      },
      content: {
        best: checkRecord(this.state[entry.id], content),
        total: (
          content.total + (
            this.state[entry.id].value * this.state[entry.id].multiplier
          )
        ),
      },
    }, entry)
    this.updateEntryIdMap()
  }

  handleChange = (whatToChange, change) =>
    this.setState({ [whatToChange]: change })

  handleComplexInput = (id, whatToChange, change) => {
    let update = this.state[id]
    update[whatToChange] = change
    this.setState({ [id]: update })
  }

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
                : 'Form'
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
              <td>Total</td>
              <td>Best</td>
              <td>Units</td>
              <td>Add</td>
              <td>Edit</td>
            </tr>
          </thead>
          <tbody>
            {filteredEntries.map((entry, i) =>
              <tr key={i}>
                <td>{entry.title}</td>
                <td>
                  <Label>
                    {entry.category}
                  </Label>
                </td>
                <td>{JSON.parse(entry.content)['total']}</td>
                <td>{JSON.parse(entry.content)['best'].value}</td>
                <td>
                  <InputGroup>
                    <FormControl
                      className="minput"
                      type="number"
                      value={this.state[entry.id].multiplier}
                      onChange={(e) => this.handleComplexInput(
                        entry.id, 'multiplier', e.target.value
                      )}
                    />
                    <FormControl
                      className="minput"
                      type="number"
                      value={this.state[entry.id].value}
                      onChange={(e) => this.handleComplexInput(
                        entry.id, 'value', e.target.value
                      )}
                    />
                    <InputGroup.Addon>
                      {this.state[entry.id].measurement}
                    </InputGroup.Addon>
                  </InputGroup>
                </td>
                <td>
                  <Button
                    block={isMobile}
                    onClick={() => this.recordExercise(entry)}>
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
