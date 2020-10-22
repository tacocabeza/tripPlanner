import React, { Component } from 'react';
import {Nav, NavItem, NavLink} from 'reactstrap';

export default class Navigation extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Nav tabs>
        {this.renderLink('1', 'Map')}
        {this.renderLink('2', 'Create Trip')}
      </Nav>
    )
  }

  renderLink(tab, name) {
    return (
      <NavItem>
        <NavLink onClick={() => { this.props.toggle(tab); }}>
          {name}
        </NavLink>
      </NavItem>
    );
  }
}