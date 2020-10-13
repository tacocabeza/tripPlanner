import './jestConfig/enzyme.config.js';

import React from 'react';
import {shallow} from 'enzyme';

import DistanceForm from '../src/components/Atlas/DistanceForm';

const startProperties = {
  setLocation: jest.fn(),
}

function testSubmitOneCoord() {
  const form = shallow(<DistanceForm setLocation={startProperties.setLocation}/>);
  let expectedCoords = '0, 0';
  simulateFormSubmit(form);
  let actualCoords = form.state().string1;
  expect(actualCoords).toEqual(expectedCoords);
}

function testSubmitTwoCoords() {
  const form = shallow(<DistanceForm setLocation={startProperties.setLocation}/>);
  simulateFormSubmit(form);
  expect(form.state().submitted).toEqual(true);
}

function simulateFormSubmit(reactWrapper) {
  const component = reactWrapper.find('Form').at(0);
  const input = component.find('Input').at(0);
  const input2 = component.find('Input').at(1);
  input.simulate('change', {target: {value: '0, 0'}});
  input2.simulate('change', {target: {value: '2, 2'}});
  component.simulate('submit', { preventDefault: () => {} });
  reactWrapper.update();
}

test("Testing go to desired coordinates", testSubmitOneCoord);
test("Testing submission of two coordinates", testSubmitTwoCoords);