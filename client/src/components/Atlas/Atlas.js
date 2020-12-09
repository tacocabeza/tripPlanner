import React, { Component } from 'react';
import Cookies from 'js-cookie';
import {Button, Col, Container, Row, TabContent, TabPane, Fade, Collapse, InputGroup, Input} from 'reactstrap';
import Control from 'react-leaflet-control';

import {Map, Marker, Polyline, TileLayer, Popup, LayersControl} from 'react-leaflet';
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
import Distance from './Distance.js';
import Trip from './Trip.js';
import {latLngBounds} from "leaflet";
import {IconButton} from "@material-ui/core";

const MAP_BOUNDS = [[-90, -180], [90, 180]];
const MAP_CENTER_DEFAULT = [40.5734, -105.0865];
const AGGIE_MARKER_ICON = L.icon({ iconUrl: CSUAggieOrangeMarker, shadowUrl: iconShadow, shadowSize: [25,40], iconAnchor: [12, 40], iconSize: [25,40] });
const GOLD_MARKER_ICON = L.icon({ iconUrl: CSUGoldMarker, shadowUrl: iconShadow, shadowSize: [25,40], iconAnchor: [12, 40], iconSize: [25,40] });
const GREEN_MARKER_ICON = L.icon({ iconUrl: CSUGreenMarker, shadowUrl: iconShadow, shadowSize: [25,40], iconAnchor: [12, 40], iconSize: [25,40] });
const RESERVOIR_MARKER_ICON = L.icon({ iconUrl: CSUReservoirMarker, shadowUrl: iconShadow, shadowSize: [25,40], iconAnchor: [12, 40], iconSize: [25,40] });
const AGGIE_MARKER_ICON_S = L.icon({ iconUrl: CSUAggieOrangeMarker, shadowUrl: iconShadow, shadowSize: [12,20], iconAnchor: [6, 20], iconSize: [12,20] });
const GOLD_MARKER_ICON_S = L.icon({ iconUrl: CSUGoldMarker, shadowUrl: iconShadow, shadowSize: [12,20], iconAnchor: [6, 20], iconSize: [12,20] });
const GREEN_MARKER_ICON_S = L.icon({ iconUrl: CSUGreenMarker, shadowUrl: iconShadow, shadowSize: [12,20], iconAnchor: [6, 20], iconSize: [12,20]});
const RESERVOIR_MARKER_ICON_S = L.icon({ iconUrl: CSUReservoirMarker, shadowUrl: iconShadow, shadowSize: [12,20], iconAnchor: [6, 20], iconSize: [12,20] });
const MAP_LAYER_ATTRIBUTION = "&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors";
const MAP_LAYER_URL = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const MAP_MIN_ZOOM = 1;
const MAP_MAX_ZOOM = 19;
const MAP_DEFAULT_ZOOM = 15;
const CANYON = "#cc5430";
const ALFALFA = "#C9D845";
const DARK_SLATE = "#105456";
const RESERVOIR = "#12A4B6";
const SUNSHINE = "#ECC530";

export default class Atlas extends Component {

  constructor(props) {
    super(props);
    this.flipRoundTrip = this.flipRoundTrip.bind(this);
    this.getGeolocation = this.getGeolocation.bind(this);
    this.mapMovement = this.mapMovement.bind(this);
    this.prepareNewTripAdd = this.prepareNewTripAdd.bind(this);
    this.recenterMap = this.recenterMap.bind(this);
    this.searchListItemClick = this.searchListItemClick.bind(this);
    this.setMarkerOnClick = this.setMarkerOnClick.bind(this);
    this.setTripLocations = this.setTripLocations.bind(this);
    this.setDistance = this.setDistance.bind(this);
    this.showAllMarkers = this.showAllMarkers.bind(this);
    this.toggleMarkers = this.toggleMarkers.bind(this);
    this.toggleTab = this.toggleTab.bind(this);
    this.reverseGeocoder = this.reverseGeocoder.bind(this);
    this.parentCallback = this.parentCallback.bind(this);

    this.state = {
      currentMapBounds: null,
      currentMapCenter: MAP_CENTER_DEFAULT,
      currentTab: '1',
      distance: 0,
      distanceLocation1: null,
      distanceLocation2: null,
      distanceLocation1Name: '',
      distanceLocation2Name: '',
      isDistanceOpen: false,
      isRoundTrip: false,
      isSearchOpen: false,
      mapZoom: MAP_DEFAULT_ZOOM,
      originalMapCenter: MAP_CENTER_DEFAULT,
      serverSettings: this.props.serverSettings,
      showMarkers: true,
      showLines: true,
      tripLocations: [],
      tripNewLocation: {location: null, locationName: ''},
      justClicked: false,
      tripLineColor: CANYON,
      tripMarkerIcon: AGGIE_MARKER_ICON,
      tripLineSize: 5,
      tripMarkerSize: 1,
      oneWay: 0,
      roundTrip: 0,
      geocode: ""
    };
  }

