import React, { Component } from 'react';
import {Button, Col, Form, FormGroup, Input, Row} from 'reactstrap';
let Coordinates = require('coordinate-parser');

export default class DistanceForm extends Component {
  constructor(props) {
    super(props);

    this.submitCoords = this.submitCoords.bind(this);

    this.state = {
      string1: '',
      string2: '',
    }
  }

  render() {
    return (
      <Form onSubmit={this.submitCoords}>
        <Row form>
          <p>
            Enter one set of coordinates in the Location 1 box to go to that location on the map,
            or two sets to find the distance between the two points
          </p>
          <Col md={5}>
            <FormGroup>
              <Input
                type="text"
                name="location1"
                id="location1"
                required={true}
                placeholder="Location 1"
                value={this.state.string1}
                onChange={e => this.setState({string1: e.target.value})}
              />
            </FormGroup>
          </Col>
          <Col md={5}>
            <FormGroup>
              <Input
                type="text"
                name="location2"
                id="location2"
                placeholder="Location 2"
                value={this.state.string2}
                onChange={e => this.setState({string2: e.target.value})}
              />
            </FormGroup>
          </Col>
          <Col md={2}>
            <Button id="distance-submit">Go!</Button>
          </Col>
        </Row>
      </Form>
    )
  }

  submitCoords(e) {
    e.preventDefault();
    if (this.isValidPosition(this.state.string1)) {
      let loc1 = new Coordinates(this.state.string1);
      this.props.setLocation(1, [loc1.getLatitude(), loc1.getLongitude()]);
      if (this.isValidPosition(this.state.string2)) {
        let loc2 = new Coordinates(this.state.string2);
        this.props.setLocation(2, [loc2.getLatitude(), loc2.getLongitude()]);
      } else {
        this.props.setLocation(3, [loc1.getLatitude(), loc1.getLongitude()]);
      }
    }
  }

  isValidPosition(position) {
    let error;
    let isValid;
    try {
      isValid = true;
      new Coordinates(position);
      return isValid;
    } catch (error) {
      isValid = false;
      return isValid;
    }
  }
}