import './jestConfig/enzyme.config.js';

import React from 'react';
import {shallow, mount} from 'enzyme';
import Destination from "../src/components/Atlas/Destination";
import Trip from "../src/components/Atlas/Trip";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";

const sampleDestination = {name: "20 Elder Rd.", latitude: "40.71194444444445",
  longitude: "-73.21916666666667", notes: "Swim bank!"};

const sampleDestinationState = {
  collapseOpen: false,
  isValidProperty: {name: true, latitude: true, longitude: true, notes: true},
  inputTexts: {name: "20 Elder Rd.", latitude: "40.71194444444445",
    longitude: "-73.21916666666667", notes: "Swim bank!"}
};

const sampleTrip = {
  "options":{
    "title":"Grammies House",
    "earthRadius":"3959.0"
  },
  "places":[
    {"notes":"I live here!", "latitude":"39", "name":"12535 Vrain St.", "longitude":"-105"},
    {"notes":"", "latitude":"39.861698150635", "name":"Denver International Airport", "longitude":"-104.672996521"},
    {"notes":"", "latitude":"40.63980103", "name":"John F Kennedy International Airport", "longitude":"-73.77890015"},
    {"notes":"20 Elder Rd.", "latitude":"40", "name":"", "longitude":"73"}
  ],
  "distances":[62, 1622, 6487, 6977],
  "requestType":"trip",
  "requestVersion":4
};

const sampleTripStates = [
  {
    collapseOpen: false,
    isValidProperty: {name: true, latitude: true, longitude: true, notes: true},
    inputTexts: {notes:"I live here!", latitude:"39N", name:"12535 Vrain St.",
      longitude:"105W"}
  },
  {
    collapseOpen: false,
    isValidProperty: {name: true, latitude: true, longitude: true, notes: true},
    inputTexts: {notes:"", latitude:"39.861698150635", name:"Denver International Airport",
      longitude:"-104.672996521"}
  },
  {
    collapseOpen: false,
    isValidProperty: {name: true, latitude: true, longitude: true, notes: true},
    inputTexts: {notes:"", latitude:"40.63980103", name:"John F Kennedy International Airport",
      longitude:"-73.77890015"}
  },
  {
    collapseOpen: false,
    isValidProperty: {name: false, latitude: true, longitude: true, notes: true},
    inputTexts: {notes:"20 Elder Rd.", latitude:"40", name:"", longitude:"73"}
  }
];

function testRenderName() {
  let destination = mount(<Destination destination={sampleDestination}
                                       destinationState={sampleDestinationState}/>);

  expect(destination.instance().renderName()).toEqual("20 Elder Rd.");

  let noNameDestination = {
    name: "",
    latitude: "40.71194444444445",
    longitude: "-73.21916666666667",
    notes: "Swim bank!"
  };

  let invalidNameState = {
    collapseOpen: false,
    isValidProperty: {
      name: false,
      latitude: true,
      longitude: true,
      notes: true
    },
    inputTexts: {
      name: "",
      latitude: "40.71194444444445",
      longitude: "-73.21916666666667",
      notes: "Swim bank!"
    }
  };

  destination = mount(<Destination destination={noNameDestination}
                                   destinationState={invalidNameState}/>);

  expect(destination.instance().renderName()).toEqual("40.71, -73.22");
}

test("test renderName", testRenderName);

function testValidLatitudeChange() {
  let trip = mount(<Trip/>);
  trip.setState({
    loadedTrip: sampleTrip,
    destinations: sampleTrip.places,
    destinationStates: sampleTripStates
  });
  trip.instance().sendTripRequest = jest.fn();

  let latitudeInput = trip.find("#latitude0").at(0);

  let inputText = "40°07'22.8\"N";
  latitudeInput.simulate("change", {target: {value: inputText}});

  expect(trip.state().destinationStates[0].isValidProperty.latitude).toEqual(true);
  expect(trip.state().destinationStates[0].inputTexts.latitude).toEqual(inputText);
  expect(trip.state().destinations[0].latitude).toEqual("40.11666666666667");

}

test("test valid latitude change", testValidLatitudeChange);

function testValidLongitudeChange() {
  let trip = mount(<Trip/>);
  trip.setState({
    loadedTrip: sampleTrip,
    destinations: sampleTrip.places,
    destinationStates: sampleTripStates
  });
  trip.instance().sendTripRequest = jest.fn();

  let longitudeInput = trip.find("#longitude0").at(0);

  let inputText = "74°07'22.8\"W";
  longitudeInput.simulate("change", {target: {value: inputText}});

  expect(trip.state().destinationStates[0].isValidProperty.longitude).toEqual(true);
  expect(trip.state().destinationStates[0].inputTexts.longitude).toEqual(inputText);
  expect(trip.state().destinations[0].longitude).toEqual("-7.38");

}

test("test valid longitude change", testValidLongitudeChange);

function testInvalidProperty() {
  let trip = mount(<Trip/>);
  trip.setState({
    loadedTrip: sampleTrip,
    destinations: sampleTrip.places,
    destinationStates: sampleTripStates
  });
  trip.instance().sendTripRequest = jest.fn();

  let longitudeInput = trip.find("#longitude0").at(0);

  let inputText = "I AIN'T NEVER SEEN TWO PRETTY BEST FRIENDS";
  longitudeInput.simulate("change", {target: {value: inputText}});

  expect(trip.state().destinationStates[0].isValidProperty.longitude).toEqual(false);
  expect(trip.state().destinationStates[0].inputTexts.longitude).toEqual(inputText);
  expect(trip.state().destinations[0].longitude).toEqual("-105");
}

test("test invalid property", testInvalidProperty);

function testRemoveDestination() {
  let trip = mount(<Trip/>);
  trip.setState({
    loadedTrip: sampleTrip,
    destinations: sampleTrip.places,
    destinationStates: sampleTripStates
  });
  trip.instance().sendTripRequest = jest.fn();

  let button = trip.find("#deleteButton2").at(0);

  button.simulate("click");

  expect(trip.find("Destination").length).toEqual(3);
  expect(trip.state().destinations.length).toEqual(3);
  expect(trip.state().destinationStates.length).toEqual(3);

  expect(trip.state().destinations[0].name).toEqual("12535 Vrain St.");
  expect(trip.state().destinations[1].name).toEqual("Denver International Airport");
  expect(trip.state().destinations[2].name).toEqual("");

}

test("test removeDestination button", testRemoveDestination);