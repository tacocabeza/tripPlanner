import React, { Component } from 'react';
import {Row, Col, Button, Input, ListGroupItem, Modal, ModalBody, ModalHeader, ModalFooter, Fade, FormGroup, CustomInput} from "reactstrap";

import SaveTrip from './SaveTrip.js';
import {EARTH_RADIUS_UNITS_DEFAULT} from "../../utils/constants"


import Search from './Search.js';
import {isJsonResponseValid, sendServerRequest} from "../../utils/restfulAPI";
import {PROTOCOL_VERSION} from "../../utils/constants";
import {EMPTY_TRIP} from "../../utils/constants";
import * as tripFile from "../../../schemas/TripFile";
import {Container, Draggable} from "react-smooth-dnd";
import Destination from "./Destination";
import {isValidLatitude, isValidLongitude} from "../../utils/misc";


const destinationsEnd = React.createRef();
const destinationsStart = React.createRef()

export default class Trip extends Component {
  constructor(props) {
    super(props);

    this.addDestination = this.addDestination.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.processFile = this.processFile.bind(this);
    this.removeDestination = this.removeDestination.bind(this);
    this.setDestinationIsValidProperty = this.setDestinationIsValidProperty.bind(this);
    this.submitDestination = this.submitDestination.bind(this);
    this.toggleDestinationCollapse = this.toggleDestinationCollapse.bind(this);
    this.updateDestination = this.updateDestination.bind(this);
    this.rotateTrip = this.rotateTrip.bind(this);

    this.state = {
      loadedTrip: EMPTY_TRIP,
      tripName: '',
      destinations: [],
      destinationModal: false,
      destinationStates: [],
      loadModal: false,
      newItem: { "notes": '', "name": '', "latitude": '', "longitude": ''},
      showNewItem: false,
      serverSettings: this.props.serverSettings,
      loadedFile: EMPTY_TRIP,
      oneWayDistance: 0,
      roundTripDistance:0,
      units: "",
      response: "0.0"
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
          <br/>
          <Button color="primary" onClick={() => {destinationsStart.current.scrollIntoView({ behavior: 'smooth' })}}>To Top</Button>
        </Col>
        {this.checkMapUpdate()}
        {this.renderDestinationModal()}
        {this.renderLoadModal()}
      </div>
    );
  }

  renderTotalDistance(){
    if(this.props.isRoundTrip){
      return(
        <p className="text-right"> Round Trip Distance: {this.state.roundTripDistance}mi.</p>
      )
    } else {
      return (
        <p className="text-right">Total Distance: {this.state.oneWayDistance}mi.</p>
      )
    }
  }

