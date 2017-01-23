import './Planner.scss'
import React, { Component } from 'react'

import { Nav, NavItem } from 'react-bootstrap'

class Planner extends Component {
  state = {
    activeDay: 2,
  }

  render() {
    return (
      <div id="planner-page">
        <div className="add-button-container">
          <button>Add Item</button>
        </div>
        <Nav
          bsStyle="pills"
          justified
          activeKey={this.state.activeDay}
          onSelect={(e) => console.log(e)}
          >
          <NavItem eventKey={1}>Yesterday</NavItem>
          <NavItem eventKey={2}>Today</NavItem>
          <NavItem eventKey={3}>Tomorrow</NavItem>
        </Nav>
        <div>

        </div>
      </div>
    )
  }
}

export default Planner