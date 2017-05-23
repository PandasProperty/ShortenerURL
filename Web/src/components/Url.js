/**
 * Created by anda on 5/14/17.
 */

import React from 'react';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import FormControl from 'react-bootstrap/lib/FormControl';
import request from 'browser-request';
import config from 'config';
import {bindActionCreators} from 'redux';
import {onShowModal} from './../actions';
import {connect} from 'react-redux';

require('./../styles/Url.scss');

let pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
  '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+ // domain name
  '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
  '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
  '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
  '(\\#[-a-z\\d_]*)?$','i'); // fragment locator

class AppComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      url: this.props.url,
      origin: this.props.url && this.props.url.origin,
      editMode: false,
      modal: {
        show: false,
        title: '',
        content: ''
      }
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      url: newProps.url,
      origin: newProps.url && newProps.url.origin
    });
  }

  render() {
    return (
      <Col xs={12} sm={12} md={12} lg={12} style={{paddingBottom: '5px'}}>

        {
          this.state.url ? (
            <Row style={{display: 'flex'}}>
              <Col xs={3} sm={3} md={4} lg={4} className="url-text">{
                this.state.editMode ?
                  <FormControl
                    type="text"
                    value={this.state.origin}
                    onChange={this.handleChange}
                  /> :  this.state.url.origin
              }</Col>
              <Col xs={2} sm={2} md={2} lg={2} className="url-text">{this.state.url.shortenUrl}</Col>
              <Col xs={5} sm={5} md={4} lg={4} className="url-text">
                <a href={config.api + '/' + this.state.url.shortenUrl} target='_blank'>
                  {config.api + '/' + this.state.url.shortenUrl}
                </a>
                </Col>
              <Col xs={1} sm={1} md={1} lg={1} style={{display: 'flex'}}>
                {this.state.editMode ?
                  <a
                    className="glyphicon glyphicon-save"
                   style={{
                     cursor: 'pointer', paddingLeft: '5px',
                     margin: 'auto', marginLeft: '0px'
                   }}
                   onClick={function () {
                     this.setState({
                       editMode: false
                     });
                     this.handleUpdate();
                   }.bind(this)}/> :
                  <a
                    className="glyphicon glyphicon-pencil"
                    style={{
                      cursor: 'pointer', paddingLeft: '5px',
                      margin: 'auto', marginLeft: '0px'
                    }}
                    onClick={function () {
                      this.setState({
                        editMode: true
                      });
                    }.bind(this)}/>
                }
              </Col>
              <Col xs={1} sm={1} md={1} lg={1} style={{display: 'flex'}}>
                <a className="glyphicon glyphicon-remove"
                   style={{
                     cursor: 'pointer', paddingLeft: '10px',
                     margin: 'auto', marginLeft: '5px'
                   }}
                   onClick={this.handleDelete} />
              </Col>
            </Row>
          ) : (<p>Loading ...</p>)
        }
      </Col>
    );
  }

  handleChange(event) {
    this.setState({
      origin: event.target.value
    });
  }

  validUrl() {
    if (pattern.test(this.state.origin)) {
      return true;
    }
    this.setState({
      modal: {
        show: true,
        title: 'Update URL',
        content: 'Please enter a valid URL'
      }
    });
    return false;
  }

  handleUpdate() {
    if (this.validUrl()) {
      request({
        method: 'PUT',
        url: config.api + '/links/' + this.state.url.shortenUrl,
        body: {
          url: this.state.origin
        },
        headers: {
          'Authorization': 'Bearer ' + this.props.user,
          'Accept': 'application/json'
        },
        json: true
      }, function (error, response, body) {
        this.props.onShowModal('Update URL', 'URL updated.', error, response, body);
      }.bind(this));
    }
  }

  handleDelete() {
    request({
      method: 'DELETE',
      url: config.api + '/links/' + this.state.url.shortenUrl,
      headers: {
        'Authorization': 'Bearer ' + this.props.user,
        'Accept': 'application/json'
      }
    }, function (error, response, body) {
      this.props.onShowModal('Delete URL', 'URL deleted.', error, response, body);
    }.bind(this));
  }

}

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

function matchDispatchToProps(dispatch){
  return bindActionCreators({
    onShowModal: onShowModal
  }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(AppComponent);
