import './search.scss'
import React, { PropTypes, Component } from 'react'
import Fuse from 'fuse.js'

import FlexibleInput from '../../components/atoms/FlexibleInput'
import List from '../../components/molecules/List'

class Search extends Component {
  static propTypes = {
    entries: PropTypes.array.isRequired,
    // redux functions
    editItem: PropTypes.func.isRequired,
    toggleSearch: PropTypes.func.isRequired,
    submitEdit: PropTypes.func.isRequired,
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

  render() {
    return (
      <div>
        <style type="text/css">{`
          .search-results-list {
            position: relative;
            max-height: 85vh;
            overflow-y: scroll;
          }
          .search-view {
            color: black;
            flex-direction: column;
          }
        `}</style>
        <div className="overlay search-view">
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
            classModifier="search-results-list"
            edit={this.props.editItem}
            submitEdit={this.props.submitEdit}
          />
        </div>
      </div>
    )
  }
}

export default Search
