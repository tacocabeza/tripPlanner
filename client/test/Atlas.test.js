import './jestConfig/enzyme.config.js';

import React from 'react';
import ReactDOM from 'react-dom';
import {shallow} from 'enzyme';

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

  let actualMarkerPosition = atlas.state().markerPosition;
  let expectedMarkerPosition = null;

  expect(actualMarkerPosition).toEqual(expectedMarkerPosition);

  let latlng = {lat: 0, lng: 0};
  simulateOnClickEvent(atlas, {latlng: latlng});

  expect(atlas.state().markerPosition).toEqual(latlng);
  // expect(atlas.find('Marker')).toEqual(1); ??
}

function simulateOnClickEvent(reactWrapper, event) {
  reactWrapper.find('Map').at(0).simulate('click', event);
  reactWrapper.update();
}

test("Testing Atlas's Initial State", testMarkerIsRenderedOnClick);

function testRecenterButtonClicked() {

  const atlas = shallow(<Atlas createSnackBar={startProperties.createSnackBar}/>);

  let expectedCenterOfMap = atlas.state().mapCenter;

  atlas.state().mapLocation = {lat: 0, lng: 0};

  expect(atlas.state().mapLocation).toEqual({lat: 0, lng: 0});

  simulateOnClickEventButton(atlas);

  expect(atlas.state().mapLocation).toEqual(expectedCenterOfMap);
}

function simulateOnClickEventButton(reactWrapper) {
  reactWrapper.find('Button').at(0).simulate('click');
  reactWrapper.update();
}

test("Testing Atlas's Resetting Center", testRecenterButtonClicked);