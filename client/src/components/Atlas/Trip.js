import React, { Component } from 'react';
import {Row, Col, Button, Input, ListGroup, ListGroupItem, Modal, ModalBody, ModalHeader, ModalFooter, Fade} from "reactstrap";

import DeleteIcon from '../../static/images/delete.svg'
import SaveTrip from './SaveTrip.js';
import {EARTH_RADIUS_UNITS_DEFAULT} from "../../utils/constants"


import Search from './Search.js';
import {isJsonResponseValid, sendServerRequest} from "../../utils/restfulAPI";
import {PROTOCOL_VERSION} from "../../utils/constants";
import {TRIP} from "../../utils/constants";
import * as tripFile from "../../../schemas/TripFile";

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
      loadedTrip: TRIP,
      tripName: '',
      destinations: [],
      destinationModal: false,
      loadModal: false,
      newItem: { "notes": '', "name": '', "latitude": '', "longitude": ''},
      showNewItem: false,
      serverSettings: this.props.serverSettings,
      loadedFile: TRIP,
      oneWayDistance: 0,
      roundTripDistance:0
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
          {this.renderRoundTrip()}
          <p className="text-right">Total Distance: {this.state.oneWayDistance}mi.</p>

          <Button color="primary" id="addbtn" onClick={() => {this.setState({destinationModal: true})}}>Add Stop</Button>

        </Col>
        {this.renderDestinationModal()}
        {this.renderLoadModal()}
      </div>
    );
  }

  renderRoundTrip(){
    if(this.props.isRoundTrip){
        return(
            <p className="text-left"> Round Trip Distance: {this.state.roundTripDistance}mi. </p>

        )
    }
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
              <Search createSnackBar={this.props.createSnackBar} serverSettings={this.state.serverSettings} onClickListItem={this.addDestination}/>
            </Col>
            <Col xs={4}><Button color="primary" id="mapbtn" onClick={() => this.addFromMap()}>Add From Map</Button></Col>
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
    this.props.toggle('1');
    this.setState({destinationModal: false});
  }

  checkMapUpdate() {
    if(this.props.tripNewLocation){
      let newPlace = this.props.tripNewLocation.location ? this.props.tripNewLocation : null
      if (newPlace) {
        let placeName = newPlace.location[0].toFixed(2) + ', ' + newPlace.location[1].toFixed(2);
        if (newPlace.locationName != '' && newPlace.locationName != null) {
          placeName = newPlace.locationName;
        }
        this.setState({
          newItem: {
            "notes": "",
            "name": placeName,
            "latitude": ''+newPlace.location[0],
            "longitude": ''+newPlace.location[1],
          },
          showNewItem: true,
        });
      }
    }
    this.submitDestination();
    if(this.props.tripNewLocation && this.props.tripNewLocation.location) {
      this.props.tripNewLocation.location = null;
      this.props.tripNewLocation.locationName = '';
    }
  }

  addDestination(name, lat, lng) {
    let placeName = lat.toFixed(2) + ', ' + lng.toFixed(2);
    if (name != '') {
      placeName = name;
    }
    this.setState({
      newItem: {
        "notes": "",
        "name": placeName,
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
      this.sendTripRequest(),
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
    this.props.setTripLocations(this.state.destinations);
    if(this.state.destinations !== []) {
      sendServerRequest({
          "places": this.state.destinations,
          "options": {
            "title": this.state.tripName,
            "earthRadius": EARTH_RADIUS_UNITS_DEFAULT.miles.toString()
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
    this.calculateRoundTrip(response);
    for (let i = 0; i < response.distances.length - 1; i++) {
      count = count + response.distances[i];
    }
    this.setState({
      loadedTrip: response,
      tripName: response.options.title,
      oneWayDistance: count,
      destinations:response.places
    });


  }

  calculateRoundTrip(response){

    let sum = 0

    for(var i = 0; i<response.distances.length; i++){
        sum +=response.distances[i];
    }
    this.setState({roundTripDistance: sum})
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
    if(!isJsonResponseValid(this.state.loadedFile, tripFile)) {
      this.props.createSnackBar("This file is not valid");
    } else {
      this.props.setTripLocations(this.state.loadedFile.places)
      this.setState({
          loadModal: false,
          destinations: this.state.loadedFile.places,
          tripName: this.state.loadedFile.options.title
        },
        this.sendTripRequest,
      );
    }
  }
}