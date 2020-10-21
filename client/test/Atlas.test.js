import './jestConfig/enzyme.config.js';

import React from 'react';
import ReactDOM from 'react-dom';
import {shallow, mount} from 'enzyme';

import Atlas from '../src/components/Atlas/Atlas';
import Polyline from "react-leaflet/lib/Polyline";

const startProperties = {
  createSnackBar: jest.fn()
};

const tripDestinations = [
  {
    "notes": "",
    "name": "Denver International Airport",
    "latitude": "39.861698150635",
    "longitude": "-104.672996521"
  },
  {
    "notes": "",
    "name": "Miami International Airport",
    "latitude": "25.79319953918457",
    "longitude": "-80.29060363769531"
  },
  {
    "notes": "",
    "name": "San Juan Airport",
    "latitude": "18.833332061799997",
    "longitude": "-71.2333297729"
  },
  {
    "notes": "",
    "name": "Terrance B. Lettsome International Airport",
    "latitude": "18.444799423217773",
    "longitude": "-64.54299926757812"
  }
];

function testInitialAtlasState() {

  const atlas = shallow(<Atlas createSnackBar={startProperties.createSnackBar}/>);

  let actualLocation1Position = atlas.state().distanceLocation1;
  let actualLocation2Position = atlas.state().distanceLocation2;
  let expectedMarkerPosition = null;

  expect(actualLocation1Position).toEqual(expectedMarkerPosition);
  expect(actualLocation2Position).toEqual(expectedMarkerPosition);
}

test("Testing Atlas's Initial State", testInitialAtlasState);

function testMarkerIsRenderedOnClick() {

  const atlas = shallow(<Atlas createSnackBar={startProperties.createSnackBar}/>);

  let actualMarkerPosition = atlas.state().distanceLocation1;
  let expectedMarkerPosition = null;

  expect(actualMarkerPosition).toEqual(expectedMarkerPosition);

  let latlng = {lat: 0, lng: 0};
  simulateOnClickEvent(atlas, {latlng: latlng});

  expect(atlas.state().distanceLocation1).toEqual(latlng);
  // expect(atlas.find('Marker')).toEqual(1); ??
}

function simulateOnClickEvent(reactWrapper, event) {
  reactWrapper.find('Map').at(0).simulate('click', event);
  reactWrapper.update();
}

test("Testing Atlas's Initial State", testMarkerIsRenderedOnClick);

function testRecenterButtonClicked() {

  const atlas = shallow(<Atlas createSnackBar={startProperties.createSnackBar}/>);

  let expectedCenterOfMap = atlas.state().originalMapCenter;
  let actualCenterOfMap = atlas.state().currentMapCenter;

  expect(atlas.state().originalMapCenter).toEqual(actualCenterOfMap);

  atlas.state().currentMapCenter = [0,0]

  simulateOnClickEventButton(atlas);

  expect(atlas.state().currentMapCenter).toEqual(expectedCenterOfMap);
}

function simulateOnClickEventButton(reactWrapper) {
  reactWrapper.find('#recenter').at(0).simulate('click');
  reactWrapper.update();
}

test("Testing Atlas's Resetting Center", testRecenterButtonClicked);

function testSetLocation() {
  const atlas = shallow(<Atlas createSnackBar={startProperties.createSnackBar}/>);
  const instance = atlas.instance();
  let expectedLocation = {lat: 0, lng: 0};
  instance.setLocation({lat: 1, lng: 1}, {lat: 0, lng: 0});
  let actualLocation = atlas.state().distanceLocation2;
  expect(actualLocation).toEqual(expectedLocation);
}
test("Testing Atlas's Set Distance Locations", testSetLocation);

function testSearchListClick() {
  const atlas = shallow(<Atlas createSnackBar={startProperties.createSnackBar}/>);
  const instance = atlas.instance();
  atlas.state().distanceLocation1 = {lat: 1, lng: 1};
  let expectedLocation1 = {lat: 0, lng: 0};
  let expectedLocation2 = atlas.state().distanceLocation1;
  let expectedCurrentLocation = [0, 0];
  instance.searchListItemClick("", 0, 0);
  let actualLocation1 = atlas.state().distanceLocation1;
  let actualLocation2 = atlas.state().distanceLocation2;
  let actualCurrentLocation = atlas.state().currentMapCenter;
  expect(actualLocation1).toEqual(expectedLocation1);
  expect(actualLocation2).toEqual(expectedLocation2);
  expect(actualCurrentLocation).toEqual(expectedCurrentLocation);
}

