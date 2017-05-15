/**
 * Created by anda on 5/14/17.
 */

import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import request from 'browser-request';
import config from 'config';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Url from './Url';

class AppComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      urls: [ ]
    };
    this.reload = this.reload.bind(this);
  }

  render() {
    return (
      <Row style={{
        margin: 'auto', paddingTop: '100px'
      }}>

        <Col xs={12} sm={12} md={12} lg={12} style={{paddingBottom: '10px'}}>
          {
            this.state.urls.length == 0 ? (
              <div>No links found for this user</div>
            ) : (
              <Row>
                <Col xs={3} sm={3} md={4} lg={4}>URL</Col>
                <Col xs={2} sm={2} md={2} lg={2}>Hash</Col>
                <Col xs={5} sm={5} md={4} lg={4}>Shorten URL</Col>
                <Col xs={1} sm={1} md={1} lg={1}>Edit</Col>
                <Col xs={1} sm={1} md={1} lg={1}>Delete</Col>
              </Row>
            )
          }
        </Col>
        {
          this.state.urls.map(function (url, index) {
            return (<Url url={url} key={index} reload={this.reload}/>);
          }.bind(this))
        }

      </Row>
    );
  }

  componentDidMount() {
    if (this.props.user) {
      this.reload();
    }
  }

  reload() {
    request({
      method: 'GET',
      url: config.api + '/links',
      headers: {
        'Authorization': 'Bearer ' + this.props.user,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      withCredentials: true,
      json: true
    }, function (error, response, body) {
      if (error) {
        return this.setState({
          response: {
            error: 'Internal server error.',
            url: null
          }
        });
      }
      if (response.status != 200) {
        return this.setState({
          response: {
            error: body.error,
            url: null
          }
        });
      }
      this.setState({
        urls: body.links
      });
    }.bind(this));
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

function matchDispatchToProps(dispatch){
  return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(AppComponent);
