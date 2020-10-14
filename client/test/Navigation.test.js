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

function testMap() {
  testNavToTab("1", 0);
}

function testTrip() {
  testNavToTab("2", 1);
}

function testNavToTab(tabString, tabInt) {
  const div = document.createElement('div');
  div.setAttribute("id", "showAllMarkers")
  document.body.appendChild(div)
  const atlas = mount(<Atlas createSnackBar={startProperties.createSnackBar}/>);
  const nav = atlas.find('Navigation').at(0);
  let expectedTab = tabString;
  simulateTabClick(nav, 1);
  simulateTabClick(nav, tabInt);
  atlas.update();
  let actualTab = atlas.state().currentTab;
  expect(actualTab).toEqual(expectedTab);
}

function simulateTabClick(reactWrapper, tab) {
  const component = reactWrapper.find('Nav').at(0);
  component.find('NavLink').at(tab).simulate('click');
  reactWrapper.update();
}

test("Testing that clicking Map tab goes to the map", testMap);
test("Testing that clicking Trip tab goes to Trip", testTrip);