/**
 * Created by anda on 2/2/17.
 */

import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import {Link} from 'react-router';

import request from 'browser-request';
import config from 'config';

require('./../styles/Login.scss');

import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {onLogin} from './../actions';

class AppComponent extends Component {

  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    switch (event.target.name) {
      case 'username': {
        this.setState({
          username: event.target.value
        });
        break;
      }
      case 'password': {
        this.setState({
          password: event.target.value
        });
        break;
      }
      default:
        break;
    }
  }

  handleSubmit() {
    request({
      method: 'POST',
      url: config.api + '/auth',
      body: {
        username: this.state.username,
        password: this.state.password
      },
      json: true
    }, function (error, response, body) {
      if (error) {
        return this.props.onLogin('Internal server error.');
      }
      if (response.status != 200) {
        return this.props.onLogin(body.message);
      }
      this.props.onLogin(null, body);
    }.bind(this));
  }

  render() {
    return (
      <Row style={{
        maxWidth: '400px',
        margin: 'auto',  paddingTop: '100px'
      }}>
        <Col xs={12} sm={12} md={12} lg={12}>
          <form onSubmit={this.handleSubmit}>
            <FormGroup>
              <ControlLabel>Username</ControlLabel>
              <FormControl type='text' placeholder='username' name='username'
                           onChange={this.handleChange} />
            </FormGroup>
            <FormGroup>
              <ControlLabel>Password</ControlLabel>
              <FormControl type='password' placeholder='password' name='password'
                           onChange={this.handleChange} />
            </FormGroup>

            <Link className='btn btn-default'
                  onClick={this.handleSubmit} to='/new-url'>Submit</Link>
          </form>
        </Col>
      </Row>
    );
  }
}

function mapStateToProps(state) {
  return {
    onValueChange: state.onValueChange
  };
}

function matchDispatchToProps(dispatch){
  return bindActionCreators({
    onLogin: onLogin
  }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(AppComponent);
