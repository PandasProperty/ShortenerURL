/**
 * Created by anda on 5/14/17.
 */

import React from 'react';
import request from 'browser-request';
import config from 'config';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Button from 'react-bootstrap/lib/Button';
import Modal from 'react-bootstrap/lib/Modal';
import Url from './Url';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {getUrls, onHideModal} from './../actions';

class AppComponent extends React.Component {

  constructor(props) {
    super(props);
    this.reload = this.reload.bind(this);
  }

  render() {
    return (
      <Row style={{
        margin: 'auto', paddingTop: '100px'
      }}>

        <Modal bsSize='small' show={this.props.modal.show}>
          <Modal.Header closeButton>
            <Modal.Title>{this.props.modal.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.props.modal.content}
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={function () {
              this.props.onHideModal();
              this.reload();
            }.bind(this)}>Close</Button>
          </Modal.Footer>
        </Modal>

        <Col xs={12} sm={12} md={12} lg={12} style={{paddingBottom: '10px'}}>
          {
            !this.props.urls || this.props.urls.length == 0 ? (
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
          this.props.urls && this.props.urls.map(function (url, index) {
            return (<Url url={url} key={index}/>);
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
    }, this.props.getUrls);
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    urls: state.urls,
    modal: state.modal
  };
}

function matchDispatchToProps(dispatch){
  return bindActionCreators({
    getUrls: getUrls,
    onHideModal: onHideModal
  }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(AppComponent);
