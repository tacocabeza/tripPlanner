import './jestConfig/enzyme.config.js';

import React from 'react';
import {shallow, mount} from 'enzyme';
import Cookies from "js-cookie";

import Trip from '../src/components/Atlas/Trip';
import Atlas from '../src/components/Atlas/Atlas';
import {jest, test} from "@jest/globals";

const EMPTY_DESTINATION = { "notes": '', "name": '',
  "latitude": '', "longitude": ''};

const START_PROPERTIES = {
  createSnackBar: jest.fn()
};

const SAMPLE_TRIP = {
  "options": {
    "title": "Shopping Loop",
    "earthRadius": "3959.0"
  },
  "places": [
    {
      "notes": "The big city",
      "latitude": "39.7",
      "name": "Denver",
      "longitude": "-105.0"
    },
    {
      "notes": "Home of CU",
      "latitude": "40.0",
      "name": "Boulder",
      "longitude": "-105.4"
    },
    {
      "notes": "Home of CSU",
      "latitude": "40.6",
      "name": "Fort Collins",
      "longitude": "-105.1"
    }
  ],
  "distances": [30, 44, 62],
  "requestType": "trip",
  "requestVersion": 4
};

const SAMPLE_TRIP_STATES = [
  {
    collapseOpen: false,
    isValidProperty: {name: true, latitude: true, longitude: true, notes: true},
    inputTexts: {notes: "The big city", latitude: "39.7", name: "Denver", longitude: "-105.0"}
  },
  {
    collapseOpen: false,
    isValidProperty: {name: true, latitude: true, longitude: true, notes: true},
    inputTexts: {notes: "Home of CU", latitude: "40.0", name: "Boulder", longitude: "-105.4"}
  },
  {
    collapseOpen: false,
    isValidProperty: {name: true, latitude: true, longitude: true, notes: true},
    inputTexts: {notes: "Home of CSU", latitude: "40.6", name: "Fort Collins", longitude: "-105.1"}
  }
];

function testTripName() {
  const trip = mount(<Trip/>);
  let expectedName = 'Test';
  simulateEnterName(trip);
  let actualName = trip.state().tripName;
  expect(actualName).toEqual(expectedName);
}

function simulateEnterName(reactWrapper) {
  const component = reactWrapper.find('Input').at(0);
  component.simulate('change', {target: {value: 'Test'}});
  reactWrapper.update();
}

test("Trip Name field sets trip name", testTripName);

function testDestinationModal() {
  const trip = mount(<Trip/>);
  trip.find('#addbtn').at(0).simulate('click');
  let actualState = trip.state().destinationModal;
  expect(actualState).toEqual(true);
}

test("Destination modal opened by Add Trip button", testDestinationModal);

function testGoToMap() {
  const atlas = mount(<Atlas createSnackBar={START_PROPERTIES.createSnackBar}/>);
  let expectedTab = '1';
  atlas.find('#addbtn').at(0).simulate('click');
  atlas.find('#mapbtn').at(0).simulate('click');
  let actualTab = atlas.state().currentTab;
  expect(actualTab).toEqual(expectedTab);
}

test("Add from map button navigates to map tab", testGoToMap);

function testAddButtonOnMap() {
  let namedNewLocationToAdd = {location: [0.0, 0.0], locationName: "Null Island"};
  let unnamedNewLocationToAdd = {location: [0.0, 0.0]};
  const emptyTripLocation = {location: null, locationName: ""};

  let trip = shallow(<Trip createSnackBar={START_PROPERTIES.createSnackBar}
                             tripNewLocation={namedNewLocationToAdd}/>);
  trip.instance().checkMapUpdate();
  trip.update();
  expect(namedNewLocationToAdd).toEqual(emptyTripLocation);
  expect(trip.state().newItem).toEqual(EMPTY_DESTINATION);

  trip = shallow(<Trip createSnackBar={START_PROPERTIES.createSnackBar}
                             tripNewLocation={unnamedNewLocationToAdd}/>);
  trip.instance().checkMapUpdate();
  trip.update();
  expect(unnamedNewLocationToAdd).toEqual(emptyTripLocation);
  expect(trip.state().newItem).toEqual(EMPTY_DESTINATION);
}

test("Add to trip from map adds to trip", testAddButtonOnMap)


function testProcessTripResponse() {
  let trip = shallow(<Trip setTripLocations={jest.fn()} parentCallback={jest.fn()} />);
  trip.instance().processTripResponse(SAMPLE_TRIP);

  let actualLoadedTrip = trip.state().loadedTrip;
  expect(actualLoadedTrip).toEqual(SAMPLE_TRIP);

  let actualTripName = trip.state().tripName;
  expect(actualTripName).toEqual("Shopping Loop");

  let actualOneWayDistance = trip.state().oneWayDistance;
  expect(actualOneWayDistance).toEqual(74);

  let actualRoundTripDistance = trip.state().roundTripDistance;
  expect(actualRoundTripDistance).toEqual(136);

  let actualDestinations = trip.state().destinations;
  expect(actualDestinations).toEqual(SAMPLE_TRIP.places);
}

test("test processTripResponse", testProcessTripResponse)

