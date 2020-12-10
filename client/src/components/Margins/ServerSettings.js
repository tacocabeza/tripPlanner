import React, { Component } from "react";
import { Button, Col, Input, Modal, ModalBody, ModalFooter, ModalHeader, Row } from "reactstrap";

import {PROTOCOL_VERSION} from "../../utils/constants";
import { sendServerRequest, isJsonResponseValid } from "../../utils/restfulAPI";
import Select from 'react-select'

import * as configSchema from "../../../schemas/ResponseConfig";

export default class ServerSettings extends Component {

    constructor(props) {
        super(props);

        this.state = {
            inputText: this.props.serverSettings.serverPort,
            validServer: null,
            config: {}
        };;

        this.saveInputText = this.state.inputText;
    }

    render() {
        return (
            <div>
                <Modal isOpen={this.props.isOpen} toggle={() => this.props.toggleOpen()}>
                    <ModalHeader toggle={() => this.props.toggleOpen()}>Server Connection</ModalHeader>
                    {this.renderSettings(this.getCurrentServerName())}
                    {this.renderConfig(this.getCurrentServerSettings())}
                    {this.renderActions()}
                </Modal>
            </div>
        );
    }

    renderConfig(configSettings) {
        let filters = this.getFilters();
        return (
          <ModalBody>
              {this.makeConfigBoxes("requestType", configSettings.requestType)}
              {this.makeConfigBoxes("requestVersion", configSettings.requestVersion)}
              {this.makeConfigBoxes("supportedRequests", configSettings.supportedRequests)}
              {this.renderSelectBoxes("Type", filters.type)}
              {this.renderSelectBoxes("Where", filters.where)}

          </ModalBody>
        );
    }

    renderSelectBoxes(name, filter){

           return (
                  <Row className="m-2">
                    <Col xs={true}>
                        {name}:
                    </Col>
                    <Col xs={true}>
                        <Select options={filter}/>
                    </Col>
                  </Row>
                );


    }

    makeConfigBoxes(name, information) {
        return (
          <Row className="m-2">
            <Col xs={true}>
                {name}:
            </Col>
            <Col xs={true}>
                {information? information.toString(): ""}
            </Col>
          </Row>
        );
    }


    makeSelectBoxes(name, select) {
            return (
              <Row className="m-2">
                <Col xs={true}>
                    {name}:
                </Col>
                <Col xs={true}>
                    {select}
                </Col>
              </Row>
            );
        }

    renderSettings(currentServerName) {
        return (
            <ModalBody>
                <Row className="m-2">
                    <Col xs={true}>
                        Name:
                    </Col>
                    <Col xs={true}>
                        {currentServerName}
                    </Col>
                </Row>
                <Row className="m-2">
                    <Col xs={true}>
                        URL:
                    </Col>
                    <Col xs={true}>
                        {this.renderInputField()}
                    </Col>
                </Row>
            </ModalBody>
        );
    }

    renderInputField() {
        let valid = this.state.validServer === null ? false : this.state.validServer;
        let notValid = this.state.validServer === null ? false : !this.state.validServer;
        return(
            <Input onChange={(e) => this.updateInput(e.target.value)}
                   value={this.state.inputText}
                   placeholder={this.props.serverPort}
                   valid={valid}
                   invalid={notValid}
            />
        );
    }

    renderActions() {
        return (
            <ModalFooter>
                <Button color="primary" onClick={() => this.resetServerSettingsState()}>Cancel</Button>
                <Button color="primary" onClick={() =>
                {
                    this.props.processServerConfigSuccess(this.state.config, this.state.inputText);
                    this.resetServerSettingsState(this.state.inputText);
                }}
                        disabled={!this.state.validServer}
                >
                    Save
                </Button>
            </ModalFooter>
        );
    }

    getCurrentServerName() {
        let currentServerName = this.props.serverSettings.serverConfig && this.state.validServer === null ?
                                this.props.serverSettings.serverConfig.serverName : "";
        if (this.state.config && Object.keys(this.state.config).length > 0) {
            currentServerName = this.state.config.serverName;
        }
        return currentServerName;
    }

    getFilters(){

        let where = []
        let type = []


        try{


            let narrow = this.props.serverSettings.serverConfig.filters;

            for(var i in narrow.type){
                type.push({label: narrow.type[i], value: narrow.type[i]});
            }


            for(var i in narrow.where){
                where.push({label: narrow.where[i], value: narrow.where[i]})
            }


        } catch(error){
            console.log("")
        }


        let filters = {type:type, where:where}
        return filters;

    }
    getCurrentServerSettings() {
        let currentConfigSettings = this.props.serverSettings.serverConfig && this.state.validServer === null ?
          {requestType: this.props.serverSettings.serverConfig.requestType,
              requestVersion:  this.props.serverSettings.serverConfig.requestVersion,
          supportedRequests: this.props.serverSettings.serverConfig.supportedRequests} :
          {requestVersion: "", requestType: "", supportedRequests: []};
        if (this.state.config && Object.keys(this.state.config).length > 0) {
            currentConfigSettings = {requestVersion: this.state.config.requestVersion,
                                     requestType: this.state.config.requestType,
                                     supportedRequests: this.state.config.supportedRequests};
        }
        return currentConfigSettings;
    }

    updateInput(value) {
        this.setState({inputText: value}, () => {
            if (this.shouldAttemptConfigRequest(value)) {
                sendServerRequest({requestType: "config", requestVersion: PROTOCOL_VERSION}, value)
                    .then(config => {
                        if (config) { this.processConfigResponse(config.data) }
                        else { this.setState({validServer: true, config: config}); }
                    });
            } else {
                this.setState({validServer: false, config: {}});
            }
        });
    }

    shouldAttemptConfigRequest(resource) {
        const urlRegex = /https?:\/\/.+/;
        return resource.match(urlRegex) !== null && resource.length > 15;
    }

    processConfigResponse(config) {
        if(!isJsonResponseValid(config, configSchema)) {
            this.setState({validServer: false, config: false});
        } else {
            this.setState({validServer: true, config: config});
        }
    }

    resetServerSettingsState(inputText=this.saveInputText) {
        this.props.toggleOpen();
        this.setState({
            inputText: inputText,
            validServer: null,
            config: false
        });
    }
}
