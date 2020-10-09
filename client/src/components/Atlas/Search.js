import React, { Component } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import {InputGroupAddon, Input} from "reactstrap";
import {Button, InputGroup, ListGroup} from "react-bootstrap";
import {PROTOCOL_VERSION} from "../../utils/constants";
import {sendServerRequest} from "../../utils/restfulAPI";

export default class Search extends Component {
    constructor(props) {
        super(props);

        this.renderBar = this.renderBar.bind(this);
        this.renderResults = this.renderResults.bind(this);

        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.updateInputText = this.updateInputText.bind(this);
        this.formatInputText = this.formatInputText.bind(this);

        this.sendFindRequest = this.sendFindRequest.bind(this);
        this.processFindResponse = this.processFindResponse.bind(this);

        this.state={
            inputText: null,
            results: {
                "found": 0,
                "match": "",
                "places": [],
                "requestType": "find",
                "requestVersion": {PROTOCOL_VERSION}
            },
            serverSettings: this.props.serverSettings
        }
    }

    render() {
        return (
            <div>
                {this.renderBar()}
                {this.renderResults()}
            </div>
        );
    }

    renderBar() {
        return <div>
            <InputGroup>
                <Input placeholder="Search TripCo" onChange={this.updateInputText}
                       onKeyPress={this.handleKeyPress}/>
                <InputGroupAddon addonType="append">
                    <Button placeholder={"SEARCH"} onClick={this.sendFindRequest}>
                        <SearchIcon fontSize={"small"} className={"tco-text"}/>
                    </Button>
                    <Button color="primary" onClick={this.sendFindRequest}>
                        FeelingLucky?
                    </Button>
                </InputGroupAddon>
            </InputGroup>
        </div>;
    }

    handleKeyPress(target) {
        if(target.charCode==13){
            this.sendFindRequest();
        }
    }

    updateInputText(event) {
        let formattedString = this.formatInputText(event.target.value);
        this.setState({inputText: formattedString});
    }

    formatInputText(s) {
        // replace all non-alphanumeric characters with _
        let regex = new RegExp("[^a-zA-Z\\d]", "g");
        return s.replaceAll(regex,"_");
    }

    renderResults() {
        return (
            <ListGroup variant="flush">
                {this.state.results.places.map(result => (
                    <ListGroup.Item key={result.id} action onClick={() => {this.props.onClickListItem(result.latitude, result.longitude)}}>
                        {result.name}
                    </ListGroup.Item>
                ))}
            </ListGroup>
        );
    }

    sendFindRequest() {
        if(this.state.inputText != null && this.state.inputText != "") {
            sendServerRequest({requestType: "find", requestVersion: PROTOCOL_VERSION, match: this.state.inputText},
                this.state.serverSettings.serverPort)
                .then(find => {
                    if (find) {
                        this.processFindResponse(find.data);
                    } else {
                        this.props.createSnackBar("The Request To The Server Failed. Please Try Again Later.");
                    }
                });
        }
    }

    processFindResponse(response) {
        this.setState({results: response});
    }

}