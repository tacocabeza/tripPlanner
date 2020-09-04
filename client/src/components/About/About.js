import React, {Component} from 'react';

import {Container, Row, Col, Button} from 'reactstrap';

import {CLIENT_TEAM_NAME} from "../../utils/constants";
import alexpic from '../../static/images/alex_portrait.jpg';
import jesuspic from '../../static/images/-jzgcsw_2.jpg';
import nickPic from '../../static/images/NickPicture.jpg';
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
              <div class="member">
                <h4>Nicholas Davidson</h4>
                <img src={nickPic}></img>
                <p>Nicholas Davidson is a junior computer science student at Colorado State University. For the past two summers
                  Nick worked for a small cyber security reseller and manged service provider. Nick is currently
                  focusing on school to improve his knowledge of computer systems and security. A cool fact about him
                  is that he is taller than the average american male according to most articles.</p>
              </div>
              <div class="member">
                <h4>Alex Hooten</h4>
                <img src={alexpic}></img>
                <p>
                  Alex Hooten is currently a junior in computer science at Colorado State University. He has worked as
                  a web developer with Voltage Advertising and Funeral Innovations, using HTML, CSS, PHP, and Javascript
                  extensively. In his free time he likes to watch auto racing, play video games, and drive his 1995 Miata.
                </p>
              </div>
              <div class="member">
                <h4>Member 4</h4>
                <img src=""></img>
                <p>Member 4 Bio</p>
              </div>
              <div class="member">
                <h4>Jesus Garcia</h4>
                <img src={jesuspic}></img>
                <p>Jesus Garcia is a senior computer science student at Colorado State University. This summer
                   Jesus worked on a cyber security project under the guidance of professor Yashwant K. Malaiya. Jesus is currently
                   working on writing a report on his findings. A cool fact about him is that his right hand can't touch his right elbow.</p>
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
