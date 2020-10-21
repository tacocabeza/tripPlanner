import React, { Component } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import {InputGroupAddon, Input, Collapse} from "reactstrap";
import {Button, InputGroup, ListGroup} from "react-bootstrap";
import {PROTOCOL_VERSION} from "../../utils/constants";
import {sendServerRequest} from "../../utils/restfulAPI";
let Coordinates = require('coordinate-parser');

export default class Search extends Component {
  constructor(props) {
    super(props);

    this.renderBar = this.renderBar.bind(this);
    this.renderResults = this.renderResults.bind(this);

    this.updateInputText = this.updateInputText.bind(this);
    this.formatInputText = this.formatInputText.bind(this);

    this.sendFindRequest = this.sendFindRequest.bind(this);
    this.processFindResponse = this.processFindResponse.bind(this);

    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);

    this.state={
      inputText: "",
      results: {
        "found": 0,
        "match": "",
        "places": [],
        "requestType": "find",
        "requestVersion": {PROTOCOL_VERSION}
      },
      serverSettings: this.props.serverSettings,
      searchHasFocus: false,
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
        <Input placeholder="Search TripCo" value={this.state.inputText} onChange={this.updateInputText}
               onFocus={this.onFocus}
               onBlur={this.onBlur}
        />
      </InputGroup>
    </div>;
  }

  updateInputText(event) {
      this.setState({inputText: event.target.value});
      this.sendFindRequest();
  }

  formatInputText(s) {
    // replace all non-alphanumeric characters with _
    let regex = new RegExp("[^a-zA-Z\\d]", "g");
    return s.replaceAll(regex,"_");
  }

  renderResults() {
    return (
      <Collapse isOpen={this.state.searchHasFocus}>
        <ListGroup variant="flush" style={{maxHeight: '300px', overflow: 'scroll'}}>
          {this.showFeelingLucky()}
          {this.state.results.places.map(result => (
            <ListGroup.Item key={result.id} action={true} onClick={() => {this.props.onClickListItem(result.name, result.latitude, result.longitude)}}>
              {result.name}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Collapse>
    );
  }

  showFeelingLucky(){
    if(this.state.inputText == null || this.state.inputText == "") {
      return(
        <ListGroup.Item style={{fontWeight: '600'}} action onClick={this.sendLuckyRequest}>
          Feeling Lucky?
        </ListGroup.Item>
      )
    }
  }

  sendFindRequest() {
    if (this.isValidPosition(this.state.inputText)) {
      let coords = new Coordinates(this.state.inputText);
      let response = {
        "places": [
          {
            "name": coords.getLatitude() + ', ' + coords.getLongitude(),
            "latitude": coords.getLatitude(),
            "longitude": coords.getLongitude(),
          }
        ]
      };
      this.processFindResponse(response);
    } else if (this.state.inputText != null && this.state.inputText != "") {
      sendServerRequest({requestType: "find", requestVersion: PROTOCOL_VERSION, match: this.formatInputText(this.state.inputText), limit: 100},
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

  sendLuckyRequest() {
    sendServerRequest({requestType: "find", requestVersion: PROTOCOL_VERSION},
      this.state.serverSettings.serverPort)
      .then(find => {
        if (find) {
          this.processFindResponse(find.data);
        } else {
          this.props.createSnackBar("The Request To The Server Failed. Please Try Again Later.");
        }
      });
  }

  processFindResponse(response) {
    this.setState({results: response});
  }

  onFocus() {
    this.setState({searchHasFocus: true});
  }

  onBlur() {
    this.setState({searchHasFocus: false});
  }

  isValidPosition(position) {
    let error;
    let isValid;
    try {
      isValid = true;
      new Coordinates(position);
      return isValid;
    } catch (error) {
      isValid = false;
      return isValid;
    }
  }

}