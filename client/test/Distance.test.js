import './jestConfig/enzyme.config.js';

import React from 'react';
import ReactDOM from 'react-dom';
import {shallow, mount} from 'enzyme';

import Atlas from '../src/components/Atlas/Atlas';
import Distance from '../src/components/Atlas/Distance';

import Polyline from "react-leaflet/lib/Polyline";

const startProperties = {
  onDistanceChange: jest.fn(),
  createSnackBar: jest.fn(),
  serverSettings: {'serverPort': 'black-bottle.cs.colostate.edu:31400', 'serverConfig': {}}
};

function testPrepareCallsRequest() {

  let distance1 = {lat: 38.0228, lng: 107.6714};
  let distance2 = {lat: 40.3772, lng: 105.5217};

  const distance = shallow(<Distance onDistanceChange={startProperties.onDistanceChange} serverSettings={"127.0.0.1:1870"} distanceLocation1={distance1} distanceLocation2={distance2} />);
    distance.instance().requestDistance = jest.fn();

  distance.instance().prepareServerRequest();

  expect(distance.instance().requestDistance).toBeCalled();
}

test("Testing Atlas calls RequestDistance when PrepareServerRequest called", testPrepareCallsRequest);


function testProcessSetsDistance() {
  const distance = shallow(<Distance onDistanceChange={startProperties.onDistanceChange} serverSettings={"127.0.0.1:1870"} />);
  const instance = distance.instance();
  let expectedDistance = 12345;
  instance.processDistanceResponse({
    "requestType"    : "distance",
    "requestVersion" : 3,
    "place1"         : {"latitude":  "40.6", "longitude": "-105.1"},
    "place2"         : {"latitude":  "-33.9", "longitude": "151.2"},
    "earthRadius"    : 6371.0,
    "distance"       : 12345
  });
  distance.update();
  let actualDistance = distance.state().distance;
  expect(actualDistance).toEqual(expectedDistance);
}

test("Test distance processSetDistance", testProcessSetsDistance);