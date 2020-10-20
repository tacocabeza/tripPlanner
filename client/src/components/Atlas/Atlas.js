import React, { Component } from 'react';
import {Button, Col, Container, InputGroup, Input, Row, TabContent, TabPane, Collapse, UncontrolledTooltip, Fade} from 'reactstrap';
import Control from 'react-leaflet-control';

import * as distanceSchema from "../../../schemas/ResponseDistance";
import {PROTOCOL_VERSION} from "../../utils/constants";
import { isJsonResponseValid, sendServerRequest } from "../../utils/restfulAPI";
import {EARTH_RADIUS_UNITS_DEFAULT} from "../../utils/constants"
import {Map, Marker, Polyline, TileLayer, Popup} from 'react-leaflet';

import CSUAggieOrangeMarker from '../../static/images/Markers/CSUAggieOrangeMarker.png';
import CSUGoldMarker from '../../static/images/Markers/CSUGoldMarker.png';
import CSUGreenMarker from '../../static/images/Markers/CSUGreenMarker.png';
import CSUReservoirMarker from '../../static/images/Markers/CSUReservoirMarker.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import recenterIcon from '../../static/images/recenter.svg';
import searchIcon from '../../static/images/search.svg';
import distanceIcon from '../../static/images/distance.svg';
import showMarkerIcon from '../../static/images/showMarkerIcon.svg';
import hideMarkerIcon from '../../static/images/hideMarkerIcon.svg';

import 'leaflet/dist/leaflet.css';
import Search from './Search.js';
import Navigation from './Navigation.js';
import DistanceForm from './DistanceForm.js';
import Trip from './Trip.js';
import {latLngBounds} from "leaflet";
import {IconButton} from "@material-ui/core";

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
const MAP_DEFAULT_ZOOM = 15;

export default class Atlas extends Component {

  constructor(props) {
    super(props);
    this.setMarkerOnClick = this.setMarkerOnClick.bind(this);
    this.setLocation = this.setLocation.bind(this);
    this.setTripLocations = this.setTripLocations.bind(this);
    this.getGeolocation = this.getGeolocation.bind(this);
    this.recenterMap = this.recenterMap.bind(this);
    this.mapMovement = this.mapMovement.bind(this);
    this.checkMapView = this.checkMapView.bind(this);
    this.searchListItemClick = this.searchListItemClick.bind(this);
    this.toggleTab = this.toggleTab.bind(this);
    this.prepareServerRequest = this.prepareServerRequest.bind(this);
    this.processDistanceResponse = this.processDistanceResponse.bind(this);
    this.prepareNewTripAdd = this.prepareNewTripAdd.bind(this);
    this.state = {
      distance: 0,
      originalMapCenter: MAP_CENTER_DEFAULT,
      currentMapCenter: MAP_CENTER_DEFAULT,
      currentMapBounds: null,
      mapZoom: MAP_DEFAULT_ZOOM,
      distanceLocation1: null,
      distanceLocation2: null,
      distanceLocation1Name: null,
      distanceLocation2Name: null,
      tripLocations: [],
      isRoundTrip: false,
      serverSettings: this.props.serverSettings,
      currentTab: '1',
      isDistanceOpen: false,
      isSearchOpen: false,
      tripNewLocation: {location: null, locationName: null},
      showDistanceMarkers: true,
    };
  }

  componentDidMount() {
    {this.getGeolocation()}
  }

