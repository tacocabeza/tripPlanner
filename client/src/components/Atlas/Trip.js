import React, { Component } from 'react';
import {Row, Col, Button, Input, ListGroup, ListGroupItem, Modal, ModalBody, ModalHeader, ModalFooter, Fade} from "reactstrap";

import DeleteIcon from '../../static/images/delete.svg'
import SaveTrip from './SaveTrip.js';

import Search from './Search.js';
import {isJsonResponseValid, sendServerRequest} from "../../utils/restfulAPI";
import {PROTOCOL_VERSION} from "../../utils/constants";
import * as tripSchema from "../../../schemas/ResponseTrip";

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
    this.processFile = this.processFile.bind(this);

    this.state = {
      loadedTrip: {"options": {"title": "", "earthRadius": ""}, "places": [], "distances": [], "requestType": "find", "requestVersion": {PROTOCOL_VERSION}},
      tripName: '',
      destinations: [],
      destinationModal: false,
      loadModal: false,
      newItem: { "notes": '', "name": '', "latitude": '', "longitude": ''},
      showNewItem: false,
      serverSettings: this.props.serverSettings,
      loadedFile: {"options": {"title": "", "earthRadius": ""}, "places": [], "distances": [], "requestType": "find", "requestVersion": {PROTOCOL_VERSION}},
      totalDistance: 0,
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
          <p className="text-right">Total Distance: {this.state.totalDistance}mi.</p>
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
            className="float-left w-60"
            name="tripname"
            placeholder="Trip Name"
            value={this.state.tripName}
            onChange={e => this.setState({tripName: e.target.value})}
          />
          <Row className="w-40">
            <SaveTrip places={this.state.destinations} tripData={this.state.loadedTrip}/>
            <Button color="primary" id="loadbtn" className="saveLoad" onClick={() => {this.setState({loadModal: true})}}>Load</Button>
          </Row>
        </Col>
      </Row>
    );
  }

  renderDestinations() {
    return (
      <ListGroup>
        {this.state.loadedTrip.places.map((result, index) => (
          <div key={result.id}>
            <Fade in={index > 0} className="text-right">Distance: {this.state.loadedTrip.distances[index-1]}mi.</Fade>
            <ListGroupItem key={result.id}>
              <Row>
                <Col className="text-left">{result.name}</Col>
                <Col>
                  <Button className="float-right deleteBtn" onClick={() => this.removeDestination(index)}>
                    <img className="h-25px" src={DeleteIcon}/>
                  </Button>
                </Col>
              </Row>
            </ListGroupItem>
          </div>
        ))}
      </ListGroup>
    );
  }

  renderDestinationModal() {
    {this.checkMapUpdate()}
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
    const callback = (event) => {this.processFile(event.target.files)};
    return (
      <Modal isOpen={this.state.loadModal}>
        <ModalHeader>Load Trip</ModalHeader>
        <ModalBody>
          <Input type='file' onChange={callback} />
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => this.loadFile()}>Load</Button>
          <Button onClick={() => {this.setState({loadModal: false})}}>Close</Button>
        </ModalFooter>
      </Modal>
    )
  }

  addFromMap() {
    this.props.toggle(true, '1');
    this.setState({destinationModal: false});
  }

  checkMapUpdate() {
    if(this.props.tripNewLocation){
      let newPlace = this.props.tripNewLocation.location? this.props.tripNewLocation: null
      if (newPlace && newPlace.location) {
        console.log(newPlace)
        this.setState({
          newItem: {
            "notes": "",
            "name": newPlace.locationName,
            "latitude": ''+newPlace.location[0],
            "longitude": ''+newPlace.location[1],
          },
          showNewItem: true,
        });
        this.props.tripNewLocation.location = null;
        this.props.tripNewLocation.locationName = null;
      }
    }
    this.submitDestination();
  }

  addDestination(lat, lng, name) {
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
          destinations: this.state.destinations.concat(this.state.newItem),
          newItem: { "notes": '', "name": '', "latitude": '', "longitude": ''},
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
    let count = 0;
    for (let i = 0; i < response.distances.length - 1; i++) {
      count = count + response.distances[i];
    }
    this.setState({
      loadedTrip: response,
      tripName: response.options.title,
      totalDistance: count,
    });
  }

  processFile(files) {
    let self = this;
    let fr = new FileReader();
    fr.readAsText(files[0]);
    fr.onload = function(event) {
      self.setState({loadedFile: JSON.parse(fr.result)});
    };
  }

  loadFile() {
    if(!isJsonResponseValid(this.state.loadedFile, tripSchema)) {
      this.props.createSnackBar("This file is not valid");
    } else {
      this.setState({loadModal: false,});
      this.processTripResponse(this.state.loadedFile);
    }
  }
}