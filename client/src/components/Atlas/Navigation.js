import React, { Component } from 'react';
import {Nav, NavItem, NavLink} from 'reactstrap';

export default class Navigation extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Nav tabs>
        {this.renderLink(true, '1', 'Map')}
        {this.renderLink(false, '4', 'Search')}
        {this.renderLink(false, '3', 'Distance')}
        {this.renderLink(true, '2', 'Create Trip')}
      </Nav>
    )
  }

  renderLink(isTab, tab, name) {
    return (
      <NavItem>
        <NavLink onClick={() => { this.props.toggle(isTab, tab); }}>
          {name}
        </NavLink>
      </NavItem>
    );
  }
}