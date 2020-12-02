import React, { Component } from 'react';
import {Input, InputGroup, ListGroup, ListGroupItem, Modal, ModalBody, ModalFooter, ModalHeader, Button} from "reactstrap";
import DeleteIcon from '../../static/images/delete.svg'

export default class AdvancedSearch extends Component {
  constructor(props) {
    super(props);

    this.updateAdvancedText = this.updateAdvancedText.bind(this);
    this.updateCountryText = this.updateCountryText.bind(this);
    this.updateTypeText = this.updateTypeText.bind(this);
    this.updateMuniText = this.updateMuniText.bind(this);
    this.addCountry = this.addCountry.bind(this);
    this.addType = this.addType.bind(this);
    this.addMuni = this.addMuni.bind(this);

    this.state = {
      advancedText: "",
      countryText: "",
      typeText: "",
      muniText: "",
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
            {this.showFilters(this.props.types, this.props.removeType)}
          </ListGroup>
          <p className="w-100 pt-2 mb-0">Selected Locations</p>
          <ListGroup>
            {this.showFilters(this.props.where, this.props.removeWhere)}
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

  showFilters(option, remove) {
    return (option.map((result, index) => (
      <ListGroupItem key={index}>
        {result}
        <Button className="float-right deleteBtn" onClick={() => remove(index)}>
          <img className="h-25px" src={DeleteIcon}/>
        </Button>
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