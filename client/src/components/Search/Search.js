import React, { Component } from 'react';
import {Button, Col, Container, Row, Form, FormGroup, Label, Input} from 'reactstrap';

export default class Search extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Form>
        <Row form>
          <p>
            Enter one set of coordinates in the Location 1 box to go to that location on the map,
            or two sets to find the distance between the two points
          </p>
          <Col md={6}>
            <FormGroup>
              <Label for="location1">Location 1</Label>
              <Input type="text" name="location1" id="location1"></Input>
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="location2">Location 2</Label>
              <Input type="text" name="location2" id="location2"></Input>
            </FormGroup>
          </Col>
        </Row>
      </Form>
    );
  }
}