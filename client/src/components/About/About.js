import React, {Component} from 'react';

import {Container, Row, Col, Button} from 'reactstrap';

import {CLIENT_TEAM_NAME} from "../../utils/constants";

export default class About extends Component {

    render() {
      return (
        <Container id="about">
          <Row>
            <Col>
              <h2>{CLIENT_TEAM_NAME}</h2>
              <h3>Our Mission</h3>
              <p>Mission statement</p>
              <h3>Our Team</h3>
              <div class="member">
                <h4>Member 1</h4>
                <img src=""></img>
                <p>Member 1 Bio</p>
              </div>
              <div className="member">
                <h4>Member 2</h4>
                <img src=""></img>
                <p>Member 2 Bio</p>
              </div>
              <div className="member">
                <h4>Member 3</h4>
                <img src=""></img>
                <p>Member 3 Bio</p>
              </div>
              <div className="member">
                <h4>Member 4</h4>
                <img src=""></img>
                <p>Member 4 Bio</p>
              </div>
              <div className="member">
                <h4>Member 5</h4>
                <img src=""></img>
                <p>Member 5 Bio</p>
              </div>
            </Col>
            <Col id="closeAbout" xs='auto' >
              <Button color="primary" onClick={this.props.closePage} xs={1}>
                Close
              </Button>
            </Col>
          </Row>
        </Container>
      )
    }
}
