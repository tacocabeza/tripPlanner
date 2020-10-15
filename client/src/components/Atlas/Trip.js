import React, { Component } from 'react';
import {Row, Col, Button, Input, ListGroup, ListGroupItem, Modal, ModalBody, ModalHeader, ModalFooter, Form} from "reactstrap";

import DeleteIcon from '../../static/images/delete.svg'

export default class Trip extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tripName: '',
      loadedTrip: {

      },
      destinations: [],
      destinationModal: false,
      loadModal: false,
    }
  }

  render() {
    return(
      <div className="text-center">
        <Col xs={12}>
          <br/>
          {this.renderBar()}
          <br/>
          {this.renderDestinations()}
          <p className="text-right">Total Distance: 000mi.</p>
          <Button color="primary" onClick={() => {this.setState({destinationModal: true})}}>Add Stop</Button>
        </Col>
        {this.renderDestinationModal()}
        {this.renderLoadModal()}
      </div>
    );
  }

  renderBar() {
    return(
      <Row>
        <Col xs={12}>
          <Input
            type="text"
            className="float-left w-60"
            name="tripname"
            placeholder="Trip Name"
            value={this.state.tripName}
            onChange={e => this.setState({tripName: e.target.value})}
          />
          <Row className="w-40">
            <Button color="primary" className="saveLoad">Save</Button>
            <Button color="primary" className="saveLoad" onClick={() => {this.setState({loadModal: true})}}>Load</Button>
          </Row>
        </Col>
      </Row>
    );
  }

  renderDestinations() {
    return (
      <ListGroup>
        <ListGroupItem>
          <Row>
            <Col className="text-left">Test Name</Col>
            <Col>
              <Button className="float-right deleteBtn">
                <img className="h-25px" src={DeleteIcon}/>
              </Button>
            </Col>
          </Row>
        </ListGroupItem>
        <p className="text-right">Distance: 000mi.</p>
        <ListGroupItem>
          <Row>
            <Col className="text-left">Test Name</Col>
            <Col>
              <Button className="float-right deleteBtn">
                <img className="h-25px" src={DeleteIcon}/>
              </Button>
            </Col>
          </Row>
        </ListGroupItem>
      </ListGroup>
    );
  }

  renderDestinationModal() {
    return (
      <Modal isOpen={this.state.destinationModal}>
        <ModalHeader>Add Destination</ModalHeader>
        <ModalBody>
        </ModalBody>
        <ModalFooter>
          <Button color="primary">Confirm</Button>
          <Button onClick={() => {this.setState({destinationModal: false})}}>Close</Button>
        </ModalFooter>
      </Modal>
    );
  }

  renderLoadModal() {
    return (
      <Modal isOpen={this.state.loadModal}>
        <ModalHeader>Load Trip</ModalHeader>
        <ModalBody>
        </ModalBody>
        <ModalFooter>
          <Button color="primary">Load</Button>
          <Button onClick={() => {this.setState({loadModal: false})}}>Close</Button>
        </ModalFooter>
      </Modal>
    )
  }
}