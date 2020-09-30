import './jestConfig/enzyme.config.js';

import React from 'react';
import ReactDOM from 'react-dom';
import {shallow, mount} from 'enzyme';

import Atlas from '../src/components/Atlas/Atlas';
import DistanceForm from '../src/components/Atlas/DistanceForm';

const startProperties = {
  setLocation: jest.fn(),
}

function testGoToCoords() {
  const form = mount(<DistanceForm setLocation={startProperties.setLocation}/>);
  let expectedCoords = '0, 0';

  simulateFormSubmit(form);

  let actualCoords = form.state().string1;

  expect(actualCoords).toEqual(expectedCoords);
}

function simulateFormSubmit(reactWrapper) {
  const component = reactWrapper.find('Form').at(0);
  const input = component.find('Input').at(0);
  input.simulate('change', {target: {value: '0, 0'}});
  component.find('#distance-submit').at(0).simulate('click');
  reactWrapper.update();
}

test("Testing go to desired coordinates", testGoToCoords);