  renderBar() {
    return(
      <Row>
        <div ref={destinationsStart}/>
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
          <br/>
          <Row>
            <Col xs={12} sm={6}>
              <Button color="primary" id="addbtn" className="saveLoad" onClick={() => {this.setState({destinationModal: true})}}>Add Stop</Button>
              <Button color="primary" className="saveLoad" onClick={() => {this.reverseTrip()}}>Reverse Trip</Button>
              <Button color="primary" className="saveLoad" onClick={() => {this.optimizeTrip()}}>Optimize</Button>
              <Button color="primary" className="saveLoad" onClick={() => {destinationsEnd.current.scrollIntoView({ behavior: 'smooth' })}}>To Bottom</Button>
            </Col>
            <Col xs={12} sm={6}>
              {this.renderTotalDistance()}
              {this.renderRoundTripSwitch()}
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }

  renderDestinations() {
    if(this.state.destinations.length > 0) {
      return (
        <div>
          <Container lockAxis="y" dragHandleSelector=".drag-handle"
                     onDrop={this.onDrop} behaviour="contain">
            {this.state.destinations.map((item, index) => {
              return (
                <Draggable key={index}>
                  <Destination index={index} removeDestination={this.removeDestination}
                               distance={this.state.loadedTrip.distances[index - 1]}
                               destination={item} updateDestination={this.updateDestination}
                               destinationState={this.state.destinationStates[index]}
                               toggleCollapse={() => this.toggleDestinationCollapse(index)}
                                 setIsValidProperty = {(property, value, isValid) =>
                                 this.setDestinationIsValidProperty(index, property, value, isValid)}
                               rotateTrip={this.rotateTrip}
                  />
                </Draggable>
              );
            })}
          </Container>
          <div ref={destinationsEnd}></div>
        </div>
      );
    }
  }

  updateDestination(index, property, value) {
    let tempArr = JSON.parse(JSON.stringify(this.state.destinations));
    Object.defineProperty(tempArr[index],property,{value: value});
    this.setState({
        destinations: tempArr,
      },
      this.sendTripRequest,
    );
  }

  onDrop(dropResult) {
    const { removedIndex, addedIndex} = dropResult;

    let tempDestinations = JSON.parse(JSON.stringify(this.state.destinations));
    let movedDestination = tempDestinations.splice(removedIndex, 1)[0];
    tempDestinations.splice(addedIndex, 0, movedDestination);

    let tempDestinationStates = JSON.parse(JSON.stringify(this.state.destinationStates));
    let movedDestinationState = tempDestinationStates.splice(removedIndex, 1)[0];
    tempDestinationStates.splice(addedIndex, 0, movedDestinationState);

    this.setState({
        destinations: tempDestinations,
        destinationStates: tempDestinationStates
      },
      this.sendTripRequest,
    );
  }

  toggleDestinationCollapse(index) {
    this.setDestinationState(index, {collapseOpen: !this.state.destinationStates[index].collapseOpen});
  }

  setDestinationIsValidProperty(index, property, value, isValid) {
    let newIsValidProperty = JSON.parse(JSON.stringify(this.state.destinationStates[index].isValidProperty));
    Object.defineProperty(newIsValidProperty,property,{value: isValid});

    let newInputTexts = JSON.parse(JSON.stringify(this.state.destinationStates[index].inputTexts));
    Object.defineProperty(newInputTexts,property,{value: value});

    this.setDestinationState(index,
      {isValidProperty: newIsValidProperty, inputTexts: newInputTexts});
  }

  setDestinationState(index, stateObj) {
    let tempDestinationStates = JSON.parse(JSON.stringify(this.state.destinationStates));
    let changedDestination = tempDestinationStates[index];

    // format stateObj so that it can be taken by Object.defineProperties
    for (let property in stateObj) {
      if (Object.prototype.hasOwnProperty.call(stateObj, property)) {
        Object.defineProperty(stateObj, property, {value: {value: stateObj[property]}});
      }
    }

    Object.defineProperties(changedDestination, stateObj);

    this.setState({destinationStates: tempDestinationStates});
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
    return (
      <Modal isOpen={this.state.loadModal}>
        <ModalHeader>Load Trip</ModalHeader>
        <ModalBody>
          <Input type='file' onChange={(event) => {this.processFile(event.target.files)}} />
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => this.loadFile()}>Load</Button>
          <Button onClick={() => {this.setState({loadModal: false})}}>Close</Button>
        </ModalFooter>
      </Modal>
    )
  }

