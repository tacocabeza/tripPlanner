import React, {Component, useState} from 'react';
import {Button, Col, Container, Nav, NavItem, NavLink, Row, TabContent, TabPane} from 'reactstrap';

import {Map, Marker, Popup, TileLayer} from 'react-leaflet';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

import 'leaflet/dist/leaflet.css';

const MAP_BOUNDS = [[-90, -180], [90, 180]];
const MAP_CENTER_DEFAULT = [40.5734, -105.0865];
const MARKER_ICON = L.icon({ iconUrl: icon, shadowUrl: iconShadow, iconAnchor: [12, 40] });
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
    this.recenterMap = this.recenterMap.bind(this);
    this.mapMovement = this.mapMovement.bind(this);

    this.state = {
      markerPosition: null,
      mapCenter: MAP_CENTER_DEFAULT,
      mapZoom: 15,
    };
  }

  setActiveTab(s) {
    this.activeTab = 's';
  }
  render() {


    return (
        <div>
          <Nav tabs>
            <NavItem>
              <NavLink className={this.activeTab === '1' ? 'active' : ''} onClick={() => this.setActiveTab('1')}>
                Map
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink className={this.activeTab === '2' ? 'active' : ''} onClick={() => this.setActiveTab('2')}>
                Search
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={this.activeTab}>
            <TabPane tabId="1">
              <Container>
                <Row>
                  <Col sm={12} md={{size: 10, offset: 1}}>
                    {this.renderLeafletMap()}
                    <Button color="primary" onClick={this.recenterMap}>
                      Recenter
                    </Button>
                  </Col>
                </Row>
              </Container>
            </TabPane>
            <TabPane tabId="2">Tab2</TabPane>
          </TabContent>
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
            center={this.state.mapCenter}
            onClick={this.setMarker}
            onMoveEnd={this.mapMovement}
        >
          <TileLayer url={MAP_LAYER_URL} attribution={MAP_LAYER_ATTRIBUTION}/>
          {this.getMarker()}
        </Map>
    );
  }

  mapMovement(mapMovementInfo){
    this.setState({mapCenter: mapMovementInfo.target.getCenter(), mapZoom: mapMovementInfo.target.getZoom()})
  }

  recenterMap(){
    this.setState({mapCenter: MAP_CENTER_DEFAULT, mapZoom: 15})
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
          <Marker ref={initMarker} position={this.state.markerPosition} icon={MARKER_ICON}>
            <Popup offset={[0, -18]} autoPan={false} className="font-weight-bold">{this.getStringMarkerPosition()}</Popup>
          </Marker>
      );
    }
  }

  getStringMarkerPosition() {
    return this.state.markerPosition.lat.toFixed(2) + ', ' + this.state.markerPosition.lng.toFixed(2);
  }
}
