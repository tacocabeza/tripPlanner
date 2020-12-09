import React, { Component } from 'react';
import {Row, Col, Button, Input, ListGroupItem, Modal, ModalBody, ModalHeader, ModalFooter, Fade, FormGroup, CustomInput} from "reactstrap";
import Cookies from "js-cookie";

import SaveTrip from './SaveTrip.js';
import LoadTrip from "./LoadTrip";

import Search from './Search.js';
import {Container, Draggable} from "react-smooth-dnd";
import Destination from "./Destination";
import UpArrowCircleIcon from '../../static/images/arrow-circle-up-solid.png'
import DownArrowCircleIcon from '../../static/images/arrow-circle-down-solid.png'

export default class TripControls extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Col>
        {this.renderDestinationModal()}
        <br/>
        {this.renderBar()}
        <br/>
        {this.renderToBottom()}
        <br/>
        <br/>
        {this.renderDestinations()}
        <br/>
        {this.renderToTop()}
        <br/>
      </Col>
    );
  }


  renderBar() {
    return (
      <Row>
        <Col xs={12}>
          <Input
            type="text"
            className="float-left w-60"
            name="tripname"
            placeholder="Trip Name"
            value={this.props.tripName}
            onChange={e => {this.setName(e.target.value)}}
          />
          <Row className="w-40">
            <SaveTrip places={this.props.destinations} tripData={this.props.loadedTrip}/>
            <LoadTrip createSnackBar={this.props.createSnackBar}
                      loadTripJSON={this.props.loadTripJSON} id="loadtrip"/>
          </Row>
          <br/>
          <Row>
            <Col xs={12} sm={6}>
              <Button color="primary" id="addbtn" className="saveLoad" onClick={() => {
                this.props.toggleDestinationModal()
              }}>Add Stop</Button>
              <Button color="primary" className="saveLoad" onClick={() => {
                this.props.reverseTrip()
              }}>Reverse Trip</Button>
              <Button color="primary" className="saveLoad" onClick={() => {
                this.props.optimizeTrip()
              }}>Optimize</Button>
            </Col>
            <Col xs={12} sm={6}>
              {this.renderTotalDistance()}
              {this.renderRoundTripSwitch()}
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }

  renderDestinations() {
    if(this.props.destinations.length > 0 && this.props.destinationStates.length === this.props.destinations.length) {
      return (
        <div>
          <Container lockAxis="y" dragHandleSelector=".drag-handle"
                     onDrop={this.props.onDrop} behaviour="contain">
            {this.props.destinations.map((item, index) => {
              return (
                <Draggable key={index}>
                  <Destination index={index} removeDestination={this.props.removeDestination}
                               distance={this.props.loadedTrip.distances[index - 1]}
                               destination={item} updateDestination={this.props.updateDestination}
                               destinationState={this.props.destinationStates[index]}
                               toggleCollapse={() => this.props.toggleDestinationCollapse(index)}
                               setIsValidProperty = {(property, value, isValid) =>
                                 this.props.setDestinationIsValidProperty(index, property, value, isValid)}
                               rotateTrip={this.props.rotateTrip}
                  />
                </Draggable>
              );
            })}
          </Container>
        </div>
      );
    }
  }

  renderDestinationModal() {
    return (
      <Modal isOpen={this.props.destinationModal}>
        <ModalHeader>Add Destination</ModalHeader>
        <ModalBody>
          <Row>
            <Col xs={8}>
              <Search createSnackBar={this.props.createSnackBar} serverSettings={this.props.serverSettings} onClickListItem={this.props.addDestination} hasAdvanced={false}/>
            </Col>
            <Col xs={4}><Button color="primary" id="mapbtn" onClick={() => this.addFromMap()}>Add From Map</Button></Col>
          </Row>
          <Fade in={this.props.showNewItem}>
            <ListGroupItem>
              <Col>{this.props.newItem.name}</Col>
              <Col>{this.props.newItem.latitude}, {this.props.newItem.longitude}</Col>
            </ListGroupItem>
          </Fade>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" id="confirmbtn" onClick={this.props.submitDestination}>Confirm</Button>
          <Button onClick={() => {this.props.toggleDestinationModal()}}>Close</Button>
        </ModalFooter>
      </Modal>
    );
  }

  renderRoundTripSwitch() {
    return(
      <FormGroup className="text-right">
        <CustomInput className="text-right" type="switch" id="toggleRoundTrip"  label="Round Trip" onClick={() => this.props.flipRoundTrip()}/>
      </FormGroup>
    )
  }

  renderToTop() {
    if(this.props.destinations.length > 0){
      return (
        <img className="h-25px to-top-bottom" onClick={() => {
          this.props.pageTop.current.scrollIntoView({ behavior: 'smooth' })}}
             src={UpArrowCircleIcon} alt-text="To Top" title="To Top"/>
      );
    }
  }

  renderToBottom() {
    if(this.props.destinations.length > 0){
      return(
        <img className="h-25px to-top-bottom" onClick={() => {
          this.props.pageBottom.current.scrollIntoView({ behavior: 'smooth' })}}
             src={DownArrowCircleIcon} alt-text="To Bottom" title="To Bottom"/>
      );
    }
  }

  renderTotalDistance(){
    if(this.props.isRoundTrip){
      return(
        <p className="text-right"> Round Trip Distance: {this.props.roundTripDistance} {Cookies.get("DistanceUnits")}</p>
      )
    } else {
      return (
        <p className="text-right">Total Distance: {this.props.oneWayDistance} {Cookies.get("DistanceUnits")}</p>
      )
    }
  }

  addFromMap() {
    this.props.toggle('1');
    this.props.toggleDestinationModal();
  }

  setName(e) {
    this.props.setName(e);
  }
}