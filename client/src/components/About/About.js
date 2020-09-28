import React, {Component} from 'react';

import {Container, Row, Col, Button, Card, CardImg, CardBody, CardTitle, CardText} from 'reactstrap';

import {ALEX_BIO} from "../../utils/constants";
import {SUYASH_BIO} from "../../utils/constants";
import {NICK_BIO} from "../../utils/constants";
import {PRESTON_BIO} from "../../utils/constants";
import {JESUS_BIO} from "../../utils/constants";


import {CLIENT_TEAM_NAME} from "../../utils/constants";
import alexpic from '../../static/images/alex_portrait_square.jpg';
import jesuspic from '../../static/images/-jzgcsw_2_square.jpg';
import nickPic from '../../static/images/NickPicture_square.jpg';
import prestonPic from '../../static/images/PrestonPicture_square.jpg';
import suyashpic from '../../static/images/suyash_square.jpg';

export default class About extends Component {

  render() {
    return (
      <Container id="about">
        <Row>
          <Col>
            <h2>{CLIENT_TEAM_NAME}
              <Button color="primary" onClick={this.props.closePage} xs={1} className="float-right" >
                Close
              </Button>
            </h2>
            <h3>Our Mission</h3>
            <p>To create a cohesive product using Agile software engineering principles. Collaboration and promoting an inclusive environment where
             ideas may freely flow are our means of success.</p>
            <h3>Our Team</h3>
            <Row>
                {this.createBio("Suyash Hiray", SUYASH_BIO, suyashpic)}
                {this.createBio("Nicholas Davidson", NICK_BIO, nickPic)}
                {this.createBio("Alex Hooten", ALEX_BIO, alexpic)}
                {this.createBio("Preston Dunton", PRESTON_BIO, prestonPic)}
                {this.createBio("Jesus Garcia", JESUS_BIO, jesuspic)}

            </Row>
          </Col>
        </Row>
      </Container>
    )
  }

  createBio(teamMemberName, teamMemberBio, teamMemberImage){
      return(
          <Col sm={12} md={6} lg={4}>
          <Card>
              <CardImg top width="100%" src={teamMemberImage} alt="team member picture"/>
              <CardBody>
                  <CardTitle><h5>{teamMemberName}</h5></CardTitle>
                  <CardText>
                      {teamMemberBio}
                  </CardText>
              </CardBody>
          </Card>
          </Col>
      )
    }
}
