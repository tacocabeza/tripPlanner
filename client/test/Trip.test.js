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