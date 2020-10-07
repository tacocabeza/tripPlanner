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
          <NavLink onClick={() => { this.props.toggle('1'); }}>
            Map
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink onClick={() => { this.props.toggle('2'); }}>
            Search
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink onClick={() => { this.props.toggle('3'); }}>
            Create Trip
          </NavLink>
        </NavItem>
      </Nav>
    )
  }
}