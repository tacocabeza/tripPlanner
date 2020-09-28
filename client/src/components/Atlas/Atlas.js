import React, { Component } from 'react';
import {Button, Col, Container, Form, FormGroup, Input, Row} from 'reactstrap';

import {Map, Marker, Polyline, Popup, TileLayer} from 'react-leaflet';

import icon from 'leaflet/dist/images/marker-icon.png';
import CSUAggieOrangeMarker from '../../static/images/Markers/CSUAggieOrangeMarker.png';
import CSUGoldMarker from '../../static/images/Markers/CSUGoldMarker.png';
import CSUGreenMarker from '../../static/images/Markers/CSUGreenMarker.png';
import CSUReservoirMarker from '../../static/images/Markers/CSUReservoirMarker.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

import 'leaflet/dist/leaflet.css';
import {Tab, Tabs} from "react-bootstrap";
import Search from '../Search/Search.js';

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
  activeTab;

  constructor(props) {
    super(props);

    this.activeTab = '1';
    this.setMarker = this.setMarker.bind(this);
    this.getGeolocation = this.getGeolocation.bind(this);
    this.recenterMap = this.recenterMap.bind(this);
    this.mapMovement = this.mapMovement.bind(this);

    this.state = {
      markerPosition: null,
      mapCenter: MAP_CENTER_DEFAULT,
      mapLocation: MAP_CENTER_DEFAULT,
      mapZoom: 15,
    };
  }

  componentDidMount() {
    {this.getGeolocation()}
  }


  render() {


    return (
        <div>
          <Container>
            <Row>
              <Col sm={12} md={{size: 10, offset: 1}}>
                <Tabs defaultActiveKey="map" id="tripCo-map">
                  <Tab eventKey="map" title="Map">
                    {this.renderLeafletMap()}
                    <Button color="primary" onClick={this.recenterMap}>
                      Recenter
                    </Button>
                    {this.renderFindDistance()}
                  </Tab>
                  <Tab eventKey="search" title="Search">
                    {this.renderSearch()}
                  </Tab>
                </Tabs>
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
          {this.getLine()}
        </Map>
    );
  }

  renderFindDistance() {
    return (
      <Form onSubmit={this.submitCoords()}>
        <Row form>
          <p>
            Enter one set of coordinates in the Location 1 box to go to that location on the map,
            or two sets to find the distance between the two points
          </p>
          <Col md={5}>
            <FormGroup>
              <Input
                type="text"
                name="location1"
                id="location1"
                placeholder="Location 1"
                value={this.state.location1}
                onChange={e => this.setState({location1: e.target.value})}
              />
            </FormGroup>
          </Col>
          <Col md={5}>
            <FormGroup>
              <Input
                type="text"
                name="location2"
                id="location2"
                placeholder="Location 2"
                value={this.state.location2}
                onChange={e => this.setState({location2: e.target.value})}
              />
            </FormGroup>
          </Col>
          <Col md={2}>
            <Button onClick={this.submitCoords()}>Go!</Button>
          </Col>
        </Row>
      </Form>
    )
  }

  renderSearch() {
    return (
      <Search/>
    )
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

  submitCoords() {
    this.setState({mapLocation: });
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
        <Polyline color="Red" positions={[this.state.markerPosition, this.state.mapCenter]} />
      );
    }
  }

  setMarker(mapClickInfo) {
    this.setState({markerPosition: mapClickInfo.latlng});
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
}
