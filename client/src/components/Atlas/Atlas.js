import React, { Component } from 'react';
import {Button, Col, Container, InputGroup, Input, Row, TabContent, TabPane, Collapse} from 'reactstrap';
import Control from 'react-leaflet-control';

import * as distanceSchema from "../../../schemas/ResponseDistance";
import {PROTOCOL_VERSION} from "../../utils/constants";
import { isJsonResponseValid, sendServerRequest } from "../../utils/restfulAPI";

import {Map, Marker, Polyline, TileLayer} from 'react-leaflet';

import CSUAggieOrangeMarker from '../../static/images/Markers/CSUAggieOrangeMarker.png';
import CSUGoldMarker from '../../static/images/Markers/CSUGoldMarker.png';
import CSUGreenMarker from '../../static/images/Markers/CSUGreenMarker.png';
import CSUReservoirMarker from '../../static/images/Markers/CSUReservoirMarker.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import recenterIcon from '../../static/images/recenter.svg';

import 'leaflet/dist/leaflet.css';
import Search from './Search.js';
import Navigation from './Navigation.js';
import DistanceForm from './DistanceForm.js';
import Trip from './Trip.js';

const MAP_BOUNDS = [[-90, -180], [90, 180]];
const MAP_CENTER_DEFAULT = [40.5734, -105.0865];
const AGGIE_MARKER_ICON = L.icon({ iconUrl: CSUAggieOrangeMarker, shadowUrl: iconShadow, iconAnchor: [12, 40] });
const GOLD_MARKER_ICON = L.icon({ iconUrl: CSUGoldMarker, shadowUrl: iconShadow, iconAnchor: [12, 40] });
const GREEN_MARKER_ICON = L.icon({ iconUrl: CSUGreenMarker, shadowUrl: iconShadow, iconAnchor: [12, 40] });
const RESERVOIR_MARKER_ICON = L.icon({ iconUrl: CSUReservoirMarker, shadowUrl: iconShadow, iconAnchor: [12, 40] });
const MAP_LAYER_ATTRIBUTION = "&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors";
const MAP_LAYER_URL = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const MAP_MIN_ZOOM = 1;
const MAP_MAX_ZOOM = 19;

const mapButtonStyle = {
  color: 'black',
  background: 'white',
  padding: '5px',
}

export default class Atlas extends Component {

  constructor(props) {
    super(props);

    this.setMarkerOnClick = this.setMarkerOnClick.bind(this);
    this.setLocation = this.setLocation.bind(this);
    this.getGeolocation = this.getGeolocation.bind(this);
    this.recenterMap = this.recenterMap.bind(this);
    this.mapMovement = this.mapMovement.bind(this);
    this.searchListItemClick = this.searchListItemClick.bind(this);
    this.toggleTab = this.toggleTab.bind(this);
    this.prepareServerRequest = this.prepareServerRequest.bind(this);
    this.processDistanceResponse = this.processDistanceResponse.bind(this);

    this.state = {
      distance: 0,
      markerPosition: null,
      originalMapCenter: MAP_CENTER_DEFAULT,
      currentMapCenter: MAP_CENTER_DEFAULT,
      mapZoom: 15,
      location1: null,
      location2: null,
      serverSettings: this.props.serverSettings,
      currentTab: '1',
      isDistanceOpen: false,
      isSearchOpen: false,
    };
  }

  componentDidMount() {
    {this.getGeolocation()}
  }

  toggleTab(tab) {
    this.setState({isSearchOpen: false})
    this.setState({isDistanceOpen: false})
    if ((tab == 1 || tab == 2) && this.state.currentTab != tab) {
      this.setState({currentTab: tab})
    } else if (tab == 3 && this.state.currentTab == 1) {
      this.openCollapse(this.state.isDistanceOpen, "distance")
    } else if (tab == 4 && this.state.currentTab == 1) {
      this.openCollapse(this.state.isSearchOpen, "search")
    }
  }