  parentCallback (oneway, roundtrip)  {
    this.setState({oneWay: oneway, roundTrip: roundtrip})
  }

  componentDidMount() {
    {this.getGeolocation()}
  }

  render() {
    return (
      <Container>
        <Row>
          <Col sm={12} md={{size: 10, offset: 1}}>
            <Navigation toggle={this.toggleTab}/>
            <TabContent activeTab={this.state.currentTab}>
              <TabPane tabId="1">
                {this.renderLeafletMap()}
                {this.renderTotalDistance()}
              </TabPane>
              <TabPane tabId="2">
                <Trip toggle={this.toggleTab}
                      createSnackBar={this.props.createSnackBar}
                      serverSettings={this.state.serverSettings}
                      setTripLocations={this.setTripLocations}
                      tripNewLocation={this.state.tripNewLocation}
                      isRoundTrip={this.state.isRoundTrip}
                      flipRoundTrip={this.flipRoundTrip}
                      pageTop={this.props.pageTop}
                      pageBottom={this.props.pageBottom}
                      totalDistance={this.state.totalDistance}
                      updateDist={this.updateDist}
                      parentCallback={this.parentCallback}/>
              </TabPane>
              <TabPane tabId="3">
                {this.renderSelectors()}
                {this.renderDistanceUnitOptions()}
              </TabPane>
            </TabContent>
          </Col>
        </Row>
      </Container>
    );
  }

  renderSelectors() {
    return (
      <div>
        Marker Color:
        <IconButton size={"small"}onClick={() => this.setState({tripMarkerIcon: AGGIE_MARKER_ICON})}><img className="lgIcon" src={CSUAggieOrangeMarker}/></IconButton>
        <IconButton size={"small"}onClick={() => this.setState({tripMarkerIcon: GOLD_MARKER_ICON})}><img className="lgIcon" src={CSUGoldMarker}/></IconButton>
        <IconButton size={"small"}onClick={() => this.setState({tripMarkerIcon: GREEN_MARKER_ICON})}><img className="lgIcon" src={CSUGreenMarker}/></IconButton>
        <IconButton size={"small"}onClick={() => this.setState({tripMarkerIcon: RESERVOIR_MARKER_ICON})}><img className="lgIcon" src={CSUReservoirMarker}/></IconButton>
        <br/>
        Marker Size:
        <IconButton size={"small"} onClick={() => this.setState({tripMarkerSize:  1})}><img className="lgIcon" src={CSUAggieOrangeMarker}/></IconButton>
        <IconButton size={"small"} onClick={() => this.setState({tripMarkerSize: 0})}><img className="smIcon" src={CSUAggieOrangeMarker}/></IconButton>
        <br/>
        Line Color:
        <IconButton size={"small"} onClick={() => this.setState({tripLineColor: CANYON})}><p className="canyon">Canyon</p></IconButton>
        <IconButton size={"small"} onClick={() => this.setState({tripLineColor: ALFALFA})}><p className="alfalfa">Alfalfa</p></IconButton>
        <IconButton size={"small"} onClick={() => this.setState({tripLineColor: DARK_SLATE})}><p className="darkslate">Dark Slate</p></IconButton>
        <IconButton size={"small"} onClick={() => this.setState({tripLineColor: RESERVOIR})}><p className="reservoir">Reservoir</p></IconButton>
        <IconButton size={"small"} onClick={() => this.setState({tripLineColor: SUNSHINE})}><p className="sunshine">Sunshine</p></IconButton>
        <br/>
        Line Size: {this.state.tripLineSize}
        <IconButton size={"small"} onClick={() => this.setState({tripLineSize: this.state.tripLineSize + 1})}>+</IconButton>
        <IconButton size={"small"} onClick={() => this.state.tripLineSize > 0 ? this.setState({tripLineSize: this.state.tripLineSize - 1}): null}>-</IconButton>
      </div>
    );
  }

