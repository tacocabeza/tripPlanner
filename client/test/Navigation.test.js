import './jestConfig/enzyme.config.js';

import React from 'react';
import ReactDOM from 'react-dom';
import {shallow, mount} from 'enzyme';

import Atlas from '../src/components/Atlas/Atlas';
import Navigation from '../src/components/Atlas/Navigation';

const startProperties = {
  createSnackBar: jest.fn(),
  toggle: jest.fn(),
}

function testGoToTab() {
  const atlas = mount(<Atlas createSnackBar={startProperties.createSnackBar}/>);
  const nav = atlas.find('Navigation').at(0);
  let expectedTab = "3";
  simulateTabClick(nav);
  atlas.update();
  let actualTab = atlas.state().currentTab;
  expect(actualTab).toEqual(expectedTab);
}

function simulateTabClick(reactWrapper) {
  const component = reactWrapper.find('Nav').at(0);
  component.find('#search').at(2).simulate('click');
  reactWrapper.update();
}

test("Testing that clicking a tab navigates to the correct tab in the UI", testGoToTab);