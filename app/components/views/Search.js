import React, { PropTypes, Component } from 'react'
import Fuse from 'fuse.js'

import { FormControl } from 'react-bootstrap'
import List from '../elements/List'

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
            max-height: 50vh;
            overflow-y: scroll;
          }
          .search-view {
            color: black;
            flex-direction: column;
            display: flex;
            margin: 0 auto;
            padding: 25px;
          }
        `}</style>
        <div className="overlay search-view">
          <FormControl
            id="search"
            value={this.state.entry}
            onChange={(e) => this.setState({entry: e.target.value})}
            autoFocus
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
