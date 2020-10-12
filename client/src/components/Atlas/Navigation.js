import React, { Component } from 'react';
import {Nav, NavItem, NavLink} from 'reactstrap';

export default class Navigation extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Nav tabs>
        <NavItem>
          <NavLink onClick={() => { this.props.toggle(true, '1'); }}>
            Map
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink onClick={() => { this.props.toggle(false, '3'); }}>
            Distance
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink onClick={() => { this.props.toggle(false, '4'); }}>
            Search
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink onClick={() => { this.props.toggle(true, '2'); }}>
            Create Trip
          </NavLink>
        </NavItem>
      </Nav>
    )
  }
}