  renderDistanceUnitOptions() {
    return (<div>
      <InputGroup>
        <Input placeholder={Cookies.get("EarthRadius")} onChange={(e) => {Cookies.set("EarthRadius", e.target.value)}}/>
        <Input placeholder={Cookies.get("DistanceUnits")} onChange={(e) => {Cookies.set("DistanceUnits", e.target.value)}}/>
      </InputGroup>
    </div>);
  }

  renderTotalDistance(){
    if(this.state.isRoundTrip){
      return(
          <p className="text-left"> Total Trip Distance: {this.state.roundTrip} {Cookies.get("DistanceUnits")}</p>
      )
    } else {
      return (
          <p className="text-left"> Total Trip Distance: {this.state.oneWay} {Cookies.get("DistanceUnits")}</p>
      )
    }
  }

  updateDist(totalDist) {
    this.setState({totalDistance: totalDist});
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
          <LayersControl position={"bottomleft"}>
            <LayersControl.BaseLayer checked name="Satellite">
              <TileLayer url="https://api.maptiler.com/maps/hybrid/{z}/{x}/{y}.jpg?key=yscl6YbzzR4qnvBp5rwW" attribution={MAP_LAYER_ATTRIBUTION}/>
            </LayersControl.BaseLayer>
            <LayersControl.BaseLayer checked name="Topographical">
              <TileLayer url="https://api.maptiler.com/maps/topo/{z}/{x}/{y}.png?key=yscl6YbzzR4qnvBp5rwW" attribution={MAP_LAYER_ATTRIBUTION}/>
            </LayersControl.BaseLayer>
            <LayersControl.BaseLayer checked name="Streets">
              <TileLayer url="https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=yscl6YbzzR4qnvBp5rwW" attribution={MAP_LAYER_ATTRIBUTION}/>
            </LayersControl.BaseLayer>
            <LayersControl.BaseLayer checked name="Base">
              <TileLayer url={MAP_LAYER_URL} attribution={MAP_LAYER_ATTRIBUTION}/>
            </LayersControl.BaseLayer>
          </LayersControl>
          {this.placeMarker(this.state.originalMapCenter, GREEN_MARKER_ICON, this.state.tripMarkerSize,true, "home")}
          {this.placeMarker(this.state.distanceLocation1, GOLD_MARKER_ICON, this.state.tripMarkerSize,true, "loc1")}
          {this.placeMarker(this.state.distanceLocation2, RESERVOIR_MARKER_ICON, this.state.tripMarkerSize,true, "loc2")}
          {this.renderDistanceLine()}
          {this.renderTripLines()}
          {this.renderTripMarkers()}
          {this.renderMapControls()}
        </Map>
    );
  }

  renderMapControls() {
    return (
      <div>
        {this.renderMapButton('recenter', recenterIcon, this.recenterMap, "Recenter Map")}
        {this.renderMapButton('distancebtn', distanceIcon, () => this.setState({isDistanceOpen: !this.state.isDistanceOpen}), "Open Distance")}
        {this.renderMapButton('toggleMarkers', hideMarkerIcon, this.toggleMarkers,"Show / Hide Markers and Lines")}
        {this.renderMapButton('showAllMarkers', showMarkerIcon, this.showAllMarkers, "Show All Markers")}
        <Control position="topright">
          <Collapse isOpen={this.state.isSearchOpen} className="float-left">
            <Search createSnackBar={this.props.createSnackBar}
                    serverSettings={this.state.serverSettings}
                    onClickListItem={this.searchListItemClick}
                    hasAdvanced={true}/>
          </Collapse>
          <Button className="float-right mapButton" onClick={() => this.setState({isSearchOpen: !this.state.isSearchOpen})}>
            <img className="h-22px" alt="search icon" src={searchIcon}/>
          </Button>
        </Control>
      </div>
    );
  }

  renderMapButton(id, icon, onClick, hoverText) {
    return (
      <Control position="topleft">
        <Button id={id} className="mapButton" onClick={onClick} title={hoverText}>
          <img className="h-23px" alt={hoverText} src={icon}/>
        </Button>
      </Control>
    );
  }

  renderTripMarkers() {
    let markers = []
    for(let i = 0; i<this.state.tripLocations.length; i++){
      markers.push(this.placeMarker(this.state.tripLocations[i], this.state.tripMarkerIcon, this.state.tripMarkerSize, this.state.showMarkers, i))
    }
    return (<div> {markers} </div>);
  }

  renderTripLines() {
    let lines = []
    for(let i= 0; i < this.state.tripLocations.length - 1; i++){
      lines.push(this.getLine(this.state.tripLocations[i],this.state.tripLocations[i+1],this.state.tripLineColor,this.state.tripLineSize,i));
    }
    if(this.state.isRoundTrip){
      let lastIndex = this.state.tripLocations.length -1;
      lines.push(this.getLine(this.state.tripLocations[lastIndex],this.state.tripLocations[0],this.state.tripLineColor,this.state.tripLineSize,lastIndex));
    }
    if (this.state.showLines) {
      return (<div>{lines}</div>);
    }
  }

  renderDistanceLine(){
    if (this.state.distanceLocation2) {
      return (
        <div>
          {this.getLine(this.state.distanceLocation2, this.state.distanceLocation1, CANYON, this.state.tripLineSize,null)}
        </div>
      );
    } else if (this.state.distanceLocation1) {
      return (
        <div>
          {this.getLine(this.state.distanceLocation1, this.state.originalMapCenter, CANYON, this.state.tripLineSize,null)}
        </div>
      );
    }
  }

  renderDistance() {
    return(
      <Distance distanceLocation1={this.state.distanceLocation1}
                distanceLocation2={this.state.distanceLocation2}
                originalMapCenter={this.state.originalMapCenter}
                serverSettings={this.state.serverSettings}
                onDistanceChange={this.setDistance}
                createSnackBar={this.props.createSnackBar}
                isDistanceOpen={this.state.isDistanceOpen}/>
    )
  }

  placeMarker(location, icon, size, showBoolean = true, key= 0) {
    let newIcon = icon
    if (icon == AGGIE_MARKER_ICON) {
      newIcon = this.state.tripMarkerSize==0? AGGIE_MARKER_ICON_S : AGGIE_MARKER_ICON
    } else if (icon == GREEN_MARKER_ICON) {
      newIcon = this.state.tripMarkerSize==0? GREEN_MARKER_ICON_S : GREEN_MARKER_ICON
    } else if (icon == GOLD_MARKER_ICON) {
      newIcon = this.state.tripMarkerSize==0? GOLD_MARKER_ICON_S : GOLD_MARKER_ICON
    } else {
      newIcon = this.state.tripMarkerSize==0? RESERVOIR_MARKER_ICON_S : RESERVOIR_MARKER_ICON
    }
    if (location && showBoolean) {
      let latitude = location.lat? location.lat: (location[0]? location[0]: 0);
      let longitude = location.lng? location.lng: (location[1]? location[1]: 0);
      const initMarker = ref => {
        if (ref && location === this.state.distanceLocation1 && this.state.justClicked) {
          ref.leafletElement.openPopup()
          this.setState({justClicked: false})
        }
      };
      return (
        <Marker position={location} icon={newIcon} key={key} ref={initMarker}>
          <Popup offset={[1, -18]} autoPan={false}>
            <a>{this.getMarkerLocationName(location)}</a>

            <br/>{ parseFloat(latitude).toFixed(2) + "," + parseFloat(longitude).toFixed(2)}<br/>

            <IconButton onClick={() => this.prepareNewTripAdd(location,this.getMarkerLocationName(location))} size={'small'}>
              Add to trip
            </IconButton>
          </Popup>
        </Marker>
      )
    }
  }

  setMarkerOnClick(mapClickInfo) {
    let distanceLocation = mapClickInfo.latlng
    if(distanceLocation.lng > 180) {
      distanceLocation.lng = distanceLocation.lng - 360
    } else if (distanceLocation.lng < -180) {
      distanceLocation.lng = distanceLocation.lng + 360
    }

    this.reverseGeocoder(distanceLocation.lat, distanceLocation.lng);
    this.setState({
      distanceLocation2: this.state.distanceLocation1,
      distanceLocation1: distanceLocation,
      distanceLocation2Name: this.state.distanceLocation1Name,
      distanceLocation1Name: '',
      justClicked: true
    });
  }

  setTripLocations(destinations) {
    let newLocations = [];
    for(let i = 0; i < destinations.length; i++){
      newLocations = newLocations.concat({"lat": destinations[i].latitude, "lng":destinations[i].longitude, "name":destinations[i].name});
    }
    this.setState({tripLocations: newLocations});
  }

  prepareNewTripAdd (newLocation, name){
    let formattedLocation = newLocation[0]? [newLocation[0], newLocation[1]]: [newLocation.lat,newLocation.lng]
    if(!this.state.tripNewLocation.location) {
      this.setState({tripNewLocation: {location: formattedLocation, locationName: name}})
    }
    this.toggleTab('2')
  }

  toggleMarkers() {
    if (this.state.showMarkers && this.state.showLines) {
      this.setState({showMarkers: false});
    } else if (!this.state.showMarkers && this.state.showLines) {
      this.setState({showLines: false});
    } else {
      this.setState({
        showMarkers: true,
        showLines: true
      });
    }
  }

  getLine(location1, location2, lineColor, lineSize, key) {
    let isDistance = this.state.isDistanceOpen && ((location1 === this.state.distanceLocation2 && location2 === this.state.distanceLocation1) || (location1 === this.state.distanceLocation1 && location2 === this.state.originalMapCenter))
    const initPolyLine = ref => {
      if (ref && isDistance) {
        ref.leafletElement.openPopup()
      }
    };
    if(location1 && location2) {
      return (
        <Polyline color={lineColor} weight={lineSize} positions={[location1, location2]} key={key} interactive={false} ref={initPolyLine}>
          {isDistance? this.renderDistance(): null}
        </Polyline>
      );
    }
  }

  searchListItemClick(name, lat, lng) {
    this.setState({
      isSearchOpen: false,
      distanceLocation2: this.state.distanceLocation1,
      distanceLocation1: {"lat":lat, "lng":lng ,"name":name},
      currentMapCenter: [lat, lng],
      distanceLocation2Name: this.state.distanceLocation1Name,
      distanceLocation1Name: ''
    });
  }

  getMarkerLocationName(location) {
    let index = this.state.tripLocations.indexOf(location)
    if(index !== -1) {
      return this.state.tripLocations[index].name;
    }
    else if(this.state.geocode != "") {
        return this.state.geocode
    }
    else {
      return "Home"
    }
  }

  reverseGeocoder(lat,lng){
   fetch(`https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/reverseGeocode?f=pjson&langCode=EN&location=${lng},${lat}`)
     .then(res => res.json())
     .then(myJson => {
       this.setState({geocode:myJson.address.LongLabel})
     }).catch((error)=>{
        console.log(error);
        this.setState({geocode:""})
        });
     }



  showAllMarkers(){
    let bound = latLngBounds()
    bound.extend(this.state.distanceLocation2)
    bound.extend(this.state.originalMapCenter)
    bound.extend(this.state.distanceLocation1)
    for (let i = 0; i < this.state.tripLocations.length; i++ ){
      bound.extend(this.state.tripLocations[i])
    }
    if(bound.isValid()) {
      this.setState({currentMapBounds: bound})
    }
  }

  setDistance(dist){
    this.setState({distance:dist})
  }

  flipRoundTrip() {
    this.setState({isRoundTrip: !this.state.isRoundTrip})
  }

  recenterMap(){
    this.setState({
      currentMapCenter: this.state.originalMapCenter,
      mapZoom: MAP_DEFAULT_ZOOM,
      currentMapBounds: null,
    });
  }

  mapMovement(mapMovementInfo){
    this.setState({
      currentMapCenter: mapMovementInfo.target.getCenter(),
      mapZoom: mapMovementInfo.target.getZoom(),
      currentMapBounds: mapMovementInfo.target.getBounds()
    });
  }

  getGeolocation() {
    let self = this;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          const ORIGINAL_COORDS = [position.coords.latitude, position.coords.longitude];
          if (Math.abs(ORIGINAL_COORDS[0]) <= 90 && Math.abs(ORIGINAL_COORDS[1]) <= 180) {
            self.setState({
              originalMapCenter: ORIGINAL_COORDS,
              currentMapCenter: ORIGINAL_COORDS
            });
          }
        }
      );
    }
  }

  toggleTab(tab) {
    this.setState({isDistanceOpen: false})
    if (this.state.currentTab !== tab) {
      this.setState({currentTab: tab})
    }
  }
}