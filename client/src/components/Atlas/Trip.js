import React, { Component } from 'react';
import {Row, Col, Button, Input, ListGroup, ListGroupItem, Modal, ModalBody, ModalHeader, ModalFooter, Fade} from "reactstrap";

import DeleteIcon from '../../static/images/delete.svg'

import Search from './Search.js';
import {sendServerRequest} from "../../utils/restfulAPI";
import {PROTOCOL_VERSION} from "../../utils/constants";

const deleteBtn = {
  background: '#fff',
  color: '#000',
  padding: '5px',
  border: 'none',
}

export default class Trip extends Component {
  constructor(props) {
    super(props);

    this.addDestination = this.addDestination.bind(this);
    this.submitDestination = this.submitDestination.bind(this);

    this.state = {
      loadedTrip: {
        "options": {
          "title": "",
          "earthRadius": ""
        },
        "places": [],
        "distances": [],
        "requestType": "find",
        "requestVersion": {PROTOCOL_VERSION}
      },
      tripName: '',
      destinations: [],
      destinationModal: false,
      loadModal: false,
      newItem: {
        "notes": '',
        "name": '',
        "latitude": '',
        "longitude": '',
      },
      showNewItem: false,
      serverSettings: this.props.serverSettings,
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
          <Button color="primary" id="addbtn" onClick={() => {this.setState({destinationModal: true})}}>Add Stop</Button>
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
            style={{width: '60%'}}
            className="float-left"
            name="tripname"
            placeholder="Trip Name"
            value={this.state.tripName}
            onChange={e => this.setState({tripName: e.target.value})}
          />
          <Row style={{width: '40%'}}>
            <Button color="primary" style={{width: '49%', marginLeft: '1%'}}>Save</Button>
            <Button color="primary"
                    id="loadbtn"
                    style={{width: '49%', marginLeft: '1%'}}
                    onClick={() => {this.setState({loadModal: true})}}
            >
              Load
            </Button>
          </Row>
        </Col>
      </Row>
    );
  }

  renderDestinations() {
    return (
      <ListGroup>
        {this.state.loadedTrip.places.map((result, index) => (
          <ListGroupItem key={result.id}>
            <Row>
              <Col className="text-left">{result.name}</Col>
              <Col>
                <Button style={deleteBtn} className="float-right" onClick={() => this.removeDestination(index)}>
                  <img style={{height: '25px'}} src={DeleteIcon}/>
                </Button>
              </Col>
            </Row>
          </ListGroupItem>
        ))}
      </ListGroup>
    );
  }

  renderDestinationModal() {
    return (
      <Modal isOpen={this.state.destinationModal}>
        <ModalHeader>Add Destination</ModalHeader>
        <ModalBody>
          <Row>
            <Col xs={8}>
              <Search createSnackBar={this.props.createSnackBar}
                      serverSettings={this.state.serverSettings}
                      onClickListItem={this.addDestination}/>
            </Col>
            <Col xs={4}>
              <Button color="primary" id="mapbtn" onClick={() => this.addFromMap()}>Add From Map</Button>
            </Col>
          </Row>
          <Fade in={this.state.showNewItem}>
            <ListGroupItem>
              <Col>{this.state.newItem.name}</Col>
              <Col>{this.state.newItem.latitude}, {this.state.newItem.longitude}</Col>
            </ListGroupItem>
          </Fade>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" id="confirmbtn" onClick={this.submitDestination}>Confirm</Button>
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

  addFromMap() {
    this.props.toggle(true, '1');
    this.setState({destinationModal: false});
  }

  addDestination(name, lat, lng) {
    this.setState({
      newItem: {
        "notes": "",
        "name": name,
        "latitude": ''+lat,
        "longitude": ''+lng
      },
      showNewItem: true,
    });
  }

  removeDestination(index) {
    let tempArr = this.state.destinations;
    tempArr.splice(index, 1);
    this.setState({
        destinations: tempArr,
      },
      this.sendTripRequest,
    );
  }

  submitDestination() {
    if (this.state.newItem.latitude !== "") {
      this.setState({
          destinationModal: false,
          showNewItem: false,
          destinations: this.state.destinations.concat(this.state.newItem)
        },
        this.sendTripRequest,
      );
    }
  }

  sendTripRequest() {
    if(this.state.destinations !== []) {
      sendServerRequest({
          "places": this.state.destinations,
          "options": {
            "title": this.state.tripName,
            "earthRadius": "3959.0"
          },
          "requestType": "trip",
          "requestVersion": PROTOCOL_VERSION
        },
        this.state.serverSettings.serverPort)
      .then(trip => {
        if (trip) {
          this.processTripResponse(trip.data);
        } else {
          this.props.createSnackBar("The Request To The Server Failed. Please Try Again Later.");
        }
      });
    }
  }

  processTripResponse(response) {
    this.setState({
      loadedTrip: response,
      tripName: response.options.title,
    });
  }
}