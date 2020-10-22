import React, { Component } from 'react';
import {Button, Col, Form, FormGroup, Input, Row} from 'reactstrap';
let Coordinates = require('coordinate-parser');
import {isValidPosition} from "../../utils/misc";

export default class DistanceForm extends Component {
  constructor(props) {
    super(props);

    this.submitCoords = this.submitCoords.bind(this);

    this.state = {
      string1: '',
      string2: '',
      submitted: false,
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
                name="distanceLocation1"
                id="distanceLocation1"
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
                name="distanceLocation2"
                id="distanceLocation2"
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
    if (isValidPosition(this.state.string1) && isValidPosition(this.state.string2)) {
      let loc1 = new Coordinates(this.state.string1);
      let loc2 = new Coordinates(this.state.string2);
      this.props.setLocation({"lat": loc1.getLatitude(), "lng": loc1.getLongitude()}, {"lat": loc2.getLatitude(), "lng": loc2.getLongitude()});
    }
    this.setState({submitted: true});
  }
}