import React, { Component } from 'react';
import Cookies from "js-cookie";

import TripControls from "./TripControls";
import {sendServerRequest} from "../../utils/restfulAPI";
import {PROTOCOL_VERSION, REMOVE_BUTTON_CLICK_BUFFER_MS} from "../../utils/constants";
import {EMPTY_TRIP} from "../../utils/constants";
import {EMPTY_NEW_ITEM} from "../../utils/constants";
import {isValidLatitude, isValidLongitude} from "../../utils/misc";

let allowRemoveButtonClick = true;

export default class Trip extends Component {
  constructor(props) {
    super(props);

    this.addDestination = this.addDestination.bind(this);
    this.clearTrip = this.clearTrip.bind(this);
    this.loadTripJSON = this.loadTripJSON.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.optimizeTrip = this.optimizeTrip.bind(this);
    this.removeDestination = this.removeDestination.bind(this);
    this.reverseTrip = this.reverseTrip.bind(this);
    this.rotateTrip = this.rotateTrip.bind(this);
    this.setDestinationIsValidProperty = this.setDestinationIsValidProperty.bind(this);
    this.setName = this.setName.bind(this);
    this.submitDestination = this.submitDestination.bind(this);
    this.toggleDestinationCollapse = this.toggleDestinationCollapse.bind(this);
    this.toggleDestinationModal = this.toggleDestinationModal.bind(this);
    this.unlockRemoveButton = this.unlockRemoveButton.bind(this);
    this.updateDestination = this.updateDestination.bind(this);


    this.state = {
      destinations: [],
      destinationModal: false,
      destinationStates: [],
      loadedTrip: EMPTY_TRIP,
      newItem: EMPTY_NEW_ITEM,
      oneWayDistance: 0,
      response: "0.0",
      roundTripDistance:0,
      serverSettings: this.props.serverSettings,
      showNewItem: false,
      tripName: ''
    }
  }

  render() {
    return(
      <div className="text-center">
        <TripControls tripName={this.state.tripName} setName={this.setName}
                      destinations={this.state.destinations} loadedTrip={this.state.loadedTrip}
                      loadTripJSON={this.loadTripJSON} reverseTrip={this.reverseTrip}
                      optimizeTrip={this.optimizeTrip} onDrop={this.onDrop}
                      removeDestination={this.removeDestination} addDestination={this.addDestination}
                      updateDestination={this.updateDestination} destinationStates={this.state.destinationStates}
                      toggleDestinationCollapse={this.toggleDestinationCollapse} setDestinationIsValidProperty={this.setDestinationIsValidProperty}
                      rotateTrip={this.rotateTrip} serverSettings={this.state.serverSettings}
                      showNewItem={this.state.showNewItem} newItem={this.state.newItem}
                      flipRoundTrip={this.props.flipRoundTrip} isRoundTrip={this.props.isRoundTrip}
                      roundTripDistance={this.state.roundTripDistance} oneWayDistance={this.state.oneWayDistance}
                      submitDestination={this.submitDestination} toggle={this.props.toggle}
                      pageTop={this.props.pageTop} pageBottom={this.props.pageBottom}
                      destinationModal={this.state.destinationModal} toggleDestinationModal={this.toggleDestinationModal}
                      clearTrip={this.clearTrip}/>
        {this.checkMapUpdate()}
      </div>
    );
  }

  clearTrip(){
    this.setState({
        destinations: [],
        destinationStates: [],
        loadedTrip: EMPTY_TRIP,
        oneWayDistance: 0,
        response: "0.0",
        roundTripDistance:0,
        tripName: ''
    },
      this.sendTripRequest,
    );
  }

  loadTripJSON(loadedFile) {
    this.props.setTripLocations(loadedFile.places)
    this.setState({
        destinations: loadedFile.places,
        destinationStates: this.getInitDestinationStateArray(loadedFile.places),
        tripName: loadedFile.options.title,
        response: loadedFile.options.response,
        units: loadedFile.options.units
      },
      this.sendTripRequest,
    );
  }

  updateDestination(index, property, value) {
    if (index >= 0 && index < this.state.destinations.length) {
      let tempArr = JSON.parse(JSON.stringify(this.state.destinations));
      Object.defineProperty(tempArr[index], property, {value: value});
      this.setState({
            destinations: tempArr,
          },
          this.sendTripRequest,
      );
    }
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

  checkMapUpdate() {
    let newPlaceLocation = this.props.tripNewLocation?.location;
    let newPlaceLocationName = this.props.tripNewLocation?.locationName;

    if (newPlaceLocation) {
      if (!newPlaceLocationName || newPlaceLocationName === '') {
        newPlaceLocationName = newPlaceLocation[0].toFixed(2) + ', ' +
                               newPlaceLocation[1].toFixed(2);
      }

      this.setState({
        newItem: {
          "notes": "",
          "name": newPlaceLocationName,
          "latitude": String(newPlaceLocation[0]),
          "longitude": String(newPlaceLocation[1]),
        },
        showNewItem: true,
        destinationModal: true,
      });

      this.props.tripNewLocation.location = null;
      this.props.tripNewLocation.locationName = '';
    }
  }

  addDestination(name, lat, lng) {
    let placeName;
    placeName = this.checkName(name, lat, lng)
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

  checkName(name, lat, lng) {
    let placeName;
    if (name && name !== '') {
      placeName = name;
    } else {
      placeName = lat.toFixed(2) + ', ' + lng.toFixed(2);
    }
    return placeName;
  }

  removeDestination(index) {
    if(allowRemoveButtonClick){
      allowRemoveButtonClick = false;
      setTimeout(this.unlockRemoveButton, REMOVE_BUTTON_CLICK_BUFFER_MS);
      if (index >= 0 && index < this.state.destinations.length) {
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
    }
  }

  unlockRemoveButton(){
    allowRemoveButtonClick = true;
  }

  submitDestination() {
    if (this.state.newItem.latitude && this.state.newItem.latitude !== "") {
      this.setState({
          destinationModal: false,
          showNewItem: false,
          destinations: this.state.destinations.concat(this.state.newItem),
          destinationStates: this.state.destinationStates.concat(
            this.getInitDestinationState(this.state.newItem)),
          newItem: EMPTY_NEW_ITEM,
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
    if (index >= 0 && index < this.state.destinations.length) {
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
  }

  optimizeTrip() {
    this.setState({
        response: "1.0"
      },
      this.sendTripRequest,
    );
  }

  sendTripRequest() {
    sendServerRequest({
        "places": this.state.destinations,
        "options": {
          "title": this.state.tripName,
          "earthRadius": Cookies.get("EarthRadius"),
          "response": this.state.response,
          "units": Cookies.get("DistanceUnits")
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
        name: (destination.name) ? destination.name : "",
        latitude: (destination.latitude) ? destination.latitude : "",
        longitude: (destination.longitude) ? destination.longitude : "",
        notes: (destination.notes) ? destination.notes : ""
      }
    };
  }

  setName(name) {
    this.setState({tripName: name});
  }

  toggleDestinationModal() {
    this.setState({destinationModal: !this.state.destinationModal});
  }
}