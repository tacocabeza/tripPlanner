import './jestConfig/enzyme.config.js';

import React from 'react';
import ReactDOM from 'react-dom';
import {shallow, mount} from 'enzyme';

import Trip from '../src/components/Atlas/Trip';
import Atlas from '../src/components/Atlas/Atlas';

const startProperties = {
  createSnackBar: jest.fn()
};

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
  const trip = shallow(<Trip/>);
  trip.find('#addbtn').at(0).simulate('click');
  let actualState = trip.state().destinationModal;
  expect(actualState).toEqual(true);
}

test("Destination modal opened by Add Trip button", testDestinationModal);

function testLoadModal() {
  const trip = shallow(<Trip/>);
  trip.find('#loadbtn').at(0).simulate('click');
  let actualState = trip.state().loadModal;
  expect(actualState).toEqual(true);
}

test("Load modal opened by Load button", testLoadModal);

function testGoToMap() {
  const div = document.createElement('div');
  div.setAttribute("id", "showAllMarkers")
  document.body.appendChild(div)
  const atlas = mount(<Atlas createSnackBar={startProperties.createSnackBar}/>);
  let expectedTab = '1';
  atlas.find('#addbtn').at(0).simulate('click');
  atlas.find('#mapbtn').at(0).simulate('click');
  let actualTab = atlas.state().currentTab;
  expect(actualTab).toEqual(expectedTab);
}

test("Add from map button navigates to map tab", testGoToMap);

function testAddButtonOnMap() {
  let newLocationToAdd = {location: [0,0], locationName: "Zero Location"};
  const trip = shallow(<Trip createSnackBar={startProperties.createSnackBar} tripNewLocation={newLocationToAdd}/>);
  expect({location: null, locationName: null}).toEqual(newLocationToAdd);
  expect(trip.state().newItem).toEqual({ "notes": '', "name": '', "latitude": '', "longitude": ''});
}

test("Add to trip from map adds to trip", testAddButtonOnMap)


function testRenderRoundTrip()
{

    let shoppingTrip = {
                   "requestType"    : "trip",
                   "requestVersion" : 3,
                   "options"        : { "title":"Shopping Loop",
                                        "earthRadius":"3959.0"
                                      },
                   "places"         : [{"name":"Denver",       "latitude": "39.7", "longitude": "-105.0", "notes":"The big city"},
                                       {"name":"Boulder",      "latitude": "40.0", "longitude": "-105.4", "notes":"Home of CU"},
                                       {"name":"Fort Collins", "latitude": "40.6", "longitude": "-105.1", "notes":"Home of CSU"}],
                   "distances"      : [20, 40, 50]
                 };
    let trip = shallow(<Trip/>);
    trip.instance().processTripResponse(shoppingTrip);
    trip.instance().calculateRoundTrip();
    let actual = trip.state().roundTripDistance;
    expect(actual).toEqual(110);
}

test("test round trip distance", testRenderRoundTrip)