  toggleTab(isTab, tab) {
    this.setState({isDistanceOpen: false})
    if (isTab && this.state.currentTab != tab) {
      this.setState({currentTab: tab})
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
                  {this.renderLeafletMap()}
                  <Collapse isOpen={this.state.isDistanceOpen}>
                    <Button color="primary" onClick={this.prepareServerRequest}>
                      Distance
                    </Button>
                    <DistanceForm setLocation={this.setLocation}/>
                    <Col sm={12} md={{size:5, offset:2}}> {this.renderDistance()} </Col>
                  </Collapse>
                </TabPane>
                <TabPane tabId="2">
                  <Trip toggle={this.toggleTab}
                        createSnackBar={this.props.createSnackBar}
                        serverSettings={this.state.serverSettings}
                        setTripLocations={this.setTripLocations}
                        tripNewLocation={this.state.tripNewLocation}/>
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
            bounds={this.state.currentMapBounds}
            center={this.state.currentMapCenter}
            onClick={!this.state.isSearchOpen? this.setMarkerOnClick: null}
            onMoveEnd={this.mapMovement}
            scrollWheelZoom={!this.state.isSearchOpen}
        >
          <TileLayer url={MAP_LAYER_URL} attribution={MAP_LAYER_ATTRIBUTION}/>
          {this.placeMarker(this.state.originalMapCenter, GREEN_MARKER_ICON)}
          {this.placeMarker(this.state.distanceLocation1, AGGIE_MARKER_ICON, this.state.showDistanceMarkers)}
          {this.placeMarker(this.state.distanceLocation2, RESERVOIR_MARKER_ICON, this.state.showDistanceMarkers)}
          {this.renderDistanceLine()}
          {this.renderTripLines()}
          {this.renderMapButton('recenter', recenterIcon, this.recenterMap)}
          {this.renderMapButton('distancebtn', distanceIcon, () => this.setState({isDistanceOpen: !this.state.isDistanceOpen}))}
          {this.renderMapButton('toggleMarkers', hideMarkerIcon, () => this.setState({showDistanceMarkers: !this.state.showDistanceMarkers}))}
          <Control position="topleft">
            <Button id="showAllMarkers" className="mapButton" onClick={this.checkMapView} >
              <img className="h-25px" src={showMarkerIcon}/>
            </Button>
            <UncontrolledTooltip placement="right"  target="showAllMarkers">
              Show All Markers
            </UncontrolledTooltip>
          </Control>
          <Control position="topright">
            <Fade in={this.state.isSearchOpen} className="float-left">
              <Search createSnackBar={this.props.createSnackBar}
                      serverSettings={this.state.serverSettings}
                      onClickListItem={this.searchListItemClick}/>
            </Fade>
            <Button className="float-right mapButton" onClick={() => this.setState({isSearchOpen: !this.state.isSearchOpen})}>
              <img className="h-22px" src={searchIcon}/>
            </Button>
          </Control>
        </Map>
    );
  }

  renderMapButton(id, icon, onClick) {
    return (
      <Control position="topleft">
        <Button id={id} className="mapButton" onClick={onClick}>
          <img className="h-23px" src={icon}/>
        </Button>
      </Control>
    );
  }

  renderTripLines() {
    let lines = []
    for(let i= 0; i < this.state.tripLocations.length - 1; i++){
      lines.push(this.getLine(this.state.tripLocations[i],this.state.tripLocations[i+1],i));
    }

    if(this.state.isRoundTrip){
      let lastIndex = this.state.tripLocations.length -1;
      lines.push(this.getLine(this.state.tripLocations[lastIndex],this.state.tripLocations[0],lastIndex));
    }

    return (<div>{lines}</div>);
  }

  renderDistanceLine(){
    if(this.state.showDistanceMarkers) {
      if (this.state.distanceLocation2) {
        return this.getLine(this.state.distanceLocation2, this.state.distanceLocation1, null);
      } else if (this.state.distanceLocation1) {
        return this.getLine(this.state.distanceLocation1, this.state.originalMapCenter, null);
      }
    }
  }

  getLine(location1, location2, key) {
    if(location1 && location2) {
      return (
          <Polyline color="#CC5430" positions={[location1, location2]} key={key}/>
      );
    }
  }

