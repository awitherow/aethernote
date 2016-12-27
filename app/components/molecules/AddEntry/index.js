import React, { Component, PropTypes } from 'react'

import {
  Button, Glyphicon, Form, FormControl, FormGroup, InputGroup, DropdownButton,
  MenuItem,
} from 'react-bootstrap'

import * as entryService from '../../../api/entries'
import { categories } from '../../../lib/schema'

const initialState = {
  content: '',
}

export default class AddThing extends Component {
  state = { ...initialState }

  static propTypes = {
    type: PropTypes.string.isRequired,
    // redux functions
    toggleLoading: PropTypes.func.isRequired,
  }

  static contextTypes = {
    getEntries: PropTypes.func.isRequired,
  }

  componentWillReceiveProps(nextProps) {
    this.resetState(nextProps.type)
  }

  resetState = () => {
    for (let thing in this.state) {
      if (thing) {
        delete this.state[thing]
      }
    }
    this.setState(...this.state, initialState)
  }

  addNote = (e) => {
    e.preventDefault()
    this.props.toggleLoading(true)
    entryService.add({
      ...this.state,
      type: this.props.type,
    }, () => {
      this.resetState()
      this.context.getEntries()
    })
  }

  handleChange = (type, val) => this.setState({ [type]: val })

  render() {
    const { type } = this.props
    const { category, content } = this.state
    return (
      <Form inline>

        <FormGroup controlId="newEntryInput">
          {' '}
          <InputGroup>
            <DropdownButton
              componentClass={InputGroup.Button}
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
            <FormControl
              type="text"
              value={content}
              onChange={(e) => this.handleChange('content', e.target.value)}
            />
          </InputGroup>
        </FormGroup>
        {' '}
        <Button bsStyle="primary" onClick={this.addNote}>
          <Glyphicon glyph="plus" />
        </Button>

      </Form>
    )
  }
}
