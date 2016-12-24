import './search.scss'
import React, { PropTypes, Component } from 'react'
import Fuse from 'fuse.js'

import FlexibleInput from '../../components/atoms/FlexibleInput'
import List from '../../components/molecules/List'

class Search extends Component {
  static propTypes = {
    entries: PropTypes.array.isRequired,
    removeItem: PropTypes.func.isRequired,
    // redux functions
    openEditor: PropTypes.func.isRequired,
    toggleSearch: PropTypes.func.isRequired,
  }

  state = {
    entry: '',
    results: [],
    options: {
      shouldSort: true,
      threshold: 0.25,
      location: 0,
      distance: 10000,
      maxPatternLength: 32,
      minMatchCharLength: 1,
      keys: [
        "title",
        "content",
      ],
    },
  }

  fuse = new Fuse(this.props.entries, this.state.options)

  editItem = (id) => {
    const { entries } = this.props
    let result = entries.filter(result => result.id === id)[0]
    if (!result) return
    this.props.toggleSearch(false)
    this.props.openEditor(result)
  }

  render() {
    return (
      <div className="overlay search">
        <FlexibleInput
          id="search"
          label="What you lookin' fo?"
          type="text"
          value={this.state.entry}
          onChange={(e) => this.setState({entry: e.target.value})}
          autofocus
          />

        <List
          type={null}
          entries={this.fuse.search(this.state.entry)}
          classModifier="search__list"
          edit={this.editItem}
          remove={this.props.removeItem}
        />
      </div>
    )
  }
}

export default Search