  setTripLocations(destinations) {
    let newLocations = [];
    for(let i = 0; i < destinations.length; i++){
      newLocations = newLocations.concat({"lat": destinations[i].latitude, "lng":destinations[i].longitude});
    }
    this.setState({tripLocations: newLocations});
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
      this.setState({
        distanceLocation2: this.state.distanceLocation1,
        distanceLocation1: state,
        distanceLocation2Name: this.state.distanceLocation1Name,
        distanceLocation1Name: null
      });
    } else if (location == 2) {
      this.setState({
        distanceLocation2: state,
        distanceLocation2Name: this.state.distanceLocation1Name,
        distanceLocation1Name: null
      });
    } else if (location == 3) {
      this.setState({currentMapCenter: state});
    }
  }

  searchListItemClick(name, lat, lng) {
    this.setState({
      isSearchOpen: false,
      distanceLocation2: this.state.distanceLocation1,
      distanceLocation1: {"lat":lat, "lng":lng},
      currentMapCenter: [lat, lng],
      distanceLocation2Name: this.state.distanceLocation1Name,
      distanceLocation1Name: null
    });
  }

  getGeolocation() {
    let self = this;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          const ORIGINAL_COORDS = [position.coords.latitude, position.coords.longitude];
          self.setState({
            originalMapCenter: ORIGINAL_COORDS,
            currentMapCenter: ORIGINAL_COORDS
          });
        }
      );
    }
  }

  mapMovement(mapMovementInfo){
    this.setState({
      currentMapCenter: mapMovementInfo.target.getCenter(),
      mapZoom: mapMovementInfo.target.getZoom(),
      currentMapBounds: mapMovementInfo.target.getBounds()
    });
  }

  recenterMap(){
    this.setState({
      currentMapCenter: this.state.originalMapCenter,
      mapZoom: MAP_DEFAULT_ZOOM,
      distanceLocation1:{"lat": this.state.originalMapCenter[0], "lng":this.state.originalMapCenter[1]},
      distanceLocation1Name: "Home"
    });
  }

  setMarkerOnClick(mapClickInfo) {
    this.setState({
      distanceLocation2: this.state.distanceLocation1,
      distanceLocation1: mapClickInfo.latlng,
      distanceLocation2Name: this.state.distanceLocation1Name,
      distanceLocation1Name: null
    });
  }

  placeMarker(location, icon, showBoolean = true) {
    if (location && showBoolean) {
      let latitude = location.lat? location.lat: (location[0]? location[0]: 0)
      let longitude = location.lng? location.lng: (location[1]? location[1]: 0)
      return (
        <Marker position={location} icon={icon}>
          <Popup offset={[1, -18]} autoPan={false}>
            {latitude.toFixed(2) + "," + longitude.toFixed(2)}
            <br/>{this.getMarkerLocationName(location)}<br/>
            <IconButton onClick={() => this.prepareNewTripAdd(location,this.getMarkerLocationName(location))}>
              Add to trip
            </IconButton>
          </Popup>
        </Marker>
      )
    }
  }

  prepareNewTripAdd (newLocation, name){
    let formattedLocation = newLocation[0]? [newLocation[0], newLocation[1]]: [newLocation.lat,newLocation.lng]
    if(!this.state.tripNewLocation.location) {
      this.setState({tripNewLocation: {location: formattedLocation, locationName: name}})
    }
    this.toggleTab(true, '2')
  }

  getMarkerLocationName(location) {
    if(location.lat){
      if(location.lat == this.state.distanceLocation1.lat && location.lng == this.state.distanceLocation1.lng){
        return this.state.distanceLocation1Name
      }
      else if(location.lat == this.state.distanceLocation2.lat && location.lng == this.state.distanceLocation2.lng){
        return this.state.distanceLocation2Name
      }
      else{
        return "Unknown Location"
      }
    }
    else {
      return "Home"
    }
  }

  checkMapView(){
    let bound = latLngBounds()
    if(this.state.distanceLocation2) {
      bound.extend(this.state.distanceLocation1)
      bound.extend(this.state.distanceLocation2)
    }
    else if(this.state.distanceLocation1) {
      bound.extend(this.state.distanceLocation1)
      bound.extend(this.state.originalMapCenter)
    }
    else{
      bound.extend(this.state.currentMapCenter)
    }
    if(bound.isValid()) {
      this.setState({currentMapBounds: bound})
    }
  }

  prepareServerRequest() {
    if(this.state.distanceLocation2) {
        this.requestDistance(this.state.distanceLocation1,this.state.distanceLocation2)
    }
    else if(this.state.distanceLocation1 == null && this.state.distanceLocation2 == null)
    {
        return
    }
    else {
        this.requestDistance(this.state.distanceLocation1,{"lat":this.state.originalMapCenter[0], "lng":this.state.originalMapCenter[1]});
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
                        "earthRadius"    : EARTH_RADIUS_UNITS_DEFAULT.miles
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