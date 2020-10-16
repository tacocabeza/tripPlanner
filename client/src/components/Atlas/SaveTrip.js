import React, { Component } from 'react';
import {Row, Col, Button, Input, ListGroup, ListGroupItem, Modal, ModalBody, ModalHeader, ModalFooter, Fade} from "reactstrap";
import SaveAlt from '@material-ui/icons/SaveAlt'
import {PROTOCOL_VERSION} from "../../utils/constants";

export default class SaveTrip extends Component
{
    constructor(props){

        super(props);


        this.state = {

            isPopUp: false,
            saveName: ""
        }

    }

    render()
    {
        return(
           <div>
                {this.renderSaveButton()}
                {this.renderPopUp()}

           </div>
        );


    }

    renderSaveButton()
    {


        return(

            <Button color={"info"} onClick={() => this.togglePopUp()}> <SaveAlt/> </Button>

        )

    }

    renderPopUp()
    {
        return (


            <Modal isOpen={this.state.isPopUp} toggle={() => this.togglePopUp()}>
            <ModalHeader>
                Save My Trip
            </ModalHeader>
            <ModalBody>
            <Input name="FileName" placeholder={this.props.tripName} value={this.state.saveName} onChange={e => this.setState({saveName: e.target.value})}/>
            </ModalBody>
            <ModalFooter>
                <Button disabled={!this.state.saveName} onClick={() => this.save()}>Save</Button>
            </ModalFooter>
            </Modal>

        );

    }
    togglePopUp()
    {
        console.log(this.state.isPopUp)
        this.setState({isPopUp: !this.state.isPopUp});
        console.log(this.state.isPopUp)
    }


    loadPlaces()
    {


           let destinations = []
           let payload = {"options": {"title": "", "earthRadius": ""}, "places": [], "distances": [], "requestType": "trip", "requestVersion": PROTOCOL_VERSION}

           payload.options.earthRadius = "3959.0"
           for(var i = 0; i<this.props.places.length; i++)
           {
                payload.places.push(this.props.places[i])
                console.log(payload.places[i])
           }

           return payload
    }

    save()
    {
           let fileContent = this.loadPlaces()

           this.downloadFile(fileContent, this.state.saveName+'.json', 'application/json')

    }



   downloadFile(fileText, fileName, fileType) {
      fileText = JSON.stringify(fileText)
      let file = new Blob([fileText], {type: fileType});
      let a = document.createElement('a'),
      url = URL.createObjectURL(file);
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      setTimeout(function() {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }, 0);
    }



}