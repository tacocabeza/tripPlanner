import React, { Component } from "react";

import { Collapse } from "reactstrap";

import Header from "./Margins/Header";
import Footer from "./Margins/Footer";
import About from "./About/About";
import Atlas from "./Atlas/Atlas";
import Search from "./Atlas/Search"

import { LOG } from "../utils/constants";
import * as configSchema from "../../schemas/ResponseConfig";
import { getOriginalServerPort, isJsonResponseValid, sendServerRequest } from "../utils/restfulAPI";
import {Tabs, Tab} from "react-bootstrap";

export default class Page extends Component {

	constructor(props) {
		super(props);

		this.state = {
			showAbout: false,
			serverSettings: {serverPort: getOriginalServerPort(), serverConfig: null}
		};

		this.toggleAbout = this.toggleAbout.bind(this);
		this.processServerConfigSuccess = this.processServerConfigSuccess.bind(this);

		sendServerRequest({requestType: "config", requestVersion: 2}, this.state.serverSettings.serverPort)
			.then(config => {
				if (config) { this.processConfigResponse(config.data); }
				else { this.props.createSnackBar("The Request To The Server Failed. Please Try Again Later."); }
			});
	}

	render() {
		return (
			<>
				<Header toggleAbout={this.toggleAbout}/>
				{this.renderAbout()}
				<Tabs defaultActiveKey="map" id="tripCo-map">
					<Tab eventKey="map" title="Map">
						{this.renderAtlas()}
					</Tab>
					<Tab eventKey="search" title="Search">
						{this.renderSearch()}
					</Tab>
				</Tabs>
				<Footer
					serverSettings={this.state.serverSettings}
					processServerConfigSuccess={this.processServerConfigSuccess}
				/>
			</>
		);
	}

	renderAbout() {
		return(
			<Collapse isOpen={this.state.showAbout}>
				<About closePage={this.toggleAbout}/>
			</Collapse>
		);
	}

	renderAtlas() {
		return (
			<Collapse isOpen={!this.state.showAbout}>
				<Atlas createSnackBar={this.props.createSnackBar}/>
			</Collapse>
		);
	}

	renderSearch() {
		return (
			<Search serverSettings={this.state.serverSettings}
					createSnackBar={this.props.createSnackBar}/>
		)
	}

	toggleAbout() {
		this.setState({showAbout: !this.state.showAbout});
	}

	processConfigResponse(configResponse) {
		if(!isJsonResponseValid(configResponse, configSchema)) {
			this.processServerConfigError("Configuration Response Not Valid. Check The Server.");
		} else {
			this.processServerConfigSuccess(configResponse);
		}
	}

	processServerConfigSuccess(config, port=this.state.serverSettings.serverPort) {
		LOG.info("Switching to Server:", this.state.serverSettings.serverPort);
		let updatedSettings = { serverConfig: config, serverPort: port };
		this.setState({serverSettings: updatedSettings});
	}

	processServerConfigError(message) {
		LOG.error(message);
		let updatedSettings = Object.assign(this.state.serverSettings);
		updatedSettings.serverConfig = null;
		this.setState({serverSettings: updatedSettings});
		this.props.createSnackBar(message);
	}
}