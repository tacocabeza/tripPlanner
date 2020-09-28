import React, { Component } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';
import {InputGroupText, InputGroupAddon, Input} from "reactstrap";
import {InputGroup} from "react-bootstrap";

export default class Search extends Component {
    constructor(props) {
        super(props);

        this.renderBar = this.renderBar.bind(this);
        this.renderResults = this.renderResults.bind(this);

        this.state={

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

    renderBar() {/*
        return <div>
            <Input inputMode={"text"} placeholder="Search TripCo" endAdornment={
                <InputAdornment position={"end"}>
                    <SearchIcon />
                </InputAdornment>
            }/>
        </div>;*/
        return <div>
            <InputGroup>
                <Input placeholder="Search TripCo" />
                <InputGroupAddon addonType="append">
                    <SearchIcon fontSize={"large"}/>
                    <ClearIcon fontSize={"large"}/>
                </InputGroupAddon>
            </InputGroup>
        </div>;
    }

    renderResults() {
        return <p>results</p>;
    }
}