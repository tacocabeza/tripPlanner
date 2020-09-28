import React, { Component } from 'react';
import {Button, Col, Row, Form, FormGroup, Input} from 'reactstrap';

export default class Search extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <p>Search here</p>
    );
  }

  //input = latitude and longitude separated by comma, decimal format
  validate(input) {
    const reg = RegExp("^[-+]?([1-8]?\\d(\\.\\d+)?|90(\\.0+)?),\\s*[-+]?(180(\\.0+)?|((1[0-7]\\d)|([1-9]?\\d))(\\.\\d+)?)$");
    result = reg.test(input);
    return result;
  }
}