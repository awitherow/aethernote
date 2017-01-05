import React, { Component, PropTypes } from 'react'
import moment from 'moment'

import { isMobile, sortByCategoryAndModified } from '../../lib/helpers'
import { categories, measurements } from '../../lib/schema'

import {
  Table, Label, Button, Glyphicon, FormControl, DropdownButton, MenuItem,
  InputGroup,
} from 'react-bootstrap'

const getInitialState = entries =>
  entries.reduce((initialState, entry) => {
    return {
      ...initialState,
      [entry.id]: {
        multiplier: 1,
        value: 1,
        measurement: measurements[entry.type][entry.category],
      },
    }
  }, {})

const checkRecord = (a, b) => ({
  multiplier: parseInt(a.value) > parseInt(b.value) ? a.multiplier : b.multiplier,
  value: parseInt(a.value) > parseInt(b.value) ? a.value : b.value,
  date: parseInt(a.value) > parseInt(b.value) ? moment() : b.date,
})

export default class Exercise extends Component {
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
        best: checkRecord(this.state[entry.id], content.best),
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
            {filteredEntries.map(entry => {
              const content = typeof entry.content === "string"
                ? JSON.parse(entry.content)
                : entry.content
              return (
                <tr key={entry.id}>
                  <td>{entry.title}</td>
                  <td>
                    <Label>
                      {entry.category}
                    </Label>
                  </td>
                  <td>{content['total']}</td>
                  <td>
                    {`${content['best'].multiplier} x ${content['best'].value}`}
                  </td>
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
              )
            })}
          </tbody>
        </Table>
      </div>
    )
  }
}
