import './jestConfig/enzyme.config.js';

import React from 'react';
import ReactDOM from 'react-dom';
import {shallow, mount} from 'enzyme';

import Atlas from '../src/components/Atlas/Atlas';

const startProperties = {
  createSnackBar: jest.fn()
};

function testInitialAtlasState() {

  const atlas = shallow(<Atlas createSnackBar={startProperties.createSnackBar}/>);

  let actualMarkerPosition = atlas.state().markerPosition;
  let expectedMarkerPosition = null;

  expect(actualMarkerPosition).toEqual(expectedMarkerPosition);
}

test("Testing Atlas's Initial State", testInitialAtlasState);

function testMarkerIsRenderedOnClick() {

  const atlas = shallow(<Atlas createSnackBar={startProperties.createSnackBar}/>);

  let actualMarkerPosition = atlas.state().location1;
  let expectedMarkerPosition = null;

  expect(actualMarkerPosition).toEqual(expectedMarkerPosition);

  let latlng = {lat: 0, lng: 0};
  simulateOnClickEvent(atlas, {latlng: latlng});

  expect(atlas.state().location1).toEqual(latlng);
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

function testLocation1() {
  testSetLocation(1);
}

function testLocation2() {
  testSetLocation(2);
}

function testLocation3() {
  testSetLocation(3);
}

function testSetLocation(location) {
  const atlas = shallow(<Atlas createSnackBar={startProperties.createSnackBar}/>);
  const instance = atlas.instance();
  let expectedLocation = {lat: 0, lng: 0};
  instance.setLocation(location, {lat: 0, lng: 0});
  let actualLocation = null;
  if (location == 1) {
    actualLocation = atlas.state().location1;
  } else if (location == 2) {
    actualLocation = atlas.state().location2;
  } else {
    actualLocation = atlas.state().currentMapCenter;
  }
  expect(actualLocation).toEqual(expectedLocation);
}
test("Testing Atlas's Set Single Location", testLocation1);
test("Testing Atlas's Set Dual Location", testLocation2);
test("Testing Atlas's Set Current Location", testLocation3);

function testSearchListClick() {
  const atlas = shallow(<Atlas createSnackBar={startProperties.createSnackBar}/>);
  const instance = atlas.instance();
  atlas.state().location1 = {lat: 1, lng: 1};
  let expectedLocation1 = {lat: 0, lng: 0};
  let expectedLocation2 = atlas.state().location1;
  let expectedCurrentLocation = [0, 0];
  instance.searchListItemClick(0, 0);
  let actualLocation1 = atlas.state().location1;
  let actualLocation2 = atlas.state().location2;
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
  atlas.state().location1 = {lat: 0, lng: 0};
  atlas.state().location2 = {lat: 1, lng: 1};
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

