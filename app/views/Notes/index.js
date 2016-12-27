import React, { Component, PropTypes } from 'react'

import Dropdown from '../../components/atoms/Dropdown'
import List from '../../components/molecules/List'

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

  handleChange = (whatToChange, change) => {
    switch (whatToChange) {
      case 'category': this.setState({ category: change }); break
      default: return
    }
  }

  render = () =>
    <div className="note-view" key="note-page">

      <div>
        <div className="note-view__sort">
          <Dropdown
            id="category-types"
            label="Category"
            options={categories.note}
            defaultValue={this.state.category}
            handleChange={e => this.handleChange('category', e.target.value)}
            />
        </div>

        <List
          type={this.props.type}
          entries={this.props.entries.filter(note =>
            note.category === this.state.category
          )}
          classModifier="note-list__list"
          edit={this.props.editItem}
          />

      </div>
    </div>
}

export default Notes
