import React, { Component } from 'react';
import {Button, Col, Container, InputGroup, Form, FormGroup, Input, Row, TabContent, TabPane, Nav, NavItem, NavLink} from 'reactstrap';

import * as distanceSchema from "../../../schemas/ResponseDistance";
import { getOriginalServerPort, isJsonResponseValid, sendServerRequest } from "../../utils/restfulAPI";
import { LOG } from "../../utils/constants";

import {Map, Marker, Polyline, Popup, TileLayer} from 'react-leaflet';

import icon from 'leaflet/dist/images/marker-icon.png';
import CSUAggieOrangeMarker from '../../static/images/Markers/CSUAggieOrangeMarker.png';
import CSUGoldMarker from '../../static/images/Markers/CSUGoldMarker.png';
import CSUGreenMarker from '../../static/images/Markers/CSUGreenMarker.png';
import CSUReservoirMarker from '../../static/images/Markers/CSUReservoirMarker.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

import 'leaflet/dist/leaflet.css';
import Search from './Search.js';
import Navigation from './Navigation.js';
import DistanceForm from './DistanceForm.js';

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

export default class Atlas extends Component {

  constructor(props) {
    super(props);

    this.setMarker = this.setMarker.bind(this);
    this.setLocation = this.setLocation.bind(this);
    this.getGeolocation = this.getGeolocation.bind(this);
    this.recenterMap = this.recenterMap.bind(this);
    this.mapMovement = this.mapMovement.bind(this);
    this.requestDistance = this.requestDistance.bind(this);
    this.processServerDistanceSuccess = this.processServerDistanceSuccess.bind(this);
    this.onClickListItem = this.onClickListItem.bind(this);
    this.toggle = this.toggle.bind(this);

    this.state = {
      distance: 0,
      markerPosition: null,
      mapCenter: MAP_CENTER_DEFAULT,
      mapLocation: MAP_CENTER_DEFAULT,
      mapZoom: 15,
      location1: null,
      location2: null,
      serverSettings: this.props.serverSettings,
      currentTab: '1',
    };
  }

  componentDidMount() {
    {this.getGeolocation()}
  }

  toggle(tab) {
    if (this.state.currentTab != tab) {
      this.setState({currentTab: tab})
    }
  }

  render() {
    return (
      <div>
        <Container>
          <Row>
            <Col sm={12} md={{size: 10, offset: 1}}>
              <Navigation toggle={this.toggle}/>
              <TabContent activeTab={this.state.currentTab}>
                <TabPane tabId="1">
                  {this.renderLeafletMap()}
                  <Button color="primary" onClick={this.recenterMap}>
                    Recenter
                  </Button>
                  <DistanceForm setLocation={this.setLocation}/>
                  <Col sm={12} md={{size:5, offset:2}}> {this.renderDistance()} </Col>
                </TabPane>
                <TabPane tabId="2">
                  <Search createSnackBar={this.props.createSnackBar}
                          serverSettings={this.state.serverSettings}
                          onClickListItem={this.onClickListItem}/>
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
            center={this.state.mapLocation}
            onClick={this.setMarker}
            onMoveEnd={this.mapMovement}
        >
          <TileLayer url={MAP_LAYER_URL} attribution={MAP_LAYER_ATTRIBUTION}/>
          <Marker position={this.state.mapCenter} icon={GREEN_MARKER_ICON}></Marker>
          {this.getMarker()}
          {this.placeMarker(this.state.location1, AGGIE_MARKER_ICON)}
          {this.placeMarker(this.state.location2, RESERVOIR_MARKER_ICON)}
          {this.getLine()}
        </Map>
    );
  }

  renderDistance() {
    return(
      <InputGroup>
        <Input type="text" value={"Distance: " + this.state.distance + "MI"}  disabled />
      </InputGroup>
    )
  }

  setLocation(location, state) {
    if (location == 1) {
      this.setState({location1: state});
    } else if (location == 2) {
      this.setState({location2: state});
    } else if (location == 3) {
      this.setState({mapLocation: state});
    }
  }

  onClickListItem(lat, lng) {
    this.toggle("1");
    this.setState({location1: [lat, lng]});
    this.setState({mapLocation: [lat, lng]});
  }

  getGeolocation() {
    let self = this;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          const ORIGINAL_COORDS = [position.coords.latitude, position.coords.longitude];
          self.setState({mapCenter: ORIGINAL_COORDS});
          self.setState({mapLocation: ORIGINAL_COORDS});
        }
      );
    }
  }

  placeMarker(location, icon) {
    if (location) {
      return (
        <Marker position={location} icon={icon}></Marker>
      )
    }
  }

  mapMovement(mapMovementInfo){
    this.setState({mapLocation: mapMovementInfo.target.getCenter(), mapZoom: mapMovementInfo.target.getZoom()})
  }

  recenterMap(){
    this.setState({mapLocation: this.state.mapCenter, mapZoom: 15})
  }

  getLine(){
    if(this.state.markerPosition && this.state.mapCenter){
      return(
        <Polyline color="#CC5430" positions={[this.state.markerPosition, this.state.mapCenter]} />
      );
    }
  }

  setMarker(mapClickInfo) {
    this.setState({markerPosition: mapClickInfo.latlng});
    this.requestDistance();
  }

  getMarker() {
    const initMarker = ref => {
      if (ref) {
        ref.leafletElement.openPopup()
      }
    };

    if (this.state.markerPosition) {
      return (
        <Marker ref={initMarker} position={this.state.markerPosition} icon={GOLD_MARKER_ICON}>
          <Popup offset={[0, -18]} autoPan={false} className="font-weight-bold">{this.getStringMarkerPosition()}</Popup>
        </Marker>
      );
    }
  }

  getStringMarkerPosition() {
    return this.state.markerPosition.lat.toFixed(2) + ', ' + this.state.markerPosition.lng.toFixed(2);
  }
  requestDistance() {
    if(this.state.markerPosition){
      sendServerRequest({
                        "requestType"    : "distance",
                        "requestVersion" : 2,
                        "place1"         : {"latitude":  this.state.mapCenter[0].toString(),
                                            "longitude": this.state.mapCenter[1].toString()},
                        "place2"         : {"latitude":  this.state.markerPosition.lat.toString(),
                                            "longitude": this.state.markerPosition.lng.toString()},
                        "earthRadius"    : 3959.0
                      }, this.props.serverPort)
      .then(dist => {
        if (dist) { this.processDistanceResponse(dist.data); }
        else { this.props.createSnackBar("The Request To The Server Failed. Please Try Again Later."); }
      });
    }
  }

  processDistanceResponse(distResponse) {

    if(!isJsonResponseValid(distResponse, distanceSchema)) {
      this.processServerDistanceError("Distance Response Not Valid. Check The Server.");

    } else {
      this.processServerDistanceSuccess(distResponse);
    }
  }

  processServerDistanceSuccess(dist) {
    this.setState({distance: dist.distance});
  }

  processServerDistanceError(message) {
    LOG.error(message);
  }
}