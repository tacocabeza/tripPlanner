import './jestConfig/enzyme.config.js';

import {mount, shallow} from "enzyme";

import React from "react";

import Atlas from '../src/components/Atlas/Atlas';
import Search from "../src/components/Atlas/Search";

const startProperties = {
    createSnackBar: jest.fn(),
    toggle: jest.fn(),
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

test("onChangeEvent should update the component's state", testUpdateInputText);

function testUpdateInputText() {

    const atlas = shallow(<Atlas createSnackBar={startProperties.createSnackBar}/>);
    const searchBar = mount(<Search createSnackBar={atlas.instance().props.createSnackBar}
                                    serverSettings={atlas.instance().state.serverSettings}
                                    onClickListItem={atlas.instance().searchListItemClick}/>)

    expect(searchBar.state().inputText).toEqual("");

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
    const atlas = shallow(<Atlas createSnackBar={startProperties.createSnackBar}/>);
    const searchBar = mount(<Search createSnackBar={atlas.instance().props.createSnackBar}
                                    serverSettings={atlas.instance().state.serverSettings}
                                    onClickListItem={atlas.instance().searchListItemClick}/>)
    searchBar.instance().sendFindRequest = jest.fn();

    expect(searchBar.state().results.found).toEqual(0);

    let inputText = 'Virgin Gorda';
    simulateOnChangeEvent(searchBar, {target: {value: inputText}});

    simulateKeyPress(searchBar,{key: 'Enter'});

    expect(searchBar.instance().sendFindRequest).toBeCalled();

}

function simulateKeyPress(reactWrapper, event) {
    reactWrapper.find('Input').simulate('keypress', event)
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

/*test("Clicking a Result Should Add it to the Map",testClickResult);

function testClickResult() {

    const div = document.createElement('div');
    div.setAttribute("id", "showAllMarkers");
    document.body.appendChild(div);

    const atlas = mount(<Atlas createSnackBar={startProperties.createSnackBar}/>);
    const searchBar = atlas.find('Search').at(0);
    const instance = searchBar.instance();

    instance.processFindResponse({
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
    });
    searchBar.update();

    simulateOnClickEvent(searchBar);

    let latlng = {lat: 18.446399688720703, lng: -64.42749786376953};
    expect(atlas.state().distanceLocation1).toEqual(latlng);
}

function simulateOnClickEvent(reactWrapper) {
    reactWrapper.find('ListGroup.Item').find('Collapse').find('ListGroup').find('ListGroup.Item').at(0).at(0).simulate('click');
    reactWrapper.update();
}*/