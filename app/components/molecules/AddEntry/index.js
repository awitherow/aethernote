import React, { Component, PropTypes } from 'react'

import {
  Button, Glyphicon, Form, FormControl, FormGroup, DropdownButton,
  MenuItem,
} from 'react-bootstrap'

import * as entryService from '../../../api/entries'
import { categories } from '../../../lib/schema'
import { isMobile } from '../../../lib/helpers'

const initialState = {
  content: '',
}

export default class AddEntry extends Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
    // redux functions
    toggleLoading: PropTypes.func.isRequired,
    getEntries: PropTypes.func.isRequired,
  }

  state = {
    ...initialState,
    type: this.props.type,
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
    entryService.add({
      ...this.state,
      type: this.state.type ? this.state.type : this.props.type,
    }, () => {
      this.resetState()
      this.props.getEntries()
    })
  }

  handleChange = (type, val) => this.setState({ [type]: val })

  render() {
    const { category, content, type, prio } = this.state
    return (
      <Form inline>
        <style type="text/css">{`
          .flexi-form {
            display: flex;
            flex-direction: column;
            width: 100;
          }
          @media(min-width: 500px) {
            flex-direction: row;
          }
        `}</style>
        <FormGroup id="new-entry-input-form" className="flexi-form">
          <DropdownButton
            style={{ width: isMobile && '100%' }}
            id={`${type}-selector`}
            title={type ? type : this.props.type}
          >
            {Object.keys(categories).map((type, i) =>
              <MenuItem
                key={i}
                onSelect={() => this.handleChange('type', type)}>
                {type}
              </MenuItem>
            )}
          </DropdownButton>

          {type === 'note' ? (
            <DropdownButton
              style={{ width: isMobile && '100%' }}
              id="prio-selector"
              title={
                prio ? prio : 'Prio'
              }
            >
              {[1, 2, 3].map(prio =>
                <MenuItem
                  key={prio}
                  onSelect={() => this.handleChange('prio', prio)}>
                  {prio}
                </MenuItem>
              )}
            </DropdownButton>
          ) : (
            <DropdownButton
              style={{ width: isMobile && '100%' }}
              id={`${type}-selector`}
              title={
                category ? category : categories[type ? type : this.props.type][0]
              }
            >
              {categories[type ? type : this.props.type].map((cat, i) =>
                <MenuItem
                  key={i}
                  onSelect={() => this.handleChange('category', cat)}>
                  {cat}
                </MenuItem>
              )}
            </DropdownButton>
          )}

          <FormControl
            type="text"
            value={content}
            onChange={(e) => this.handleChange('content', e.target.value)}
          />
          <Button
            block={isMobile}
            bsStyle="primary" onClick={this.addNote}>
            <Glyphicon glyph="plus" />
          </Button>
        </FormGroup>

      </Form>
    )
  }
}
