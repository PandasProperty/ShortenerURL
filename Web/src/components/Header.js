/**
 * Created by anda on 5/14/17.
 */

require('styles/Header.scss');

import React from 'react';
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import {Link} from 'react-router';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {logout} from './../actions';

class AppComponent extends React.Component {
  render() {
    return (
      <Navbar fixedTop>
        <Navbar.Header>
          <h3>Panda's Property</h3>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            {
              this.props.user ? (
                <div>
                  <Link to='/new-url' style={{margin: 'auto'}} className='custom-link'>New URL</Link>
                  <Link to='/history-urls' style={{margin: 'auto'}} className='custom-link'>History</Link>
                  <Link to='/new-url' style={{margin: 'auto'}} className='custom-link' onClick={this.props.logout}>Logout</Link>
                </div>
              ) : (
                <div>
                    <Link to='/new-url' style={{margin: 'auto'}} className='custom-link'>New URL</Link>
                    <Link to='/login' style={{margin: 'auto'}} className='custom-link'>Login</Link>
                </div>
              )
            }
          </Nav>
        </Navbar.Collapse>
      </Navbar>
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
    logout: logout
  }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(AppComponent);
