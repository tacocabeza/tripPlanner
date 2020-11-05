import React, { Component } from 'react';
import {Row, Col, Button, Fade, Card} from "reactstrap";
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';

import DeleteIcon from '../../static/images/delete.svg'

export default class Destination extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Fade in={this.props.index > 0} className="text-right">
          Distance: {this.props.distance}mi.
        </Fade>
          <Card style={{ width: '100%', "padding": '10px'}}>
            <Row>
              <Col className="col-1" style={{padding: "0px 0px 0px 10px"}}>
                <DragIndicatorIcon className="drag-handle"/>
              </Col>
              <Col className="text-left">{this.props.name}</Col>
              <Col>
                <Button className="float-right deleteBtn"
                      onClick={() => this.props.removeDestination(this.props.index)}>
                  <img className="h-25px" src={DeleteIcon}/>
                </Button>
            </Col>
          </Row>
        </Card>
    </div>
    );
  }
}