test("Testing Atlas goes to correct location on search list item click", testSearchListClick);

function testPrepareCallsRequest() {
  const atlas = shallow(<Atlas createSnackBar={startProperties.createSnackBar}/>);
  const instance = atlas.instance();
  instance.requestDistance = jest.fn();
  atlas.state().distanceLocation1 = {lat: 0, lng: 0};
  atlas.state().distanceLocation2 = {lat: 1, lng: 1};
  instance.prepareServerRequest();
  expect(instance.requestDistance).toBeCalled();
}

test("Testing Atlas calls RequestDistance when PrepareServerRequest called", testPrepareCallsRequest);

function testProcessSetsDistance() {
  const atlas = shallow(<Atlas createSnackBar={startProperties.createSnackBar}/>);
  const instance = atlas.instance();
  let expectedDistance = 12345;
  instance.processDistanceResponse({
    "requestType"    : "distance",
    "requestVersion" : 3,
    "place1"         : {"latitude":  "40.6", "longitude": "-105.1"},
    "place2"         : {"latitude":  "-33.9", "longitude": "151.2"},
    "earthRadius"    : 6371.0,
    "distance"       : 12345
  });
  atlas.update();
  let actualDistance = atlas.state().distance;
  expect(actualDistance).toEqual(expectedDistance);
}

test("Testing Atlas distance set by processDistanceResponse", testProcessSetsDistance);

function testSetTripLocations() {

  const atlas = shallow(<Atlas createSnackBar={startProperties.createSnackBar}/>);
  const instance = atlas.instance();

  const expectedTripLocations = [
    {"lat":"39.861698150635","lng":"-104.672996521"},
    {"lat":"25.79319953918457","lng":"-80.29060363769531"},
    {"lat":"18.833332061799997","lng":"-71.2333297729"},
    {"lat":"18.444799423217773","lng":"-64.54299926757812"}
    ];

  instance.setTripLocations(tripDestinations);
  const tripLocations = atlas.state().tripLocations;
  expect(tripLocations).toEqual(expectedTripLocations);

}

test("Testing Set Trip Locations", testSetTripLocations);

function testRenderTripLines() {

  const atlas = shallow(<Atlas createSnackBar={startProperties.createSnackBar}/>);
  const instance = atlas.instance();

  instance.setTripLocations(tripDestinations);

  let tripLines = instance.renderTripLines();
  expect(tripLines.props.children.length).toEqual(3);

  instance.setState({isRoundTrip: true});

  tripLines = instance.renderTripLines();
  expect(tripLines.props.children.length).toEqual(4);
}

test("Testing Trip Line Rendering", testRenderTripLines);

function testAddToTripButton() {
  const atlas = shallow(<Atlas createSnackBar={startProperties.createSnackBar}/>);
  const instance = atlas.instance();
  let expectedLocationAdded = atlas.state().currentMapCenter
  let expectedLocationNameAdded = "Home"
  instance.prepareNewTripAdd(expectedLocationAdded, instance.getMarkerLocationName(expectedLocationAdded));
  let actualLocationPassedToTrip = atlas.state().tripNewLocation.location;
  let actualLocationNamePassedToTrip = atlas.state().tripNewLocation.locationName;
  expect(expectedLocationAdded).toEqual(actualLocationPassedToTrip);
  expect(expectedLocationNameAdded).toEqual(actualLocationNamePassedToTrip)
}

test("Testing Home Location Gets Added to the Trip when map button clicked", testAddToTripButton)

function testRenderRoundTripSwitch()
{
    const div = document.createElement('div');
    document.body.appendChild(div);

    const atlas = mount(<Atlas createSnackBar={startProperties.createSnackBar}/>, {attachTo: div});
    const distanceButton = atlas.find('#distancebtn').at(0);
    distanceButton.simulate('click');
    const switchButton = atlas.find('#toggleRoundTrip').at(1);

    switchButton.simulate('click');


    // Test the output
    expect(atlas.state().isRoundTrip).toEqual(true);

}

test("Test that user click on RoundTrip switch works",testRenderRoundTripSwitch);