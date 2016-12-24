import './index.scss'
import React, { Component, PropTypes } from 'react'

import Dropdown from '../../components/atoms/Dropdown'
import List from '../../components/molecules/List'

import { categories } from '../../lib/schema'

class Notes extends Component {
  static propTypes = {
    entries: PropTypes.array.isRequired,
    type: PropTypes.string.isRequired,
    removeItem: PropTypes.func.isRequired,
    // redux functions
    openEditor: PropTypes.func.isRequired,
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

  editItem = (id) => {
    const { entries } = this.props
    let note = entries.filter(note => note.id === id)[0]
    if (!note) return
    this.props.openEditor(note)
  }

  handleChange = (whatToChange, change) => {
    switch (whatToChange) {
      case 'category': this.setState({ category: change }); break
      default: return
    }
  }

  filter(notes) {
    let filteredNotes =
      notes.filter(note => note.category === this.state.category)
    if (this.state.activeNotes !== filteredNotes.length) {
      this.setState({ activeNotes: filteredNotes.length })
    }
    return filteredNotes
  }

  render() {
    const { activeNotes } = this.state
    const { entries } = this.props

    return (
      <div className="note-view" key="note-page">

        <div>
          <div className="sub-header">
            <h2> Notes <span>({activeNotes})</span> </h2>
            <button
              className="refresh-notes"
              onClick={this.context.getEntries}>
              &#8635;
            </button>
          </div>

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
            entries={this.filter(entries)}
            classModifier="note-list__list"
            edit={this.editItem}
            remove={this.props.removeItem}
            />

        </div>
      </div>
    )
  }
}

export default Notes