  renderRoundTripSwitch() {
    return(
      <FormGroup className="text-right">
        <CustomInput className="text-right" type="switch" id="toggleRoundTrip"  label="Round Trip" onClick={() => this.props.flipRoundTrip()}/>
      </FormGroup>
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
        let placeName;
        if (newPlace.locationName !== '' && newPlace.locationName) {
          placeName = newPlace.locationName;
        } else {
          placeName = newPlace.location[0].toFixed(2) + ', ' + newPlace.location[1].toFixed(2);
        }
        this.setState({
          newItem: {
            "notes": "",
            "name": placeName,
            "latitude": String(newPlace.location[0]),
            "longitude": String(newPlace.location[1]),
          },
          showNewItem: true,
          destinationModal: true,
        });
      }
    }
    if(this.props.tripNewLocation && this.props.tripNewLocation.location) {
      this.props.tripNewLocation.location = null;
      this.props.tripNewLocation.locationName = '';
    }
  }

  addDestination(name, lat, lng) {
    let placeName;
    if (name && name !== '') {
      placeName = name;
    } else {
      placeName = lat.toFixed(2) + ', ' + lng.toFixed(2);
    }
    this.setState({
      newItem: {
        "notes": "",
        "name": placeName,
        "latitude": String(lat),
        "longitude": String(lng)
      },
      showNewItem: true,
    });
  }

  removeDestination(index) {
    let tempDestinations = JSON.parse(JSON.stringify(this.state.destinations));
    tempDestinations.splice(index, 1);

    let tempDestinationStates = JSON.parse(JSON.stringify(this.state.destinationStates));
    tempDestinationStates.splice(index, 1);

    this.setState({
        destinations: tempDestinations,
        destinationStates: tempDestinationStates
      },
      this.sendTripRequest,
    );
  }

  submitDestination() {
    if (this.state.newItem.latitude && this.state.newItem.latitude !== "") {
      this.setState({
          destinationModal: false,
          showNewItem: false,
          destinations: this.state.destinations.concat(this.state.newItem),
          destinationStates: this.state.destinationStates.concat(
            this.getInitDestinationState(this.state.newItem)),
          newItem: { "notes": '', "name": '', "latitude": '', "longitude": ''},
        },
        this.sendTripRequest,
      );
    }
  }

  reverseTrip() {
    let tempDestinations = JSON.parse(JSON.stringify(this.state.destinations));
    tempDestinations = tempDestinations.reverse();

    let tempDestinationStates = JSON.parse(JSON.stringify(this.state.destinationStates));
    tempDestinationStates = tempDestinationStates.reverse();

    this.setState({
        destinations: tempDestinations,
        destinationStates: tempDestinationStates
      },
      this.sendTripRequest,
    );
  }

  rotateTrip(index) {
    let tempDestinations = JSON.parse(JSON.stringify(this.state.destinations));
    let tempDestinationStates = JSON.parse(JSON.stringify(this.state.destinationStates));

    for (index; index !== tempDestinations.length; index++) {
      tempDestinations.unshift(tempDestinations.pop());
      tempDestinationStates.unshift(tempDestinationStates.pop());
    }
    this.setState({
          destinations: tempDestinations,
          destinationStates: tempDestinationStates
        },
        this.sendTripRequest,
    );
  }

  optimizeTrip() {
    this.setState({
        response: "1.0"
      },
      this.sendTripRequest,
    );
  }

  sendTripRequest() {
    if(this.state.destinations.length > 0) {
      sendServerRequest({
          "places": this.state.destinations,
          "options": {
            "title": this.state.tripName,
            "earthRadius": EARTH_RADIUS_UNITS_DEFAULT.miles.toString(),
            "response": this.state.response,
            "units": this.state.units
          },
          "requestType": "trip",
          "requestVersion": PROTOCOL_VERSION
        },
        this.state.serverSettings.serverPort)
      .then(trip => {
        if (trip) {
          this.processTripResponse(trip.data);
        } else {
          this.setState({response: "0.0"});
          this.props.createSnackBar("The Request To The Server Failed. Please Try Again Later.");
        }
      });
    }
  }

  processTripResponse(response) {
    if(response.distances) {
      let count = 0;
      for (let i = 0; i < response.distances.length - 1; i++) {
        count = count + response.distances[i];
      }
      let roundTripCount = count + response.distances[response.distances.length - 1];
      let newDestinationStates;
      if (this.state.response === "0.0") {
        newDestinationStates = this.state.destinationStates;
      } else {
        newDestinationStates = this.getInitDestinationStateArray(response.places);
      }
      this.setState({
          loadedTrip: response,
          tripName: response.options.title,
          oneWayDistance: count,
          roundTripDistance: roundTripCount,
          response: "0.0",
          destinations: response.places,
          destinationStates: newDestinationStates
        },
        this.props.setTripLocations(this.state.destinations),
      );
    }
  }

  setLocations() {
    this.props.setTripLocations(this.state.destinations);
  }

  processFile(files) {
    let self = this;
    let fr = new FileReader();
    fr.readAsText(files[0]);
    fr.onload = function(event) {
      let parsedFile
      try {
        parsedFile = JSON.parse(fr.result)
      } catch (e) {
        self.props.createSnackBar("This file is not valid (cannot be parsed as a JSON)")
      }
      self.setState({loadedFile: parsedFile});
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
          destinationStates: this.getInitDestinationStateArray(this.state.loadedFile.places),
          tripName: this.state.loadedFile.options.title,
          response: this.state.loadedFile.options.response,
          units: this.state.loadedFile.options.units
        },
        this.sendTripRequest,
      );
    }
  }

  getInitDestinationStateArray(placesArr) {
    let initDestinationStates = [];
    for(let i = 0; i < placesArr.length; i++){
      initDestinationStates = initDestinationStates.concat(this.getInitDestinationState(placesArr[i]));
    }
    return initDestinationStates;
  }

  getInitDestinationState(destination) {
    return {
      collapseOpen: false,
      isValidProperty: {
        name: (destination.name !== ""),
        latitude: isValidLatitude(destination.latitude),
        longitude: isValidLongitude(destination.longitude),
        notes: true
      },
      inputTexts: {
        name: destination.name,
        latitude: destination.latitude,
        longitude: destination.longitude,
        notes: (destination.notes) ? destination.notes : ""
      }
    };
  }
}