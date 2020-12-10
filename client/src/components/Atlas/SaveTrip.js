import React, { Component } from 'react';
import {Button, Input, Modal, ModalBody, ModalHeader, ModalFooter} from "reactstrap";
import {PROTOCOL_VERSION} from "../../utils/constants";
import {fileFormats} from "../../utils/constants";
import {kmlTemplate} from "../../utils/constants";
import {svgTemplate} from "../../utils/constants";
import {downloadFile} from "../../utils/misc";
import {parse} from "json2csv";
import Select from 'react-select';


export default class SaveTrip extends Component {
  constructor(props){
    super(props);

    this.state = {
      isPopUp: false,
      saveName: "",
      fileFormat: ""
    }

  }

  render() {
    return(
      <div className="saveLoad">
        {this.renderSaveButton()}
        {this.renderPopUp()}
      </div>
    );
  }

  renderSaveButton() {
    return(
      <Button color="primary" className="w-100" onClick={() => this.togglePopUp()}>Save</Button>
    )
  }

  renderPopUp() {
    return (
      <Modal isOpen={this.state.isPopUp} toggle={() => this.togglePopUp()}>
        <ModalHeader>
          Save My Trip
        </ModalHeader>
        <ModalBody>
          <Input name="FileName" placeholder="Filename" value={this.state.saveName} onChange={e => this.setState({saveName: e.target.value})}/>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" disabled={!this.state.saveName || !this.state.fileFormat} onClick={() => this.save()}>Save</Button>
          <Button onClick={() => this.setState({isPopUp: false})}>Close</Button>
          <div style={{width: '300px'}}>
            <Select
              menuPlacement="auto"
              menuPosition="fixed"
              placeholder='Save As'
              onChange={this.setFileFormat}
              options ={fileFormats}
            />
          </div>

        </ModalFooter>
      </Modal>
    );
  }

  togglePopUp() {
    this.setState({isPopUp: !this.state.isPopUp});
  }


  loadPlaces() {
    let payload = {
      "options": {
        "title": this.props.tripData.options.title,
        "earthRadius": this.props.tripData.options.earthRadius},
      "places": [],
      "distances": this.props.tripData.distances,
      "requestType": "trip",
      "requestVersion": PROTOCOL_VERSION
    }
    payload.options.earthRadius = this.props.tripData.options.earthRadius
    for(let i = 0; i<this.props.places.length; i++) {
      payload.places.push(this.props.places[i])
    }
    return payload
  }

  setFileFormat = (selectedOptions) => {
      this.setState({fileFormat:selectedOptions.value})
    }

  save() {
    let fileContent = this.loadPlaces()
    var extension = '.'+this.state.fileFormat;

    if(this.state.fileFormat == "json"){
        downloadFile(JSON.stringify(fileContent), this.state.saveName+extension, 'application/json')
    }

    else if(this.state.fileFormat == "csv"){
        const fields = ['name', 'latitude', 'longitude'];
        const opts = { fields };
        let csv = parse(fileContent.places,opts);
        downloadFile(csv, this.state.saveName + extension, 'text/csv');
    }

    else if(this.state.fileFormat == "svg"){
        var svg = svgTemplate;
        let line = ""

        let places = fileContent.places
        for(var i in places){
            var entry = places[i].longitude+","+fileContent.places[i].latitude+" "

            line = line.concat(entry);
        }

        line = line.concat(`" style="fill:none;stroke:red;stroke-width:0.5"/>`)

        svg = svg.concat("\t\t"+line);

        for(var i in fileContent.places){
            let circle = `<circle cx="${fileContent.places[i].longitude}" cy="${fileContent.places[i].latitude}" r="0.75" stroke="black" stroke-width="0.25" fill="black" />`

            svg = svg.concat(circle);
        }

        svg = svg.concat("</g>\n</svg>")

        downloadFile(svg, this.state.saveName+extension, 'image/svg+xml;charset=utf-8');

    }

    else{
        let kml = this.kml()

        downloadFile(kml, this.state.saveName+extension, 'text/kml')
    }
  }

  kml(){

    let fileContent = this.loadPlaces();

    let places = fileContent.places;

    var kml = kmlTemplate;


    let coordinates = "";
    for(var i in places){
      var entry = " "+places[i].longitude+","+places[i].latitude+",0 \n"

      coordinates = coordinates.concat(entry)
    }

    kml = kml.concat("\t\t"+coordinates)

    kml = kml.concat(`    </coordinates>
                    </LineString>
                 </Placemark>
              </Document>
       </kml>`)

    return kml;
  }
}