  render() {
    return (
      <div>
        <Container>
          <Row>
            <Col sm={12} md={{size: 10, offset: 1}}>
              <Navigation toggle={this.toggleTab}/>
              <TabContent activeTab={this.state.currentTab}>
                <TabPane tabId="1">
                  <Collapse isOpen={this.state.isDistanceOpen}>
                    <Button color="primary" onClick={this.prepareServerRequest}>
                      Distance
                    </Button>
                    <DistanceForm setLocation={this.setLocation}/>
                    <Col sm={12} md={{size:5, offset:2}}> {this.renderDistance()} </Col>
                  </Collapse>
                  <Collapse isOpen={this.state.isSearchOpen}>
                    <Search createSnackBar={this.props.createSnackBar}
                            serverSettings={this.state.serverSettings}
                            onClickListItem={this.searchListItemClick}/>
                  </Collapse>
                  {this.renderLeafletMap()}
                </TabPane>
                <TabPane tabId="2">
                  <Trip/>
                </TabPane>
              </TabContent>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }

  renderLeafletMap() {
    return (
        <Map
            className={'mapStyle'}
            boxZoom={false}
            useFlyTo={true}
            zoom={this.state.mapZoom}
            minZoom={MAP_MIN_ZOOM}
            maxZoom={MAP_MAX_ZOOM}
            maxBounds={MAP_BOUNDS}
            center={this.state.currentMapCenter}
            onClick={this.setMarkerOnClick}
            onMoveEnd={this.mapMovement}
        >
          <TileLayer url={MAP_LAYER_URL} attribution={MAP_LAYER_ATTRIBUTION}/>
          {this.placeMarker(this.state.originalMapCenter, GREEN_MARKER_ICON)}
          {this.placeMarker(this.state.location1, AGGIE_MARKER_ICON)}
          {this.placeMarker(this.state.location2, RESERVOIR_MARKER_ICON)}
          {this.getLine()}
          <Control position="topleft">
            <Button style={mapButtonStyle} id="recenter" onClick={this.recenterMap}>
              <img style={{height: '23px'}} src={recenterIcon}/>
            </Button>
          </Control>
        </Map>
    );
  }

  openCollapse(isOpen, collapse) {
    if (isOpen) {
      //do nothing
    } else if (collapse == 'distance') {
      this.setState({isDistanceOpen: true})
    } else if (collapse == 'search') {
      this.setState({isSearchOpen: true})
    }
  }

  renderDistance() {
    return(
      <InputGroup>
        <Input type="text" value={"Distance: " + this.state.distance + "MI"} disabled/>
      </InputGroup>
    )
  }

  setLocation(location, state) {
    if (location == 1) {
      this.setState({location2: this.state.location1})
      this.setState({location1: state});
    } else if (location == 2) {
      this.setState({location2: state});
    } else if (location == 3) {
      this.setState({currentMapCenter: state});
    }
  }

  searchListItemClick(lat, lng) {
    this.toggleTab("4");
    this.setState({location2: this.state.location1})
    this.setState({location1: {"lat":lat, "lng":lng}});
    this.setState({currentMapCenter: [lat, lng]});
  }

  getGeolocation() {
    let self = this;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          const ORIGINAL_COORDS = [position.coords.latitude, position.coords.longitude];
          self.setState({originalMapCenter: ORIGINAL_COORDS});
          self.setState({currentMapCenter: ORIGINAL_COORDS});
        }
      );
    }
  }

  mapMovement(mapMovementInfo){
    this.setState({currentMapCenter: mapMovementInfo.target.getCenter(), mapZoom: mapMovementInfo.target.getZoom()})
  }

  recenterMap(){
    this.setState({currentMapCenter: this.state.originalMapCenter, mapZoom: 15})
    this.setState({location1:{"lat": this.state.originalMapCenter[0], "lng":this.state.originalMapCenter[1]}})
  }

  getLine(){
    if(this.state.location2){
      return(
        <Polyline color="#CC5430" positions={[this.state.location2, this.state.location1]} />
      );
    }
    else if (this.state.location1) {
      return(
        <Polyline color="#CC5430" positions={[this.state.location1, this.state.originalMapCenter]} />
      );
    }
  }

  setMarkerOnClick(mapClickInfo) {
    this.setState({location2: this.state.location1})
    this.setState({location1: mapClickInfo.latlng})
  }

  placeMarker(location, icon) {
    if (location) {
      return (
        <Marker position={location} icon={icon}></Marker>
      )
    }
  }

  prepareServerRequest() {
    if(this.state.location2) {
        this.requestDistance(this.state.location1,this.state.location2)
    }
    else {
        this.requestDistance(this.state.location1,{"lat":this.state.originalMapCenter[0], "lng":this.state.originalMapCenter[1]});
    }
  }

  requestDistance(place1,place2) {
      sendServerRequest({
                        "requestType"    : "distance",
                        "requestVersion" : PROTOCOL_VERSION,
                        "place1"         : {"latitude":  place1.lat.toString(),
                                            "longitude": place1.lng.toString()},
                        "place2"         : {"latitude":  place2.lat.toString(),
                                            "longitude": place2.lng.toString()},
                        "earthRadius"    : 3959.0
                      }, this.props.serverPort)
      .then(dist => {
        if (dist) { this.processDistanceResponse(dist.data); }
        else { this.props.createSnackBar("The Request To The Server Failed. Please Try Again Later."); }
      });
  }

  processDistanceResponse(distResponse) {
    if(!isJsonResponseValid(distResponse, distanceSchema)) {
      this.props.createSnackBar("Distance Response Not Valid. Check The Server.");
    } else {
      this.setState({distance: distResponse.distance});
    }
  }

}