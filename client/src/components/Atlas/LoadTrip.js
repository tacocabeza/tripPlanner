import React, { Component } from 'react';
import {Button, Input, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import {isJsonResponseValid} from "../../utils/restfulAPI";
import * as tripFile from "../../../schemas/TripFile.json";
import {EMPTY_TRIP} from "../../utils/constants";

export default class LoadTrip extends Component {
  constructor(props){
    super(props);

    this.state = {
      loadModal: false,
      loadedFile: EMPTY_TRIP
    }

  }

  render() {
    return (
      <div>
        <Button color="primary" id="loadbtn" className="saveLoad"
                onClick={() => {this.setState({loadModal: true});}}>Load</Button>
        {this.renderLoadModal()}
      </div>
    );
  }

  renderLoadModal() {
    return (
      <Modal isOpen={this.state.loadModal}>
        <ModalHeader>Load Trip</ModalHeader>
        <ModalBody>
          <Input type='file' id="fileinput" onChange={(event) => {this.processFile(event.target.files)}} />
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => this.loadFile()}>Load</Button>
          <Button onClick={() => {this.setState({loadModal: false})}}>Close</Button>
        </ModalFooter>
      </Modal>
    )
  }

  processFile(files) {
    let self = this;
    let fr = new FileReader();
    fr.readAsText(files[0]);
    fr.onload = function(event) {
      let parsedFile
      try {
        parsedFile = JSON.parse(fr.result)
      } catch (e) {
        self.props.createSnackBar("This file is not valid (cannot be parsed as a JSON)")
      }
      self.setState({loadedFile: parsedFile});
    };
  }

  loadFile() {
    if(!isJsonResponseValid(this.state.loadedFile, tripFile)) {
      this.props.createSnackBar("This file is not valid");
    } else {
      this.props.loadTripJSON(this.state.loadedFile);
      this.setState({loadModal: false});
    }
  }

}