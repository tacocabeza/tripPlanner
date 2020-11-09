import './jestConfig/enzyme.config.js';

import {mount, shallow} from "enzyme";

import React from "react";

import Atlas from '../src/components/Atlas/Atlas';
import Search from "../src/components/Atlas/Search";

const startProperties = {
    createSnackBar: jest.fn(),
    toggle: jest.fn()
}

const findResponse = {
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
};

const invalidFindResponse = {
    "builds": "failing",
    "test coverage": "declining",
    "choclate milk": "chillin",
    "party": "rocking",
};

test("OnChange Should Send a Find Request",testOnChange);

function testOnChange() {
    const atlas = shallow(<Atlas createSnackBar={startProperties.createSnackBar}/>);
    const searchBar = mount(<Search createSnackBar={atlas.instance().props.createSnackBar}
                                    serverSettings={atlas.instance().state.serverSettings}
                                    onClickListItem={atlas.instance().searchListItemClick}/>)
    searchBar.instance().sendFindRequest = jest.fn();

    let inputText = 'Virgin Gorda';
    simulateOnChangeEvent(searchBar, {target: {value: inputText}});

    expect(searchBar.instance().sendFindRequest).toBeCalled();
}

function simulateOnChangeEvent(reactWrapper, event) {
    reactWrapper.find('Input').at(0).simulate('change', event);
    reactWrapper.update();
}

test("Test Process Find Response", testProcessFindResponse);

function testProcessFindResponse() {
    const atlas = shallow(<Atlas createSnackBar={startProperties.createSnackBar}/>);
    const searchBar = mount(<Search createSnackBar={atlas.instance().props.createSnackBar}
                                    serverSettings={atlas.instance().state.serverSettings}
                                    onClickListItem={atlas.instance().searchListItemClick}/>)

    searchBar.instance().processFindResponse(findResponse);

    expect(searchBar.state().results.places[0].latitude).toEqual(18.446399688720703);

}

test("Test Invalid Find Response",testInvalidFindResponse);

function testInvalidFindResponse() {
    const atlas = shallow(<Atlas createSnackBar={startProperties.createSnackBar}/>);
    const searchBar = mount(<Search createSnackBar={atlas.instance().props.createSnackBar}
                                    serverSettings={atlas.instance().state.serverSettings}
                                    onClickListItem={atlas.instance().searchListItemClick}/>)

    searchBar.instance().processFindResponse(invalidFindResponse);

    expect(searchBar.instance().props.createSnackBar).toBeCalled();
}

test("Test onFocus() and onBlur()", testFocusBlur);

function testFocusBlur() {
    const atlas = shallow(<Atlas createSnackBar={startProperties.createSnackBar}/>);
    const searchBar = mount(<Search createSnackBar={atlas.instance().props.createSnackBar}
                                    serverSettings={atlas.instance().state.serverSettings}
                                    onClickListItem={atlas.instance().searchListItemClick}/>)

    searchBar.instance().onFocus();
    expect(searchBar.state().searchHasFocus).toEqual(true);

    searchBar.instance().onBlur();
    expect(searchBar.state().searchHasFocus).toEqual(false);
}

test("Test Valid Coordinates in SearchBar", testValidCoordinates);

function testValidCoordinates() {
    const atlas = shallow(<Atlas createSnackBar={startProperties.createSnackBar}/>);
    const searchBar = mount(<Search createSnackBar={atlas.instance().props.createSnackBar}
                                    serverSettings={atlas.instance().state.serverSettings}
                                    onClickListItem={atlas.instance().searchListItemClick}/>)
    searchBar.instance().processFindResponse = jest.fn();

    let inputText = '40°42\'43"N 73°13\'09"W';
    simulateOnChangeEvent(searchBar, {target: {value: inputText}});

    expect(searchBar.instance().processFindResponse).toBeCalled();
}