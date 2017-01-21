import './AddEntry.css'
import React, { Component, PropTypes } from 'react'

import {
  Button, Glyphicon, Form, FormControl, FormGroup, DropdownButton,
  MenuItem, InputGroup,
} from 'react-bootstrap'

import * as entryService from '../../api/entries'
import { categories, currencies } from '../../lib/schema'
import { isMobile } from '../../lib/helpers'

const initialContent = {
  content: '',
}

const financeInitialState = {
  content: {
    description: '',
    currency: currencies[0],
    value: '',
  },
}

export default class AddEntry extends Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
    user: PropTypes.string.isRequired,
    // redux functions
    toggleLoading: PropTypes.func.isRequired,
    getEntries: PropTypes.func.isRequired,
  }

  state = {
    ...initialContent,
    type: this.props.type,
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.type !== this.state.props) {
      this.setState({ type: nextProps.type })
    }
    this.updateStateContent(nextProps.type)
  }

  // sets structure of state properly to accept incoming changes from user.
  updateStateContent = (type) => {
    if (type === 'finance') {
      this.setState(financeInitialState)
    } else {
      this.setState(initialContent)
    }
  }

  resetState = () => {
    for (let thing in this.state) {
      if (thing) {
        delete this.state[thing]
      }
    }
    this.setState(...this.state, initialContent)
  }

  addNote = (e) => {
    this.props.toggleLoading(true)
    e.preventDefault()
    entryService.add({
      ...this.state,
      type: this.state.type,
    }, this.props.user, () => {
      this.resetState()
      this.props.getEntries()
    })
  }

  handleChange = (type, val) => {
    if (type === 'value' || type === 'currency' || type === 'description') {
      // financial state updates require specific structure.
      const snapshot = this.state
      snapshot.content[type] = val
      this.setState(snapshot)
    } else if (type === 'type' && val === 'finance') {
      // state reset to structure content (as above) required, when setting.
      this.updateStateContent(val)
      this.setState({ [type]: val })
    } else {
      // handle all other input types to the state.
      this.setState({ [type]: val })
    }
  }

  render() {
    const { category, content, type, prio } = this.state
    return (
      <Form inline>
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
                prio ? prio : 'prio'
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

          {type === 'finance' ? (
            <div>
              <InputGroup>
                <FormControl
                  onChange={(e) => this.handleChange('value', e.target.value)}
                  value={content.value}
                  type="number"
                  />
                <DropdownButton
                  componentClass={InputGroup.Button}
                  id="input-dropdown-addon"
                  title={content.currency}
                >
                  {currencies.map((currency, i) =>
                    <MenuItem
                      key={i}
                      onSelect={() => this.handleChange('currency', currency)}>
                      {currency}
                    </MenuItem>
                  )}
                </DropdownButton>
              </InputGroup>
              <FormControl
                  type="text"
                  value={content.description}
                  onChange={(e) => this.handleChange('description', e.target.value)}
              />
            </div>
          ) : (
            <FormControl
                type="text"
                value={content}
                onChange={(e) => this.handleChange('content', e.target.value)}
            />
          )}

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
