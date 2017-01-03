import React, { Component, PropTypes } from 'react'
import moment from 'moment'

import {
  getToday, getYestereday, toTitleCase, isMobile,
} from '../../lib/helpers'
import { categories } from '../../lib/schema'

import {
  toggleCompletion,
} from '../../api/entries'

import {
  Table, ListGroup, ListGroupItem, Button, Glyphicon,
} from 'react-bootstrap'

export default class Journal extends Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
    entries: PropTypes.array.isRequired,
    // redux
    editItem: PropTypes.func.isRequired,
    getEntries: PropTypes.func.isRequired,
  }

  state = {
    day: getToday(),
  }

  filterEntries = (category) => {
    const date = category === 'aspirations' ? getYestereday() : this.state.day
    return this.props.entries.filter(thing =>
      (new Date(thing.created).setHours(0, 0, 0, 0) === date) &&
      (thing.category === category)
    )
  }

  render = () =>
    <div className="journal" key="journal-page">
      <style type="text/css">{`
        .button-margin {
          margin-right: 5px;
        }
      `}</style>
      <h2>{moment(this.state.day).format('MMM Do YY')}</h2>

      <ListGroup>
        {categories.journal.map((category, i) =>
          <ListGroupItem key={i} header={toTitleCase(category)}>
            {this.filterEntries(category).length ? (
              <Table key={i} striped hover>
                <thead>
                  <tr>
                    <td>#</td>
                    <td>Entry</td>
                    <td>Edit</td>
                  </tr>
                </thead>
                <tbody>
                  {this.filterEntries(category).map((entry, i) =>
                    <tr key={i}>
                      <td>{entry.id}</td>
                      <td>
                        {entry.category === 'aspirations' ? (
                          <Button
                            className="button-margin"
                            bsSize="xsmall"
                            bsStyle={entry.complete ? "success" : "danger"}
                            onClick={() => toggleCompletion(entry, () => this.props.getEntries())}
                          >
                            <Glyphicon glyph={entry.complete ? "ok" : "remove"} />
                          </Button>
                        ) : null }
                        {entry.content}
                      </td>
                      <td>
                        <Button
                          block={isMobile}
                          bsSize="small" onClick={() => this.props.editItem(entry.id)}>
                          <Glyphicon glyph="edit" />
                        </Button>
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            ) : null
          }
        </ListGroupItem>
      )}
    </ListGroup>

  </div>
}