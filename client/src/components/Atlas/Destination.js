import React, { Component } from 'react';
import {Row, Col, Button, Fade, Card, Collapse,
  InputGroup, InputGroupText, InputGroupAddon, Input} from "reactstrap";

import DragIndicatorIcon from '@material-ui/icons/DragIndicator';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import DeleteIcon from '../../static/images/delete.svg'

import {isValidLatitude, isValidLongitude} from "../../utils/misc";
let Coordinates = require('coordinate-parser');

const ColoredLine = ({ color }) => (
  <hr
    style={{
      color: color,
      backgroundColor: color,
      height: 5
    }}
  />
);

const MAX_CHAR_LENGTH = {
    name: 100,
    latitude: 22,
    longitude: 22,
    notes: 750
  };

const INPUT_TYPE = {
  name: "text",
  latitude: "text",
  longitude: "text",
  notes: "textarea"
};

const INPUT_ROWS = {
  name: 1,
  latitude: 1,
  longitude: 1,
  notes: 3
};

export default class Destination extends Component {
  constructor(props) {
    super(props);

    this.toggleCollapse = this.toggleCollapse.bind(this);

    this.state = {
      collapseOpen: false,
      isValidProperty: {
        name: true,
        latitude: true,
        longitude: true,
        notes: true
      }
    }
  }

  render() {
    return (
      <div>
        <Fade in={this.props.index > 0} className="text-right">
          Distance: {this.props.distance}mi.
        </Fade>
        <Card className="destination">
          <Row>
            <Col className="text-left">
              <DragIndicatorIcon className="drag-handle"/>
              {this.renderName()}
              {this.renderArrow()}
              <Button className="float-right deleteBtn"
                      onClick={() => this.props.removeDestination(this.props.index)}>
                <img className="h-25px" src={DeleteIcon}/>
              </Button>
            </Col>
          </Row>
          {this.renderCollapse()}
        </Card>
      </div>
    );
  }

  renderName() {
    if(this.state.isValidProperty.name){
      return this.props.destination.name;
    } else {
      return this.getCoordsName();
    }
  }

  getCoordsName() {
    return parseFloat(this.props.destination.latitude).toFixed(2) + ", " +
      parseFloat(this.props.destination.longitude).toFixed(2);
  }

  renderArrow() {
    if(this.state.collapseOpen){
      return (<ExpandMoreIcon onClick={this.toggleCollapse}/>);
    } else {
      return (<NavigateNextIcon onClick={this.toggleCollapse}/>);
    }
  }

  toggleCollapse() {
    this.setState({collapseOpen: !this.state.collapseOpen});
  }

  renderCollapse() {
    return (
      <Collapse isOpen={this.state.collapseOpen}>
        <ColoredLine color="primary"/>
        {this.renderProperty("Name:","name")}
        {this.renderProperty("Latitude:","latitude")}
        {this.renderProperty("Longitude:","longitude")}
        {this.renderProperty("Notes:","notes")}
      </Collapse>
    );
  }

  renderProperty(displayText, property) {
    return (
      <InputGroup>
        <InputGroupAddon addonType="prepend">
          <InputGroupText style={{width: "82px", fontSize: 13}}>{displayText}</InputGroupText>
        </InputGroupAddon>
        <Input onChange={e => this.propertyOnChange(property, e.target.value)}
               invalid={!this.state.isValidProperty[property]}
               defaultValue={this.props.destination[property]}
               maxLength={MAX_CHAR_LENGTH[property]}
               type={INPUT_TYPE[property]}
               rows={INPUT_ROWS[property]}
               style={{fontSize: 13}}/>
      </InputGroup>
    );
  }

  propertyOnChange(property, value) {
    if(this.isValidProperty(property, value) || property == "name") {

      if(property == "latitude" || property == "longitude"){
        value = this.convertCoordinate(property, value);
      }

      this.props.updateDestination(this.props.index, property, value);
    }
  }

  isValidProperty(property, value) {
    if((property == "latitude" && !isValidLatitude(value)) ||
      (property == "longitude" && !isValidLongitude(value)) ||
      (property == "name" && value === "")) {
      this.setIsValidProperty(property, false);
      return false;
    } else {
      this.setIsValidProperty(property, true);
      return true;
    }
  }

  setIsValidProperty(property, value) {
    let newIsValidProperty = JSON.parse(JSON.stringify(this.state.isValidProperty));
    Object.defineProperty(newIsValidProperty,property,{value: value});
    this.setState({isValidProperty: newIsValidProperty});
  }

  convertCoordinate(property, value) {
    if(property == "latitude"){
      let coords = new Coordinates(value + ", 0.0");
      return String(coords.getLatitude());
    } else {
      let coords = new Coordinates("0.0, " + value);
      return String(coords.getLongitude());
    }
  }
}