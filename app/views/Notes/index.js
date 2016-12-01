import './index.scss'
import React, { Component, PropTypes } from 'react'

import Dropdown from '../../components/atoms/Dropdown'
import ThingsList from '../../components/molecules/ThingsList'

class Notes extends Component {
  static propTypes = {
    things: PropTypes.array.isRequired,
    type: PropTypes.string.isRequired,
    removeItem: PropTypes.func.isRequired,
  }

  static contextTypes = {
    update: PropTypes.func.isRequired,
    getThings: PropTypes.func.isRequired,
  }

  static defaultProps = {
    type: 'note',
  }

  state = {
    category: 'inbox',
    activeNotes: 0,
  }

  editItem = (id) => {
    const { things } = this.props
    let note = things.filter(note => note.id === id)[0]
    if (!note) return
    this.context.update('openEditor', note)
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
    const { things } = this.props

    return (
      <div className="note-view" key="note-page">

        <div>
          <div className="sub-header">
            <h2> Notes <span>({activeNotes})</span> </h2>
            <button
              className="refresh-notes"
              onClick={this.context.getThings}>
              &#8635;
            </button>
          </div>

          <div className="note-view__sort">
            <Dropdown
              id="category-types"
              label="Category"
              options={[
                'inbox',
                'backlog',
                'todo',
                'doing',
                'done',
                'reference',
              ]}
              defaultValue={this.state.category}
              handleChange={e => this.handleChange('category', e.target.value)}
              />
          </div>

          <ThingsList
            type={this.props.type}
            things={this.filter(things)}
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
