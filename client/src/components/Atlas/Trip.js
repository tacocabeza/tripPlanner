import React, { Component } from 'react';
import {Row, Col, Button, Input, ListGroup, ListGroupItem} from "reactstrap";

export default class Trip extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tripName: '',
      loadedTrip: {

      },
    }
  }

  render() {
    return(
      <div>
        {this.renderBar()}
        {this.renderDestinations()}
      </div>
    );
  }

  renderBar() {
    return(
      <Row>
        <Col md={10}>
          <Input
            type="text"
            name="tripname"
            placeholder="Trip Name"
            value={this.state.tripName}
            onChange={e => this.setState({tripName: e.target.value})}
          />
        </Col>
        <Col md={1}>
          <Button>Save</Button>
        </Col>
        <Col md={1}>
          <Button>Load</Button>
        </Col>
      </Row>
    );
  }

  renderDestinations() {
    return (
      <Row>
        <ListGroup>
            <ListGroupItem>
              <Col md={10}>
                Testing
              </Col>
              <Col md={1}>
                X
              </Col>
            </ListGroupItem>
        </ListGroup>
      </Row>
    );
  }
}