import React, { Component, PropTypes } from 'react'

import { isMobile } from '../../lib/helpers'

import {
  Table, Label, Button, Glyphicon, FormControl,
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

  state = getInitialState(this.props.entries)

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.entries.length > this.props.entries.length) {
      this.updateState(nextProps.entries)
    }
  }

  updateState = (entries = this.props.entries) =>
    this.setState({ ...getInitialState(entries)})

  recordHabit = (entry) => {
    this.props.submitEdit({
      content: parseInt(entry.content) + parseInt(this.state[entry.id]),
      tally: true,
      value: this.state[entry.id],
    }, entry)
    this.updateState()
  }

  render() {
    return (
      <Table striped hover>
        <style type="text/css">{`
          .input-with-button {
            display: flex;
          }
          .table>tbody>tr>td {
            text-align: center;
            vertical-align: middle;
          }
        `}</style>
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
          {this.props.entries.map((entry, i) =>
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
                  onClick={() => this.props.editItem(entry.id)}>
                  <Glyphicon glyph="edit" />
                </Button>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    )
  }
}