function testOnDrop() {
  let trip = shallow(<Trip setTripLocations={jest.fn()} parentCallback={jest.fn()} />);
  trip.instance().sendTripRequest = jest.fn();
  trip.instance().processTripResponse(SAMPLE_TRIP);
  const before = SAMPLE_TRIP.places;

  trip.instance().onDrop({removedIndex: 0, addedIndex: 2});

  expect(trip.state().destinations[0].name).toEqual("Boulder");
  expect(trip.state().destinations[1].name).toEqual("Fort Collins");
  expect(trip.state().destinations[2].name).toEqual("Denver");

  // Make sure original array is unchanged
  expect(SAMPLE_TRIP.places).toEqual(before);
}

test("test destinations onDrop", testOnDrop)

function testRemoveLocation() {
  let trip = shallow(<Trip setTripLocations={jest.fn()} parentCallback={jest.fn()} />);
  trip.instance().sendTripRequest = jest.fn();
  trip.instance().processTripResponse(SAMPLE_TRIP);
  const before = SAMPLE_TRIP.places;

  trip.instance().removeDestination(1);

  expect(trip.state().destinations.length).toEqual(2);
  expect(trip.state().destinations[0].name).toEqual("Denver");
  expect(trip.state().destinations[1].name).toEqual("Fort Collins");

  // Make sure original array is unchanged
  expect(SAMPLE_TRIP.places).toEqual(before);
}

test("test remove location", testRemoveLocation)

function testSubmitDestination() {
  Cookies.remove("Destinations");
  Cookies.remove("DestinationStates");
  const trip = shallow(<Trip/>);
  trip.instance().sendTripRequest = jest.fn();

  const newDenver = {
    "notes": "The big city",
    "latitude": "39.7",
    "name": "Denver",
    "longitude": "-105.0"
  };

  trip.setState({
    newItem: newDenver,
    destinationModal: true,
    showNewItem: true});

  trip.instance().submitDestination();

  expect(trip.state().destinationModal).toEqual(false);
  expect(trip.state().showNewItem).toEqual(false);
  expect(trip.state().destinations).toEqual([newDenver]);
  expect(trip.state().newItem).toEqual({ "notes": '', "name": '',
                                                  "latitude": '', "longitude": ''});
}

test("test submitDestination",testSubmitDestination)

function testReverseTrip() {
  let trip = shallow(<Trip setTripLocations={jest.fn()} parentCallback={jest.fn()} />);
  trip.instance().sendTripRequest = jest.fn();
  trip.instance().processTripResponse(SAMPLE_TRIP);
  const before = SAMPLE_TRIP.places;

  trip.instance().reverseTrip();

  expect(trip.state().destinations[0].name).toEqual("Fort Collins");
  expect(trip.state().destinations[1].name).toEqual("Boulder");
  expect(trip.state().destinations[2].name).toEqual("Denver");

  // Make sure original array is unchanged
  expect(SAMPLE_TRIP.places).toEqual(before);
}

test("test reverseTrip", testReverseTrip)

function testAddDestination() {
  const trip = shallow(<Trip/>);

  trip.instance().addDestination("Denver",39.7,-105.0);

  expect(trip.state().newItem).toEqual({
    "notes": "",
      "name": "Denver",
      "latitude": "39.7",
      "longitude": "-105"
  });

  trip.instance().addDestination(null,39.7,-105.0);

  expect(trip.state().newItem).toEqual({
    "notes": "",
    "name": "39.70, -105.00",
    "latitude": "39.7",
    "longitude": "-105"
  });
}

test("test addDestination", testAddDestination)

function testToggleDestinationCollapse() {
  let trip = mount(<Trip/>);
  trip.setState({
    loadedTrip: SAMPLE_TRIP,
    destinations: SAMPLE_TRIP.places,
    destinationStates: SAMPLE_TRIP_STATES
  });
  trip.instance().sendTripRequest = jest.fn();

  expect(trip.state().destinationStates[1].collapseOpen).toEqual(false);
  trip.instance().toggleDestinationCollapse(1);
  expect(trip.state().destinationStates[1].collapseOpen).toEqual(true);
  trip.instance().toggleDestinationCollapse(1);
  expect(trip.state().destinationStates[1].collapseOpen).toEqual(false);
}

test("test toggleDestinationCollapse", testToggleDestinationCollapse);

function testRotateTrip() {
    let trip = mount(<Trip/>);
    trip.setState({
      loadedTrip: SAMPLE_TRIP,
      destinations: SAMPLE_TRIP.places,
      destinationStates: SAMPLE_TRIP_STATES
    });
    trip.instance().sendTripRequest = jest.fn();

    trip.instance().rotateTrip(1);

    expect(trip.state().destinations[0].name).toEqual("Boulder");
    expect(trip.state().destinations[1].name).toEqual("Fort Collins");
    expect(trip.state().destinations[2].name).toEqual("Denver");

    expect(trip.state().destinationStates[0].inputTexts.name).toEqual("Boulder");
    expect(trip.state().destinationStates[1].inputTexts.name).toEqual("Fort Collins");
    expect(trip.state().destinationStates[2].inputTexts.name).toEqual("Denver");
}

test("test rotateTrip", testRotateTrip);

function testGetInitDestinationStateArray() {
  let trip = shallow(<Trip/>);
  expect(trip.instance().getInitDestinationStateArray(SAMPLE_TRIP.places)).toEqual(SAMPLE_TRIP_STATES);
}

test("test getInitDestinationStateArray",testGetInitDestinationStateArray);