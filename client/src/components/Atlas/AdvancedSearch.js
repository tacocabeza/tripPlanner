import React, { Component } from 'react';
import {Input, InputGroup, ListGroup, ListGroupItem, Modal, ModalBody, ModalFooter, ModalHeader, Button} from "reactstrap";

export default class AdvancedSearch extends Component {
  constructor(props) {
    super(props);

    this.updateAdvancedText = this.updateAdvancedText.bind(this);
    this.updateCountryText = this.updateCountryText.bind(this);
    this.updateTypeText = this.updateTypeText.bind(this);
    this.updateMuniText = this.updateMuniText.bind(this);
    this.showTypes = this.showTypes.bind(this);
    this.showWhere = this.showWhere.bind(this);
    this.addCountry = this.addCountry.bind(this);
    this.addType = this.addType.bind(this);
    this.addMuni = this.addMuni.bind(this);

    this.state = {
      advancedText: "",
      countryText: "",
      typeText: "",
      muniText: "",
      advancedModal: false,
    }
  }

  render() {
    return (
      <Modal isOpen={this.props.modal}>
        <ModalHeader>Advanced Search</ModalHeader>
        <ModalBody>
          <InputGroup>
            <p className="w-100 pt-2 mb-0">Search Text</p>
            <Input placeholder="Search" value={this.state.advancedText} onChange={this.updateAdvancedText}/>
            <p className="w-100 pt-2 mb-0">Filter by Country</p>
            <Input placeholder="Country" value={this.state.countryText} onChange={this.updateCountryText}/>
            <Button color="primary" onClick={this.addCountry}>Add</Button>
            <p className="w-100 pt-2 mb-0">Filter by Type</p>
            <Input placeholder="Type" value={this.state.typeText} onChange={this.updateTypeText}/>
            <Button color="primary" onClick={this.addType}>Add</Button>
            <p className="w-100 pt-2 mb-0">Filter by Municipality</p>
            <Input placeholder="Municipality" value={this.state.muniText} onChange={this.updateMuniText}/>
            <Button color="primary" onClick={this.addMuni}>Add</Button>
          </InputGroup>
          <p className="w-100 pt-2 mb-0">Selected Types</p>
          <ListGroup>
            {this.showTypes()}
          </ListGroup>
          <p className="w-100 pt-2 mb-0">Selected Locations</p>
          <ListGroup>
            {this.showWhere()}
          </ListGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.props.submit}>Search</Button>
          <Button onClick={this.props.closeModal}>Close</Button>
        </ModalFooter>
      </Modal>
    );
  }

  updateAdvancedText(event) {
    this.setState({advancedText: event.target.value});
    this.props.updateAdvancedText(event.target.value);
  }

  updateCountryText(event) {
    this.setState({countryText: event.target.value});
  }

  updateTypeText(event) {
    this.setState({typeText: event.target.value});
  }

  updateMuniText(event) {
    this.setState({muniText: event.target.value});
  }

  showWhere() {
    return (this.props.where.map(result => (
      <ListGroupItem key={result.id}>
        {result}
      </ListGroupItem>
    )));
  }

  showTypes() {
    return (this.props.types.map(result => (
      <ListGroupItem key={result.id}>
        {result}
      </ListGroupItem>
    )));
  }

  addCountry() {
    this.props.addWhere(this.state.countryText);
    this.setState({countryText: ""});
  }

  addType() {
    this.props.addType(this.state.typeText);
    this.setState({typeText: ""});
  }

  addMuni() {
    this.props.addWhere(this.state.muniText);
    this.setState({muniText: ""});
  }
}