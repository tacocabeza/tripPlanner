import React, {Component} from 'react';

import {Container, Row, Col, Button, Card, CardImg, CardBody, CardTitle, CardText} from 'reactstrap';

import {CLIENT_TEAM_NAME} from "../../utils/constants";
import alexpic from '../../static/images/alex_portrait.jpg';
import jesuspic from '../../static/images/-jzgcsw_2.jpg';
import nickPic from '../../static/images/NickPicture.jpg';
import suyashpic from '../../static/images/suyash.jpg';
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
            <Row>
              <Col sm={12} md={6} lg={4}>
                <Card>
                  <CardImg top width="100%" src={suyashpic} alt="Portrait of Suyash Hiray"/>
                  <CardBody>
                    <CardTitle><h5>Suyash Hiray</h5></CardTitle>
                    <CardText>
                      Suyash Hiray is a senior computer science student at Colorado State University. He has previous
                      experience with a degree in Physics and work in a NASA funded research lab on cubesats and rockets.
                      Outside of coursework he likes to spend his free time at the gym, playing video games, or watching movies.
                    </CardText>
                  </CardBody>
                </Card>
              </Col>
              <Col sm={12} md={6} lg={4}>
                <Card>
                  <CardImg top width="100%" src={nickPic} alt="Portrait of Nicholas Davidson"/>
                  <CardBody>
                    <CardTitle><h5>Nicholas Davidson</h5></CardTitle>
                    <CardText>
                      Nicholas Davidson is a junior computer science student at Colorado State University. For the past two summers
                      Nick worked for a small cyber security reseller and manged service provider. Nick is currently
                      focusing on school to improve his knowledge of computer systems and security. A cool fact about him
                      is that he is taller than the average american male according to most articles.
                    </CardText>
                  </CardBody>
                </Card>
              </Col>
              <Col sm={12} md={6} lg={4}>
                <Card>
                  <CardImg top width="100%" src={alexpic} alt="Portrait of Alex Hooten"/>
                  <CardBody>
                    <CardTitle><h5>Alex Hooten</h5></CardTitle>
                    <CardText>
                      Alex Hooten is currently a junior in computer science at Colorado State University. He has worked as
                      a web developer with Voltage Advertising and Funeral Innovations, using HTML, CSS, PHP, and Javascript
                      extensively. In his free time he likes to watch auto racing, play video games, and drive his 1995 Miata.
                    </CardText>
                  </CardBody>
                </Card>
              </Col>
              <Col sm={12} md={6} lg={4}>
                <Card>
                  <CardImg top width="100%" src="" alt="Portrait of Member 4"/>
                  <CardBody>
                    <CardTitle><h5>Member 4</h5></CardTitle>
                    <CardText>
                      Member 4 Bio
                    </CardText>
                  </CardBody>
                </Card>
              </Col>
              <Col sm={12} md={6} lg={4}>
                <Card>
                  <CardImg top width="100%" src={jesuspic} alt="Portrait of Jesus Garcia"/>
                  <CardBody>
                    <CardTitle><h5>Jesus Garcia</h5></CardTitle>
                    <CardText>
                      Jesus Garcia is a senior computer science student at Colorado State University. This summer
                      Jesus worked on a cyber security project under the guidance of professor Yashwant K. Malaiya. Jesus is currently
                      working on writing a report on his findings. A cool fact about him is that his right hand can't touch his right elbow.
                    </CardText>
                  </CardBody>
                </Card>
              </Col>
            </Row>
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
