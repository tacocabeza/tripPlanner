import React, { Component } from 'react';
import {Button, Col, Row, Form, FormGroup, Input} from 'reactstrap';

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
          <Col md={5}>
            <FormGroup>
              <Input type="text" name="location1" id="location1" placeholder="Location 1"></Input>
            </FormGroup>
          </Col>
          <Col md={5}>
            <FormGroup>
              <Input type="text" name="location2" id="location2" placeholder="Location 2"></Input>
            </FormGroup>
          </Col>
          <Col md={2}>
            <Button>Go!</Button>
          </Col>
        </Row>
      </Form>
    );
  }
}