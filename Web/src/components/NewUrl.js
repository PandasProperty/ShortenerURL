/**
 * Created by anda on 5/14/17.
 */

import React from 'react';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import FormControl from 'react-bootstrap/lib/FormControl';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import Button from 'react-bootstrap/lib/Button';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import request from 'browser-request';
import config from 'config';

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
      url: '',
      response: {
        error: null,
        url: null
      }
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getURLValidation = this.getURLValidation.bind(this);
  }

  componentWillReceiveProps() {
    this.state = {
      url: '',
      response: {
        error: null,
        url: null
      }
    };
  }

  render() {
    return (
      <Row style={{
        maxWidth: '400px',
        margin: 'auto', paddingTop: '100px'
      }}>
        <Col xs={12} sm={12} md={12} lg={12}>
          <h2 style={{
            textAlign: 'center'
          }}>
            Add NEW URL:
          </h2>
        </Col>
        <Col xs={12} sm={12} md={12} lg={12}>
          <form onSubmit={this.handleSubmit}>
            <FormGroup
              controlId="formSubscribe"
              validationState={this.getURLValidation()}>
              <ControlLabel>URL</ControlLabel>
              <FormControl
                type="text"
                value={this.state.url}
                placeholder="URL"
                onChange={this.handleChange}
              />
            </FormGroup>
            <Button style={{
              marginTop: '20px',
              backgroundColor: '#5b0021'
            }} type="submit">Shorten this long URL!</Button>
          </form>
        </Col>
        <Col xs={12} sm={12} md={12} lg={12}>

        </Col>
        <Col xs={12} sm={12} md={12} lg={12} style={{paddingLeft: '70px'}}>
          {
            this.state.response.error ? (
            <ControlLabel style={{paddingTop: '10px'}}>* {this.state.response.error}</ControlLabel>
            ) : (
              this.state.response.url ? (
                <div>
                  <FormGroup style={{marginTop: '10px'}}>
                    <ControlLabel>Hash</ControlLabel>
                    <FormControl
                    type="text"
                    readOnly value={this.state.response.url}
                    onChange={this.handleChange}
                    />
                  </FormGroup>
                  <FormGroup style={{marginTop: '10px'}}>
                    <ControlLabel style={{marginRight: '20px'}}>Full path</ControlLabel>
                    <a href={config.api + '/' + this.state.response.url} target='_blank'
                       style={{marginRight: '25px'}}>
                      {config.api + '/' + this.state.response.url}
                    </a>
                  </FormGroup>
                </div>
              ) : <div/>
            )
          }
        </Col>
      </Row>
    );
  }

  getURLValidation () {

    if (pattern.test(this.state.url)) {
      return 'success';
    }
    if (this.state.url.length < 5) {
      return null;
    }
    return 'error';
  }

  handleChange(event) {
    this.setState({
      url: event.target.value,
      response: {
        error: null,
        url: null
      }
    });
  }

  handleSubmit(event) {

    var requestOption = {
      method: 'POST',
      url: config.api + '/links',
      body: {
        url: this.state.url
      },
      json: true
    };

    if (this.props.user) {
      requestOption.headers = {
        'Authorization': 'Bearer ' + this.props.user
      };
    }

    if (this.validUrl()) {
      request(requestOption, function (error, response, body) {
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
          response: {
            error: null,
            url: body.hash
          }
        });
      }.bind(this));
    }
    event.preventDefault();
  }

  validUrl() {
    if (pattern.test(this.state.url)) {
      return true;
    }
    this.setState({
      response: {
        error: 'Please enter a valid url.',
        url: null
      }
    });
    return false;
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
