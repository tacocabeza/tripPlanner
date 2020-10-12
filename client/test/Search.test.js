import './jestConfig/enzyme.config.js';

import {mount, shallow} from "enzyme";

import React from "react";

import Atlas from '../src/components/Atlas/Atlas';
import Search from "../src/components/Atlas/Search";

const startProperties = {
    createSnackBar: jest.fn(),
    toggle: jest.fn(),
}

test("onChangeEvent should update the component's state", testUpdateInputText);

function testUpdateInputText() {

    const atlas = mount(<Atlas createSnackBar={startProperties.createSnackBar}/>);
    const searchBar = atlas.find('Search').at(0);

    expect(searchBar.state().inputText).toEqual(null);

    let inputText = 'FakeInputText';
    simulateOnChangeEvent(searchBar, {target: {value: inputText}});

    expect(searchBar.state().inputText).toEqual(inputText);
}

function simulateOnChangeEvent(reactWrapper, event) {
    reactWrapper.find('Input').at(0).simulate('change', event);
    reactWrapper.update();
}

test("Pressing Enter Should Send a Find Request",testEnterPress);

function testEnterPress() {
    const atlas = mount(<Atlas createSnackBar={startProperties.createSnackBar}/>);
    const searchBar = atlas.find('Search').at(0);

    expect(searchBar.state().results.found).toEqual(0);

    let inputText = 'Virgin Gorda';
    simulateOnChangeEvent(searchBar, {target: {value: inputText}});

    simulateKeyPress(searchBar,{key: 'Enter'});

    mockFindResponse();

    expect(searchBar.state().results.found).toEqual(1);

}

function simulateKeyPress(reactWrapper, event) {
    reactWrapper.find('Input').simulate('keypress', event)
}

test("Clicking a Result Should Add it to the Map",testClickResult);

function testClickResult() {

    const atlas = mount(<Atlas createSnackBar={startProperties.createSnackBar}/>);

    let inputText = 'Virgin Gorda';
    simulateOnChangeEvent(searchBar, {target: {value: inputText}});

    simulateKeyPress(searchBar,{key: 'Enter'});

    mockFindResponse();

    simulateOnClickEvent(atlas);

    let latlng = {lat: 18.446399688720703, lng: -64.42749786376953};
    expect(atlas.state().location1).toEqual(latlng);
}

function mockFindResponse() {
    fetch.mockResponse(JSON.stringify(
        {
            "found":1,
            "match":"Virgin_Gorda",
            "limit":100,
            "places":[
                {
                    "altitude":9,
                    "id":"TUPW",
                    "municipality":"Spanish Town",
                    "name":"Virgin Gorda Airport",
                    "type":"small_airport",
                    "latitude":"18.446399688720703",
                    "longitude":"-64.42749786376953"
                }
            ],
            "requestType":"find",
            "requestVersion":3
        }));
}

function simulateOnClickEvent(reactWrapper) {
    reactWrapper.find('ListGroup.Item').at(0).simulate('click');
    reactWrapper.update();
}