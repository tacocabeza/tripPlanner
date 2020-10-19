import './jestConfig/enzyme.config.js';
import React from 'react';
import {PROTOCOL_VERSION} from "../src/utils/constants";
import {shallow} from 'enzyme';

import SaveTrip from "../src/components/Atlas/SaveTrip.js";


function testInitialSaveTripState() {

  const saveTrip = shallow(<SaveTrip/>);
  let actualIsPopUp = saveTrip.state().isPopUp;
  let expectedisPopUp = false;

  expect(actualIsPopUp).toEqual(expectedisPopUp);

  let expectedSaveName = "";

  let actualSaveName = saveTrip.state().saveName;

  expect(actualSaveName).toEqual(expectedSaveName);
}
test("Initial Save State", testInitialSaveTripState);

function testPopup()
{
    const saveTrip = shallow(<SaveTrip/>)

    saveTrip.instance().togglePopUp();

    expect(saveTrip.state().isPopUp).toEqual(true);

}

test("Testing Popup", testPopup);

function testLoadPlaces()
{
    let loadedTrip = {"options": {"title": "", "earthRadius": "3959.0"}, "places": [], "distances": [], "requestType": "trip", "requestVersion": PROTOCOL_VERSION};
    const saveTrip = shallow(<SaveTrip places={[]} tripData={loadedTrip}/>)

    let actualPayLoad = saveTrip.instance().loadPlaces();

    let expectedPayload = {"options": {"title": "", "earthRadius": "3959.0"}, "places": [], "distances": [], "requestType": "trip", "requestVersion": PROTOCOL_VERSION};

    expect(actualPayLoad).toEqual(expectedPayload);

}

test("Testing LoadPlaces", testLoadPlaces);