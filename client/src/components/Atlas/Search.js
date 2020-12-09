import React, { Component } from 'react';
import {Input, Collapse, InputGroup, ListGroup, ListGroupItem} from "reactstrap";
import {PROTOCOL_VERSION, SEARCH_CLIENT_LIMIT} from "../../utils/constants";
import {isJsonResponseValid, sendServerRequest} from "../../utils/restfulAPI";
let Coordinates = require('coordinate-parser');
import {isValidPosition} from "../../utils/misc";
import * as findSchema from "../../../schemas/ResponseFind.json";
import {EMPTY_SEARCH} from "../../utils/constants";
import AdvancedSearch from "./AdvancedSearch";

export default class Search extends Component {
  constructor(props) {
    super(props);

    this.renderBar = this.renderBar.bind(this);
    this.renderResults = this.renderResults.bind(this);
    this.updateInputText = this.updateInputText.bind(this);
    this.updateAdvancedText = this.updateAdvancedText.bind(this);
    this.sendFindRequest = this.sendFindRequest.bind(this);
    this.processFindResponse = this.processFindResponse.bind(this);
    this.sendLuckyRequest = this.sendLuckyRequest.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.closeAdvancedModal = this.closeAdvancedModal.bind(this);
    this.setType = this.setType.bind(this);
    this.setWhere = this.setWhere.bind(this);
    this.submitAdvancedSearch = this.submitAdvancedSearch.bind(this);

    this.state={
      inputText: "",
      advancedText: "",
      typeFilter: [],
      whereFilter: [],
      results: EMPTY_SEARCH,
      serverSettings: this.props.serverSettings,
      searchHasFocus: false,
      advancedModal: false,
    }
  }

  render() {
    return (
      <div>
        {this.renderBar()}
        {this.renderResults()}
        {this.renderAdvanced()}
      </div>
    );
  }

  renderBar() {
    return (<div>
      <InputGroup>
        <Input placeholder="Search TripCo" value={this.state.inputText} onChange={this.updateInputText}
               onFocus={this.onFocus}
               onBlur={this.onBlur}/>
      </InputGroup>
    </div>);
  }

  updateInputText(event) {
    this.setState({
        inputText: event.target.value
      },
      this.sendFindRequest
    );
  }

  updateAdvancedText(text) {
    this.setState({advancedText: text});
  }

  formatInputText(s) {
    // replace all non-alphanumeric characters with _
    let regex = new RegExp("[^a-zA-Z\\d]", "g");
    return s.replace(regex,"_");
  }

  renderResults() {
    return (
      <Collapse isOpen={this.state.searchHasFocus}>
        <ListGroup variant="flush" className="searchResults">
          {this.showAdvancedSearch()}
          {this.showFeelingLucky()}
          {this.renderLists()}
        </ListGroup>
      </Collapse>
    );
  }

  renderLists() {
    return(this.state.results.places.map(result => (
      <ListGroupItem key={result.id} action={true} onClick={() => {this.props.onClickListItem(result.name, result.latitude, result.longitude)}}>
        {result.name}
      </ListGroupItem>
    )));
  }

  renderAdvanced() {
    if (this.props.hasAdvanced) {
      return (
        <AdvancedSearch
          types={this.state.typeFilter}
          where={this.state.whereFilter}
          setType={this.setType}
          setWhere={this.setWhere}
          submit={this.submitAdvancedSearch}
          modal={this.state.advancedModal}
          closeModal={this.closeAdvancedModal}
          updateAdvancedText={this.updateAdvancedText}
          removeType={this.removeType}
          removeWhere={this.removeWhere}/>
      );
    }
  }

  showFeelingLucky() {
    if (this.state.inputText === "") {
      return(
        <ListGroupItem className="fontBold" action onClick={this.sendLuckyRequest} key={"FeelingLuckyItem"}>
          Feeling Lucky?
        </ListGroupItem>
      )
    }
  }

  showAdvancedSearch() {
    if (this.props.hasAdvanced && this.state.inputText === "") {
      return (
        <ListGroupItem className="fontBold" action onClick={() => {this.setState({advancedModal: true})}} key={"AdvancedSearchItem"}>
          Advanced Search
        </ListGroupItem>
      );
    }
  }

  sendFindRequest() {
    if (isValidPosition(this.state.inputText)) {
      let coords = new Coordinates(this.state.inputText);
      let response = { "requestVersion": PROTOCOL_VERSION, "requestType": "find", "found": 1,
        "places": [{
          "name": coords.getLatitude().toFixed(2) + ', ' + coords.getLongitude().toFixed(2),
          "latitude": String(coords.getLatitude()),
          "longitude": String(coords.getLongitude()),
        }]
      };
      this.processFindResponse(response);
    } else if (this.state.inputText && this.state.inputText !== "") {
      sendServerRequest({requestType: "find", requestVersion: PROTOCOL_VERSION, match: this.formatInputText(this.state.inputText), limit: SEARCH_CLIENT_LIMIT},
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

  sendAdvancedRequest() {
    let formattedTypeFilter = JSON.parse(JSON.stringify(this.state.typeFilter));
    let formattedWhereFilter = JSON.parse(JSON.stringify(this.state.whereFilter));

    for(let i = 0; i < formattedTypeFilter.length; i++){
      formattedTypeFilter[i] = this.formatInputText(formattedTypeFilter[i]);
    }
    for(let i = 0; i < formattedWhereFilter.length; i++){
      formattedWhereFilter[i] = this.formatInputText(formattedWhereFilter[i]);
    }

    sendServerRequest({
      requestType: "find",
      requestVersion: PROTOCOL_VERSION,
      match: this.formatInputText(this.state.advancedText),
      narrow: {"type": formattedTypeFilter, "where": formattedWhereFilter},
      limit: SEARCH_CLIENT_LIMIT},
      this.state.serverSettings.serverPort)
      .then(find => {
        if (find) {
          this.processFindResponse(find.data);
        } else {
          this.props.createSnackBar("The Request To The Server Failed. Please Try Again Later.");
        }
        this.setState({typeFilter: [], whereFilter: []});
      });
  }

  sendLuckyRequest() {
    this.setState({searchHasFocus: true});
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
    if(isJsonResponseValid(response, findSchema)) {
      for(let i = 0; i < response.places.length; i++){
        let coords = new Coordinates(
          response.places[i].latitude + " " + response.places[i].longitude);
        response.places[i].latitude = coords.getLatitude();
        response.places[i].longitude = coords.getLongitude();
      }
      this.setState({results: response});
    } else {
      this.props.createSnackBar("Find Response Not Valid. Check The Server.");
    }
  }

  onFocus() {
    this.setState({searchHasFocus: true});
  }

  onBlur() {
    this.setState({searchHasFocus: false});
  }

  closeAdvancedModal() {
    this.setState({advancedModal: false});
  }

  setType(type) {
    this.setState({typeFilter: type});
  }

  setWhere(where) {
    this.setState({whereFilter: where});
  }

  submitAdvancedSearch() {
    this.setState({
        advancedModal: false,
        searchHasFocus: true,
      },
      this.sendAdvancedRequest
    );
  }
}