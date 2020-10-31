import React, { Component } from 'react';
import {Button} from 'reactstrap';
import * as distanceSchema from "../../../schemas/ResponseDistance";
import { isJsonResponseValid, sendServerRequest } from "../../utils/restfulAPI";
import {PROTOCOL_VERSION} from "../../utils/constants";
import Search from './Search.js';
import Navigation from './Navigation.js';
import DistanceForm from './DistanceForm.js';
import Trip from './Trip.js';
import {EARTH_RADIUS_UNITS_DEFAULT} from "../../utils/constants"



export default class Distance extends Component{
  
  constructor(props){
    super(props);
    
    
    this.state={distance:0};

    this.prepareServerRequest=this.prepareServerRequest.bind(this);
    this.processDistanceResponse=this.processDistanceResponse.bind(this);
    
  }
  
  
  render()
  {
    return(
      <div> {this.renderSaveButton()} </div>

    )
  }
  
  renderSaveButton(){
    return(
       <Button color="primary" onClick={() => this.prepareServerRequest()}>Distance</Button>
    )
  }
  
    prepareServerRequest() {
      if(this.props.distanceLocation2) {
          this.requestDistance(this.props.distanceLocation1,this.props.distanceLocation2)
      }
      else if(this.props.distanceLocation1 == null && this.props.distanceLocation2 == null)
      {
          return
      }
      else {
          this.requestDistance(this.props.distanceLocation1,{"lat":this.props.originalMapCenter[0], "lng":this.props.originalMapCenter[1]});
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
                        }, this.props.serverSettings.serverPort)
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
        this.props.onDistanceChange(this.state.distance);
      }
    }


}