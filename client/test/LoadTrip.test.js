import './jestConfig/enzyme.config.js';
import {shallow} from 'enzyme';
import {jest, test} from "@jest/globals";
import React from "react";
import LoadTrip from "../src/components/Atlas/LoadTrip";

const START_PROPERTIES = {
  createSnackBar: jest.fn()
};

const SAMPLE_TRIP = {
  "options": {
    "title": "Shopping Loop",
    "earthRadius": "3959.0"
  },
  "places": [
    {
      "notes": "The big city",
      "latitude": "39.7",
      "name": "Denver",
      "longitude": "-105.0"
    },
    {
      "notes": "Home of CU",
      "latitude": "40.0",
      "name": "Boulder",
      "longitude": "-105.4"
    },
    {
      "notes": "Home of CSU",
      "latitude": "40.6",
      "name": "Fort Collins",
      "longitude": "-105.1"
    }
  ],
  "distances": [30, 44, 62],
  "requestType": "trip",
  "requestVersion": 4
};

function testLoadModal() {

  const loadTrip = shallow(<LoadTrip/>);
  loadTrip.find('#loadbtn').at(0).simulate('click');
  let actualState = loadTrip.state().loadModal;
  expect(actualState).toEqual(true);
}

test("Load modal opened by Load button", testLoadModal);