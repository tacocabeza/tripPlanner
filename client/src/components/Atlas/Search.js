import React, { Component } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import {InputGroupAddon, Input} from "reactstrap";
import {Button, InputGroup} from "react-bootstrap";
import {sendServerRequest} from "../../utils/restfulAPI";

export default class Search extends Component {
    constructor(props) {
        super(props);

        this.renderBar = this.renderBar.bind(this);
        this.renderResults = this.renderResults.bind(this);
        this.sendFindRequest = this.sendFindRequest.bind(this);
        this.processFindResponse = this.processFindResponse.bind(this);
        this.createSnackbar = this.props.createSnackBar.bind(this);

        this.state={
            inputText: null,
            results: {},
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
                <Input placeholder="Search TripCo" />
                <InputGroupAddon addonType="append">
                    <Button placeholder={"SEARCH"} onClick={this.sendFindRequest()}>
                        <SearchIcon fontSize={"small"} className={"tco-text"}/>
                    </Button>
                </InputGroupAddon>
            </InputGroup>
        </div>;
    }

    renderResults() {
        return <p>results</p>;
    }

    sendFindRequest() {
        sendServerRequest({requestType: "find", requestVersion: 2, match: this.state.inputText}, this.state.serverSettings.serverPort)
            .then(find => {
                if (find) { this.processFindResponse(find.data); }
                else { this.props.createSnackBar("The Request To The Server Failed. Please Try Again Later."); }
            });
    }

    processFindResponse() {

    }
}