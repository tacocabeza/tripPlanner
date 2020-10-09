import React, { Component } from 'react';
import {InputGroupAddon, Input} from "reactstrap";

export default class Trip extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tripName: '',
    }
  }

  render() {
    return(
      <Input
        type="text"
        name="tripname"
        placeholder="Trip Name"
        value={this.state.tripName}
        onChange={e => this.setState({tripName: e.target.value})}/>
    );
  }
}